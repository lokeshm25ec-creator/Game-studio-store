import React, { useState } from 'react';
import { ShoppingBag, Box, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { MERCHANDISE_CATALOG } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { MerchandiseItem } from '../types/store';

export const GearView: React.FC = () => {
  const { addToCart } = useStore();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'merch-obsidian-controller': 'Obsidian Matte Black'
  });

  const handleSelectVariant = (itemId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [itemId]: variant }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
          <Box className="w-3.5 h-3.5" />
          <span>Physical Goods & Collector Vault</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-white mt-1">
          Studio Gear & Limited Editions
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          Engineered hardware, audiophile vinyl pressings, and archival hardcover artbooks directly from our artisan workshop.
        </p>
      </div>

      {/* Merch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MERCHANDISE_CATALOG.map((item) => {
          const selectedVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : undefined);

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-[#111420] border border-white/[0.08] overflow-hidden flex flex-col justify-between transition-all hover:border-amber-400/40"
            >
              {/* Product Visual */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {item.editionLimit && (
                  <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-amber-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
                    {item.editionLimit}
                  </span>
                )}

                <span className={`absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-md border ${
                  item.stockStatus === 'In Stock'
                    ? 'text-emerald-300 bg-emerald-950/80 border-emerald-500/30'
                    : 'text-amber-300 bg-black/80 border-amber-500/30'
                }`}>
                  {item.stockStatus}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hardware Specs / Product Highlights */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Variant Selection if available */}
                  {item.variants && item.variants.length > 0 && (
                    <div className="mt-4">
                      <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Finish:</span>
                      <div className="flex gap-2">
                        {item.variants.map((variant) => (
                          <button
                            key={variant}
                            onClick={() => handleSelectVariant(item.id, variant)}
                            className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                              selectedVariant === variant
                                ? 'bg-amber-400/20 border-amber-400 text-white font-medium'
                                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Buy Section */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Direct Price</span>
                    <span className="font-mono text-lg font-bold text-white tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart({
                      productId: item.id,
                      title: item.title,
                      type: 'merch',
                      selectedVariant,
                      price: item.price,
                      quantity: 1,
                      image: item.image
                    })}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
