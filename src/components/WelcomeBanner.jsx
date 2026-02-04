import React from 'react';

const WelcomeBanner = () => (
  <div className="bg-[#0a0b1e] rounded-[2.5rem] p-10 mb-10 flex justify-between items-center shadow-xl relative overflow-hidden">
    <div className="relative z-10 text-white">
      <h1 className="text-3xl font-bold mb-3">👋 Boa tarde, <span className="text-blue-500">CÓDIGO DA CARNE!</span></h1>
      <p className="text-slate-400 text-sm">Controle de estoque centralizado: Matriz, Alphaville e Gleba.</p>
    </div>
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center z-10">
      <span className="text-[10px] text-slate-300 font-black uppercase block tracking-widest">Sistema</span>
      <span className="text-2xl text-green-400 font-bold">Online</span>
    </div>
  </div>
);

export default WelcomeBanner;