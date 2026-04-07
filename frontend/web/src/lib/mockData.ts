export const DUMMY_METRICS = {
  exchanges: 10,
  tokens: 8274,
  crossboard: 3553,
  cwtGrade: 1393,
  st: 102,
  priorityPool: 994,
  rates: {
    stable: 417,
    negative: 67,
    distressed: 3,
    default: 1
  }
};

export const DUMMY_DETECTION_ALERTS = [
  { id: 1, pair: "OAX/USDT", grade: "Grade F", status: "Zero Volume", time: "1h ago" },
  { id: 2, pair: "SYNN/USDT", grade: "Grade F", status: "Zero Volume", time: "1h ago" },
  { id: 3, pair: "FIE/USDT", grade: "Grade F", status: "Zero Volume", time: "1h ago" },
  { id: 4, pair: "WPC/USDT", grade: "Grade D", status: "7% Drop", time: "2h ago" },
  { id: 5, pair: "ZIL/USDT", grade: "Grade C", status: "Volume Spike", time: "3h ago" }
];

export const DUMMY_TRACKING_LIST = [
  { id: 1, pair: "A/V", note: "Spread 25.1%", status: "Suspended", time: "1h ago" },
  { id: 2, pair: "DEX", note: "Address change to Asia Today Watch", time: "2h ago" },
  { id: 3, pair: "OPT", note: "Address change to Asia Today Watch", time: "3h ago" },
  { id: 4, pair: "FLX", note: "Spread 4.1%", time: "5h ago" },
  { id: 5, pair: "TS", note: "Spread 62.1%", time: "8h ago" },
];

export const DUMMY_WE_CALLED_IT = [
  { id: 1, pair: "IPE/USDT", note: "Asia Today Watch team wallet", time: "24 ago" },
  { id: 2, pair: "STR/USDT", note: "Asia Today Watch team wallet", time: "24 ago" },
  { id: 3, pair: "MWE/USDT", note: "Asia Today Watch team wallet", time: "25 ago" },
  { id: 4, pair: "LOOK/USDT", note: "Alert triggered before listing", time: "26 ago" },
];

export const DUMMY_PULSE_TOKENS = [
  { id: 1, pair: "삼성전자", symbol: "005930.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "72,100" },
  { id: 2, pair: "SK하이닉스", symbol: "000660.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "214,000" },
  { id: 3, pair: "LG에너지솔루션", symbol: "373220.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "348,000" },
  { id: 4, pair: "현대차", symbol: "005380.KS", flag: "KOSPI", condition: "B+", status: "STABLE", price: "284,500" },
  { id: 5, pair: "기아", symbol: "000270.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "128,000" },
  { id: 6, pair: "셀트리온", symbol: "068270.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "185,500" },
  { id: 7, pair: "POSCO홀딩스", symbol: "005490.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "354,000" },
  { id: 8, pair: "NAVER", symbol: "035420.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "192,500" },
  { id: 9, pair: "카카오", symbol: "035720.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "48,200" },
  { id: 10, pair: "삼성바이오로직스", symbol: "207940.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "804,000" },
  { id: 11, pair: "KB금융", symbol: "105560.KS", flag: "KOSPI", condition: "A+", status: "STABLE", price: "68,900" },
  { id: 12, pair: "에코프로비엠", symbol: "247540.KQ", flag: "KOSDAQ", condition: "A+", status: "STABLE", price: "238,500" },
  { id: 13, pair: "HLB", symbol: "028300.KQ", flag: "KOSDAQ", condition: "C+", status: "NEGATIVE", price: "45,200" },
  { id: 14, pair: "알테오젠", symbol: "196170.KQ", flag: "KOSDAQ", condition: "A+", status: "STABLE", price: "201,000" },
  { id: 15, pair: "엔켐", symbol: "348370.KQ", flag: "KOSDAQ", condition: "A+", status: "STABLE", price: "198,400" },
  { id: 16, pair: "HPSP", symbol: "403870.KQ", flag: "KOSDAQ", condition: "A+", status: "STABLE", price: "64,300" }
];

export const DUMMY_US_STOCKS = [
  { id: 17, pair: "NVIDIA", symbol: "NVDA", flag: "NASDAQ", condition: "S", status: "STABLE", price: "$124.50" },
  { id: 18, pair: "Apple", symbol: "AAPL", flag: "NASDAQ", condition: "A+", status: "STABLE", price: "$210.35" },
  { id: 19, pair: "Microsoft", symbol: "MSFT", flag: "NASDAQ", condition: "A+", status: "STABLE", price: "$415.80" },
  { id: 20, pair: "Tesla", symbol: "TSLA", flag: "NASDAQ", condition: "B", status: "NEGATIVE", price: "$174.20" },
  { id: 21, pair: "Amazon", symbol: "AMZN", flag: "NASDAQ", condition: "A", status: "STABLE", price: "$182.90" },
  { id: 22, pair: "Alphabet", symbol: "GOOGL", flag: "NASDAQ", condition: "A", status: "STABLE", price: "$176.45" }
];

export const DUMMY_FUTURES = [
  { id: 23, pair: "S&P 500 E-mini", symbol: "ES=F", flag: "CME", condition: "A", status: "STABLE", price: "5,420.25" },
  { id: 24, pair: "Nasdaq 100", symbol: "NQ=F", flag: "CME", condition: "A+", status: "STABLE", price: "19,850.50" },
  { id: 25, pair: "Crude Oil", symbol: "CL=F", flag: "NYMEX", condition: "B", status: "NEGATIVE", price: "$82.14" },
  { id: 26, pair: "Gold", symbol: "GC=F", flag: "COMEX", condition: "A", status: "STABLE", price: "$2,350.10" },
  { id: 27, pair: "10-Year T-Note", symbol: "ZN=F", flag: "CBOT", condition: "B+", status: "STABLE", price: "109-15" }
];

export const DUMMY_CRYPTO = [
  { id: 28, pair: "Bitcoin", symbol: "BTC-USD", flag: "CRYPTO", condition: "S", status: "STABLE", price: "$98,450.20" },
  { id: 29, pair: "Ethereum", symbol: "ETH-USD", flag: "CRYPTO", condition: "A", status: "STABLE", price: "$3,640.15" },
  { id: 30, pair: "Solana", symbol: "SOL-USD", flag: "CRYPTO", condition: "A+", status: "STABLE", price: "$165.30" },
  { id: 31, pair: "Ripple", symbol: "XRP-USD", flag: "CRYPTO", condition: "C+", status: "NEGATIVE", price: "$0.52" },
  { id: 32, pair: "Cardano", symbol: "ADA-USD", flag: "CRYPTO", condition: "B", status: "STABLE", price: "$0.41" }
];

// 1. 백엔드 규약과 정확히 일치하는 TypeScript 인터페이스 정의
export interface PipelineContext {
  ontology_result?: Record<string, unknown> | null;
  article_draft?: string | null;
  factcheck_passed?: boolean | null;
  viz_chart_url?: string | null;
}

export interface DartEvent {
  task_id: string;
  company_code: string;
  company_name: string;
  event_type: string;
  raw_data: Record<string, unknown>;
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
