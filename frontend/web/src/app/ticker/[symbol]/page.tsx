'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Extract param with React.use() wrapper inside Next.js 14/15 client components correctly
export default function TickerPage({ params }: { params: { symbol: string } }) {
  // Decode symbol (e.g. from 005930.KS or NVDA)
  const symbol = decodeURIComponent(params.symbol);
  
  // Generating a rich mock chart data series
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = [];
    let currentPrice = 175.85;
    for (let i = 0; i < 40; i++) {
       currentPrice = currentPrice + (Math.random() - 0.45) * 5;
       data.push({
         time: `10:${i < 10 ? '0'+i : i} AM`,
         price: Number(currentPrice.toFixed(2))
       });
    }
    setChartData(data);
  }, [symbol]);

  // Yahoo Finance Layout Mock Data
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 174.83;
  const previousClose = 177.64;
  const isUp = currentPrice >= previousClose;
  const diff = currentPrice - previousClose;
  const percentDiff = (diff / previousClose) * 100;

  // Mock News Data linking to our existing route
  const mockNews = [
    { title: "Tech valuations settle down, offering new opportunity for investors", src: "Yahoo Finance Video", time: "31m ago", task_id: "test_dart_001" },
    { title: "Big Tech stocks suddenly look cheap", src: "Yahoo Finance", time: "3h ago", task_id: "us_news_nvidia_1" },
    { title: "Consumer hardware trade in danger as Iran war triggers memory chip pricing...", src: "Yahoo Finance", time: "23h ago", task_id: "test_dart_002" },
    { title: "Nvidia Risks Breaking Winning Streak; Is Nvidia A Buy Or Sell Now?", src: "Investor's Business Daily", time: "55m ago", task_id: "us_news_nvidia_1" },
    { title: "Broadcom Stock Jumps on Google, Anthropic AI Chip Deals", src: "GuruFocus.com", time: "47m ago", task_id: "us_news_claude_1" },
    { title: "10 High-Yield Dividend Stocks for March", src: "Seeking Alpha", time: "2h ago", task_id: "test_dart_001" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0f1115] text-slate-200 font-sans mx-auto w-full max-w-screen-2xl shadow-2xl pb-20">
      <Navbar />

      <main className="flex-1 flex flex-col p-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Breadcrumb / Ticker Header */}
        <div className="flex flex-col gap-1 mb-6 mt-4">
          <div className="text-sm font-semibold text-slate-400">
            NasdaqGS - Nasdaq Real Time Price • USD
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
              {symbol} Corporation ({symbol})
              <span className="ml-2 text-slate-500 hover:text-yellow-400 cursor-pointer pt-1">☆</span>
            </h1>
            <div className="ml-auto flex items-center gap-2 bg-blue-900/40 border border-blue-800/50 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300">
              <span className="text-blue-500 animate-pulse">●</span> Time to buy {symbol}?
            </div>
          </div>
          
          {/* Price Header */}
          <div className="flex items-end gap-3 mt-1">
            <span className="text-4xl font-black">{currentPrice.toFixed(2)}</span>
            <span className={`text-xl font-bold pb-0.5 ${isUp ? 'text-[#00c805]' : 'text-[#ff333a]'}`}>
              {diff > 0 ? '+' : ''}{diff.toFixed(2)} ({percentDiff > 0 ? '+' : ''}{percentDiff.toFixed(2)}%)
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            As of 10:31:11 AM EDT. Market Open.
          </div>
        </div>

        {/* Top Interactive Area (Chart & Key Events) */}
        <div className="bg-[#1a1c23] border border-slate-700/50 rounded-xl p-4 flex flex-col mb-6 relative">
           {/* Chart Header Tools */}
           <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-400 border-b border-slate-700/50 pb-3">
              <div className="flex gap-4">
                <button className="text-blue-400 border-b-2 border-blue-400 pb-3 -mb-3">1D</button>
                <button className="hover:text-slate-200">5D</button>
                <button className="hover:text-slate-200">1M</button>
                <button className="hover:text-slate-200">6M</button>
                <button className="hover:text-slate-200">YTD</button>
                <button className="hover:text-slate-200">1Y</button>
                <button className="hover:text-slate-200">5Y</button>
                <button className="hover:text-slate-200">Max</button>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                  <span className="text-slate-200">Key Events</span>
                </label>
              </div>
           </div>

           {/* Recharts Chart */}
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={10} />
                  <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={10} axisLine={false} tickLine={false} orientation="right" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: isUp ? '#00c805' : '#ff333a' }}
                  />
                  <ReferenceLine y={previousClose} stroke="#475569" strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={isUp ? "#00c805" : "#ff333a"} 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-sm mb-10 pb-6 border-b border-slate-700/50">
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Previous Close</span>
            <span className="font-bold">{previousClose.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Day's Range</span>
            <span className="font-bold">174.40 - 176.99</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Market Cap</span>
            <span className="font-bold">4.262T</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Earnings Date</span>
            <span className="font-bold">May 20, 2026</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Open</span>
            <span className="font-bold">175.65</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">52 Week Range</span>
            <span className="font-bold">94.46 - 212.19</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Beta (5Y)</span>
            <span className="font-bold">2.34</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Forward Div</span>
            <span className="font-bold">0.04 (0.02%)</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Volume</span>
            <span className="font-bold">31,481,879</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">PE Ratio (TTM)</span>
            <span className="font-bold">35.70</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">EPS (TTM)</span>
            <span className="font-bold">4.90</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-400">Ex-Dividend</span>
            <span className="font-bold">Mar 11, 2026</span>
          </div>
        </div>

        {/* Ad Banner Placeholder */}
        <div className="w-full bg-[#fdeecf] h-24 mb-10 rounded-lg flex items-center justify-center text-[#ff6600] font-black text-2xl shadow-inner border border-[#e6b800] overflow-hidden relative cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
           <span className="z-10 bg-black/10 px-4 py-1 rounded mix-blend-multiply">Creative Cloud - 25% Off Simulation</span>
        </div>

        {/* Recent News Section */}
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-2xl font-black text-white">Recent News: {symbol}</h2>
          <span className="text-sm font-bold text-blue-400 cursor-pointer hover:underline">View More →</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockNews.map((news, i) => (
            <Link key={i} href={`/news/${news.task_id}`} className="block">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/20 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all cursor-pointer group">
                {/* Text Content */}
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold">{news.src} • {news.time}</p>
                </div>
                {/* Thumbnail Mock */}
                <div className="w-24 h-16 bg-slate-700 rounded-lg shrink-0 overflow-hidden relative border border-slate-600/50 group-hover:border-slate-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"></div>
                  <div className="absolute bottom-1 right-1 bg-black/60 px-1 rounded text-[8px] font-bold">IMAGE</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
