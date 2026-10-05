import React from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#07080d] py-12 px-6 lg:px-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Studio Wordmark & Quiet Copyright */}
        <div className="space-y-2">
          <span className="font-display font-extrabold text-lg text-white tracking-tight">
            AEON FORGE STUDIOS
          </span>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
            Independent developer and publisher of premium interactive entertainment. Built with proprietary engine toolchains.
          </p>
          <p className="text-slate-400 text-[11px] pt-1">
            © {new Date().getFullYear()} AEON FORGE STUDIOS INC. All rights reserved.
          </p>
        </div>

        {/* Right: Clean Navigation Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('store')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Storefront
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Vault & Keys
          </button>
          <button
            onClick={() => setActiveTab('expansions')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Season Passes
          </button>
          <button
            onClick={() => setActiveTab('gear')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Collector Gear
          </button>
          <button
            onClick={() => setActiveTab('devlogs')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Engineering Notes
          </button>
        </div>
      </div>
    </footer>
  );
};
