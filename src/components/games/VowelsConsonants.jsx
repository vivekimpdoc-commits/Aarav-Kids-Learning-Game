import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const VowelsConsonants = ({ onBack }) => {
  const { addStars } = useGame();
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');

  const spawnBalloon = () => {
    const isVowel = Math.random() > 0.6;
    const char = isVowel 
      ? vowels[Math.floor(Math.random() * vowels.length)]
      : consonants[Math.floor(Math.random() * consonants.length)];
    
    const id = Math.random();
    const x = Math.random() * 80 + 10; // 10% to 90%
    const speed = Math.random() * 2 + 3; // 3 to 5 seconds
    const color = [
      'bg-red-400', 'bg-blue-400', 'bg-green-400', 
      'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'
    ][Math.floor(Math.random() * 6)];

    setBalloons(prev => [...prev, { id, char, isVowel, x, speed, color }]);
  };

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(spawnBalloon, 1500);
    return () => clearInterval(interval);
  }, [isGameOver]);

  const popBalloon = (balloon, e) => {
    e.stopPropagation();
    setBalloons(prev => prev.filter(b => b.id !== balloon.id));
    
    if (balloon.isVowel) {
      setScore(s => s + 10);
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`${balloon.char} is a vowel!`);
      synth.speak(utter);
      
      if ((score + 10) % 50 === 0) {
        confetti({ particleCount: 50, spread: 40 });
        addStars(5);
      }
    } else {
      setLives(l => {
        if (l <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return l - 1;
      });
      // Play error sound (using speech for now)
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Oops! ${balloon.char} is a consonant!`);
      synth.speak(utter);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 overflow-hidden relative cursor-crosshair">
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <Button onClick={onBack} variant="secondary" size="sm">
            <ArrowLeft /> Back
          </Button>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-3">
            <Star className="text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-black">{score}</span>
          </div>
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-300'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <h2 className="text-[10rem] font-black text-slate-400 select-none uppercase">Pop the Vowels!</h2>
      </div>

      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: `${b.x}%` }}
            animate={{ y: '-20vh' }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: b.speed, ease: 'linear' }}
            onAnimationComplete={() => {
              setBalloons(prev => prev.filter(ball => ball.id !== b.id));
              if (b.isVowel) setLives(l => Math.max(0, l - 1)); // Missed a vowel!
            }}
            onClick={(e) => popBalloon(b, e)}
            className={`absolute w-32 h-40 ${b.color} rounded-full border-4 border-slate-800 shadow-inner flex items-center justify-center cursor-pointer`}
          >
            <div className="absolute bottom-[-20px] left-1/2 w-1 h-12 bg-slate-800 -translate-x-1/2" />
            <span className="text-5xl font-black text-white drop-shadow-md">{b.char}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-50 p-4"
          >
            <Card className="max-w-md w-full text-center space-y-8 py-12">
              <h3 className="text-5xl font-black text-slate-800">Game Over!</h3>
              <div className="text-2xl font-bold text-slate-600">
                You popped many vowels and earned {Math.floor(score / 10)} stars!
              </div>
              <div className="text-6xl font-black text-kids-sun drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                Score: {score}
              </div>
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => {
                    setScore(0);
                    setLives(3);
                    setBalloons([]);
                    setIsGameOver(false);
                  }}
                  variant="primary"
                >
                  Play Again
                </Button>
                <Button onClick={onBack} variant="secondary">
                  Exit to Menu
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VowelsConsonants;
