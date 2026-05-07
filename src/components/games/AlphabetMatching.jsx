import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetMatching = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const target = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    const opts = [target];
    while (opts.length < 4) {
      const random = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      if (!opts.includes(random)) opts.push(random);
    }
    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (choice) => {
    if (isPaused) return;
    if (choice === current) {
      onScore(1);
      generateRound();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12">
      <motion.div
        key={current}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-64 h-64 bg-white rounded-[3rem] border-8 border-kids-sky shadow-2xl flex items-center justify-center"
      >
        <span className="text-[10rem] font-black text-kids-sky">{current}</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-5xl py-8 font-black"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetMatching;
