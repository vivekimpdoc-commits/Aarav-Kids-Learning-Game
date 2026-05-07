import React from 'react';
import { motion } from 'framer-motion';
import { GAMES } from '../../data/games';
import { Card, Button } from '../ui/KidsUI';
import { useGame } from '../../context/GameContext';
import { Lock, Star, Trophy, ShoppingBag, TrendingUp, Coins } from 'lucide-react';
import { CHARACTERS } from '../../data/levels';

const Dashboard = ({ onSelectGame, onOpenShop }) => {
  const { stars, coins, xp, currentRank, selectedCharacter } = useGame();
  const character = CHARACTERS.find(c => c.id === selectedCharacter) || CHARACTERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* RPG HUD */}
      <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-center bg-white p-8 rounded-[3rem] border-4 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)]">
        
        <div className="flex items-center gap-6">
          <div className="relative">
             <div className="text-[6rem] drop-shadow-lg">{character.emoji}</div>
             <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full border-2 border-slate-800 shadow-md">
                <TrendingUp size={20} />
             </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase italic">Hero {character.name}</h1>
            <p className={`text-xl font-black ${currentRank.color} uppercase tracking-widest`}>{currentRank.title} Rank</p>
            <div className="w-full bg-slate-200 h-4 rounded-full mt-2 overflow-hidden border-2 border-slate-800">
               <motion.div initial={{ width: 0 }} animate={{ width: `${(xp % 1000) / 10}%` }} className="h-full bg-blue-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{xp % 1000} / 1000 XP to next rank</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
           <div className="bg-yellow-400 px-6 py-3 rounded-3xl border-4 border-slate-800 flex items-center gap-3">
              <Coins className="text-yellow-700" />
              <span className="text-3xl font-black text-slate-800">{coins}</span>
           </div>
           <div className="bg-kids-sun px-6 py-3 rounded-3xl border-4 border-slate-800 flex items-center gap-3">
              <Star className="text-yellow-600 fill-yellow-500" />
              <span className="text-3xl font-black text-slate-800">{stars}</span>
           </div>
        </div>

        <div className="flex justify-end">
           <Button onClick={onOpenShop} className="bg-indigo-600 text-white flex items-center gap-2 py-4 px-8 rounded-full shadow-[0_8px_0_0_rgba(49,46,129,1)]">
              <ShoppingBag /> HERO SHOP
           </Button>
        </div>
      </header>

      {/* Game Selection */}
      <div className="mb-8 flex justify-between items-end">
         <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter">Choose Your Quest</h2>
         <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">28 Learning Modules Available</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {GAMES.map((game) => (
          <motion.div key={game.id} whileHover={{ y: -10 }} whileTap={{ scale: 0.95 }}>
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
                <h3 className="text-2xl font-black text-slate-800">{game.title}</h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
