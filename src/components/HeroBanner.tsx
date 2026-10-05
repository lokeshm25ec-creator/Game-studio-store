import React, { useState } from 'react';
import { Play, Bookmark, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { GameItem } from '../types/store';
import { useStore } from '../context/StoreContext';

interface HeroBannerProps {
  game: GameItem;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ game }) => {
  const { setSelectedGame, setActiveTrailerUrl, addToCart, isInWishlist, toggleWishlist, quickBuyGame } = useStore();
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0);
  const activeEdition = game.editions[selectedEditionIndex] || game.editions[0];
  const inWishlist = isInWishlist(game.id);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10131c]">
      {/* Background Image with Scrim */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
        <img
          src={game.bannerImage}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-700 hover:scale-105"
        />
        {/* Measured dark scrim for 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/70 to-[#090a0f]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/90 via-[#090a0f]/40 to-transparent hidden md:block" />
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
        <div className="max-w-3xl space-y-4">
          {/* Clean Unboxed Metadata with Typographic Separators (ZERO-PILL DISCIPLINE) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-300/90 tracking-wide uppercase">
            <span>{game.genre}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Unreal Engine 5.5</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-emerald-400 font-semibold">{game.rating} ({game.ratingPercentage}%)</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-slate-300">Releases {game.releaseDate}</span>
          </div>

          {/* Balanced Main Title */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance leading-none">
            {game.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-balance line-clamp-2 md:line-clamp-3">
            {game.tagline} {game.description}
          </p>

          {/* Interactive Edition Selector Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-2">Edition:</span>
            <div className="inline-flex p-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
              {game.editions.map((edition, idx) => (
                <button
                  key={edition.id}
                  onClick={() => setSelectedEditionIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    selectedEditionIndex === idx
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {edition.name}
                  <span className="ml-1.5 font-mono tabular-nums opacity-90">
                    ${edition.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => quickBuyGame(game, activeEdition, game.platforms[0])}
              className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all shadow-lg hover:shadow-amber-400/20 flex items-center gap-2 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>Pre-Order {activeEdition.name}</span>
              <span className="font-mono tabular-nums bg-black/10 px-1.5 py-0.5 rounded text-xs">
                ${activeEdition.price.toFixed(2)}
              </span>
            </button>

            <button
              onClick={() => setActiveTrailerUrl(game.trailerUrl || 'trailer')}
              className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={() => setSelectedGame(game)}
              className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Overview & Specs
            </button>

            <button
              onClick={() => toggleWishlist(game.id)}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                inWishlist
                  ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${inWishlist ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>

          {/* Edition perks summary preview */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            {activeEdition.perks.slice(0, 3).map((perk, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{perk}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
