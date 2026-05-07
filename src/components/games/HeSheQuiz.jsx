import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const HeSheQuiz = ({ onBack }) => {
  const { addStars } = useGame();
  const [current, setCurrent] = useState(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    { name: 'Boy', answer: 'He', emoji: '👦' },
    { name: 'Girl', answer: 'She', emoji: '👧' },
    { name: 'Father', answer: 'He', emoji: '👨' },
    { name: 'Mother', answer: 'She', emoji: '👩' },
    { name: 'Grandpa', answer: 'He', emoji: '👴' },
    { name: 'Grandma', answer: 'She', emoji: '👵' },
    { name: 'King', answer: 'He', emoji: '🤴' },
    { name: 'Queen', answer: 'She', emoji: '👸' },
  ];

  const generateRound = () => {
    setCurrent(questions[Math.floor(Math.random() * questions.length)]);
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (choice) => {
    if (choice === current.answer) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 50, spread: 60 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Correct! For a ${current.name}, we use ${choice}`);
      synth.speak(utter);
      setTimeout(generateRound, 1200);
    } else {
      setLives(l => {
        if (l <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return l - 1;
      });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Oops! That's not right.`);
      synth.speak(utter);
    }
  };

  if (!current) return null;

  return (
    <div className="min-h-screen bg-rose-50 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
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

      <main className="max-w-2xl w-full text-center space-y-12">
        <h2 className="text-5xl font-black text-slate-800">He or She?</h2>
        
        <motion.div
          key={current.name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-8 border-slate-800 shadow-[0_15px_0_0_rgba(30,41,59,1)]"
        >
          <div className="text-[12rem] mb-6">{current.emoji}</div>
          <h3 className="text-5xl font-black text-slate-800 uppercase tracking-tight">{current.name}</h3>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          <Button onClick={() => handleChoice('He')} variant="primary" className="text-5xl py-10 rounded-[3rem]">
            HE
          </Button>
          <Button onClick={() => handleChoice('She')} variant="secondary" className="text-5xl py-10 rounded-[3rem]">
            SHE
          </Button>
        </div>
      </main>

      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-50 p-4"
          >
            <Card className="max-w-md w-full text-center space-y-8 py-12">
              <h3 className="text-5xl font-black text-slate-800 uppercase">OUT!</h3>
              <div className="text-8xl">😢</div>
              <p className="text-2xl font-bold text-slate-600">Don't give up! Try again to learn He and She.</p>
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => {
                    setLives(3);
                    setScore(0);
                    generateRound();
                    setIsGameOver(false);
                  }}
                  variant="primary"
                >
                  Play Again
                </Button>
                <Button onClick={onBack} variant="secondary">
                  Exit
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeSheQuiz;
