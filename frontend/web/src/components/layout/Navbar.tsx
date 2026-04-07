import React from 'react';
import { Search, Info, Layers, Database, Droplets, LayoutDashboard, MoreHorizontal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900 text-slate-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-red-500/10 text-red-500 px-3 py-1 rounded text-xs font-semibold">
          <Info className="w-4 h-4 mr-2" />
          Watch Bulletin
        </div>
        <div className="h-6 w-px bg-slate-700 mx-2"></div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center">
          <span className="text-red-500 mr-2">▶</span> Asia Today Watch
          <span className="text-slate-500 text-sm ml-2 font-normal">Bulletin</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        <button className="flex items-center hover:text-white transition-colors">
          <Search className="w-4 h-4 mr-2" /> Search
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <LayoutDashboard className="w-4 h-4 mr-2" /> Intelligence
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <Database className="w-4 h-4 mr-2" /> The Mine
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <Droplets className="w-4 h-4 mr-2" /> Pools <span className="ml-1 text-xs bg-red-500/20 text-red-400 px-1 rounded">NEW</span>
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <Layers className="w-4 h-4 mr-2" /> Watchrunner <span className="ml-1 text-xs bg-purple-500/20 text-purple-400 px-1 rounded">HOT</span>
        </button>
        <button className="flex items-center hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4 mr-2" /> More
        </button>
      </div>
    </nav>
  );
}
