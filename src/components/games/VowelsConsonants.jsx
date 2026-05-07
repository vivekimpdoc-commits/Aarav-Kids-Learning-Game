import React, { useState } from 'react';


import { motion } from 'framer-motion';
import { Card } from '../ui/KidsUI';

const VowelsConsonants = ({ onScore, difficulty, isPaused }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [current, setCurrent] = useState(letters[0]);
  const [idx, setIdx] = useState(0);

  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const handleSort = (type) => {
    if (isPaused) return;
    const isVowel = vowels.includes(current);
    const correct = (type === 'vowel' && isVowel) || (type === 'consonant' && !isVowel);

    if (correct) {
      onScore(1);
      const nextIdx = (idx + 1) % letters.length;
      setIdx(nextIdx);
      setCurrent(letters[nextIdx]);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12">
      <motion.div
        key={current}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-56 h-56 bg-white rounded-full border-8 border-kids-sky flex items-center justify-center text-[10rem] font-black text-kids-sky shadow-2xl"
      >
        {current}
      </motion.div>

      <div className="flex gap-8 w-full max-w-xl">
        <button
          onClick={() => handleSort('vowel')}
          className="flex-1 bg-gradient-to-br from-pink-400 to-rose-500 text-white py-10 rounded-[3rem] text-4xl font-black shadow-[0_12px_0_0_rgba(190,18,60,1)] hover:scale-105 active:translate-y-2 active:shadow-none transition-all"
        >
          VOWEL
        </button>
        <button
          onClick={() => handleSort('consonant')}
          className="flex-1 bg-gradient-to-br from-sky-400 to-indigo-500 text-white py-10 rounded-[3rem] text-4xl font-black shadow-[0_12px_0_0_rgba(30,58,138,1)] hover:scale-105 active:translate-y-2 active:shadow-none transition-all"
        >
          CONSONANT
        </button>
      </div>
    </div>
  );
};

export default VowelsConsonants;
