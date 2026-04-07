# 1. 허브 앤 스포크 (Hub and Spoke) 구조 채택

API 환경에서는 각 에이전트가 서로를 직접 무분별하게 호출하게 두면(스파게티 네트워크) 시스템이 쉽게 엉킵니다. 따라서 **매니저 에이전트(Orchestrator)**를 중앙의 'API 게이트웨이(Hub)'로 삼고, 나머지 7개 에이전트(Spoke)가 매니저와 1:1로 통신하는 구조를 만들어야 합니다.

* **Manager Agent의 역할:** 전체 워크플로우의 '상태(State)'를 관리하며, 각 에이전트에게 순차적 또는 병렬적으로 API 호출(POST/GET)을 수행합니다.

### 2. 비동기 API 기반의 "초고속" 기사 생성 파이프라인

API의 단점인 '대기 시간(Blocking)'을 극복하기 위해 매니저 에이전트는 파이썬의 **FastAPI (async/await)**를 사용하여 여러 에이전트에게 동시에 API 요청을 날려야 합니다.

**[작동 시나리오: 삼성전자 어닝 서프라이즈 공시 발생]**

1. **Trigger (수집):** `Backend Agent`가 DART에서 데이터를 포착하여 `Manager Agent`의 API로 전송합니다. (`POST /manager/events/new-dart`)
2. **비동기 병렬 호출 (Phase 1):** `Manager Agent`는 수신 즉시 다음 세 가지 API를 **동시에** 호출합니다.
   * `POST /agents/article/draft-straight` (기사 작성 에이전트에게 즉시 1보 스트레이트 기사 요청)
   * `POST /ontology/analyze` (온톨로지 에이전트에게 관련 기업 지분/히스토리 추출 요청)
   * `POST /frontend/viz/generate-chart` (데이터 시각화 에이전트에게 실적 차트 요청)
3. **취합 및 심층 기사 (Phase 2):** 온톨로지 에이전트의 응답이 오면, `Manager`는 그 데이터를 다시 기사 작성 에이전트에게 보내어 '심층 분석 기사(In-depth)'로 업데이트하도록 지시합니다.
4. **검증 (Phase 3):** 초안이 완성되면 `Manager`는 `Fact-check Agent`와 `Security Agent`의 API를 호출하여 무결성 및 환각 여부를 검사받습니다. (`POST /agents/verify/fact-check`)
5. **배포 (Phase 4):** 검증을 통과하면 최종 JSON 데이터를 `Frontend Agent` (DB 저장 및 웹 소켓 브로드캐스팅)와 `GEO Agent` (네이버 Cue: 타겟팅 포맷 변환 및 외부 송고)에게 전달합니다.

### 3. Antigravity 구현을 위한 API 규약(Contract) 명세

Antigravity 워크스페이스 내의 `Directives.md`에 에이전트들이 공통으로 지켜야 할 **표준 API JSON 스키마**를 명시해야 합니다. 이를 통해 에이전트들이 "서로 알아듣지 못하는" 문제를 방지합니다.

**[공통 페이로드 표준 예시]**

```json
{
  "task_id": "dart_20260406_001",
  "company_code": "005930",
  "company_name": "삼성전자",
  "event_type": "EARNINGS_SURPRISE",
  "raw_data": {
    "revenue": 71000000000000,
    "operating_profit": 6600000000000
  },
  "context": {}, 
  "status": "pending"
}
```

* **지침:** "모든 에이전트는 위 JSON 구조를 Request/Response의 기본 골격으로 사용하며, 각자의 작업 결과를 `context` 배열에 추가하여 다음 에이전트로 넘겨야 한다."

### 4. 에러 및 진화 피드백의 API화 (Self-Evolution)

API 아키텍처에서는 진화 방식도 명확해집니다.

* **피드백 루프:** 데스크 기자가 CMS(프론트엔드)에서 기사를 수정하면, 프론트엔드는 `Manager Agent`에게 `POST /manager/feedback` API를 쏩니다.
* **지식 결정화:** 매니저는 이 피드백을 `Knowledge Base` 디렉토리에 마크다운 파일로 저장하고, 관련 에이전트(예: 기사 작성 에이전트)에게 `POST /agents/article/update-rules`를 보내어 스스로 프롬프트를 조정하도록 유도합니다.

---

**실행 요약 (Action Item)**
Antigravity에서 `D:\Users\Nick_Lee\AsiaTodayReform` 환경을 셋업하실 때, 백엔드 및 각 에이전트 폴더에 **FastAPI**를 기본 프레임워크로 하는 뼈대 코드를 먼저 생성하도록 에이전트들에게 지시하시면 됩니다. 모든 통신은 `localhost` 내의 서로 다른 포트(예: Manager는 8000, Article Writer는 8001 등)를 통한 HTTP 통신으로 매끄럽게 연결될 것입니다.
