import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { LEVELS } from '../../data/levels';
import { Button, Card } from '../ui/KidsUI';
import { Lock, Star, Trophy, ChevronRight, Settings, Music, Volume2, VolumeX } from 'lucide-react';

const LevelSelection = ({ onSelectLevel, onOpenSettings }) => {
  const { unlockedLevels, completedLevels, stars, coins, xp, currentLevel, toggleMute, isMuted } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-600 p-6 pb-20 overflow-x-hidden">
      {/* HUD */}
      <header className="flex justify-between items-center bg-white/20 backdrop-blur-md p-4 rounded-3xl border-b-4 border-white/30 sticky top-0 z-50 shadow-xl">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-white uppercase opacity-70">XP Level</span>
            <div className="bg-yellow-400 px-4 py-1 rounded-full text-white font-black border-2 border-white text-lg">
              {currentLevel}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-white/30 px-3 py-1 rounded-full text-white font-bold border border-white/50">
                <Star size={16} className="fill-yellow-400 text-yellow-400" /> {stars}
              </div>
              <div className="flex items-center gap-1 bg-white/30 px-3 py-1 rounded-full text-white font-bold border border-white/50">
                <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-yellow-200" /> {coins}
              </div>
            </div>
            <div className="w-full bg-slate-800/50 h-2 rounded-full mt-1 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(xp % 1000) / 10}%` }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={toggleMute} className="rounded-2xl">
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Button variant="secondary" size="sm" onClick={onOpenSettings} className="rounded-2xl">
            <Settings />
          </Button>
        </div>
      </header>

      {/* World Map Title */}
      <div className="text-center py-12">
        <h1 className="text-6xl font-black text-white drop-shadow-[0_5px_0_rgba(0,0,0,0.2)] tracking-tighter italic">
          LEVEL <span className="text-yellow-300">QUEST</span>
        </h1>
        <p className="text-white/80 font-bold uppercase tracking-widest text-sm mt-2">100 Levels of Learning Fun!</p>
      </div>

      {/* Level Path */}
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 relative">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 w-4 bg-white/10 rounded-full left-1/2 -translate-x-1/2 -z-10" />

        {LEVELS.map((lvl, index) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const rating = completedLevels[lvl.id] || 0;
          const isBoss = lvl.isBoss;
          
          // Zig-zag offset
          const xOffset = index % 2 === 0 ? 40 : -40;

          return (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ x: xOffset }}
              className="relative"
            >
              <button
                onClick={() => isUnlocked && onSelectLevel(lvl)}
                disabled={!isUnlocked}
                className={`
                  group relative w-32 h-32 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-300
                  ${isUnlocked 
                    ? isBoss 
                      ? 'bg-gradient-to-br from-red-500 to-rose-700 shadow-[0_12px_0_0_rgba(159,18,57,1)] hover:scale-110 active:translate-y-2 active:shadow-[0_4px_0_0_rgba(159,18,57,1)]'
                      : 'bg-gradient-to-br from-white to-slate-100 shadow-[0_12px_0_0_rgba(203,213,225,1)] hover:scale-110 active:translate-y-2 active:shadow-[0_4px_0_0_rgba(203,213,225,1)]'
                    : 'bg-slate-400/50 shadow-[0_12px_0_0_rgba(100,116,139,0.5)] cursor-not-allowed grayscale'
                  }
                `}
              >
                {isUnlocked ? (
                  <>
                    {isBoss && <Trophy className="absolute -top-6 text-yellow-400 w-10 h-10 animate-bounce" />}
                    <span className={`text-4xl font-black ${isBoss ? 'text-white' : 'text-slate-800'}`}>{lvl.id}</span>
                    <div className="flex gap-1 mt-2">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"} />
                      ))}
                    </div>
                  </>
                ) : (
                  <Lock className="text-white/50 w-12 h-12" />
                )}

                {/* Level Tag */}
                {isUnlocked && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-1 rounded-full shadow-lg text-xs font-black text-slate-800 border-2 border-slate-200 uppercase">
                    {lvl.gameType.replace(/-/g, ' ')}
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Reward / Achievement Sidebar Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-4">
        <Button variant="primary" className="rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-2xl">
          🎁
        </Button>
      </div>
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <Button variant="success" className="rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-2xl">
          🎖️
        </Button>
      </div>
    </div>
  );
};

export default LevelSelection;
