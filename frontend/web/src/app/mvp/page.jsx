"use client";
import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, BarChart3, Lock, Calculator, CheckCircle2, Zap, Eye, Terminal, Activity, ChevronRight, Fingerprint, LineChart, Bell, Mail, User, TrendingUp, TrendingDown, Plus, Upload, AlertTriangle } from 'lucide-react';

const App = () => {
    // Navigation State
    const [currentView, setCurrentView] = useState('home'); // 'home', 'portfolio', 'analysis', 'paywall'
    const [portfolioTab, setPortfolioTab] = useState('holdings'); // 'holdings', 'watchlist'
    const [selectedStock, setSelectedStock] = useState(null);

    // Market Indices Mock Data
    const marketIndices = [
        { name: 'S&P 500', value: '5,214.08', change: '-24.30', percent: '-0.46%', isUp: false },
        { name: 'Dow Jones', value: '38,905.66', change: '-123.10', percent: '-0.32%', isUp: false },
        { name: 'Nasdaq', value: '16,248.52', change: '-101.40', percent: '-0.62%', isUp: false },
        { name: 'KOSPI', value: '2,742.00', change: '+32.10', percent: '+1.18%', isUp: true },
        { name: 'KOSDAQ', value: '882.45', change: '+12.30', percent: '+1.41%', isUp: true },
    ];

    // News Mock Data
    const mainNews = {
        title: "글로벌 밸류체인 재편: 엔비디아-TSMC 동맹, 한국 반도체에 미치는 영향은?",
        summary: "아시아투데이 데이터 허브 분석 결과, 하반기 AI 가속기 공급망에 중대한 변화가 감지되었습니다. 스마트 머니는 이미 새로운 밸류체인으로 이동 중입니다.",
        source: "Asia Today AX Desk",
        time: "2시간 전"
    };

    const sideNews = [
        { title: "Fed 파월 의장 발언 파장, 금리 인하 기대감 '찬물'", source: "Asia Today", time: "3시간 전" },
        { title: "테슬라, 자율주행 데이터 축적 가속... 로보택시 출시는?", source: "Reuters", time: "4시간 전" },
        { title: "중동 지정학적 리스크 고조, 유가 배럴당 90달러 돌파 초읽기", source: "Bloomberg", time: "5시간 전" },
        { title: "외국인 투자자 KOSPI 순매수 지속, 언제까지 이어질까", source: "Asia Today", time: "6시간 전" }
    ];

    // Portfolio Mock Data
    const myHoldings = [
        { symbol: '삼성전자', avgCost: '72,500', price: '84,100', dayChange: '+1.2%', totalReturn: '+15.8%', risk: 'HIGH', riskMsg: '공급망 이슈 감지' },
        { symbol: 'SK하이닉스', avgCost: '145,000', price: '182,300', dayChange: '-0.5%', totalReturn: '+25.7%', risk: 'SAFE', riskMsg: '특이사항 없음' },
        { symbol: '엔비디아', avgCost: '450.20', price: '880.08', dayChange: '-2.1%', totalReturn: '+95.4%', risk: 'HIGH', riskMsg: '임원 대량 매도' },
    ];

    // Analysis State
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [sliderValue, setSliderValue] = useState(20);
    const baseLoss = 1240000;
    const savedAmount = Math.floor(baseLoss * (sliderValue / 100));
    const finalLoss = baseLoss - savedAmount;

    // Analysis Loading Logic
    useEffect(() => {
        if (isAnalyzing) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 2;
                setLoadingProgress(Math.min(progress, 100));
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsAnalyzing(false);
                    setCurrentView('analysis');
                }
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    const handleAnalyze = (stock) => {
        setSelectedStock(stock);
        setIsAnalyzing(true);
    };

    const Header = () => (
        <header className="bg-[#1a1a1a] border-b border-[#333]">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
                        <div className="bg-emerald-600 p-1.5 rounded font-black text-xs text-white">AT</div>
                        <span className="font-black text-xl text-white tracking-tight">AsiaToday</span>
                    </div>

                    <div className="hidden md:flex relative w-96">
                        <input
                            type="text"
                            placeholder="Search for news, symbols or companies"
                            className="w-full bg-[#2a2a2a] border border-[#444] rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                        <div className="absolute right-0 top-0 h-full w-12 bg-emerald-600 rounded-r-full flex items-center justify-center cursor-pointer hover:bg-emerald-500">
                            <Search className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4 text-sm font-bold text-gray-300">
                        <span className="hover:text-white cursor-pointer">Finance</span>
                        <span className="hover:text-white cursor-pointer">Politics</span>
                        <span className="hover:text-white cursor-pointer">Global</span>
                    </div>
                    <div className="flex items-center gap-3 border-l border-[#333] pl-4">
                        <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <button className="flex items-center gap-2 border border-gray-600 rounded-full px-3 py-1.5 text-sm font-bold text-white hover:bg-gray-800">
                            <Mail className="w-4 h-4" /> Mail
                        </button>
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-4 py-1.5 rounded-full transition">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub Nav */}
            <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm font-bold border-t border-[#2a2a2a]">
                <button
                    className={`py-3 px-1 border-b-2 transition ${currentView === 'home' ? 'border-emerald-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setCurrentView('home')}
                >
                    Home (News)
                </button>
                <button
                    className={`py-3 px-1 border-b-2 transition ${currentView === 'portfolio' ? 'border-emerald-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                    onClick={() => setCurrentView('portfolio')}
                >
                    My Portfolio
                </button>
                <button className="py-3 px-1 border-b-2 border-transparent text-gray-400 hover:text-white">Markets</button>
                <button className="py-3 px-1 border-b-2 border-transparent text-gray-400 hover:text-white">Research</button>
                <button className="py-3 px-1 border-b-2 border-transparent text-emerald-500 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> ATRT Terminal
                </button>
            </div>
        </header>
    );

    const MarketTicker = () => (
        <div className="bg-[#111] border-b border-[#333] py-3">
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 overflow-x-auto hide-scrollbar">
                {marketIndices.map((idx, i) => (
                    <div key={i} className="flex flex-col flex-shrink-0 cursor-pointer hover:bg-[#222] p-1 rounded">
                        <span className="text-xs text-blue-400 font-bold">{idx.name}</span>
                        <span className="text-sm text-white font-mono">{idx.value}</span>
                        <div className={`text-[10px] font-bold flex items-center gap-0.5 ${idx.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                            {idx.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {idx.change} ({idx.percent})
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-gray-200 font-sans">
            <Header />
            <MarketTicker />

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* =========================================================================
            VIEW 1: HOME (MEDIA PORTAL)
            ========================================================================= */}
                {currentView === 'home' && (
                    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">

                        {/* Main Content (Left) */}
                        <div className="lg:w-2/3 space-y-6">
                            {/* Promo Banner */}
                            <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-8 flex items-center justify-between cursor-pointer hover:border-gray-600 transition">
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-2">모든 데이터를 분석하기엔 너무 바쁜 당신.</h2>
                                    <p className="text-gray-400">아시아투데이의 AI 엔진이 내 종목의 숨겨진 악재를 개장 전에 알려드립니다.</p>
                                </div>
                                <button
                                    onClick={() => setCurrentView('portfolio')}
                                    className="bg-white text-black font-bold px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-gray-200"
                                >
                                    포트폴리오 등록하기
                                </button>
                            </div>

                            {/* Hero News */}
                            <div className="group cursor-pointer">
                                <div className="w-full h-80 bg-slate-800 rounded-xl overflow-hidden mb-4 relative">
                                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80" alt="Stock Market" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-20">
                                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-3 inline-block">Exclusive Data</span>
                                        <h1 className="text-3xl font-black text-white leading-tight mb-2 group-hover:underline decoration-emerald-500">{mainNews.title}</h1>
                                        <p className="text-sm text-gray-300 line-clamp-2">{mainNews.summary}</p>
                                        <div className="text-xs text-gray-500 mt-3">{mainNews.source} • {mainNews.time}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Trending Tickers */}
                            <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#333]">
                                <div className="flex items-center gap-2 mb-4">
                                    <Search className="w-4 h-4 text-gray-400" />
                                    <h3 className="font-bold text-white">Trending Tickers</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { sym: 'NVDA', name: 'NVIDIA Corp', price: '880.08', change: '-2.1%' },
                                        { sym: 'TSLA', name: 'Tesla Inc', price: '171.05', change: '+1.4%' },
                                        { sym: '005930.KS', name: 'Samsung Elec', price: '84,100', change: '+1.2%' },
                                        { sym: 'BTC-USD', name: 'Bitcoin', price: '68,450.00', change: '-1.5%' },
                                    ].map(t => (
                                        <div key={t.sym} className="flex justify-between items-center cursor-pointer hover:bg-[#222] p-2 -mx-2 rounded transition">
                                            <div>
                                                <div className="font-bold text-blue-400 text-sm">{t.sym}</div>
                                                <div className="text-[10px] text-gray-500">{t.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-sm text-white">{t.price}</div>
                                                <div className={`text-xs font-bold ${t.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{t.change}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Latest News List */}
                            <div>
                                <h3 className="font-bold text-white mb-4 border-b border-[#333] pb-2">Latest News</h3>
                                <div className="space-y-4">
                                    {sideNews.map((news, i) => (
                                        <div key={i} className="cursor-pointer group">
                                            <h4 className="text-sm font-bold text-gray-300 group-hover:text-emerald-400 leading-snug mb-1">{news.title}</h4>
                                            <div className="text-[10px] text-gray-500">{news.source} • {news.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* =========================================================================
            VIEW 2: MY PORTFOLIO (VALUE-ADD INTEGRATION)
            ========================================================================= */}
                {currentView === 'portfolio' && (
                    <div className="animate-in fade-in duration-500 max-w-5xl">
                        <h1 className="text-3xl font-black text-white mb-6">Create a Portfolio With Holdings</h1>

                        {/* Portfolio Creation Options (Mock) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] text-center hover:bg-[#222] cursor-pointer transition flex flex-col items-center">
                                <Upload className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Import CSV</h3>
                                <p className="text-sm text-gray-400 mb-6 px-4">Have things in a spreadsheet? Import your portfolio directly from your device.</p>
                                <button className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-black transition">Start Creating</button>
                            </div>
                            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] text-center hover:bg-[#222] cursor-pointer transition flex flex-col items-center">
                                <Plus className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Create Manually</h3>
                                <p className="text-sm text-gray-400 mb-6 px-4">Our enhanced portfolio version with support for Buy, Sell, and much more.</p>
                                <button className="border border-white text-white font-bold px-6 py-2 rounded-full hover:bg-white hover:text-black transition">Start Creating</button>
                            </div>
                        </div>

                        {/* Portfolio Tabs & Table */}
                        <div className="bg-[#111] rounded-t-xl border-b border-[#333] flex">
                            <button
                                className={`px-6 py-3 text-sm font-bold ${portfolioTab === 'holdings' ? 'bg-[#222] text-blue-400 border-t-2 border-blue-400' : 'text-gray-400 hover:bg-[#1a1a1a]'}`}
                                onClick={() => setPortfolioTab('holdings')}
                            >
                                My Portfolios
                            </button>
                            <button
                                className={`px-6 py-3 text-sm font-bold ${portfolioTab === 'watchlist' ? 'bg-[#222] text-blue-400 border-t-2 border-blue-400' : 'text-gray-400 hover:bg-[#1a1a1a]'}`}
                                onClick={() => setPortfolioTab('watchlist')}
                            >
                                My Holdings
                            </button>
                        </div>

                        <div className="bg-[#1a1a1a] border border-t-0 border-[#333] rounded-b-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#333] text-[11px] uppercase tracking-wider text-gray-500">
                                            <th className="p-4 font-bold">Symbol</th>
                                            <th className="p-4 font-bold text-right">Avg Cost</th>
                                            <th className="p-4 font-bold text-right">Price</th>
                                            <th className="p-4 font-bold text-right">Day Change</th>
                                            <th className="p-4 font-bold text-right">Total Return</th>
                                            <th className="p-4 font-bold text-center bg-gray-900/50 border-l border-[#333]">ATRT AI Analysis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myHoldings.map((stock, i) => (
                                            <tr key={i} className="border-b border-[#222] hover:bg-[#222] transition">
                                                <td className="p-4 font-bold text-blue-400 cursor-pointer">{stock.symbol}</td>
                                                <td className="p-4 text-right font-mono text-sm">{stock.avgCost}</td>
                                                <td className="p-4 text-right font-mono text-sm font-bold text-white">{stock.price}</td>
                                                <td className={`p-4 text-right font-mono text-sm font-bold ${stock.dayChange.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stock.dayChange}</td>
                                                <td className={`p-4 text-right font-mono text-sm font-bold ${stock.totalReturn.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stock.totalReturn}</td>
                                                <td className="p-4 border-l border-[#333] bg-gray-900/30 text-center">
                                                    {stock.risk === 'HIGH' ? (
                                                        <button
                                                            onClick={() => handleAnalyze(stock)}
                                                            className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-500 border border-red-600/50 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition animate-pulse"
                                                        >
                                                            <AlertTriangle className="w-3 h-3" /> 위험 감지 (분석)
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAnalyze(stock)}
                                                            className="inline-flex items-center gap-1.5 bg-[#333] text-gray-400 px-3 py-1 rounded-full text-xs font-bold hover:bg-[#444] transition"
                                                        >
                                                            <CheckCircle2 className="w-3 h-3" /> 상태 점검
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Teaser for Premium */}
                        <div className="mt-8 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                                    <Terminal className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">내 종목의 내일 아침 시세가 궁금하신가요?</h3>
                                    <p className="text-xs text-gray-400">아시아투데이 리스크 터미널(ATRT) 프리미엄으로 기관 수준의 백테스팅을 경험하세요.</p>
                                </div>
                            </div>
                            <button className="text-emerald-500 font-bold text-sm hover:text-emerald-400 flex items-center gap-1">
                                Learn more <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* =========================================================================
            VIEW 3 & 4: ATRT ANALYSIS & PAYWALL (THE MONETIZATION FUNNEL)
            ========================================================================= */}

                {/* Loading Overlay */}
                {isAnalyzing && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center font-mono backdrop-blur-sm">
                        <div className="text-emerald-500 text-sm mb-4">ATRT.Engine_v2.1 Scanning Portfolio...</div>
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-emerald-500" style={{ width: `${loadingProgress}%` }}></div>
                        </div>
                        <div className="text-white text-3xl font-black mb-8">{loadingProgress}%</div>
                        <div className="text-xs text-gray-500">Cross-referencing {selectedStock?.symbol} with US SEC Filings...</div>
                    </div>
                )}

                {/* Deep Dive Analysis & Paywall */}
                {(currentView === 'analysis' || currentView === 'paywall') && selectedStock && (
                    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-500">

                        <button onClick={() => setCurrentView('portfolio')} className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1">
                            &larr; Back to Portfolio
                        </button>

                        {/* Alert Header */}
                        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl relative mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold rounded uppercase">
                                    <Activity className="w-3 h-3" /> Risk Detected
                                </div>
                                <span className="text-[#666] font-mono text-[10px]">TICKER: {selectedStock.symbol}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">보유하신 {selectedStock.symbol}에<br />치명적인 악재 패턴이 감지되었습니다.</h2>
                            <p className="text-sm text-gray-400 mb-6">아시아투데이 온톨로지 엔진 분석 결과, 내일 장 개장 시 강한 매도 압력이 예상됩니다.</p>

                            <div className="p-4 bg-[#111] border border-[#222] rounded-lg flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">예상 손실액 (1천만원 기준)</div>
                                    <div className="text-2xl font-black text-red-500 font-mono">-1,240,000 KRW</div>
                                </div>
                                <TrendingDown className="w-8 h-8 text-red-500 opacity-50" />
                            </div>
                        </div>

                        {/* Blured Premium Content (Paywall Hook) */}
                        <div className="border border-[#222] bg-[#0a0a0a] rounded-xl relative overflow-hidden group mb-8">
                            <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#111]">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Lock className="w-4 h-4 text-emerald-500" /> AI 대응 시나리오 및 기관 수급 예측
                                </div>
                            </div>

                            <div className="relative p-6 bg-[#050505] h-64">
                                {/* Blurred Fake Content */}
                                <div className="absolute inset-0 filter blur-[6px] opacity-40 p-6 pointer-events-none">
                                    <div className="w-3/4 h-4 bg-gray-700 rounded mb-4"></div>
                                    <div className="w-full h-24 bg-gray-800 rounded mb-4"></div>
                                    <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                                </div>

                                {/* Paywall Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-sm p-6 text-center">
                                    <div className="bg-emerald-500/20 p-3 rounded-full mb-4 border border-emerald-500/30">
                                        <Fingerprint className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">이 정보를 보려면 ATRT 프리미엄이 필요합니다</h3>
                                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                                        야후 파이낸스의 기본 시세로는 내 계좌를 지킬 수 없습니다.<br />
                                        월 9,900원으로 기관 수준의 손실 방어 시뮬레이터와 내일 아침 매도 타점을 확인하세요.
                                    </p>

                                    <button
                                        onClick={() => alert("결제 완료! (로깅됨). 이제 블러가 해제되고 시뮬레이터가 작동합니다.")}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
                                    >
                                        <Lock className="w-4 h-4" /> 7일 무료로 잠금 해제하기
                                    </button>
                                    <p className="text-[10px] text-gray-500 mt-4">결제 후 7일 내 해지 시 요금 청구 안됨.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default App;