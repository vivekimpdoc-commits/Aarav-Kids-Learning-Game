import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMES } from '../../data/games';
import { Card, Button } from '../ui/KidsUI';
import { useGame } from '../../context/GameContext';
import { 
  Lock, Star, Trophy, ShoppingBag, TrendingUp, 
  Coins, Gift, Award, Calendar, Sparkles 
} from 'lucide-react';
import { CHARACTERS, ACHIEVEMENTS } from '../../data/levels';

const Dashboard = ({ onSelectGame, onOpenShop }) => {
  const { stars, coins, xp, currentRank, selectedCharacter, completedLevels, addReward } = useGame();
  const character = CHARACTERS.find(c => c.id === selectedCharacter) || CHARACTERS[0];
  const [showDaily, setShowDaily] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);

  const handleDailyClaim = () => {
    addReward(0, 100, 50);
    setClaimedToday(true);
    setTimeout(() => setShowDaily(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* RPG HUD */}
      <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-center bg-white p-8 rounded-[3rem] border-4 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)]">
        
        <div className="flex items-center gap-6">
          <div className="relative">
             <div className="text-[6rem] drop-shadow-lg">{character.emoji}</div>
             <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full border-2 border-slate-800 shadow-md">
                <TrendingUp size={20} />
             </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase italic leading-none">Hero {character.name}</h1>
            <p className={`text-xl font-black ${currentRank.color} uppercase tracking-widest`}>{currentRank.title} Rank</p>
            <div className="w-full bg-slate-200 h-4 rounded-full mt-2 overflow-hidden border-2 border-slate-800">
               <motion.div initial={{ width: 0 }} animate={{ width: `${(xp % 1000) / 10}%` }} className="h-full bg-blue-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
           <div className="bg-yellow-400 px-6 py-3 rounded-3xl border-4 border-slate-800 flex items-center gap-3">
              <Coins className="text-yellow-700" />
              <span className="text-3xl font-black text-slate-800">{coins}</span>
           </div>
           <div className="bg-sky-400 px-6 py-3 rounded-3xl border-4 border-slate-800 flex items-center gap-3">
              <Star className="text-sky-700 fill-sky-500" />
              <span className="text-3xl font-black text-slate-800">{stars}</span>
           </div>
        </div>

        <div className="flex flex-col gap-2">
           <Button onClick={onOpenShop} className="bg-indigo-600 text-white flex items-center justify-center gap-2 py-4 rounded-full shadow-[0_6px_0_0_rgba(49,46,129,1)]">
              <ShoppingBag /> HERO SHOP
           </Button>
           <Button onClick={() => setShowDaily(true)} variant="secondary" className="flex items-center justify-center gap-2 py-4 rounded-full">
              <Gift /> DAILY REWARD
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Achievements Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-[2.5rem] border-4 border-slate-800 shadow-[0_8px_0_0_rgba(30,41,59,1)]">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 mb-4">
                <Award className="text-purple-500" /> BADGES
              </h2>
              <div className="space-y-4">
                 {ACHIEVEMENTS.map(ach => {
                   const isCompleted = (ach.id === 'first_win' && Object.keys(completedLevels).length > 0);
                   return (
                     <div key={ach.id} className={`p-4 rounded-2xl border-2 ${isCompleted ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                        <div className="flex gap-3 items-center">
                           <span className="text-3xl">{ach.icon}</span>
                           <div>
                              <p className="font-black text-slate-800 text-sm leading-none">{ach.title}</p>
                              <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">{ach.description}</p>
                           </div>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>
        </aside>

        {/* Game Quests Grid */}
        <main className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-end">
             <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter">Choose Your Quest</h2>
             <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">28 Learning Worlds</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game) => (
              <motion.div key={game.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card 
                  onClick={() => onSelectGame(game.id)}
                  className="relative h-full cursor-pointer overflow-hidden group p-6 flex flex-col items-center text-center gap-4"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${game.color} -mr-8 -mt-8 rotate-45 transition-transform group-hover:scale-110`} />
                  <div className={`p-6 rounded-[2rem] ${game.color} border-4 border-slate-800 shadow-[0_6px_0_0_rgba(30,41,59,1)]`}>
                    <game.icon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-2 uppercase">
                      {game.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-800">{game.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Daily Reward Modal */}
      <AnimatePresence>
        {showDaily && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[500] flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Card className="max-w-sm w-full text-center p-12 space-y-6 bg-gradient-to-br from-white to-yellow-50 border-8 border-yellow-400">
                <Sparkles className="mx-auto w-20 h-20 text-yellow-500 animate-pulse" />
                <h2 className="text-4xl font-black text-slate-800 uppercase italic">Daily Treasure!</h2>
                {claimedToday ? (
                  <div className="space-y-4">
                    <p className="text-3xl font-black text-green-500">+100 COINS</p>
                    <p className="text-3xl font-black text-blue-500">+50 XP</p>
                    <p className="text-slate-500 font-bold">Come back tomorrow!</p>
                  </div>
                ) : (
                  <Button onClick={handleDailyClaim} size="lg" className="w-full py-8 text-2xl shadow-[0_8px_0_0_rgba(14,165,233,1)]">
                    OPEN CHEST 🎁
                  </Button>
                )}
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
