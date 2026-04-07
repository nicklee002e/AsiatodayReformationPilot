// frontend/web/src/lib/mockData.ts

// 1. 백엔드 규약과 정확히 일치하는 TypeScript 인터페이스 정의
export interface PipelineContext {
  ontology_result?: Record<string, any> | null;
  article_draft?: string | null;
  factcheck_passed?: boolean | null;
  viz_chart_url?: string | null;
}

export interface DartEvent {
  task_id: string;
  company_code: string;
  company_name: string;
  event_type: string;
  raw_data: Record<string, any>;
  context: PipelineContext;
  status: string; // 예: "pending", "processed_phase_1", "completed"
}

// 2. 대시보드 컴포넌트에 뿌려줄 가짜(Mock) 데이터 배열
export const mockDetectList: DartEvent[] = [
  {
    task_id: "test_dart_001",
    company_code: "005930",
    company_name: "삼성전자",
    event_type: "EARNINGS_SURPRISE",  // -> UI에서 Neon Green (STABLE/POSITIVE) 배지로 변환
    raw_data: {
      revenue: 71000000000000,
      operating_profit: 6600000000000
    },
    context: {
      ontology_result: { keywords: ["반도체", "초격차", "영업이익"] },
      article_draft: "삼성전자가 1분기 71조원의 매출을 기록하며...",
      factcheck_passed: true,
      viz_chart_url: null // Viz 엔진이 아직 그림을 안 그렸다면 null
    },
    status: "completed"
  },
  {
    task_id: "test_dart_002",
    company_code: "035420",
    company_name: "NAVER",
    event_type: "CEO_RESIGNATION", // -> UI에서 Red (NEGATIVE/WARNING) 배지로 변환
    raw_data: {
      reason: "일신상의 사유"
    },
    context: {
      ontology_result: null,
      article_draft: null,
      factcheck_passed: null,
      viz_chart_url: null
    },
    status: "pending" // 매니저 에이전트가 방금 받아서 아직 처리 중인 상태
  }
];
