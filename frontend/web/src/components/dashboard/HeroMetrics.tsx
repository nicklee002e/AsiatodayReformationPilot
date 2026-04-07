import React from 'react';
import { Search } from 'lucide-react';
import { DUMMY_METRICS } from '@/lib/mockData';

export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-4 mt-4 bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
      {/* Search Bar */}
      <div className="relative w-full max-w-3xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search token - Priority Pool + all CrtisBoard" 
          className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500"
        />
      </div>

      {/* Metrics Row */}
      <div className="flex items-center mt-5 mb-2">
        <span className="text-sm font-medium text-slate-300 tracking-wide leading-relaxed">
          KRX, KOSDAQ, NYSE, NASDAQ, CBOE, MIAX, MEMX, IEX, LTSE, and US Options, US Futures, and many Crypto Exchanges
        </span>
      </div>

      {/* Progress Bar Label */}
      <div className="mt-2 text-xs text-slate-400 font-medium tracking-wide">
        <span className="text-cyan-400 font-semibold">Priority Pool</span> {DUMMY_METRICS.priorityPool} tokens registered
      </div>

      {/* Status Progress Bar */}
      <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-900">
        <div style={{ width: '85%' }} className="bg-emerald-500"></div>
        <div style={{ width: '13%' }} className="bg-amber-400"></div>
        <div style={{ width: '1.5%' }} className="bg-red-500"></div>
        <div style={{ width: '0.5%' }} className="bg-slate-500"></div>
      </div>

      {/* Status Legend */}
      <div className="flex gap-4 text-xs font-semibold mt-1">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> <span className="text-slate-300">{DUMMY_METRICS.rates.stable} STABLE</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> <span className="text-slate-300">{DUMMY_METRICS.rates.negative} NEGATIVE</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> <span className="text-slate-300">{DUMMY_METRICS.rates.distressed} DISTRESSED</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> <span className="text-slate-300">{DUMMY_METRICS.rates.default} DEFAULT</span></div>
      </div>
    </div>
  );
}
