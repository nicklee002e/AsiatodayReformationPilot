import os
import json
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from shared.models import EventPayload
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Ontology Agent")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY is not set in .env")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Ontology"}

@app.post("/ontology/analyze", response_model=EventPayload)
async def analyze_ontology(payload: EventPayload):
    try:
        # Prompt 파일 경로 설정
        # ontology_evol.md를 사용하여 연결/함의/진화 분석 지시 수행
        prompt_path = os.path.join(os.path.dirname(__file__), "../Prompts/ontology_evol.md")
        with open(prompt_path, "r", encoding="utf-8") as f:
            system_instruction = f.read()
            
        # 프롬프트 입력 데이터 준비
        input_data = {
            "company_name": payload.company_name,
            "event_type": payload.event_type,
            "raw_data": payload.raw_data,
            "existing_context": payload.context.ontology_result # 시장 정보 등이 있으면 참고하도록 전송
        }
        
        # 모델 초기화 (복잡한 추론/관계식을 위해 gemini-2.5-flash 활용)
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=system_instruction,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # API 호출하여 온톨로지 생성
        response = await model.generate_content_async(json.dumps(input_data, ensure_ascii=False))
        
        # 생성된 JSON(Dict 형태) 처리
        parsed_result = json.loads(response.text)
        
        # 기존 context를 보존하며 새로 생성된 온톨로지 딕셔너리 병합
        if payload.context.ontology_result is None:
            payload.context.ontology_result = {}
        payload.context.ontology_result.update(parsed_result)
        
        return payload

    except Exception as e:
        print(f"Error calling Gemini in Ontology: {e}")
        # 오류 시 에러 메타데이터 추가
        if payload.context.ontology_result is None:
            payload.context.ontology_result = {}
        payload.context.ontology_result.update({
            "market_context": "ERROR",
            "error_msg": str(e)
        })
        return payload
