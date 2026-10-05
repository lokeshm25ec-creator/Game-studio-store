import React, { useState } from 'react';
import { X, Play, Bookmark, ShoppingBag, Check, ShieldCheck, Cpu, HardDrive, Monitor, Star, Sparkles } from 'lucide-react';
import { GameItem, Platform, GameEdition } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  game: GameItem;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ game, onClose }) => {
  const { addToCart, isInWishlist, toggleWishlist, setActiveTrailerUrl, setIsCartOpen } = useStore();
  const [selectedEdition, setSelectedEdition] = useState<GameEdition>(game.editions[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(game.platforms[0]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [specTab, setSpecTab] = useState<'min' | 'rec'>('min');

  const inWishlist = isInWishlist(game.id);

  const mediaList = [game.bannerImage, ...(game.screenshots || [])];

  const handleBuyNow = () => {
    addToCart({
      productId: game.id,
      title: game.title,
      type: 'edition',
      editionName: selectedEdition.name,
      platform: selectedPlatform,
      price: selectedEdition.price,
      quantity: 1,
      image: game.thumbnailImage
    });
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#0f121b] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0c0e16]">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-base truncate max-w-md">
              {game.title}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              · {game.genre}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(game.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                inWishlist
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
              title={inWishlist ? 'In your Wishlist' : 'Add to Wishlist'}
            >
              <Bookmark className={`w-4 h-4 ${inWishlist ? 'fill-black' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8">
          {/* Top Split: Media & Main Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Media Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group">
                <img
                  src={mediaList[activeMediaIndex] || game.bannerImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Trailer Button Overlay */}
                <div className="absolute bottom-4 left-4">
                  <button
                    onClick={() => setActiveTrailerUrl(game.trailerUrl || 'trailer')}
                    className="px-3.5 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                  >
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Watch Cinematic Trailer</span>
                  </button>
                </div>
              </div>

              {/* Thumbnails Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {mediaList.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeMediaIndex === idx ? 'border-amber-400 scale-[1.02]' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Critical Accolades */}
              {game.reviews && game.reviews.length > 0 && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                    <span className="font-semibold uppercase tracking-wider">{game.reviews[0].outlet}</span>
                    <span className="font-bold text-white bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                      {game.reviews[0].score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "{game.reviews[0].quote}"
                  </p>
                  <p className="text-[11px] text-slate-400 text-right">
                    — {game.reviews[0].author}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Purchase & Edition Module (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                  <span>{game.developer}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold">{game.rating}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {game.title}
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Choose Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {game.platforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-3 py-2 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                        selectedPlatform === plat
                          ? 'bg-amber-400/15 border-amber-400 text-white font-medium'
                          : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className="truncate block">{plat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Edition Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Select Game Edition
                </label>
                <div className="space-y-2">
                  {game.editions.map((edition) => (
                    <button
                      key={edition.id}
                      onClick={() => setSelectedEdition(edition)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedEdition.id === edition.id
                          ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400/40 text-white'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {edition.name}
                          </span>
                          {edition.badge && (
                            <span className="text-[10px] text-amber-300 font-mono bg-amber-400/20 px-1.5 py-0.2 rounded border border-amber-400/30">
                              {edition.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {edition.perks.length} exclusive digital perks
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-mono font-bold tabular-nums text-white">
                          ${edition.price.toFixed(2)}
                        </span>
                        {edition.originalPrice && (
                          <span className="text-xs font-mono tabular-nums text-slate-400 line-through block">
                            ${edition.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Edition Perks Detail */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1.5">
                <span className="text-[11px] text-amber-300 font-mono uppercase tracking-wide font-semibold block">
                  Included in {selectedEdition.name}:
                </span>
                <ul className="space-y-1">
                  {selectedEdition.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Buy Now · ${selectedEdition.price.toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => addToCart({
                      productId: game.id,
                      title: game.title,
                      type: 'edition',
                      editionName: selectedEdition.name,
                      platform: selectedPlatform,
                      price: selectedEdition.price,
                      quantity: 1,
                      image: game.thumbnailImage
                    })}
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-xs transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant digital activation key · 14-day refund guarantee</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Features, System Requirements, DLC Expansions */}
          <div className="pt-6 border-t border-white/[0.08] space-y-6">
            {/* Features Highlight */}
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                Key Engine & Gameplay Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {game.features.map((feat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DLC Expansions Section */}
            {game.dlcs && game.dlcs.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-3">
                  Available Add-Ons & Expansions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {game.dlcs.map((dlc) => (
                    <div key={dlc.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-300">{dlc.type}</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{dlc.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{dlc.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                        <span className="text-xs font-mono font-bold text-white tabular-nums">${dlc.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart({
                            productId: dlc.id,
                            title: `${game.title} - ${dlc.title}`,
                            type: 'dlc',
                            price: dlc.price,
                            quantity: 1,
                            image: game.thumbnailImage
                          })}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-amber-400 hover:text-black text-xs font-medium text-white transition-colors cursor-pointer"
                        >
                          Add DLC
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Requirements Tab */}
            {game.systemRequirements && (
              <div className="p-5 rounded-xl bg-[#090b12] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span>PC System Hardware Requirements</span>
                  </h3>

                  <div className="inline-flex p-1 bg-black/60 rounded-lg border border-white/10">
                    <button
                      onClick={() => setSpecTab('min')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        specTab === 'min' ? 'bg-amber-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Minimum
                    </button>
                    <button
                      onClick={() => setSpecTab('rec')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        specTab === 'rec' ? 'bg-amber-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Recommended (60+ FPS)
                    </button>
                  </div>
                </div>

                {(() => {
                  const req = specTab === 'min' ? game.systemRequirements.minimum : game.systemRequirements.recommended;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div>
                          <span className="text-slate-400 font-mono block">OS:</span>
                          <span className="text-slate-200 font-medium">{req.os}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block">Processor:</span>
                          <span className="text-slate-200 font-medium">{req.processor}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block">Memory:</span>
                          <span className="text-slate-200 font-medium">{req.memory}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-slate-400 font-mono block">Graphics Card:</span>
                          <span className="text-slate-200 font-medium">{req.graphics}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block">DirectX / API:</span>
                          <span className="text-slate-200 font-medium">{req.directX || 'DirectX 12'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block">Storage:</span>
                          <span className="text-slate-200 font-medium">{req.storage}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
