import React from 'react';
import { Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings } from 'lucide-react';

const Navigation = () => {
  const icons = [Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings];
  
  return (
    <div className="flex items-center space-x-2 px-4 py-2 border-b border-slate-50 bg-white">
      {icons.map((Icon, idx) => (
        <button 
          key={idx} 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};

export default Navigation;
