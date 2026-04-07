"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { mockDetectList, DUMMY_TRACKING_LIST, DUMMY_WE_CALLED_IT, DartEvent } from '@/lib/mockData';

export default function MonitoringPanels() {
  const [dartEvents, setDartEvents] = useState<DartEvent[]>(mockDetectList);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/manager/events/latest');
        if (response.ok) {
          const data = await response.json();
          if (data.events && data.events.length > 0) {
            // Remove duplicates by task_id
            const uniqueEvents = data.events.filter((v: DartEvent, i: number, a: DartEvent[]) => a.findIndex(t => t.task_id === v.task_id) === i);
            setDartEvents(uniqueEvents);
          }
        }
      } catch (error) {
        console.error('Failed to fetch events, using mock/cache...', error);
      }
    };

    fetchLatestEvents();
    const intervalId = setInterval(fetchLatestEvents, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const renderArticleDraft = (draftString?: string | null) => {
    if (!draftString) return null;
    try {
      const draft = JSON.parse(draftString);
      return (
        <div className="mt-3 p-2.5 bg-slate-950/50 border border-indigo-500/40 rounded shadow-inner animate-in fade-in slide-in-from-top-1 duration-700">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-indigo-400">
            <Zap className="w-3.5 h-3.5 fill-indigo-400/20" />
            <span>Gemini Draft (Auto-generated)</span>
          </div>
          <p className="text-sm font-semibold text-slate-200 leading-snug">{draft.headline}</p>
          {draft.body && (
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{draft.body}</p>
          )}
        </div>
      );
    } catch {
      return (
        <div className="mt-3 p-2 bg-slate-800/40 border border-slate-700/50 rounded text-xs text-slate-400">
          <span className="opacity-70">{draftString.substring(0, 100)}...</span>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
      
      {/* Column 1: DART Detection */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-lg p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/50">
          <div className="flex items-center text-sm font-bold text-slate-200 uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-500 animate-pulse" />
            GLOBAL DETECTION (DART / SEC)
          </div>
          <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-semibold">2 events</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          {dartEvents.map((alert, idx) => (
            <Link href={`/news/${alert.task_id}`} key={alert.task_id || idx} className="block transition-transform hover:-translate-y-0.5">
              <div className="bg-slate-900 border border-slate-800 rounded p-3 text-sm flex flex-col transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <AlertTriangle className={`w-4 h-4 mr-2 ${alert.event_type === 'EARNINGS_SURPRISE' ? 'text-green-500' : 'text-amber-500'}`} />
                  <span className="font-bold text-slate-200 flex items-baseline gap-1">
                    {alert.company_name}
                    <span className="text-[10px] text-slate-500">{alert.company_code}</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase">{alert.status}</span>
              </div>
              <div className="flex justify-between mt-2 pl-6 items-center">
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center animate-pulse ${
                    alert.event_type === 'EARNINGS_SURPRISE' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {alert.event_type}
                  </span>
                </div>
                {alert.context.factcheck_passed && (
                  <span className="text-[10px] text-blue-400 font-semibold border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded">FactChecked</span>
                )}
              </div>
              {renderArticleDraft(alert.context?.article_draft)}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Column 2: Tracking */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-lg p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/50">
          <div className="flex items-center text-sm font-bold text-slate-200 uppercase tracking-widest">
            <Zap className="w-4 h-4 mr-2 text-orange-500" />
            Tracking
          </div>
          <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-semibold">Priority 72 alarms</span>
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          {DUMMY_TRACKING_LIST.map(alert => (
            <div key={alert.id} className="bg-slate-900 border border-slate-800 rounded p-2 text-xs flex justify-between items-center group hover:bg-slate-800/80 transition-colors">
               <div className="flex items-center gap-3">
                 <span className="text-orange-500 font-mono">THRESHOLD</span>
                 <span className="font-bold text-slate-300 w-12">{alert.pair}</span>
                 <span className="text-slate-400 truncate w-40">{alert.note}</span>
               </div>
               <span className="text-slate-600 group-hover:text-slate-400 transition-colors">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: We Called It */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-lg p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/50">
          <div className="flex items-center text-sm font-bold text-slate-200 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4 mr-2 text-pink-500" />
            We Called It
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">66 confirmed</span>
        </div>
        
        <div className="flex flex-col items-center justify-center my-4 bg-slate-900/50 p-4 rounded-lg border border-emerald-900/30">
           <span className="text-4xl font-black text-emerald-500">64.5%</span>
           <span className="text-xs text-slate-400 mt-1">Avg win rate on ST/Default warnings</span>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          {DUMMY_WE_CALLED_IT.map(alert => (
            <div key={alert.id} className="flex justify-between items-center text-xs border-b border-slate-800 pb-2 last:border-0 hover:bg-slate-800/30 p-1 rounded transition-colors">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                 <span className="font-bold text-slate-300 w-16">{alert.pair}</span>
                 <span className="text-slate-500 truncate w-32">{alert.note}</span>
               </div>
               <span className="text-slate-600">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
