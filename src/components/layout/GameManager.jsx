import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { 
  Pause, 
  Play, 
  RotateCcw, 
  X, 
  Star, 
  Clock, 
  Trophy, 
  AlertCircle,
  Coins,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

const GameManager = ({ level, gameComponent: GameComponent, onBack }) => {
  const { addReward, completeLevel, isMuted } = useGame();
  
  const [gameState, setGameState] = useState('playing'); // playing, paused, won, lost
  const [timeLeft, setTimeLeft] = useState(level.timeLimit);
  const [score, setScore] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  
  const timerRef = useRef(null);

  // Sound Effects Simulation (In real app, use Howler or Audio object)
  const playSound = (type) => {
    if (isMuted) return;
    const synth = window.speechSynthesis;
    const messages = {
      win: "Level Completed! You are amazing!",
      lose: "Oh no! Time is up. Try again!",
      correct: "Good!",
      wrong: "Oops!"
    };
    if (messages[type]) {
      const utter = new SpeechSynthesisUtterance(messages[type]);
      utter.rate = 1.2;
      synth.speak(utter);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('lost');
            playSound('lose');
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
    
    if (newScore >= level.targetScore) {
      handleWin();
    }
  };

  const handleWin = () => {
    setGameState('won');
    clearInterval(timerRef.current);
    
    // Calculate stars (1-3 based on time left)
    const timeRatio = timeLeft / level.timeLimit;
    const stars = timeRatio > 0.6 ? 3 : timeRatio > 0.3 ? 2 : 1;
    setStarsEarned(stars);
    
    // Grant rewards
    addReward(stars, level.reward, level.xp);
    completeLevel(level.id, stars);
    
    // Effects
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#ADFF2F']
    });
    playSound('win');
  };

  const handleRestart = () => {
    setTimeLeft(level.timeLimit);
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col overflow-hidden font-kids">
      {/* Game HUD */}
      <header className="p-4 bg-slate-800 flex justify-between items-center border-b-4 border-slate-700">
        <div className="flex gap-4">
          <Button variant="secondary" size="sm" onClick={() => setGameState('paused')}>
            <Pause />
          </Button>
          <div className="flex items-center gap-2 bg-slate-700 px-4 py-1 rounded-full text-white font-black">
            <Clock className={timeLeft < 10 ? "text-red-400 animate-pulse" : "text-sky-400"} />
            <span className={timeLeft < 10 ? "text-red-400" : ""}>{timeLeft}s</span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-slate-700 px-6 py-1 rounded-full border-2 border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-xs font-black uppercase">Progress</span>
              <div className="w-32 h-3 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / level.targetScore) * 100}%` }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                />
              </div>
              <span className="text-white font-black">{score}/{level.targetScore}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/50 font-black uppercase leading-none">Level</p>
            <p className="text-xl text-white font-black leading-none">{level.id}</p>
          </div>
          <Button variant="danger" size="sm" onClick={onBack}>
            <X />
          </Button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 relative bg-sky-50 overflow-hidden">
        <div className="absolute inset-0 p-4">
           {GameComponent && (
             <GameComponent 
               onScore={handleScore} 
               difficulty={level.difficulty} 
               isPaused={gameState !== 'playing'}
             />
           )}
        </div>

        {/* Boss Indicator */}
        {level.isBoss && gameState === 'playing' && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-black text-2xl shadow-xl z-10 flex items-center gap-3 border-4 border-white"
          >
            <AlertCircle className="animate-pulse" /> BOSS CHALLENGE!
          </motion.div>
        )}
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {gameState === 'paused' && (
          <Overlay>
            <Card className="max-w-sm w-full text-center space-y-8 p-12">
              <h2 className="text-5xl font-black text-slate-800">PAUSED</h2>
              <div className="flex flex-col gap-4">
                <Button onClick={() => setGameState('playing')} size="lg" className="text-2xl">
                  <Play /> RESUME
                </Button>
                <Button onClick={handleRestart} variant="secondary">
                  <RotateCcw /> RESTART
                </Button>
                <Button onClick={onBack} variant="danger">
                  <X /> QUIT GAME
                </Button>
              </div>
            </Card>
          </Overlay>
        )}

        {gameState === 'won' && (
          <Overlay>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Card className="max-w-md w-full text-center space-y-6 p-10 bg-gradient-to-br from-white to-sky-50 border-8 border-yellow-400">
                <Trophy className="mx-auto w-24 h-24 text-yellow-500" />
                <h2 className="text-6xl font-black text-slate-800">VICTORY!</h2>
                
                <div className="flex justify-center gap-4 py-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: i < starsEarned ? 1.2 : 1, opacity: i < starsEarned ? 1 : 0.3 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <Star size={60} className={i < starsEarned ? "fill-yellow-400 text-yellow-400 drop-shadow-lg" : "text-slate-300"} />
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-100 p-4 rounded-3xl">
                  <div className="flex flex-col items-center">
                    <Coins className="text-yellow-600 mb-1" />
                    <span className="text-2xl font-black text-slate-800">+{level.reward}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Coins</span>
                  </div>
                  <div className="flex flex-col items-center border-l-2 border-slate-200">
                    <TrendingUp className="text-blue-600 mb-1" />
                    <span className="text-2xl font-black text-slate-800">+{level.xp}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">XP Gained</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button onClick={onBack} size="lg" className="py-8 text-3xl shadow-[0_10px_0_0_rgba(14,165,233,1)]">
                    CONTINUE ➡️
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Overlay>
        )}

        {gameState === 'lost' && (
          <Overlay>
            <Card className="max-w-sm w-full text-center space-y-8 p-12 border-8 border-red-500">
              <h2 className="text-5xl font-black text-slate-800">GAME OVER</h2>
              <div className="text-8xl">⏰</div>
              <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Time is up!</p>
              <div className="flex flex-col gap-4">
                <Button onClick={handleRestart} size="lg" className="text-2xl">
                  TRY AGAIN
                </Button>
                <Button onClick={onBack} variant="secondary">
                  BACK TO MENU
                </Button>
              </div>
            </Card>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
};

const Overlay = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
  >
    {children}
  </motion.div>
);

export default GameManager;
