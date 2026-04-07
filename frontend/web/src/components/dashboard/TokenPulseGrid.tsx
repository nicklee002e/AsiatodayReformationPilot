import React from 'react';
import Link from 'next/link';
import { DUMMY_PULSE_TOKENS, DUMMY_US_STOCKS, DUMMY_FUTURES, DUMMY_CRYPTO } from '@/lib/mockData';

const GRID_SECTIONS = [
  {
    title: "Korean Stock Pulse Grid",
    count: "1,124 stocks",
    tokens: DUMMY_PULSE_TOKENS
  },
  {
    title: "US Stock Pulse Grid",
    count: "4,521 stocks",
    tokens: DUMMY_US_STOCKS
  },
  {
    title: "US Futures & Options Pulse Grid",
    count: "384 instruments",
    tokens: DUMMY_FUTURES
  },
  {
    title: "Crypto Pulse Grid",
    count: "12,481 pairs",
    tokens: DUMMY_CRYPTO
  }
];

export default function TokenPulseGrid() {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {GRID_SECTIONS.map((section, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 rounded bg-blue-500 mr-2"></span>
                {section.title}
              </h2>
              <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded font-semibold">{section.count}</span>
            </div>
            
            <div className="flex bg-slate-900 rounded p-1 text-xs border border-slate-700/50">
              <button className="bg-blue-600 text-white px-3 py-1 rounded font-semibold shadow">ALL</button>
              <button className="text-slate-400 font-semibold px-3 py-1 hover:text-slate-200 transition-colors">STABLE</button>
              <button className="text-slate-400 font-semibold px-3 py-1 hover:text-slate-200 transition-colors">NEGATIVE</button>
              <button className="text-slate-400 font-semibold px-3 py-1 hover:text-slate-200 transition-colors">DISTRESSED</button>
              <button className="text-slate-400 font-semibold px-3 py-1 hover:text-slate-200 transition-colors">DEFAULT</button>
              <button className="text-slate-400 font-semibold px-3 py-1 hover:text-slate-200 transition-colors">ST (7)</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {section.tokens.map(token => (
              <Link href={`/ticker/${token.symbol}`} key={token.id} className="block">
                <div className="bg-slate-800/60 hover:bg-slate-800 transition-all cursor-pointer backdrop-blur border border-slate-700 hover:border-slate-500 rounded-lg p-3 flex flex-col gap-2 relative group overflow-hidden">
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-blue-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>

                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs font-bold text-slate-200 tracking-wide">{token.pair}</span>
                    <span className="text-[10px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded border border-slate-700">{token.flag}</span>
                  </div>
                  
                  {/* Mock Chart Area */}
                  <div className="flex items-end h-8 gap-0.5 z-10">
                    {/* Generate random mock bars */}
                    {[...Array(8)].map((_, i) => {
                      const height = token.status === 'NEGATIVE' 
                        ? Math.random() * 60 + 20 
                        : Math.random() * 40 + 60;
                      
                      const color = token.status === 'NEGATIVE' 
                        ? (i > 4 ? 'bg-orange-500' : 'bg-blue-500')
                        : 'bg-emerald-500';
                        
                      return (
                        <div key={i} style={{ height: `${height}%` }} className={`w-full rounded-sm opacity-80 ${color}`}></div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-end mt-1 z-10">
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-bold text-emerald-400`}>{token.condition}</span>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${token.status === 'STABLE' ? 'bg-emerald-400' : 'bg-orange-400 animate-pulse'}`}></div>
                        <span className={`text-[9px] font-bold ${token.status === 'STABLE' ? 'text-emerald-500/80' : 'text-orange-400'} tracking-widest`}>
                          {token.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {token.status === 'STABLE' ? (
                        <span className="text-emerald-500 text-xs mr-1 mt-0.5">⬆</span>
                      ) : (
                        <span className="text-orange-500 text-xs mr-1 mt-0.5">⬇</span>
                      )}
                      <span className="text-sm font-bold text-slate-300">{token.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
