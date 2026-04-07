import os
import json
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from shared.models import EventPayload
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Article Writer Agent")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY is not set in .env")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Article Writer"}

@app.post("/agents/article/draft-straight", response_model=EventPayload)
async def draft_straight(payload: EventPayload):
    try:
        # Prompt 파일 경로 설정
        # article_writer_deep.md를 사용하여 더 깊이 있는 아티클 생성 지시
        prompt_path = os.path.join(os.path.dirname(__file__), "../../Prompts/article_writer_deep.md")
        with open(prompt_path, "r", encoding="utf-8") as f:
            system_instruction = f.read()
            
        # 프롬프트 입력 데이터 준비
        input_data = {
            "company_name": payload.company_name,
            "event_type": payload.event_type,
            "raw_data": payload.raw_data
        }
        
        # 모델 초기화 (신속하고 정확한 처리를 위해 gemini-2.5-flash 권장)
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=system_instruction,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # API 호출하여 기사 생성
        response = await model.generate_content_async(json.dumps(input_data, ensure_ascii=False))
        
        # 생성된 기사(JSON 스트링)를 payload context에 저장
        payload.context.article_draft = response.text
        
        return payload

    except Exception as e:
        print(f"Error calling Gemini: {e}")
        # 오류 시 더미 데이터 저장
        payload.context.article_draft = json.dumps({
            "headline": "[오류] 기사 초안 작성 실패",
            "sub_headline": ["Gemini 처리 과정에서 문제가 발생했습니다."],
            "body": str(e)
        }, ensure_ascii=False)
        return payload
