import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { CHARACTERS } from '../../data/levels';
import { 
  Pause, Play, RotateCcw, X, Star, Clock, Trophy, 
  AlertCircle, Coins, TrendingUp, Shield, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

const GameManager = ({ level, gameComponent: GameComponent, onBack }) => {
  const { addReward, completeLevel, isMuted, selectedCharacter } = useGame();
  const character = CHARACTERS.find(c => c.id === selectedCharacter) || CHARACTERS[0];
  
  const [gameState, setGameState] = useState('playing'); 
  const [timeLeft, setTimeLeft] = useState(level.timeLimit);
  const [score, setScore] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [damage, setDamage] = useState(0);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('lost');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, timeLeft]);

  const handleScore = (points = 1) => {
    const newScore = score + points;
    setScore(newScore);
    if (newScore >= level.targetScore) handleWin();
  };

  const handleWin = () => {
    setGameState('won');
    clearInterval(timerRef.current);
    const timeRatio = timeLeft / level.timeLimit;
    const stars = timeRatio > 0.6 ? 3 : timeRatio > 0.3 ? 2 : 1;
    setStarsEarned(stars);
    addReward(stars, level.reward, level.xp);
    completeLevel(level.id, stars);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  const themeClass = level.theme.bg;
  const skyClass = level.theme.sky;

  return (
    <div className={`fixed inset-0 ${themeClass} z-[100] flex flex-col overflow-hidden transition-colors duration-1000`}>
      
      {/* Dynamic Weather Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {level.weather === 'rainy' && <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />}
        {level.weather === 'stormy' && <div className="absolute inset-0 bg-white/5 animate-flash" />}
      </div>

      {/* Level HUD */}
      <header className={`p-4 ${skyClass} flex justify-between items-center border-b-8 border-black/20 z-20`}>
        <div className="flex gap-4">
          <Button variant="secondary" size="sm" onClick={() => setGameState('paused')}>
            <Pause />
          </Button>
          <div className="bg-black/30 px-6 py-2 rounded-full border-4 border-white/50 text-white font-black flex items-center gap-2">
            <Clock className={timeLeft < 10 ? "text-red-400 animate-pulse" : "text-sky-300"} />
            <span className="text-2xl">{timeLeft}s</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/20 px-8 py-2 rounded-[2rem] border-4 border-white/30 backdrop-blur-md">
          <span className="text-4xl">{character.emoji}</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-white font-black uppercase leading-none">{character.name}</span>
            <div className="w-32 h-4 bg-black/40 rounded-full mt-1 overflow-hidden border-2 border-white/20">
               <motion.div animate={{ width: `${(score/level.targetScore)*100}%` }} className="h-full bg-yellow-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-white">
             <p className="text-xs font-black uppercase opacity-60">Level</p>
             <p className="text-3xl font-black">{level.id}</p>
          </div>
          <Button variant="danger" size="sm" onClick={onBack}><X /></Button>
        </div>
      </header>

      {/* Action Game Area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Level Mission Banner */}
        <motion.div 
          initial={{ y: -100 }} animate={{ y: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 px-8 py-2 rounded-full shadow-2xl z-20 border-4 border-slate-800"
        >
          <p className="text-slate-800 font-black text-xl italic uppercase tracking-tighter">Mission: {level.mission}</p>
        </motion.div>

        {/* Floating Enemies / Obstacles Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {level.hasEnemies && [...Array(level.difficulty)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 x: [Math.random()*1000, Math.random()*1000],
                 y: [Math.random()*600, Math.random()*600]
               }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute text-5xl opacity-30"
             >
               👾
             </motion.div>
          ))}
        </div>

        {/* Actual Gameplay */}
        <div className="absolute inset-0 p-8 flex items-center justify-center">
           <div className="max-w-4xl w-full h-full bg-white/10 backdrop-blur-sm rounded-[4rem] border-8 border-white/20 p-8 shadow-inner overflow-y-auto">
             {GameComponent && (
               <GameComponent 
                 onScore={handleScore} 
                 difficulty={level.difficulty} 
                 isPaused={gameState !== 'playing'}
               />
             )}
           </div>
        </div>

        {/* Night Mode Overlay */}
        {level.hasNightMode && <div className="absolute inset-0 bg-indigo-950/40 pointer-events-none mix-blend-multiply" />}
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[300] flex items-center justify-center p-6">
             {gameState === 'won' ? (
                <Card className="max-w-md w-full text-center p-12 border-8 border-yellow-400 bg-gradient-to-br from-white to-sky-50 shadow-[0_0_100px_rgba(250,204,21,0.5)]">
                   <Trophy className="mx-auto w-24 h-24 text-yellow-500 mb-4 animate-bounce" />
                   <h2 className="text-6xl font-black text-slate-800">LEVEL UP!</h2>
                   <div className="flex justify-center gap-2 py-8">
                     {[...Array(3)].map((_, i) => (
                       <Star key={i} size={60} className={i < starsEarned ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                     ))}
                   </div>
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-100 p-4 rounded-3xl">
                         <Coins className="text-yellow-600 mx-auto mb-1" />
                         <span className="text-2xl font-black">+{level.reward}</span>
                      </div>
                      <div className="bg-slate-100 p-4 rounded-3xl">
                         <Zap className="text-blue-600 mx-auto mb-1" />
                         <span className="text-2xl font-black">+{level.xp} XP</span>
                      </div>
                   </div>
                   <Button onClick={onBack} size="lg" className="w-full py-8 text-4xl shadow-[0_12px_0_0_rgba(14,165,233,1)]">NEXT ➡️</Button>
                </Card>
             ) : gameState === 'paused' ? (
                <Card className="max-w-sm w-full text-center p-12 space-y-8">
                   <h2 className="text-5xl font-black text-slate-800 italic">PAUSED</h2>
                   <div className="flex flex-col gap-4">
                      <Button onClick={() => setGameState('playing')} size="lg" className="text-2xl">RESUME</Button>
                      <Button onClick={onBack} variant="secondary">QUIT</Button>
                   </div>
                </Card>
             ) : (
                <Card className="max-w-sm w-full text-center p-12 space-y-8 border-8 border-red-500">
                   <h2 className="text-5xl font-black text-slate-800">FAILED!</h2>
                   <div className="text-8xl">💥</div>
                   <Button onClick={() => { setGameState('playing'); setTimeLeft(level.timeLimit); setScore(0); }} size="lg" className="w-full">TRY AGAIN</Button>
                   <Button onClick={onBack} variant="secondary" className="w-full">BACK</Button>
                </Card>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameManager;
