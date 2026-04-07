import os
import httpx
from datetime import datetime
from fastapi import FastAPI, HTTPException
from shared.models import EventPayload, PipelineContext
from dotenv import load_dotenv

# .env 파일에서 환경변수 로드
load_dotenv()

app = FastAPI(title="Backend Agent (DART Crawler)")

DART_API_KEY = os.getenv("DART_API_KEY", "YOUR_DART_API_KEY_HERE")
US_MARKET_API_KEY = os.getenv("US_MARKET_API_KEY", "YOUR_US_API_KEY_HERE")
MANAGER_URL = "http://127.0.0.1:8000/manager/events/new-dart"

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Backend Agent"}

@app.post("/events/dart-trigger")
async def trigger_dart_fetch():
    """DART API를 호출하여 최신 공시 1건을 가져오고 Manager로 전송합니다."""
    # 1. 오늘 날짜 기준으로 DART 최근 공시 목록 조회
    today = datetime.now().strftime("%Y%m%d")
    dart_url = "https://opendart.fss.or.kr/api/list.json"
    params = {
        "crtfc_key": DART_API_KEY,
        "bgn_de": today,
        "page_count": "1" # 가장 최신 1개만 가져오기
    }
    
    async with httpx.AsyncClient() as client:
        try:
            # DART API 호출
            response = await client.get(dart_url, params=params)
            data = response.json()
            
            if data.get("status") != "000":
                raise HTTPException(status_code=400, detail=f"DART API 에러: {data.get('message')}")
            
            # 2. 가져온 원문 데이터 (가장 첫 번째 최신 공시)
            latest_report = data["list"][0]
            
            # 3. 공통 페이로드(EventPayload) 규격으로 변환
            payload = EventPayload(
                task_id=f"dart_{latest_report['rcept_no']}", # DART 접수번호를 고유 ID로 사용
                company_code=latest_report.get("corp_code", "UNKNOWN"),
                company_name=latest_report.get("corp_name", "Unknown Corp"),
                event_type="NEW_DISCLOSURE",
                raw_data=latest_report, # DART 원문을 통째로 raw_data에 삽입
                context=PipelineContext(),
                status="pending"
            )
            
            # 4. Manager Agent(Hub)로 전송
            data = payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()
            hub_res = await client.post(MANAGER_URL, json=data)
            
            return {
                "message": "DART 공시 수집 및 허브 전송 완료",
                "dart_report": latest_report["report_nm"],
                "hub_status": hub_res.status_code
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.post("/events/us-market-trigger")
async def trigger_us_market_fetch():
    """미국 증시 API를 호출하여 최신 데이터를 가져오고 Manager로 전송합니다. (SDK 기반 리팩토링)"""
    try:
        from polygon import RESTClient
        
        # SDK 초기화
        client = RESTClient(api_key=US_MARKET_API_KEY)
        
        # -- 실제 API 호출 부분 (최신 뉴스 1건 조회) --
        # list_ticker_news는 iterator를 반환하므로 한 개만 추출
        news_iter = client.list_ticker_news(limit=1)
        latest_report = None
        for n in news_iter:
            latest_report = n
            break
            
        if latest_report:
            # SDK 객체(News)를 Dict로 변환할 수 있도록 필요한 필드만 추출
            latest_report_data = {
                "id": getattr(latest_report, "id", "us_news_9999"),
                "ticker": getattr(latest_report, "tickers", ["UNKNOWN"])[0] if getattr(latest_report, "tickers", None) else "UNKNOWN",
                "title": getattr(latest_report, "title", "No Title"),
                "publisher": {"name": getattr(latest_report.publisher, "name", "Unknown Publisher")} if getattr(latest_report, "publisher", None) else {},
                "published_utc": getattr(latest_report, "published_utc", datetime.now().isoformat())
            }
        else:
            raise Exception("No news data returned from SDK")
            
    except Exception as e:
        print(f"US Market SDK Error: {str(e)}")
        # -- SDK 실패 시 테스트용 더미 데이터 (Fallback) --
        latest_report_data = {
            "id": "us_news_fallback",
            "ticker": "AAPL",
            "title": f"Massive API SDK fetch failed ({str(e)}), falling back to mock data.",
            "publisher": {"name": "Apple Inc."},
            "published_utc": datetime.now().isoformat()
        }
        
    try:
        # 1. PipelineContext 생성 후 온톨로지 에이전트 식별용 데이터 추가
        context = PipelineContext()
        context.ontology_result = {"market": "US"}
        
        # 2. EventPayload 구조에 맞춰 매핑 (키 에러 방지 처리)
        payload = EventPayload(
            task_id=f"us_{latest_report_data.get('id', '9999')}",
            company_code=latest_report_data.get("ticker", "UNKNOWN"),
            company_name=latest_report_data.get("publisher", {}).get("name", "Unknown Publisher"),
            event_type="US_MARKET_UPDATE",
            raw_data=latest_report_data,
            context=context,
            status="pending"
        )
        
        # 3. Manager Agent(Hub)로 전송 (기존 DART 라우트 공용 활용)
        async with httpx.AsyncClient(timeout=300.0) as http_client:
            data = payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()
            hub_res = await http_client.post(MANAGER_URL, json=data)
        
        return {
            "message": "미국 증시 데이터 수집 및 허브 전송 완료 (SDK 활용)",
            "us_report": latest_report_data.get("title", "No Title"),
            "hub_status": hub_res.status_code
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e) or repr(e))
