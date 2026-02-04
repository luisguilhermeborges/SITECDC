import React from 'react';
import { MapPin } from 'lucide-react';

const StockSelector = ({ activeStock, setActiveStock }) => {
  const units = ['matriz', 'alphaville', 'gleba'];
  
  return (
    <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl border border-slate-100 w-fit shadow-sm">
      {units.map(loc => (
        <button 
          key={loc} 
          onClick={() => setActiveStock(loc)} 
          className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
            activeStock === loc 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <MapPin size={12} className="inline mr-2" /> {loc}
        </button>
      ))}
    </div>
  );
};

export default StockSelector;