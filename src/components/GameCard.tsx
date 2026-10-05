import React, { useState } from 'react';
import { Bookmark, ShoppingBag, Eye, Star, Monitor, Play } from 'lucide-react';
import { GameItem } from '../types/store';
import { useStore } from '../context/StoreContext';

interface GameCardProps {
  game: GameItem;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { setSelectedGame, addToCart, isInWishlist, toggleWishlist, setActiveTrailerUrl } = useStore();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(game.id);

  const baseEdition = game.editions[0];
  const hasDiscount = baseEdition.originalPrice && baseEdition.originalPrice > baseEdition.price;
  const discountPercent = hasDiscount
    ? Math.round(((baseEdition.originalPrice! - baseEdition.price) / baseEdition.originalPrice!) * 100)
    : 0;

  return (
    <div className="group flex flex-col bg-[#121520] hover:bg-[#161a29] border border-white/[0.07] hover:border-amber-400/30 rounded-xl overflow-hidden transition-all duration-300">
      {/* Visual Anchor (65-75% height) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0e14]">
        {!imgError ? (
          <img
            src={game.thumbnailImage}
            alt={game.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-slate-400 text-center">
            <Monitor className="w-8 h-8 mb-2 text-amber-400/60" />
            <span className="text-sm font-semibold text-slate-200">{game.title}</span>
            <span className="text-xs text-slate-500 mt-1">{game.genre}</span>
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4 backdrop-blur-[2px]">
          <button
            onClick={() => setSelectedGame(game)}
            className="px-3 py-2 bg-white/20 hover:bg-white/30 border border-white/20 rounded-lg text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => setActiveTrailerUrl(game.trailerUrl || 'trailer')}
            className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Trailer</span>
          </button>
        </div>

        {/* Top Right Wishlist Quick Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(game.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            inWishlist
              ? 'bg-amber-400 text-black shadow-md'
              : 'bg-black/50 text-slate-300 hover:text-white border border-white/10 hover:bg-black/80'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${inWishlist ? 'fill-black' : ''}`} />
        </button>

        {/* Status Tag (maximum 1 subtle text tag per guidelines) */}
        {game.status === 'Pre-Order' ? (
          <span className="absolute bottom-2.5 left-2.5 text-[10px] uppercase font-mono tracking-wider text-amber-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-amber-500/30">
            Pre-Order
          </span>
        ) : hasDiscount ? (
          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-500/30">
            -{discountPercent}% Promo
          </span>
        ) : null}
      </div>

      {/* Card Content & Zero-Pill Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{game.genre}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-slate-300">{game.platforms[0].split(' ')[0]}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-emerald-400 font-mono text-[11px]">{game.ratingPercentage}%</span>
          </div>

          {/* Game Title */}
          <h3
            onClick={() => setSelectedGame(game)}
            className="font-display text-base font-bold text-white hover:text-amber-400 transition-colors cursor-pointer mt-1 line-clamp-1"
          >
            {game.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {game.tagline}
          </p>
        </div>

        {/* Card Footer: Price & Primary Quick Add */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">From</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold font-mono tabular-nums text-white">
                ${baseEdition.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-mono tabular-nums text-slate-400 line-through">
                  ${baseEdition.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart({
              productId: game.id,
              title: game.title,
              type: 'game',
              editionName: baseEdition.name,
              platform: game.platforms[0],
              price: baseEdition.price,
              quantity: 1,
              image: game.thumbnailImage
            })}
            className="px-3 py-1.5 rounded-lg bg-white/[0.07] hover:bg-amber-400 hover:text-black text-slate-200 text-xs font-medium border border-white/[0.1] hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-black transition-colors" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
