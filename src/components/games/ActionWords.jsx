import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const ActionWords = ({ onScore, difficulty, isPaused }) => {
  const actions = [
    { name: 'RUN', emoji: '🏃', animation: { x: [0, 100, 0] } },
    { name: 'JUMP', emoji: '🦘', animation: { y: [0, -100, 0] } },
    { name: 'SLEEP', emoji: '😴', animation: { opacity: [1, 0.5, 1] } },
    { name: 'EAT', emoji: '🍕', animation: { scale: [1, 1.2, 1] } },
    { name: 'DANCE', emoji: '💃', animation: { rotate: [0, 20, -20, 0] } },
    { name: 'SWIM', emoji: '🏊', animation: { x: [0, -50, 50, 0] } },
  ];

  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [current]);

  const generateRound = () => {
    const target = actions[current];
    const opts = [target.name];
    while (opts.length < 4) {
      const random = actions[Math.floor(Math.random() * actions.length)].name;
      if (!opts.includes(random)) opts.push(random);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (name) => {
    if (isPaused) return;
    if (name === actions[current].name) {
      onScore(1);
      setCurrent((current + 1) % actions.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          animate={actions[current].animation}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[15rem] mb-12 drop-shadow-2xl"
        >
          {actions[current].emoji}
        </motion.div>
      </AnimatePresence>

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

export default ActionWords;
