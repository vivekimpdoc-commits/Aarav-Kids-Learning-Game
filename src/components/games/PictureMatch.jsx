import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const PictureMatch = ({ onBack }) => {
  const { addStars } = useGame();
  const [currentPair, setCurrentPair] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const data = [
    { word: 'APPLE', emoji: '🍎' }, { word: 'DOG', emoji: '🐶' }, 
    { word: 'CAT', emoji: '🐱' }, { word: 'SUN', emoji: '☀️' },
    { word: 'FISH', emoji: '🐟' }, { word: 'CAR', emoji: '🚗' },
    { word: 'BALL', emoji: '⚽' }, { word: 'TREE', emoji: '🌳' },
  ];

  const generateRound = () => {
    const target = data[Math.floor(Math.random() * data.length)];
    const opts = [target];
    while (opts.length < 4) {
      const random = data[Math.floor(Math.random() * data.length)];
      if (!opts.find(o => o.word === random.word)) opts.push(random);
    }
    setCurrentPair(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (word) => {
    if (word === currentPair.word) {
      setScore(s => s + 1);
      addStars(10);
      confetti({ particleCount: 100, spread: 70 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Yes! That is an ${word}`);
      synth.speak(utter);
      setTimeout(generateRound, 1500);
    } else {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Try again! That was a ${word}`);
      synth.speak(utter);
    }
  };

  if (!currentPair) return null;

  return (
    <div className="min-h-screen bg-kids-grass/10 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-black">{score}</span>
        </div>
      </header>

      <main className="max-w-2xl w-full text-center space-y-12">
        <h2 className="text-5xl font-black text-slate-800">What is this?</h2>
        
        <motion.div
          key={currentPair.emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-[12rem] md:text-[15rem] leading-none select-none filter drop-shadow-xl"
        >
          {currentPair.emoji}
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {options.map((opt) => (
            <Button
              key={opt.word}
              onClick={() => handleChoice(opt.word)}
              variant="primary"
              className="text-3xl py-8"
            >
              {opt.word}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PictureMatch;
