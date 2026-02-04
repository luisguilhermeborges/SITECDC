import React from 'react';

const StatusCard = ({ title, count, color }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : 'text-purple-600'}`}>{count}</p>
  </div>
);

export default StatusCard;