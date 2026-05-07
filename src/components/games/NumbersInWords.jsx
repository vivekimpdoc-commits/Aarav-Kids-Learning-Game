import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const NumbersInWords = ({ onScore, difficulty, isPaused }) => {
  const numbers = [
    { n: 1, w: 'ONE' }, { n: 2, w: 'TWO' }, { n: 3, w: 'THREE' },
    { n: 4, w: 'FOUR' }, { n: 5, w: 'FIVE' }, { n: 6, w: 'SIX' },
    { n: 7, w: 'SEVEN' }, { n: 8, w: 'EIGHT' }, { n: 9, w: 'NINE' },
    { n: 10, w: 'TEN' }
  ];

  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [current]);

  const generateRound = () => {
    const target = numbers[current];
    const opts = [target.w];
    while (opts.length < 4) {
      const random = numbers[Math.floor(Math.random() * numbers.length)].w;
      if (!opts.includes(random)) opts.push(random);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (word) => {
    if (isPaused) return;
    if (word === numbers[current].w) {
      onScore(1);
      setCurrent((current + 1) % numbers.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        key={current}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-64 h-64 bg-white rounded-full border-8 border-yellow-400 flex items-center justify-center text-[10rem] font-black text-yellow-500 shadow-2xl mb-12"
      >
        {numbers[current].n}
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-4xl py-10"
            variant="secondary"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NumbersInWords;
