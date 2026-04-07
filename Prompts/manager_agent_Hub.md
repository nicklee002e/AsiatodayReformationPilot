# Manager Agent (Hub) - Spoke Agents Orchestration

FastAPI, httpx, asyncio를 사용하여 포트 8000에서 동작하는 허브 서버를 만드세요.

POST /manager/events/new-dart 엔드포인트를 생성하세요. 이 엔드포인트는 EventPayload를 입력받습니다.

내부에서 httpx.AsyncClient와 asyncio.gather(..., return_exceptions=True)를 사용하여 기사 작성(8003), 온톨로지(8002), 시각화(8007) 에이전트로 동시에 페이로드를 POST하는 비동기 병렬 호출 로직 뼈대를 작성하세요. 타임아웃은 60초로 설정합니다.

Spoke 에이전트 7개 공통 뼈대 작성

backend, ontology, agents/article_writer, agents/fact_checker, agents/distribution, security, frontend/viz_engine 폴더에 각각 main.py를 생성하세요.

각 main.py에는 FastAPI 앱 객체와 GET /health 엔드포인트가 있어야 합니다.

또한 각 에이전트의 메인 로직을 처리하는 POST 엔드포인트(예: 온톨로지는 /ontology/analyze)를 만들고, 반드시 from shared.models import EventPayload를 임포트하여 요청(Request)과 응답(Response)의 타입으로 EventPayload를 지정하세요.

위 3가지 지시사항을 파일 쓰기(File Write) 도구를 사용하여 로컬 시스템에 즉시 반영하고 결과를 보고해 주세요.
