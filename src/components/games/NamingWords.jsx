import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const NamingWords = ({ onScore, difficulty, isPaused }) => {
  const words = [
    { name: 'Teacher', category: 'Person', emoji: '🧑‍🏫' },
    { name: 'School', category: 'Place', emoji: '🏫' },
    { name: 'Lion', category: 'Animal', emoji: '🦁' },
    { name: 'Pencil', category: 'Thing', emoji: '✏️' },
    { name: 'Mother', category: 'Person', emoji: '👩' },
    { name: 'Park', category: 'Place', emoji: '🌳' },
    { name: 'Elephant', category: 'Animal', emoji: '🐘' },
    { name: 'Book', category: 'Thing', emoji: '📖' },
  ];

  const categories = ['Person', 'Place', 'Animal', 'Thing'];
  const [current, setCurrent] = useState(0);

  const handleChoice = (cat) => {
    if (isPaused) return;
    if (cat === words[current].category) {
      onScore(1);
      setCurrent((current + 1) % words.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          className="text-center mb-12"
        >
          <div className="text-[12rem] mb-4">{words[current].emoji}</div>
          <h3 className="text-6xl font-black text-slate-800 uppercase tracking-tighter">
            {words[current].name}
          </h3  >
          <p className="text-slate-500 font-bold text-xl mt-2 uppercase tracking-widest italic">What is this?</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => handleChoice(cat)}
            className="text-2xl py-8 shadow-[0_8px_0_0_rgba(0,0,0,0.1)]"
            variant={cat === 'Person' ? 'primary' : cat === 'Place' ? 'success' : cat === 'Animal' ? 'warning' : 'danger'}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NamingWords;
