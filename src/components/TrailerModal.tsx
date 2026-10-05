import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, MonitorPlay } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GAMES_CATALOG } from '../data/mockData';

export const TrailerModal: React.FC = () => {
  const { activeTrailerUrl, setActiveTrailerUrl, selectedGame } = useStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const matchedGame = selectedGame || GAMES_CATALOG[0];

  useEffect(() => {
    if (!activeTrailerUrl) return;
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeTrailerUrl, isPlaying]);

  // Cycle preview frames smoothly
  useEffect(() => {
    if (!activeTrailerUrl) return;
    const frameInterval = setInterval(() => {
      if (isPlaying) {
        setActiveFrameIndex(prev => (prev + 1) % 4);
      }
    }, 3500);

    return () => clearInterval(frameInterval);
  }, [activeTrailerUrl, isPlaying]);

  if (!activeTrailerUrl) return null;

  const frames = [
    matchedGame.bannerImage,
    ...(matchedGame.screenshots || [matchedGame.bannerImage])
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0a0c13] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-[#07090e]">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-amber-400" />
            <span className="font-display font-bold text-white text-sm">
              Official Gameplay Reveal: {matchedGame.title}
            </span>
          </div>

          <button
            onClick={() => setActiveTrailerUrl(null)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center group">
          <img
            src={frames[activeFrameIndex % frames.length]}
            alt="Trailer Frame"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />

          {/* Cinematic Letterbox Bars */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black" />
          <div className="absolute bottom-0 inset-x-0 h-6 bg-black" />

          {/* Watermark */}
          <div className="absolute top-8 right-8 font-mono text-[10px] text-white/50 tracking-widest uppercase bg-black/50 px-2 py-0.5 rounded border border-white/10">
            Unreal Engine 5.5 In-Engine Capture · 4K 60FPS
          </div>

          {/* Center Play/Pause indicator on hover or click */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute p-5 rounded-full bg-black/60 hover:bg-amber-400 text-white hover:text-black border border-white/20 transition-all cursor-pointer backdrop-blur-sm shadow-xl"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
          </button>

          {/* Bottom Player HUD */}
          <div className="absolute bottom-6 inset-x-6 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex flex-col gap-2">
            {/* Timeline scrubber */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  0:{Math.floor(progress * 0.9).toString().padStart(2, '0')} / 1:30
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300">HDR 4K</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10">DOLBY ATMOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
