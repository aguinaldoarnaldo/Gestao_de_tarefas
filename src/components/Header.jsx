import React from 'react';
import { Search, User, Plus } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="font-bold text-lg text-slate-800">AgileFlow</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search"
            className="pl-7 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-400 outline-none text-xs w-32"
          />
        </div>
        <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <User size={14} className="text-slate-600" />
        </button>
        <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <Plus size={14} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
