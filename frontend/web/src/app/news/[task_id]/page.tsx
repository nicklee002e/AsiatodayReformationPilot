"use client";
import React, { useEffect, useState, use } from 'react';
import { ArrowLeft, TrendingUp, Zap, Link as LinkIcon, BarChart3, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DartEvent } from '@/lib/mockData';

// Generates fake 30-day stock data
const generateMockChartData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const change = (Math.random() - 0.45) * (basePrice * 0.04);
    currentPrice += change;
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      price: Math.round(currentPrice)
    });
  }
  return data;
};

interface ConnectedEntity {
  name: string;
  relation: string;
  impact_desc: string;
}

// Generates fake current prices for related entities
const generateFakePriceMap = (entities: ConnectedEntity[]) => {
  const map: Record<string, number> = {};
  entities.forEach(ent => {
    map[ent.name] = Math.floor(Math.random() * 80000) + 20000;
  });
  return map;
};

interface EPSData {
  date: string;
  quarter: string;
  time: string;
  actual: string;
  estimate: string;
  prev: string;
}

// Generates fake EPS history
const generateMockEPS = (): EPSData[] => {
  return [
    { date: "2026-05-20", quarter: "FY2027Q1", time: "PM", actual: "-", estimate: "1.77", prev: "0.96" },
    { date: "2026-02-25", quarter: "FY2026Q4", time: "PM", actual: "1.62", estimate: "1.51", prev: "0.89" },
    { date: "2025-11-19", quarter: "FY2026Q3", time: "PM", actual: "1.30", estimate: "1.20", prev: "0.81" },
    { date: "2025-08-27", quarter: "FY2026Q2", time: "PM", actual: "1.04", estimate: "1.00", prev: "0.68" },
    { date: "2025-05-28", quarter: "FY2026Q1", time: "PM", actual: "0.96", estimate: "0.93", prev: "0.61" }
  ];
};

interface FundamentalData {
  label1: string;
  val1: string;
  type1: 'positive' | 'negative' | 'neutral';
  label2: string;
  val2: string;
  type2: 'positive' | 'negative' | 'neutral';
}

// Generates fake Financial Fundamentals
const generateMockFundamentals = (): FundamentalData[] => {
  return [
    { label1: "자산 (Assets)", val1: "USD 206.8B", type1: "neutral", label2: "현금 및 동등한", val2: "USD 10.61B", type2: "neutral"},
    { label1: "매출원가", val1: "USD 16.86B", type1: "negative", label2: "유동 자산", val2: "USD 125.61B", type2: "neutral"},
    { label1: "유동 부채", val1: "USD 32.16B", type1: "negative", label2: "부채 (Liabilities)", val2: "USD 10.48B", type2: "neutral"},
    { label1: "배당 수익률", val1: "0.02", type1: "neutral", label2: "EBIT", val2: "USD 44.48B", type2: "positive"},
    { label1: "EBITDA", val1: "USD 46.92B", type1: "positive", label2: "직원 수", val2: "36K", type2: "neutral"},
    { label1: "주당 EPS 실적", val1: "USD 1.75", type1: "positive", label2: "자기 자본", val2: "USD 157.29B", type2: "neutral"},
    { label1: "이자 수익", val1: "USD 624M", type1: "neutral", label2: "대출 자본", val2: "USD 7.47B", type2: "negative"},
    { label1: "시가 총액", val1: "USD 4312.94B", type1: "negative", label2: "영업 이익", val2: "USD 44.48B", type2: "positive"},
    { label1: "운영 비용", val1: "USD 23.65B", type1: "negative", label2: "P/E 가격", val2: "39.02", type2: "neutral"}
  ];
};

