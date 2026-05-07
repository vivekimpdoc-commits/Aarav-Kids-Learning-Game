import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const QUESTIONS = [
  { img: '👨', ans: 'He', label: 'Father' },
  { img: '👩', ans: 'She', label: 'Mother' },
  { img: '👦', ans: 'He', label: 'Boy' },
  { img: '👧', ans: 'She', label: 'Girl' },
  { img: '👴', ans: 'He', label: 'Grandpa' },
  { img: '👵', ans: 'She', label: 'Grandma' },
];

const HeSheQuiz = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(0);

  const handleChoice = (ans) => {
    if (isPaused) return;
    if (ans === QUESTIONS[current].ans) {
      onScore(1);
      setCurrent((current + 1) % QUESTIONS.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="text-center mb-12"
        >
          <div className="text-[12rem] mb-4">{QUESTIONS[current].img}</div>
          <h3 className="text-5xl font-black text-slate-800 uppercase tracking-tighter">
            {QUESTIONS[current].label}
          </h3>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-8 w-full max-w-xl">
        <button
          onClick={() => handleChoice('He')}
          className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 text-white py-12 rounded-[3rem] text-5xl font-black shadow-[0_12px_0_0_rgba(29,78,216,1)] hover:scale-105 active:translate-y-2 active:shadow-none transition-all"
        >
          HE
        </button>
        <button
          onClick={() => handleChoice('She')}
          className="flex-1 bg-gradient-to-br from-pink-400 to-pink-600 text-white py-12 rounded-[3rem] text-5xl font-black shadow-[0_12px_0_0_rgba(190,18,60,1)] hover:scale-105 active:translate-y-2 active:shadow-none transition-all"
        >
          SHE
        </button>
      </div>
    </div>
  );
};

export default HeSheQuiz;
