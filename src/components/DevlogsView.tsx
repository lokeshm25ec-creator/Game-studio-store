import React, { useState } from 'react';
import { Terminal, Calendar, Clock, User, ArrowRight, ChevronDown } from 'lucide-react';
import { DEVLOGS } from '../data/mockData';
import { DevlogArticle } from '../types/store';

export const DevlogsView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<DevlogArticle | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Inside the Forge · Studio Chronicles</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-white mt-1">
          Engineering Devlogs & Patch Notes
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          Direct dispatches from our rendering architects, sound designers, and combat systems engineers.
        </p>
      </div>

      {selectedArticle ? (
        /* Full Article View */
        <article className="max-w-3xl mx-auto space-y-6 bg-[#111420] border border-white/[0.08] p-6 sm:p-10 rounded-2xl">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono transition-colors cursor-pointer mb-4"
          >
            ← Back to all dispatches
          </button>

          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-amber-300 uppercase">{selectedArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-3 py-3 border-y border-white/[0.06] text-xs text-slate-300">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold font-mono">
              {selectedArticle.author.name[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{selectedArticle.author.name}</p>
              <p className="text-[11px] text-slate-400">{selectedArticle.author.role}</p>
            </div>
          </div>

          {selectedArticle.coverImage && (
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
            {selectedArticle.content}
          </div>
        </article>
      ) : (
        /* Article Feed */
        <div className="space-y-6">
          {DEVLOGS.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-6 rounded-2xl bg-[#111420] border border-white/[0.07] hover:border-amber-400/40 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-start"
            >
              {article.coverImage && (
                <div className="w-full md:w-56 aspect-[16/10] rounded-xl overflow-hidden bg-black shrink-0">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="flex-1 space-y-2">
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-amber-300 uppercase">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>By {article.author.name} ({article.author.role})</span>
                  <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read dispatch <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
