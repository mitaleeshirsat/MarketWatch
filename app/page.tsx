"use client";
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, GripVertical, ShoppingCart, Trash2, Shuffle, Search, Zap, Settings, ChevronLeft, BarChart3 } from 'lucide-react';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

const initialStocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: 2.45, changePercent: 1.39, volume: '52.3M', marketCap: '2.78T' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corporation', price: 425.89, change: -3.21, changePercent: -0.75, volume: '28.1M', marketCap: '3.16T' },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 156.73, change: 1.87, changePercent: 1.21, volume: '31.5M', marketCap: '1.95T' },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.35, change: 4.12, changePercent: 2.36, volume: '45.7M', marketCap: '1.84T' },
  { id: '5', symbol: 'TSLA', name: 'Tesla Inc.', price: 242.68, change: -5.43, changePercent: -2.19, volume: '89.2M', marketCap: '771B' },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28, change: 12.45, changePercent: 1.44, volume: '62.8M', marketCap: '2.16T' },
  { id: '7', symbol: 'META', name: 'Meta Platforms Inc.', price: 489.57, change: 6.23, changePercent: 1.29, volume: '18.4M', marketCap: '1.24T' },
  { id: '8', symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 189.42, change: -1.15, changePercent: -0.60, volume: '12.3M', marketCap: '548B' },
];

const StockRow: React.FC<{
  stock: Stock;
  index: number;
  onDragStart: (idx: number) => void;
  onDragEnter: (idx: number) => void;
  onDragEnd: () => void;
  onDragOver: (idx: number) => void;
  isDragging: boolean;
  isHovering: boolean;
  onBuy: (id: string) => void;
  onSell: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ stock, index, onDragStart, onDragEnter, onDragEnd, onDragOver, isDragging, isHovering, onBuy, onSell, onDelete }) => {
  const isPositive = stock.change >= 0;
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`group relative flex items-center gap-3 px-4 py-3 border-b border-white/5 transition-all backdrop-blur-sm ${
        isDragging ? 'opacity-40 cursor-grabbing' : 'cursor-grab hover:bg-white/5'
      } ${isHovering && !isDragging ? 'bg-blue-500/10 border-blue-400/20' : ''}`}
    >
      <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={18} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white text-sm">{stock.symbol}</span>
          <span className="text-xs text-gray-400 truncate">{stock.name}</span>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-white text-sm">
          ${stock.price.toFixed(2)}
        </div>
      </div>
      
      <div className="text-right min-w-[90px]">
        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
          isPositive ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)}
          </span>
        </div>
        <div className={`text-xs ${isPositive ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </div>
      </div>
      
      <div className="hidden sm:block text-right min-w-[70px]">
        <div className="text-xs text-gray-400">{stock.volume}</div>
      </div>
      
      <div className="hidden md:block text-right min-w-[80px]">
        <div className="text-xs text-gray-400">{stock.marketCap}</div>
      </div>
      
      {showActions && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-zinc-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuy(stock.id);
            }}
            className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-colors font-semibold text-sm shadow-lg"
            title="Buy"
          >
            B
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSell(stock.id);
            }}
            className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-400 text-white flex items-center justify-center transition-colors font-semibold text-sm shadow-lg"
            title="Sell"
          >
            S
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors backdrop-blur-sm"
            title="More Options"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300">
              <path d="M2 5h12M2 8h12M2 11h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors backdrop-blur-sm"
            title="Chart"
          >
            <BarChart3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(stock.id);
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors backdrop-blur-sm"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors backdrop-blur-sm"
            title="Reorder"
          >
            <Shuffle size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default function MarketWatch() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };
  
  const handleDragEnter = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    
    const items = [...stocks];
    const draggedItem = items[draggedIdx];
    items.splice(draggedIdx, 1);
    items.splice(idx, 0, draggedItem);
    
    setDraggedIdx(idx);
    setStocks(items);
  };
  
  const handleDragOver = (idx: number) => {
    setHoveredIdx(idx);
  };
  
  const handleDragEnd = () => {
    setDraggedIdx(null);
    setHoveredIdx(null);
  };
  
  const handleBuy = (id: string) => {
    const stock = stocks.find(s => s.id === id);
    if (stock) {
      alert(`Buy order placed for ${stock.symbol}`);
    }
  };
  
  const handleSell = (id: string) => {
    const stock = stocks.find(s => s.id === id);
    if (stock) {
      alert(`Sell order placed for ${stock.symbol}`);
    }
  };
  
  const handleDelete = (id: string) => {
    setStocks(stocks.filter(s => s.id !== id));
  };
  
  const filteredStocks = stocks.filter(stock => {
    const query = searchQuery.toLowerCase();
    return (
      stock.symbol.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    );
  });
  
  return (
    <div className="min-h-screen bg-black">
      <div className="bg-zinc-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Find stocks, futures, options or indices"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-gray-500">
                <Zap size={14} />
                <span className="font-medium">Press F</span>
              </div>
            </div>
            
            <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm" title="Cart">
              <ShoppingCart size={20} className="text-gray-300" />
            </button>
            
            <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm" title="Settings">
              <Settings size={20} className="text-gray-300" />
            </button>
            
            <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm" title="Back">
              <ChevronLeft size={20} className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">MarketWatch</h1>
            <p className="text-sm text-gray-400">
              Your Market, Your Way !
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <div className="w-[18px]"></div>
              <div className="flex-1">Symbol</div>
              <div className="text-right">Price</div>
              <div className="text-right min-w-[90px]">Change</div>
              <div className="hidden sm:block text-right min-w-[70px]">Volume</div>
              <div className="hidden md:block text-right min-w-[80px]">Mkt Cap</div>
            </div>
            
            <div>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock, idx) => (
                  <StockRow
                    key={stock.id}
                    stock={stock}
                    index={stocks.indexOf(stock)}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    isDragging={draggedIdx === stocks.indexOf(stock)}
                    isHovering={hoveredIdx === stocks.indexOf(stock) && draggedIdx !== null}
                    onBuy={handleBuy}
                    onSell={handleSell}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="px-4 py-12 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No stocks found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
          
          {currentTime && (
            <div className="mt-4 text-center text-xs text-gray-500">
              Data updated as of {currentTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}