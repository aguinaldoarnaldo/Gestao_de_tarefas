import React, { useState } from 'react';
import { 
  Users, Settings, Calendar, LayoutDashboard, Home, 
  Clock, BarChart3, LogOut, Plus, Search, User,
  Upload, Check, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const AgileFlowDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2)); // March 2024

  // Team Members Data
  const teamMembers = [
    { id: 1, name: 'Alera Martin', role: 'Developer', img: '👩‍💼', color: 'bg-blue-400' },
    { id: 2, name: 'Andreia Senah', role: 'Designer', img: '👩‍🎨', color: 'bg-pink-300' },
    { id: 3, name: 'John Smith', role: 'Designer', img: '👨‍💼', color: 'bg-orange-400' },
    { id: 4, name: 'Jasen Narsa', role: 'Developer', img: '👨‍💻', color: 'bg-gray-700' },
    { id: 5, name: 'Janas Barom', role: 'Developer', img: '👨‍🔧', color: 'bg-green-500' },
    { id: 6, name: 'Jasa Aramin', role: 'Designer', img: '👩‍🎨', color: 'bg-purple-500' },
    { id: 7, name: 'Tana Nasha', role: 'Designer', img: '👨‍💼', color: 'bg-blue-600' },
    { id: 8, name: 'Jean Halard', role: 'Designer', img: '👨‍💼', color: 'bg-gray-400' },
  ];

  // Project Tasks Data
  const projectTasks = {
    todo: [
      { id: 1, title: 'Implement Payment Gateway', priority: 'High', dueDate: '12', comments: 12, assignee: '👨‍💻' },
      { id: 2, title: 'Fix Payment Gateway Issue', priority: 'Low', dueDate: '2', comments: 2, assignee: '👩‍💼' },
      { id: 3, title: 'Develop API Bug Fix', dueDate: '1', assignee: '👨‍🔧' },
    ],
    inProgress: [
      { id: 4, title: 'Design New Dashboard UI', dueDate: '3', comments: 4, assignee: '👩‍🎨', priority: 'Medium' },
      { id: 5, title: 'Develop API Endpoints', dueDate: '8', assignee: '👨‍💻', priority: 'High' },
    ],
    review: [
      { id: 6, title: 'Develop New Project Synup', dueDate: '4', comments: 1, assignee: '👨‍💼', priority: 'Medium' },
      { id: 7, title: 'Develop API Endpoints', dueDate: '8', assignee: '👩‍💼' },
    ],
    done: [
      { id: 8, title: 'Implement User Authentication', priority: 'High', assignee: '👨‍💻' },
      { id: 9, title: 'Fix Payment Gateway Issue', priority: 'Medium', assignee: '👩‍🎨' },
    ],
  };

  // Calendar Data
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

  // Compact Sidebar for grid layout
  const CompactSidebar = () => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
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
        <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          <User size={14} className="text-slate-600" />
        </button>
        <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          <Plus size={14} className="text-slate-600" />
        </button>
      </div>
    </div>
  );

  // Compact Sidebar Navigation
  const CompactNav = ({ icons }) => (
    <div className="flex items-center space-x-2 px-4 py-2 border-b border-slate-50">
      {icons.map((Icon, idx) => (
        <button key={idx} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <Icon size={16} />
        </button>
      ))}
    </div>
  );

  // Team Members Screen - Compact Version
  const TeamMembersScreenCompact = () => (
    <div className="h-full flex flex-col">
      <CompactSidebar />
      <CompactNav icons={[Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings]} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Team Members</h2>
          <button className="px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all">
            Add Member
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-3 border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-xl ${member.color} flex items-center justify-center text-2xl mb-2 shadow-md`}>
                  {member.img}
                </div>
                <h3 className="font-semibold text-slate-800 text-xs text-center mb-0.5">{member.name}</h3>
                <p className="text-slate-500 text-[10px] mb-2">{member.role}</p>
                <button className="w-full py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-[10px] font-medium hover:shadow-md transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Screen - Compact Version
  const SettingsScreenCompact = () => (
    <div className="h-full flex flex-col">
      <CompactSidebar />
      <CompactNav icons={[Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings]} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-32 bg-slate-50 border-r border-slate-100 p-3">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Settings</h2>
          <div className="space-y-1">
            <SettingsMenuItem label="Account" active />
            <SettingsMenuItem label="Preferences" />
            <SettingsMenuItem label="Preferences" />
            <SettingsMenuItem label="Notifications" />
            <SettingsMenuItem label="Security" />
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Edit Profile</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="emailflow@gmail.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password Change</label>
              <input
                type="password"
                placeholder="Change or password"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Profile photo</label>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl">👩‍💼</span>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-all text-xs">
                  <Upload size={14} className="text-slate-500" />
                  <span className="text-slate-600 font-medium">Upload</span>
                </button>
              </div>
            </div>
            
            <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:shadow-md transition-all mt-4">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsMenuItem = ({ label, active }) => (
    <button className={`w-full text-left px-2 py-1.5 rounded-lg transition-all text-xs ${
      active 
        ? 'bg-white shadow-sm text-blue-600 font-semibold' 
        : 'text-slate-600 hover:bg-white/50'
    }`}>
      {label}
    </button>
  );

  // Project Screen - Compact Version
  const ProjectScreenCompact = () => (
    <div className="h-full flex flex-col">
      <CompactSidebar />
      <CompactNav icons={[Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings]} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-slate-50 rounded-lg p-3 mb-3">
          <h2 className="text-base font-bold text-slate-800">Project X</h2>
          <p className="text-slate-500 text-[10px] mt-0.5">Project Seminars &gt; Project X &gt; Labels &gt; Team</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <TaskColumnCompact title="To Do" count={3} tasks={projectTasks.todo} />
          <TaskColumnCompact title="In Progress" count={2} tasks={projectTasks.inProgress} />
          <TaskColumnCompact title="Review" count={2} tasks={projectTasks.review} />
          <TaskColumnCompact title="Done" count={2} tasks={projectTasks.done} />
        </div>
      </div>
    </div>
  );

  const TaskColumnCompact = ({ title, count, tasks }) => {
    const priorityColors = {
      High: 'bg-red-100 text-red-700',
      Medium: 'bg-orange-100 text-orange-700',
      Low: 'bg-green-100 text-green-700',
    };

    return (
      <div className="bg-slate-50 rounded-lg p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-700 text-xs flex items-center space-x-1">
            <span>{title}</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-full">{count}</span>
          </h3>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className="bg-white rounded-lg p-2 border border-slate-100 hover:border-blue-300 transition-all"
            >
              {task.priority && (
                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold mb-1 ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              )}
              <h4 className="font-medium text-slate-800 text-[10px] mb-1.5 leading-tight">
                {task.title}
              </h4>
              <div className="flex items-center justify-between text-[9px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  {task.dueDate && (
                    <span className="flex items-center space-x-0.5">
                      <Clock size={10} />
                      <span>{task.dueDate}</span>
                    </span>
                  )}
                  {task.comments && (
                    <span className="flex items-center space-x-0.5">
                      <span>💬</span>
                      <span>{task.comments}</span>
                    </span>
                  )}
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[10px]">
                  {task.assignee}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Calendar Screen - Compact Version
  const CalendarScreenCompact = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="h-full flex flex-col">
        <CompactSidebar />
        <CompactNav icons={[Home, LayoutDashboard, Users, Calendar, Clock, BarChart3, Settings]} />
        
        <div className="flex-1 p-4 overflow-auto flex gap-3">
          {/* Calendar */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-800">Calendar</h2>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-medium text-slate-700">
                  Monthly ▾
                </button>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center"
                  >
                    <ChevronLeft size={12} />
                  </button>
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center"
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
                          : 'bg-slate-50 hover:bg-slate-100'
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
                  className="p-2 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-300 transition-all"
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
          <TeamMembersScreenCompact />
        </div>

        {/* Settings - Top Right */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <SettingsScreenCompact />
        </div>

        {/* Project - Bottom Left */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <ProjectScreenCompact />
        </div>

        {/* Calendar - Bottom Right */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 h-[600px]">
          <CalendarScreenCompact />
        </div>
      </div>
    </div>
  );
};

export default AgileFlowDashboard;