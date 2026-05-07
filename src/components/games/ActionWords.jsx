import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const ActionWords = ({ onBack }) => {
  const { addStars } = useGame();
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const actions = [
    { name: 'RUN', emoji: '🏃', animation: { x: [0, 100, 0] } },
    { name: 'JUMP', emoji: '🦘', animation: { y: [0, -100, 0] } },
    { name: 'SLEEP', emoji: '😴', animation: { opacity: [1, 0.5, 1] } },
    { name: 'EAT', emoji: '🍕', animation: { scale: [1, 1.2, 1] } },
    { name: 'DANCE', emoji: '💃', animation: { rotate: [0, 20, -20, 0] } },
    { name: 'SWIM', emoji: '🏊', animation: { x: [0, -50, 50, 0] } },
  ];

  const generateRound = () => {
    const target = actions[Math.floor(Math.random() * actions.length)];
    const opts = [target];
    while (opts.length < 4) {
      const random = actions[Math.floor(Math.random() * actions.length)];
      if (!opts.find(o => o.name === random.name)) opts.push(random);
    }
    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (name) => {
    if (name === current.name) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 50, spread: 60 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Yes! That is ${name}`);
      synth.speak(utter);
      setTimeout(generateRound, 1500);
    } else {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Try again!`);
      synth.speak(utter);
    }
  };

  if (!current) return null;

  return (
    <div className="min-h-screen bg-kids-purple/5 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-black">{score}</span>
        </div>
      </header>

      <main className="max-w-3xl w-full text-center space-y-12">
        <h2 className="text-5xl font-black text-slate-800 underline decoration-kids-purple">Action Words!</h2>
        
        <div className="flex justify-center py-12">
          <motion.div
            key={current.name}
            animate={current.animation}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[15rem] leading-none drop-shadow-2xl"
          >
            {current.emoji}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {options.map((opt) => (
            <Button
              key={opt.name}
              onClick={() => handleChoice(opt.name)}
              className="text-4xl py-8"
            >
              {opt.name}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ActionWords;
