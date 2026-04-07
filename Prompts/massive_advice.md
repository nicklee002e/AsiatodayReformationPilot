[역할 및 과업]
당신은 아시아투데이 멀티에이전트 시스템의 백엔드 에이전트입니다.
기존에 작성된 `backend/main.py`의 미국 증시 데이터 연동 로직(Massive API)을 대폭 개선해야 합니다.

[핵심 지시사항 (Massive.com 공식 가이드라인)]
Use Massive’s API to build a US market news data pipeline for our real-time dashboard.
Use the Python SDK.
Follow the instructions given by their docs explained here: <https://massive.com/docs/rest/llms.txt>

[세부 구현 가이드]

1. SDK 학습 및 세팅:
   - 위 `llms.txt` 링크의 내용을 먼저 읽고 Massive Python SDK의 사용법을 완벽히 숙지하세요.
   - 프로젝트 환경(requirements.txt 등)에 필요한 SDK 패키지를 추가하세요.
2. 로직 리팩토링 (`backend/main.py`):
   - `POST /events/us-market-trigger` 엔드포인트를 수정하여, 기존의 `httpx`를 이용한 raw REST API 호출 대신 **Massive Python SDK**를 사용하여 최신 뉴스나 공시 데이터를 가져오도록 코드를 재작성하세요.
   - 인증은 `.env`의 `US_MARKET_API_KEY`를 사용합니다.
3. 데이터 파이프라인 유지:
   - 가져온 데이터는 기존과 동일하게 오류 없이 파싱하여 `EventPayload` 스키마로 매핑하세요. (안전한 `.get()` 메서드 사용)
   - 온톨로지 에이전트를 위한 `context.ontology_result = {"market": "US"}` 태그를 반드시 유지하세요.
   - 파싱된 데이터를 Manager Agent(`POST http://127.0.0.1:8000/manager/events/new-dart`)로 전송하는 로직과, 장애 발생 시의 Mock Fallback(200 OK 우회) 로직은 그대로 유지하세요.
