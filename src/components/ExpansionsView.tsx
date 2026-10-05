import React from 'react';
import { ShoppingBag, Sparkles, Disc, BookOpen, Layers } from 'lucide-react';
import { GAMES_CATALOG } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const ExpansionsView: React.FC = () => {
  const { addToCart, setSelectedGame } = useStore();

  // Aggregate all DLCs with game reference
  const allDlcs = GAMES_CATALOG.flatMap(game => 
    (game.dlcs || []).map(dlc => ({
      ...dlc,
      parentGame: game
    }))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Official Add-Ons & Season Passes</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-white mt-1">
          Expansions & Original Soundtracks
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          Expand your studio titles with massive story DLC chapters, audiophile lossless soundtracks, and exclusive cosmetic caches.
        </p>
      </div>

      {/* Grid of DLCs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allDlcs.map((dlc) => (
          <div
            key={dlc.id}
            className="rounded-xl bg-[#111420] border border-white/[0.07] hover:border-amber-400/40 p-5 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              {/* Type & Parent Game */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[11px] uppercase text-amber-400 font-semibold">{dlc.type}</span>
                <button
                  onClick={() => setSelectedGame(dlc.parentGame)}
                  className="hover:text-white underline decoration-dotted text-[11px]"
                >
                  {dlc.parentGame.title}
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-base font-bold text-white leading-snug">
                {dlc.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {dlc.description}
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-base font-bold text-white tabular-nums">
                ${dlc.price.toFixed(2)}
              </span>

              <button
                onClick={() => addToCart({
                  productId: dlc.id,
                  title: `${dlc.parentGame.title}: ${dlc.title}`,
                  type: 'dlc',
                  price: dlc.price,
                  quantity: 1,
                  image: dlc.parentGame.thumbnailImage
                })}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add Expansion</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
