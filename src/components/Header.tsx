import React from 'react';
import { ShoppingBag, Bookmark, Disc } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, wishlist, setIsCartOpen, runningGameId, stopGame } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.07] px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => setActiveTab('store')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            AEON FORGE
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links, single-line, subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab('store')}
            className={`cursor-pointer transition-colors relative py-1 ${
              activeTab === 'store' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Store
            {activeTab === 'store' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`cursor-pointer transition-colors relative py-1 flex items-center gap-1.5 ${
              activeTab === 'library' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Library</span>
            {runningGameId && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Game currently active" />
            )}
            {activeTab === 'library' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('expansions')}
            className={`cursor-pointer transition-colors relative py-1 ${
              activeTab === 'expansions' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Expansions & DLC
            {activeTab === 'expansions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('gear')}
            className={`cursor-pointer transition-colors relative py-1 ${
              activeTab === 'gear' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Studio Gear
            {activeTab === 'gear' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('devlogs')}
            className={`cursor-pointer transition-colors relative py-1 ${
              activeTab === 'devlogs' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Devlogs
            {activeTab === 'devlogs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {runningGameId && (
            <button
              onClick={stopGame}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded hover:bg-emerald-900/80 transition-colors"
            >
              <Disc className="w-3.5 h-3.5 animate-spin" />
              <span>Playing active session · Stop</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('store')}
            title="Wishlist items"
            className="p-2 text-slate-300 hover:text-amber-400 transition-colors relative"
          >
            <Bookmark className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono tabular-nums flex items-center justify-center border border-amber-500/40">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs font-medium transition-all group"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-105 transition-transform" />
            <span className="font-mono tabular-nums text-slate-200">
              Cart ({cartCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar below on small screens */}
      <div className="flex md:hidden items-center justify-around pt-3 mt-2 border-t border-white/[0.05] text-xs">
        <button
          onClick={() => setActiveTab('store')}
          className={`py-1 ${activeTab === 'store' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Store
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`py-1 ${activeTab === 'library' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab('expansions')}
          className={`py-1 ${activeTab === 'expansions' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          DLCs
        </button>
        <button
          onClick={() => setActiveTab('gear')}
          className={`py-1 ${activeTab === 'gear' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Gear
        </button>
        <button
          onClick={() => setActiveTab('devlogs')}
          className={`py-1 ${activeTab === 'devlogs' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Devlogs
        </button>
      </div>
    </header>
  );
};
