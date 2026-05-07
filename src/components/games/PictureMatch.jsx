import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const ITEMS = [
  { img: '🍎', name: 'APPLE' },
  { img: '🐶', name: 'DOG' },
  { img: '🚗', name: 'CAR' },
  { img: '🎈', name: 'BALLOON' },
  { img: '🐱', name: 'CAT' },
  { img: '🍦', name: 'ICE CREAM' },
];

const PictureMatch = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [current]);

  const generateRound = () => {
    const target = ITEMS[current];
    const opts = [target.name];
    while (opts.length < 4) {
      const random = ITEMS[Math.floor(Math.random() * ITEMS.length)].name;
      if (!opts.includes(random)) opts.push(random);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (name) => {
    if (isPaused) return;
    if (name === ITEMS[current].name) {
      onScore(1);
      setCurrent((current + 1) % ITEMS.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        key={current}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-64 h-64 bg-white rounded-[3rem] border-8 border-kids-sky flex items-center justify-center text-[10rem] font-black text-kids-sky shadow-2xl mb-12"
      >
        {ITEMS[current].img}
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-3xl py-10"
            variant="secondary"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PictureMatch;
