import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Shield, Cpu, Zap, ArrowRight } from 'lucide-react';
import { GAMES_CATALOG } from '../data/mockData';
import { HeroBanner } from './HeroBanner';
import { GameCard } from './GameCard';
import { GameItem, Platform } from '../types/store';
import { useStore } from '../context/StoreContext';

export const Storefront: React.FC = () => {
  const { setActiveTab } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredGame = GAMES_CATALOG.find(g => g.isFeatured) || GAMES_CATALOG[0];

  const categories = [
    { id: 'all', label: 'All Releases' },
    { id: 'action-rpg', label: 'Action RPG' },
    { id: 'sci-fi', label: 'Sci-Fi Survival' },
    { id: 'dark-fantasy', label: 'Dark Fantasy' },
    { id: 'racing', label: 'Anti-Gravity Racing' }
  ];

  const filteredGames = useMemo(() => {
    return GAMES_CATALOG.filter(game => {
      // Category filter
      if (selectedCategory !== 'all' && game.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== 'all' && !game.platforms.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()))) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesGenre = game.genre.toLowerCase().includes(q);
        const matchesDesc = game.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesGenre && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.ratingPercentage - a.ratingPercentage;
      }
      if (sortBy === 'price-asc') {
        return a.editions[0].price - b.editions[0].price;
      }
      if (sortBy === 'price-desc') {
        return b.editions[0].price - a.editions[0].price;
      }
      // Default featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedPlatform, sortBy, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Section 1: Hero Campaign Showcase */}
      <HeroBanner game={featuredGame} />

      {/* Section 2: Catalog Filter Bar & Grid */}
      <section className="space-y-6 pt-4">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <span>Direct Studio Catalogue</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Zero DRM Hassle</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white mt-1">
              Featured Studio Titles
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Crafted in-house with custom physics, tailored soundtracks, and native cross-play support.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, genre, or keyword..."
              className="w-full bg-[#121520] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row: Category segmented tabs + Platform dropdown + Sort */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Category Tabs (Functional Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121520] rounded-xl border border-white/[0.08] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-black font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Platform & Sort Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Platform filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-[#121520] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Platforms</option>
              <option value="pc">PC (Windows)</option>
              <option value="playstation">PlayStation 5</option>
              <option value="xbox">Xbox Series X|S</option>
              <option value="macos">macOS</option>
            </select>

            {/* Sort filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121520] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredGames.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#111420] border border-white/[0.06] space-y-3">
            <p className="text-sm font-semibold text-slate-200">No titles match your filter criteria.</p>
            <p className="text-xs text-slate-400">Try clearing filters or changing search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-amber-400 text-black text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Studio Engineering Craftsmanship / Story */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#121522] via-[#0f111a] to-[#0c0e14] border border-white/[0.08] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>The Aeon Forge Commitment</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Built Directly For Players. Zero Platform Bloat.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every game purchased through our official studio storefront grants you direct DRM-free executable options, instant cross-save cloud sync, and uncompressed original soundtrack files. We do not use third-party launcher telemetry.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
              <span className="text-xs font-bold text-white block">100% Direct Support</span>
              <p className="text-[11px] text-slate-400">Every dollar funds our internal artists and engine developers directly.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
              <span className="text-xs font-bold text-white block">14-Day Guarantee</span>
              <p className="text-[11px] text-slate-400">No questions asked refunds for under 2 hours of playtime.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
              <span className="text-xs font-bold text-white block">Founder Benefits</span>
              <p className="text-[11px] text-slate-400">Lifetime beta invitations and exclusive discord director sessions.</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setActiveTab('devlogs')}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Studio Engineering Devlogs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
