import React from 'react';
import { LayoutDashboard, ShoppingCart, BarChart3, LogOut } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-64 bg-[#0a0b1e] text-slate-400 flex flex-col p-5 h-screen sticky top-0 shadow-2xl">
    <div className="flex items-center gap-3 mb-10 px-2">
      <div className="bg-blue-600 p-2 rounded-lg text-white"><ShoppingCart size={20} /></div>
      <div>
        <h1 className="text-white font-black text-sm tracking-tighter leading-none uppercase">Código</h1>
        <h2 className="text-blue-500 font-bold text-[10px] tracking-[0.2em] uppercase">da Carne</h2>
      </div>
    </div>
    <nav className="flex-1 space-y-2">
      <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
      <NavItem icon={<ShoppingCart size={18}/>} label="Estoque" />
      <NavItem icon={<BarChart3 size={18}/>} label="Relatórios" />
    </nav>
    <div className="pt-5 border-t border-white/5">
      <button className="flex items-center gap-3 px-4 py-2 text-red-500 text-xs font-bold hover:bg-white/5 w-full rounded-xl transition-all">
        <LogOut size={16}/> Sair
      </button>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active = false }) => (
  <button className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-xs font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 hover:text-white'}`}>
    {icon} {label}
  </button>
);

export default Sidebar;