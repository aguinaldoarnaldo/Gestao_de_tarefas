import React from 'react';
import TeamMembers from './components/TeamMembers';
import Settings from './components/Settings';
import Project from './components/Project';
import CalendarView from './components/CalendarView';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 p-8 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      `}</style>

      {/* Grid 2x2 com todas as telas */}
      <div className="grid grid-cols-2 gap-6 max-w-[1800px] mx-auto">
        {/* Team Members - Top Left */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <TeamMembers />
        </div>

        {/* Settings - Top Right */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <Settings />
        </div>

        {/* Project - Bottom Left */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <Project />
        </div>

        {/* Calendar - Bottom Right */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default App;