export default function NewsDetailPage(props: { params: Promise<{ task_id: string }> }) {
  const params = use(props.params);
  const { task_id } = params;
  
  const [eventData, setEventData] = useState<DartEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{date: string, price: number}[]>([]);
  const [relatedPrices, setRelatedPrices] = useState<Record<string, number>>({});
  const [basePrice, setBasePrice] = useState(0);
  const [epsData, setEpsData] = useState<EPSData[]>([]);
  const [fundamentalsData, setFundamentalsData] = useState<FundamentalData[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        let data = null;
        try {
          const response = await fetch(`http://127.0.0.1:8000/manager/events/${task_id}`);
          if (response.ok) {
            data = await response.json();
          }
        } catch (e) {
          console.warn("Backend fetch failed, checking mock data...", e);
        }

        if (!data) {
          // Fallback to mockDetectList for UI demonstration of test items
          const { mockDetectList } = await import('@/lib/mockData');
          data = mockDetectList.find(ev => ev.task_id === task_id) || null;
        }

        if (data) {
          setEventData(data as DartEvent);
          
          // Generate mock chart for Primary Entity
          const mockBase = Math.floor(Math.random() * 150000) + 50000;
          setBasePrice(mockBase);
          setChartData(generateMockChartData(mockBase));
          
          // Generate mock prices for connected entities
          if (data.context?.ontology_result?.connected_entities) {
             setRelatedPrices(generateFakePriceMap(data.context.ontology_result.connected_entities));
          }
          
          setEpsData(generateMockEPS());
          setFundamentalsData(generateMockFundamentals());
        }
      } catch (error) {
        console.error('Failed to fetch event detail', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [task_id]);

  if (loading) {
    return <div className="p-8 text-slate-400 text-center animate-pulse mt-20 font-bold tracking-widest uppercase">Fetching Neural Matrix...</div>;
  }

  if (!eventData) {
    return (
        <div className="p-8 text-center mt-20 max-w-lg mx-auto">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-200 mb-2">Event Not Found</h3>
                <p className="text-slate-400 text-sm mb-6">The specified event ID was not found or the connection to the backend was lost.</p>
                <Link href="/" className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-lg transition-colors font-semibold text-sm">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
  }

  const { context, company_name } = eventData;
  const primaryEntity = context?.ontology_result?.primary_entity?.name || company_name || 'Asset';
  const connectedEntities = context?.ontology_result?.connected_entities || [];
  
  let articleDraftParsed = null;
  if (context?.article_draft) {
    try {
      articleDraftParsed = JSON.parse(context.article_draft);
    } catch {
      articleDraftParsed = { headline: "Autogenerated Raw Report", body: context.article_draft };
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-500 min-h-screen">
      
      {/* Header & Back Nav */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors font-semibold group bg-slate-900/50 px-5 py-2.5 rounded-full border border-slate-800 shadow-sm self-start">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="flex gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-md text-xs font-bold font-mono tracking-wider shadow-inner">
            TASK: {task_id.substring(0,16)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column: Chart & Article */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Primary Entity Chart Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative group hover:border-indigo-500/30 transition-colors duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6 align-top">
                <div>
                  <h1 className="text-3xl font-black text-slate-100 mb-2 flex items-center gap-3">
                    {primaryEntity} 
                    <span className="flex h-2 w-2 relative ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h1>
                  <p className="text-sm text-slate-400 flex flex-wrap gap-2 items-center">
                      <span className="px-2.5 py-0.5 bg-slate-800 text-xs font-medium rounded border border-slate-700">1M Forecast Trend</span>
                      <span className="px-2.5 py-0.5 bg-slate-800 text-xs font-medium rounded border border-slate-700 flex gap-1 items-center"><BarChart3 className="w-3 h-3" /> Volume Spike Detected</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-bold text-slate-100 drop-shadow-md">
                     ₩{chartData[chartData.length - 1]?.price?.toLocaleString() || basePrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-emerald-400 font-bold flex items-center justify-end gap-1 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-flex">
                    <TrendingUp className="w-4 h-4" />
                    +{(Math.random() * 8 + 1).toFixed(1)}% Since Detection
                  </div>
                </div>
              </div>
              
              <div className="h-[320px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis domain={['dataMin - 5000', 'dataMax + 5000']} stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${Math.round(val/1000)}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }} 
                      itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                      cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#818cf8', stroke: '#0f172a', strokeWidth: 3 }} fill="url(#colorPrice)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* EPS History Segment */}
          {epsData.length > 0 && (
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 lg:p-8 relative shadow-xl">
               <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                 Earnings Per Share (EPS) History
               </h3>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-slate-400">
                   <thead className="text-xs text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800">
                     <tr>
                       <th className="px-4 py-3 font-semibold">Date</th>
                       <th className="px-4 py-3 font-semibold">Quarter</th>
                       <th className="px-4 py-3 font-semibold">Time</th>
                       <th className="px-4 py-3 font-semibold">Actual</th>
                       <th className="px-4 py-3 font-semibold">Estimate</th>
                       <th className="px-4 py-3 font-semibold">Previous</th>
                     </tr>
                   </thead>
                   <tbody>
                     {epsData.map((eps, idx) => (
                       <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                         <td className="px-4 py-3 font-medium text-slate-300">{eps.date}</td>
                         <td className="px-4 py-3 text-slate-400">{eps.quarter}</td>
                         <td className="px-4 py-3 text-slate-500">{eps.time}</td>
                         <td className={`px-4 py-3 font-mono font-bold ${eps.actual !== '-' ? 'text-indigo-400' : 'text-slate-500'}`}>{eps.actual}</td>
                         <td className="px-4 py-3 font-mono text-slate-400">{eps.estimate}</td>
                         <td className="px-4 py-3 font-mono text-slate-500">{eps.prev}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {/* Financial Fundamentals Grid */}
          {fundamentalsData.length > 0 && (
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 lg:p-8 relative shadow-xl">
               <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                 Financial Fundamentals Overview
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                 {fundamentalsData.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {/* Column 1 */}
                      <div className="flex justify-between items-center py-2 border-b border-slate-800/50 group hover:bg-slate-800/20 px-2 -mx-2 rounded transition-colors">
                         <span className="text-slate-400 text-sm font-medium">{item.label1}</span>
                         <span className={`text-sm font-mono font-bold ${item.type1 === 'positive' ? 'text-emerald-400' : item.type1 === 'negative' ? 'text-red-400/90' : 'text-slate-300'}`}>
                           {item.val1}
                         </span>
                      </div>
                      {/* Column 2 */}
                      <div className="flex justify-between items-center py-2 border-b border-slate-800/50 group hover:bg-slate-800/20 px-2 -mx-2 rounded transition-colors">
                         <span className="text-slate-400 text-sm font-medium">{item.label2}</span>
                         <span className={`text-sm font-mono font-bold ${item.type2 === 'positive' ? 'text-emerald-400' : item.type2 === 'negative' ? 'text-red-400/90' : 'text-slate-300'}`}>
                           {item.val2}
                         </span>
                      </div>
                    </React.Fragment>
                 ))}
               </div>
            </div>
          )}

          {/* Article Draft Section */}
          {articleDraftParsed ? (
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-5 mr-8">
                <Zap className="w-56 h-56 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-5">
                  <span className="p-1.5 bg-indigo-500/10 rounded border border-indigo-500/30">
                     <Zap className="w-4 h-4 fill-indigo-400" />
                  </span>
                  AI Generated Intelligence
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-50 leading-tight mb-5 tracking-tight drop-shadow-sm">
                  {articleDraftParsed.headline}
                </h2>
                {articleDraftParsed.sub_headline && articleDraftParsed.sub_headline.length > 0 && (
                  <ul className="mb-8 space-y-2.5 bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
                    {articleDraftParsed.sub_headline.map((sub: string, idx: number) => (
                       <li key={idx} className="text-slate-300 font-semibold text-lg flex items-start gap-3">
                         <span className="text-indigo-400 mt-1 pb-1 font-bold text-xl leading-none">·</span>
                         <span className="leading-snug">{sub}</span>
                       </li>
                    ))}
                  </ul>
                )}
                
                <div className="prose prose-invert prose-indigo max-w-none prose-p:text-slate-300 prose-p:text-lg prose-p:leading-loose prose-p:tracking-wide">
                  {articleDraftParsed.body.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-6 first-letter:text-4xl first-letter:font-bold first-letter:text-indigo-400 first-letter:mr-1 first-letter:float-left">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 text-center text-slate-500 font-medium">
               Waiting for AI intelligence generation...
            </div>
          )}

        </div>

        {/* Sidebar Column: Connected Entities Ontology */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl sticky top-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-5">
                <h3 className="text-xl font-extrabold text-slate-100 flex items-center gap-2.5 tracking-tight">
                <div className="p-1.5 bg-indigo-500/20 rounded-md border border-indigo-500/30">
                    <LinkIcon className="w-5 h-5 text-indigo-400" />
                </div>
                Supply Chain Nexus
                </h3>
                <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 rounded">Ontology Map</span>
            </div>
            
            <div className="space-y-4">
              {connectedEntities.length > 0 ? (
                connectedEntities.map((ent: ConnectedEntity, idx: number) => (
                  <div key={idx} className="group flex flex-col p-4 bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-indigo-500/40 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]">
                    <div className="flex justify-between items-center mb-3">
                       <span className="font-extrabold text-slate-100 text-[17px] tracking-tight">{ent.name}</span>
                       <span className="text-sm font-mono font-bold text-emerald-400/90 drop-shadow-sm">₩{(relatedPrices[ent.name] || generateFakePriceMap([ent])[ent.name]).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-500/20 transition-colors">
                         {ent.relation}
                       </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                       {ent.impact_desc}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-slate-950/40 rounded-xl border border-slate-800/60 border-dashed text-slate-500 text-sm">
                   <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
                   No connected entities found in ontology mapping.
                </div>
              )}
            </div>
            
            {/* Added details for the Ontology Insight if applicable */}
            {context?.ontology_result?.ontology_evolution && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500/80 mb-3 block">Evolution Log / Schema Growth</span>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                   {context.ontology_result.ontology_evolution.map((evo: string, i: number) => (
                       <p key={i} className="text-xs text-emerald-100/70 mb-2 last:mb-0 leading-relaxed">{evo}</p>
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
