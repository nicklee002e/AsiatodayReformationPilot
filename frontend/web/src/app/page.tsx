import Navbar from '@/components/layout/Navbar';
import HeroMetrics from '@/components/dashboard/HeroMetrics';
import MonitoringPanels from '@/components/dashboard/MonitoringPanels';
import TokenPulseGrid from '@/components/dashboard/TokenPulseGrid';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 border-x border-slate-800 mx-auto w-full max-w-screen-2xl shadow-2xl">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
        
        {/* Header Region */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 font-black text-xl">▶</span>
          <h1 className="text-xl font-bold tracking-tight text-white">Asia Today Watch Bulletin</h1>
          <span className="text-xs ml-2 bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-800/50">Watch Intelligence</span>
        </div>

        {/* 2. Top Summary Metrics */}
        <HeroMetrics />

        {/* 3. 3-Column Monitoring Panels */}
        <MonitoringPanels />

        {/* 4. Token Pulse Grid */}
        <TokenPulseGrid />
        
      </main>
    </div>
  );
}
