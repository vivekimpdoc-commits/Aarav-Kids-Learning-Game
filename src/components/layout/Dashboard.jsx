import React from 'react';
import { motion } from 'framer-motion';
import { GAMES } from '../../data/games';
import { Card } from '../ui/KidsUI';
import { useGame } from '../../context/GameContext';
import { Lock, Star, Trophy } from 'lucide-react';

const Dashboard = ({ onSelectGame }) => {
  const { stars, unlockedGames, currentLevel } = useGame();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-[3rem] border-4 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)]">
        <div>
          <h1 className="text-5xl font-black text-slate-800 mb-2">Hello, Little Learner! 🌟</h1>
          <p className="text-xl text-slate-600 font-bold">Ready to play and learn English today?</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-kids-sun px-6 py-3 rounded-2xl border-4 border-slate-800">
            <Star className="w-8 h-8 fill-yellow-500 text-yellow-600" />
            <span className="text-3xl font-black text-slate-800">{stars}</span>
          </div>
          <div className="flex items-center gap-3 bg-kids-purple px-6 py-3 rounded-2xl border-4 border-slate-800 text-white">
            <Trophy className="w-8 h-8" />
            <span className="text-3xl font-black">Lvl {currentLevel}</span>
          </div>
        </div>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {GAMES.map((game) => {
          const isUnlocked = unlockedGames.includes(game.id);
          const Icon = game.icon;

          return (
            <motion.div key={game.id} variants={item} whileHover={isUnlocked ? { scale: 1.05 } : {}} whileTap={isUnlocked ? { scale: 0.95 } : {}}>
              <Card 
                onClick={() => isUnlocked && onSelectGame(game.id)}
                className={`relative h-full cursor-pointer overflow-hidden group ${!isUnlocked && 'opacity-80 grayscale'}`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${game.color} -mr-8 -mt-8 rotate-45 transition-transform group-hover:scale-110`} />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4 py-4">
                  <div className={`p-6 rounded-[2rem] ${game.color} border-4 border-slate-800 shadow-[0_6px_0_0_rgba(30,41,59,1)]`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <div>
                    <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      {game.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800">{game.title}</h3>
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center rounded-[1.5rem]">
                      <div className="bg-white p-4 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)]">
                        <Lock className="w-8 h-8 text-slate-800" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
