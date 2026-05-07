import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const ColoursGame = ({ onBack }) => {
  const { addStars } = useGame();
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const colors = [
    { name: 'Red', hex: '#ef4444' }, { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' }, { name: 'Yellow', hex: '#eab308' },
    { name: 'Pink', hex: '#ec4899' }, { name: 'Purple', hex: '#a855f7' },
    { name: 'Orange', hex: '#f97316' }, { name: 'Brown', hex: '#78350f' }
  ];

  const generateRound = () => {
    const t = colors[Math.floor(Math.random() * colors.length)];
    const opts = [t];
    while (opts.length < 4) {
      const random = colors[Math.floor(Math.random() * colors.length)];
      if (!opts.find(o => o.name === random.name)) opts.push(random);
    }
    setTarget(t);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (color) => {
    if (color.name === target.name) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 50, spread: 60 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Yes! That is ${color.name}`);
      synth.speak(utter);
      setTimeout(generateRound, 1000);
    } else {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Try another one!`);
      synth.speak(utter);
    }
  };

  if (!target) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
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
        <h2 className="text-6xl font-black text-slate-800 tracking-tight">Find the <span style={{ color: target.hex }} className="drop-shadow-sm uppercase">{target.name}</span>!</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {options.map((opt) => (
            <motion.div
              key={opt.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(opt)}
              className="aspect-square rounded-[3rem] border-8 border-slate-800 shadow-[0_15px_0_0_rgba(30,41,59,1)] cursor-pointer overflow-hidden relative group"
              style={{ backgroundColor: opt.hex }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ColoursGame;
