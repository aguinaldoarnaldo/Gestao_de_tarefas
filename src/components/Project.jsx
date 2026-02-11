import React from 'react';
import { Clock } from 'lucide-react';
import Header from './Header';
import Navigation from './Navigation';

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

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-orange-100 text-orange-700',
  Low: 'bg-green-100 text-green-700',
};

const TaskColumn = ({ title, count, tasks }) => {
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

const Project = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Navigation />
      
      <div className="flex-1 p-4 overflow-auto bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
          <h2 className="text-base font-bold text-slate-800">Project X</h2>
          <p className="text-slate-500 text-[10px] mt-0.5">Project Seminars &gt; Project X &gt; Labels &gt; Team</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <TaskColumn title="To Do" count={3} tasks={projectTasks.todo} />
          <TaskColumn title="In Progress" count={2} tasks={projectTasks.inProgress} />
          <TaskColumn title="Review" count={2} tasks={projectTasks.review} />
          <TaskColumn title="Done" count={2} tasks={projectTasks.done} />
        </div>
      </div>
    </div>
  );
};

export default Project;
