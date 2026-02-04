import React, { useState } from 'react';
import { PRODUCT_DATABASE } from '../data/products';
import { Plus, Minus, ShoppingCart, Search, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

const OrdersPage = () => {
  const [mode, setMode] = useState('make'); // 'make' ou 'fulfill'
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Estados do Cabeçalho
  const [orderHeader] = useState({
    colaborador: 'Luis Guilherme',
    loja: 'Alphaville',
    data: new Date().toLocaleString()
  });

  const categories = [
    'La Duquesa (Dia a Dia)', 'La Reina', 'La Duquesa (Intermediária)', 
    'Código Series', 'Itens Secos', 'Bebidas'
  ];

  const updateQty = (product, delta) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = Math.max(0, existing.orderQty + delta);
        if (newQty === 0) return prev.filter(item => item.id !== product.id);
        return prev.map(item => item.id === product.id ? { ...item, orderQty: newQty } : item);
      }
      if (delta > 0) return [...prev, { ...product, orderQty: 1 }];
      return prev;
    });
  };

  const isSelected = (id) => cart.some(item => item.id === id);
  const getQty = (id) => cart.find(item => item.id === id)?.orderQty || 0;

  return (
    <div className="space-y-6">
      {/* HEADER DO PEDIDO */}
      <div className="bg-[#0a0b1e] rounded-[2rem] p-8 text-white flex justify-between items-center shadow-xl border border-white/5">
        <div className="space-y-1">
          <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Solicitante</p>
          <h2 className="text-xl font-bold">{orderHeader.colaborador}</h2>
          <p className="text-slate-400 text-xs">Loja: {orderHeader.loja} | {orderHeader.data}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setMode('make')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${mode === 'make' ? 'bg-blue-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            FAZER PEDIDO
          </button>
          <button 
            onClick={() => setMode('fulfill')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${mode === 'fulfill' ? 'bg-green-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            ATENDER PEDIDO
          </button>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar corte ou código..." 
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all text-sm shadow-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LISTA DE PRODUTOS POR CATEGORIA */}
      {!showCart ? (
        <div className="space-y-10">
          {categories.map(cat => (
            <div key={cat} className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCT_DATABASE
                  .filter(p => p.category === cat && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(product => (
                    <div key={product.id} className={`bg-white p-5 rounded-[2rem] border transition-all flex items-center justify-between ${isSelected(product.id) ? 'border-blue-500 shadow-lg' : 'border-slate-100 shadow-sm'}`}>
                      <div className="flex items-center gap-4">
                        <input 
                          type="checkbox" 
                          checked={isSelected(product.id)}
                          onChange={() => updateQty(product, isSelected(product.id) ? -getQty(product.id) : 1)}
                          className="w-5 h-5 rounded-md border-slate-200 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold">#{product.code}</p>
                          <h4 className="text-sm font-bold text-slate-700">{product.name}</h4>
                          <p className="text-[10px] text-slate-500 uppercase">{product.unit}</p>
                          {mode === 'fulfill' && <p className="text-blue-600 font-bold text-xs mt-1">R$ {product.price.toFixed(2)}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-slate-50 rounded-xl p-1">
                        <button onClick={() => updateQty(product, -1)} className="p-2 hover:text-blue-600 transition-colors"><Minus size={14}/></button>
                        <span className="w-8 text-center text-xs font-bold">{getQty(product.id)}</span>
                        <button onClick={() => updateQty(product, 1)} className="p-2 hover:text-blue-600 transition-colors"><Plus size={14}/></button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartReview cart={cart} setMode={setMode} mode={mode} />
      )}

      {/* BOTÃO FLUTUANTE CARRINHO */}
      {cart.length > 0 && !showCart && (
        <button 
          onClick={() => setShowCart(true)}
          className="fixed bottom-10 right-10 bg-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 font-bold z-50"
        >
          <ShoppingCart size={20} />
          TERMINAR PEDIDO ({cart.length})
        </button>
      )}
    </div>
  );
};

// COMPONENTE DE REVISÃO DO CARRINHO
const CartReview = ({ cart, setMode, mode }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      <ShoppingCart className="text-blue-600" />
      <h2 className="text-xl font-bold">Revisão do Pedido</h2>
    </div>
    <div className="divide-y divide-slate-50">
      {cart.map(item => (
        <div key={item.id} className="py-4 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-700">{item.name}</h4>
            <p className="text-xs text-slate-400">Quantidade: {item.orderQty} {item.unit}</p>
          </div>
          {mode === 'fulfill' && (
            <div className="flex gap-4 items-center">
              <input type="text" placeholder="Motivo falta..." className="text-xs bg-slate-50 p-2 rounded-lg border-none" />
              <p className="font-bold text-blue-600">R$ {(item.price * item.orderQty).toFixed(2)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    <button className="w-full mt-10 bg-[#0a0b1e] text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
      CONFIRMAR E ENVIAR
    </button>
  </div>
);

export default OrdersPage;