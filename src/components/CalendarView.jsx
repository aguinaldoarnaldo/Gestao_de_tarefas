import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';
import Navigation from './Navigation';

const calendarTasks = [
  { day: 3, type: 'deadline' },
  { day: 4, type: 'task' },
  { day: 5, type: 'deadline' },
  { day: 8, type: 'task' },
  { day: 9, type: 'deadline' },
  { day: 10, type: 'task', highlight: true },
  { day: 11, type: 'task' },
  { day: 15, type: 'task' },
  { day: 16, type: 'deadline' },
  { day: 17, type: 'task' },
  { day: 18, type: 'task' },
  { day: 19, type: 'deadline' },
  { day: 22, type: 'deadline' },
  { day: 23, type: 'task' },
  { day: 24, type: 'task' },
  { day: 25, type: 'task' },
  { day: 26, type: 'deadline' },
  { day: 31, type: 'deadline' },
];

const tasksList = [
  { id: 1, title: 'Implement User Authentication', comments: 12, priority: 'high' },
  { id: 2, title: 'Develop API Edition', comments: 5, priority: 'medium' },
  { id: 3, title: 'Fix Payment Gateway Issue', comments: 211, priority: 'high' },
  { id: 4, title: 'Initial Project Setup', comments: 4, priority: 'low' },
];

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2)); // March 2024
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="h-full flex flex-col">
      <Header />
      <Navigation />
      
      <div className="flex-1 p-4 overflow-auto flex gap-3 bg-gradient-to-br from-slate-50 to-amber-50">
        {/* Calendar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-800">Calendar</h2>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 bg-white rounded-lg text-[10px] font-medium text-slate-700 border border-slate-200">
                Monthly ▾
              </button>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  <ChevronLeft size={12} />
                </button>
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] font-semibold text-slate-600 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const hasTask = day && calendarTasks.find(t => t.day === day);
              const isHighlight = hasTask?.highlight;
              
              return (
                <div 
                  key={index}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] relative ${
                    day 
                      ? isHighlight
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-md'
                        : 'bg-white hover:bg-slate-50 border border-slate-100'
                      : ''
                  }`}
                >
                  {day && (
                    <>
                      <span>{day}</span>
                      {hasTask && !isHighlight && (
                        <div className="flex space-x-0.5 mt-0.5">
                          {hasTask.type === 'task' && (
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                          )}
                          {hasTask.type === 'deadline' && (
                            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks List */}
        <div className="w-40">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Tasks</h2>
          <div className="space-y-2">
            {tasksList.map((task) => (
              <div 
                key={task.id}
                className="p-2 bg-white rounded-lg border border-slate-100 hover:border-blue-300 transition-all"
              >
                <h3 className="font-medium text-slate-800 text-[10px] mb-1 leading-tight">{task.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-slate-500">
                  <span className="flex items-center space-x-0.5">
                    <span>💬</span>
                    <span>{task.comments}</span>
                  </span>
                  <span className={`px-1 py-0.5 rounded font-semibold ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
