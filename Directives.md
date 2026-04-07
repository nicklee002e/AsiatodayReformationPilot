# 프로젝트 지시서 (Directives.md)

본 문서(`Directives.md`)는 "AsiaTodayReform" 프로젝트의 구체적인 비즈니스 목표, 타겟 사용자, 핵심 요구사항 및 전략적 마일스톤을 정의합니다. 프로젝트 진행에 있어 모든 에이전트 팀의 실행 기준이 됩니다.

> **작성자 주의사항**: 현재 아래 내용은 템플릿(초안) 형태로 작성되었습니다. 프로젝트의 실제 비즈니스 목표와 기획안에 맞게 세부 내용을 수정해 주시기 바랍니다.

---

## 1. 프로젝트 비전 및 목표 (Project Vision & Goal)

- **프로젝트명**: AsiaToday Reform
- **주요 목표**:
  1. 기존 아시아투데이(AsiaToday) 플랫폼의 기술적 부채 해결 및 현대화 (Modernization)
  2. 최신 웹 트렌드를 반영한 혁신적인 UI/UX 도입을 통한 사용자 체류 시간 극대화
  3. 확장성 및 유지보수성을 고려한 백엔드 시스템 재설계
  4. 성능 최적화 및 글로벌 수준의 매체 플랫폼 구축

## 2. 타겟 사용자 (Target Audience)

- **핵심 독자층 (Core Readers)**: 신속하고 정확한 뉴스를 필요로 하는 전 연령대 독자
- **신규 사용자 (New Users)**: 직관적이고 모바일 친화적인 디자인을 선호하는 밀레니얼/Z세대 뉴스 소비자
- **관리자/에디터 (Administrators/Editors)**: 효율적인 기사 작성, 승인, 발행 기능을 요구하는 내부 콘텐츠 관리자

## 3. 핵심 요구사항 (Core Requirements)

### 3.1. 프론트엔드 (Frontend - UI/UX)
- 시각적으로 뛰어나고 직관적인 인터페이스 제공 (모바일 퍼스트, 반응형 웹)
- 페이지 로드 속도 최적화 (Core Web Vitals 성능 지표 개선)
- 최신 프레임워크(예: Next.js, React 등)를 활용한 동적이고 매끄러운 사용자 경험 제공

### 3.2. 백엔드 (Backend & API)
- 마이크로서비스 또는 모듈러 모놀리스 아키텍처 기반의 안정적인 서버 설계
- 효과적인 기사 데이터 캐싱 및 데이터베이스 조회 튜닝
- 콘텐츠 관리 시스템(CMS) 고도화 (이미지 처리, 에디터 기능 강화 등)

### 3.3. 보안 및 인프라 (Security & DevOps)
- 악성 봇 대응, DDoS 방어 등 트래픽 급증 시의 보안/안정성 조치
- 무중단 배포(Zero-Downtime Deployment) 및 CI/CD 자동화 파이프라인 구축

## 4. 전략적 마일스톤 (Strategic Milestones)

- **Phase 1: 기반 아키텍처 설계 및 분석 (Foundation & Analysis)**
  - 기존 시스템 분석, 기술 스택 확정, DB 스키마 재설계, 개발 환경 구축

- **Phase 2: 핵심 백엔드 및 새 CMS 개발 (Backend & CMS)**
  - API 설계 및 구현, 데이터 마이그레이션 스크립트 작성, 백오피스 인터페이스 구축

- **Phase 3: 사용자 대면 웹/앱 프로토타이핑 및 고도화 (Frontend Implementation)**
  - 퍼블리싱 및 UI 컴포넌트 라이브러리 구축, API 연동, SEO 최적화

- **Phase 4: 품질 보증 및 테스트 (QA & Sec Audit)**
  - 통합 테스트(E2E, Unit), 부하 테스트, `Security Agent` 보안 감사 진행

- **Phase 5: 성공적인 릴리즈 및 모니터링 (Release & Monitoring)**
  - 프로덕션 배포 서버 이전, 실시간 로그 모니터링(APM) 연동, 롤백 플랜 확보

## 5. 통신 아키텍처 및 공통 API 페이로드 (Hub & Spoke Contract)

AsiaToday Reform 프로젝트의 복잡한 멀티 에이전트 환경의 안정성을 보장하기 위해, API 통신은 **Orchestrator(Manager Agent)를 중심(Hub)으로 하는 1:1 통신 방식(Spoke)**을 강제합니다.
각 서브 에이전트 간의 무분별한 스파게티 네트워크 생성을 엄격히 금지하며, 다음 공통 Pydantic 데이터 모델 구조(`EventPayload`)를 모든 API 교환의 기본 골격으로 사용합니다.

```python
from pydantic import BaseModel
from typing import Optional, Any, Dict

class PipelineContext(BaseModel):
    ontology_result: Optional[Dict[str, Any]] = None
    article_draft: Optional[str] = None
    factcheck_passed: Optional[bool] = None
    viz_chart_url: Optional[str] = None

class EventPayload(BaseModel):
    task_id: str
    company_code: str
    company_name: str
    event_type: str
    raw_data: Dict[str, Any]
    context: PipelineContext = PipelineContext()
    status: str = "pending"
```
