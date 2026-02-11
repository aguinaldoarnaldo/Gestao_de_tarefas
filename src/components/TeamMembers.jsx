import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

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

const TeamMembers = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Navigation />
      
      <div className="flex-1 p-4 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50">
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
              className="bg-white rounded-xl p-3 border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all"
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
};

export default TeamMembers;
