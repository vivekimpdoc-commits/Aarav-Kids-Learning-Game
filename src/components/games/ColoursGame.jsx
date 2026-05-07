import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const ColoursGame = ({ onScore, difficulty, isPaused }) => {
  const colours = [
    { name: 'RED', hex: '#ef4444' },
    { name: 'BLUE', hex: '#3b82f6' },
    { name: 'GREEN', hex: '#22c55e' },
    { name: 'YELLOW', hex: '#eab308' },
    { name: 'PINK', hex: '#ec4899' },
    { name: 'ORANGE', hex: '#f97316' },
    { name: 'PURPLE', hex: '#a855f7' },
  ];

  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [current]);

  const generateRound = () => {
    const target = colours[current];
    const opts = [target.name];
    while (opts.length < 4) {
      const random = colours[Math.floor(Math.random() * colours.length)].name;
      if (!opts.includes(random)) opts.push(random);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (name) => {
    if (isPaused) return;
    if (name === colours[current].name) {
      onScore(1);
      setCurrent((current + 1) % colours.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        key={current}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        style={{ backgroundColor: colours[current].hex }}
        className="w-72 h-72 rounded-[4rem] shadow-2xl mb-12 border-8 border-white"
      />

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

export default ColoursGame;
