import React from 'react';
import { Upload } from 'lucide-react';
import Header from './Header';
import Navigation from './Navigation';

const SettingsMenuItem = ({ label, active }) => (
  <button className={`w-full text-left px-2 py-1.5 rounded-lg transition-all text-xs ${
    active 
      ? 'bg-white shadow-sm text-blue-600 font-semibold' 
      : 'text-slate-600 hover:bg-white/50'
  }`}>
    {label}
  </button>
);

const Settings = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Navigation />
      
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
        <div className="flex-1 p-4 overflow-auto bg-gradient-to-br from-slate-50 to-purple-50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Edit Profile</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs bg-white"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="emailflow@gmail.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs bg-white"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password Change</label>
              <input
                type="password"
                placeholder="Change or password"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-400 outline-none text-xs bg-white"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Profile photo</label>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl">👩‍💼</span>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-all text-xs bg-white">
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
};

export default Settings;
