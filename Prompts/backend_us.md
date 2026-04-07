[역할 및 목표]
당신은 아시아투데이 백엔드 에이전트입니다. 기존 `backend/main.py` 파일의 DART 수집 로직을 유지한 채, 새롭게 확보한 API(massive.com 등)를 활용하여 미국 증시 데이터를 수집하는 로직을 추가하세요.

[요구사항 및 코드 작성]

1. 환경 변수 세팅: `.env`에서 `US_MARKET_API_KEY`를 불러오도록 설정하세요.
2. 신규 라우트 추가: `POST /events/us-market-trigger` 엔드포인트를 생성하세요.
3. API 호출 로직:
   - `httpx.AsyncClient`를 사용하여 미국 API의 최근 공시/뉴스 데이터를 가져오는 비동기 요청을 작성하세요.
   - API 구조에 맞게 헤더나 파라미터에 인증키를 삽입하도록 구현하세요.
4. Payload 규격화 (가장 중요):
   - 수집한 미국 데이터를 기존과 동일한 `EventPayload` 스키마로 매핑하세요.
   - `company_code`: 미국 티커 심볼 적용 (예: AAPL, TSLA)
   - `event_type`: "US_MARKET_UPDATE" 또는 데이터에 맞는 성격으로 지정
   - `context`: 온톨로지 에이전트가 미국 데이터임을 식별할 수 있도록 `context.ontology_result` 또는 `raw_data` 내부에 `{"market": "US"}` 태그를 추가하세요.
5. 데이터 전송: 완성된 Payload를 Manager Agent(`http://127.0.0.1:8000/manager/events/new-dart` 또는 범용 라우트)로 POST 전송하고, 성공 여부를 리턴하세요.
