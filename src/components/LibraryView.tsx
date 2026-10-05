import React, { useState } from 'react';
import { Play, Square, Key, Cloud, Award, HardDrive, Check, Copy, ExternalLink, RefreshCw, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LibraryGame } from '../types/store';

export const LibraryView: React.FC = () => {
  const { library, redeemKey, launchGame, runningGameId, stopGame } = useStore();
  const [keyInput, setKeyInput] = useState('');
  const [redeemFeedback, setRedeemFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedGame, setSelectedGame] = useState<LibraryGame>(library[0]);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    const res = redeemKey(keyInput);
    setRedeemFeedback(res);
    if (res.success) {
      setKeyInput('');
    }
  };

  const activeGame = selectedGame || library[0];
  const isRunning = runningGameId === activeGame?.gameId;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Key Redemption & Vault Summary */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#121522] via-[#0f121d] to-[#0c0e16] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Key className="w-3.5 h-3.5" />
            <span>Aeon Vault & Key Redemption</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
            Player Game Library
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            All your purchased digital licenses, founder packages, and redeemed activation keys reside here permanently.
          </p>
        </div>

        {/* Key Redemption Form */}
        <form onSubmit={handleRedeem} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Redeem key: AEON-XXXX-XXXX"
            className="px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 uppercase"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Redeem Product
          </button>
        </form>
      </div>

      {redeemFeedback && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
          redeemFeedback.success
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
        }`}>
          <span>{redeemFeedback.message}</span>
          <button onClick={() => setRedeemFeedback(null)} className="text-white/60 hover:text-white ml-2">Dismiss</button>
        </div>
      )}

      {/* Library View Split: Left Game List, Right Master Launcher Pane */}
      {library.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-2xl bg-[#10131d] border border-white/[0.06] space-y-3">
          <p className="text-base text-slate-300">You don't own any titles yet.</p>
          <p className="text-xs text-slate-400">Head to the store to claim or pre-order Aeon Forge games.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Owned Games Thumbnails (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Installed / Registered ({library.length})</span>
              <span className="font-mono text-[11px]">DirectStorage 1.2</span>
            </div>

            <div className="space-y-2">
              {library.map((game) => {
                const isSelected = activeGame?.gameId === game.gameId;
                const isGameRunning = runningGameId === game.gameId;

                return (
                  <button
                    key={game.gameId}
                    onClick={() => setSelectedGame(game)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-amber-400/50 shadow-md'
                        : 'bg-[#111420] border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 relative">
                      <img src={game.thumbnailImage} alt={game.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      {isGameRunning && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{game.title}</h4>
                        {isGameRunning && (
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold">Running</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{game.editionName}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-1">
                        <span>{game.hoursPlayed} hrs</span>
                        <span>·</span>
                        <span>{game.platform.split(' ')[0]}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Game Detail / Launcher Control (8 cols) */}
          {activeGame && (
            <div className="lg:col-span-8 rounded-2xl bg-[#111420] border border-white/[0.08] overflow-hidden flex flex-col justify-between">
              {/* Top Banner Image with Action HUD */}
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-black">
                <img
                  src={activeGame.bannerImage}
                  alt={activeGame.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-[#111420]/60 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-300">
                      {activeGame.editionName}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                      {activeGame.title}
                    </h3>
                  </div>

                  {/* Big Play / Stop Button */}
                  {isRunning ? (
                    <button
                      onClick={stopGame}
                      className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Stop Game</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => launchGame(activeGame.gameId)}
                      className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:shadow-amber-400/25 group"
                    >
                      <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                      <span>PLAY</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Game Stats & Actions Row */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Time Played</span>
                    <span className="text-sm font-mono font-bold text-white tabular-nums">{activeGame.hoursPlayed} Hours</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Last Session</span>
                    <span className="text-xs text-slate-300 truncate block mt-0.5">{activeGame.lastPlayed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Cloud State</span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Synchronized</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Install Footprint</span>
                    <span className="text-sm font-mono text-slate-300">{activeGame.installSize}</span>
                  </div>
                </div>

                {/* Achievements Progress */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Achievements</span>
                    </span>
                    <span className="font-mono tabular-nums text-slate-400">
                      {activeGame.achievements.completed} / {activeGame.achievements.total} ({Math.round((activeGame.achievements.completed / activeGame.achievements.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${(activeGame.achievements.completed / activeGame.achievements.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* License & Key Card */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">CD Activation Key</span>
                    <p className="font-mono text-amber-300 tracking-wider font-semibold mt-0.5">
                      {activeGame.activationKey}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeGame.activationKey);
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
