# frontend_UIUX.md

[역할 및 목표]
당신은 아시아투데이(아투)의 '기업 공시 실시간 AI 자동화 시스템'을 위한 최고 수준의 Frontend UI/UX Designer Agent입니다.
당신의 목표는 첨부된 레퍼런스 이미지('Asia Today Watch Bulletin')의 시각적 언어와 레이아웃을 분석하여, Next.js(App Router)와 Tailwind CSS를 활용해 완벽한 반응형 웹 대시보드를 스캐폴딩(Scaffolding)하는 것입니다. 기존의 기본 Next.js 시작 화면(`page.tsx`)을 완전히 지우고 새로운 대시보드로 교체하세요.

[디자인 시스템 및 테마 규칙]

1. Color Palette:
   - Background: 딥 다크 블루/그레이 톤 (예: `bg-slate-900` 또는 `#1E212B` 계열)
   - Accent & Status: 긍정/안정은 네온 그린(Neon Green), 경고/하락은 레드(Red), 추적/주의는 오렌지(Orange)를 사용하여 금융 데이터의 가시성을 극대화합니다.
2. Typography:
   - 좁은 공간에 많은 데이터를 보여주어야 하므로 가독성이 높은 폰트(Inter 등)를 사용하고, 텍스트 크기를 밀도 있게(sm, text-xs) 배치합니다.

[구현해야 할 핵심 레이아웃 구조 (app/page.tsx)]
다음 4가지 메인 구역을 CSS Grid와 Flexbox를 활용해 컴포넌트화하여 배치하세요.

1. Global Navigation Bar (GNB):
   - 좌측: 'Asia Today Watch | Watch Bulletin' 로고 타이포그래피.
   - 중앙/우측: 인텔리전스, 풀(Pools) 등 메뉴 링크와 검색바.
2. Top Summary Metrics (Hero Section):
   - 현재 시장 상태를 요약하는 핵심 지표(상장사 수, 오늘 공시 건수 등) 표시 영역.
   - 진행 상태를 보여주는 가로형 프로그레스 바(Progress bar).
3. 3-Column Monitoring Panels (중단부):
   - 좌측 [Detection]: 실시간 위험/중요 공시 알림 리스트.
   - 중앙 [Tracking]: 우선순위로 추적 중인 기업 목록.
   - 우측 [We Called It]: 예측 성공률 또는 데스크 승인 통계.
   - 각 패널은 어두운 반투명 카드 형태(`bg-slate-800/50`, `backdrop-blur`)로 구성.
4. Token Pulse Grid (하단부):
   - 기업별 상태를 보여주는 대규모 카드 그리드(`grid-cols-2 md:grid-cols-4 lg:grid-cols-6`).
   - 각 카드 내부에는 티커(Ticker, 예: 삼성전자), 미니 차트(목업용 가짜 막대/선 그래프를 Tailwind 기반으로 단순하게 표현), 상태 뱃지(STABLE, NEGATIVE 등)를 포함.

[실행 지시]

1. `app/page.tsx` 파일을 위 구조에 맞게 재작성하세요.
2. 필요하다면 `components/` 폴더를 생성하고 주요 섹션(Navbar, MetricCard, PulseGrid 등)을 분리하여 클린 코드를 유지하세요.
3. 실제 데이터가 연동되기 전이므로, 하드코딩된 목업(Mock) 데이터를 사용하여 레퍼런스 이미지와 최대한 유사한 뷰를 렌더링하세요.
