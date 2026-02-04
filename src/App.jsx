import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WelcomeBanner from './components/WelcomeBanner';
import StockSelector from './components/StockSelector';
import OrdersTable from './components/OrdersTable';
import StatusCard from './components/StatusCard';
import StockEntryForm from './components/StockEntryForm';

function App() {
  const [activeStock, setActiveStock] = useState('matriz');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('inventory_cdc_vFinal');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('inventory_cdc_vFinal', JSON.stringify(inventory));
  }, [inventory]);

  const addStockItem = (newItem) => {
    const status = Number(newItem.qty) <= 5 ? 'Baixo Estoque' : 'Em Estoque';
    setInventory(prev => [{ ...newItem, id: Date.now(), status }, ...prev]);
  };

  const deleteItem = (id) => {
    if (window.confirm("Deseja realmente remover este item?")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredItems = (inventory || []).filter(item => 
    item && 
    item.unit === activeStock && 
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKg = filteredItems.reduce((acc, curr) => acc + Number(curr.qty || 0), 0);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <WelcomeBanner />
        <div className="max-w-7xl mx-auto space-y-8">
          <StockSelector activeStock={activeStock} setActiveStock={setActiveStock} />
          <StockEntryForm activeStock={activeStock} onAdd={addStockItem} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatusCard title="Unidade" count={activeStock.toUpperCase()} color="blue" />
            <StatusCard title="Produtos" count={filteredItems.length} color="green" />
            <StatusCard title="Peso Total" count={`${totalKg.toFixed(2)}kg`} color="purple" />
          </div>

          <OrdersTable 
            items={filteredItems} 
            stockName={activeStock} 
            onDelete={deleteItem}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </main>
    </div>
  );
}

export default App;