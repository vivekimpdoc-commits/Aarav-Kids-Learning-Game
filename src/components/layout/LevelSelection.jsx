import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { getLevelsForGame } from '../../data/levels';
import { Button, Card } from '../ui/KidsUI';
import { Lock, Star, Trophy, ArrowLeft } from 'lucide-react';

const LevelSelection = ({ game, onSelectLevel, onBack }) => {
  const { completedLevels, stars, coins, xp } = useGame();
  const levels = getLevelsForGame(game.id);

  return (
    <div className={`min-h-screen ${game.color} p-6 pb-20`}>
      {/* HUD */}
      <header className="flex justify-between items-center bg-white/30 backdrop-blur-md p-4 rounded-3xl border-b-4 border-white/50 sticky top-0 z-50 shadow-xl">
        <Button variant="secondary" size="sm" onClick={onBack} className="rounded-2xl">
          <ArrowLeft />
        </Button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-black text-white drop-shadow-md uppercase tracking-tighter italic">
            {game.title}
          </h2>
          <div className="flex gap-4">
             <div className="flex items-center gap-1 text-white font-bold text-sm">
               <Star size={14} className="fill-yellow-400 text-yellow-400" /> {stars}
             </div>
             <div className="flex items-center gap-1 text-white font-bold text-sm">
               <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white" /> {coins}
             </div>
          </div>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Level Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 px-4">
        {levels.map((lvl, index) => {
          // A level is unlocked if it's Level 1 OR the previous level is completed
          const prevLevelId = index > 0 ? levels[index - 1].id : null;
          const isUnlocked = index === 0 || completedLevels[prevLevelId] !== undefined;
          const rating = completedLevels[lvl.id] || 0;

          return (
            <motion.div
              key={lvl.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => isUnlocked && onSelectLevel(lvl)}
                disabled={!isUnlocked}
                className={`
                  relative w-full aspect-square rounded-[2rem] flex flex-col items-center justify-center transition-all
                  ${isUnlocked 
                    ? 'bg-white shadow-[0_10px_0_0_rgba(0,0,0,0.1)] hover:scale-105 active:translate-y-1 active:shadow-none'
                    : 'bg-black/20 shadow-none cursor-not-allowed opacity-50'
                  }
                `}
              >
                {isUnlocked ? (
                  <>
                    <span className="text-4xl font-black text-slate-800">{lvl.num}</span>
                    <div className="flex gap-1 mt-2">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                      ))}
                    </div>
                    {lvl.isBoss && <Trophy size={20} className="absolute -top-3 -right-3 text-yellow-500 bg-white rounded-full p-1 border-2 border-slate-800" />}
                  </>
                ) : (
                  <Lock className="text-white/50 w-10 h-10" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelection;
