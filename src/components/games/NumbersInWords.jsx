import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const NumbersInWords = ({ onScore, difficulty, isPaused }) => {
  // Scale the number range based on difficulty
  // Level 1: 1-10
  // Level 5: 1-50
  // Level 10+: 1-100
  const maxNumber = Math.min(100, difficulty * 10);
  
  const numberWords = {
    1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE', 6: 'SIX', 7: 'SEVEN', 8: 'EIGHT', 9: 'NINE', 10: 'TEN',
    11: 'ELEVEN', 12: 'TWELVE', 13: 'THIRTEEN', 14: 'FOURTEEN', 15: 'FIFTEEN', 16: 'SIXTEEN', 17: 'SEVENTEEN', 18: 'EIGHTEEN', 19: 'NINETEEN', 20: 'TWENTY',
    30: 'THIRTY', 40: 'FORTY', 50: 'FIFTY', 60: 'SIXTY', 70: 'SEVENTY', 80: 'EIGHTY', 90: 'NINETY', 100: 'HUNDRED'
  };

  const getWord = (n) => {
    if (numberWords[n]) return numberWords[n];
    if (n < 100) {
      const tens = Math.floor(n / 10) * 10;
      const ones = n % 10;
      return `${numberWords[tens]}${ones > 0 ? '-' + numberWords[ones] : ''}`;
    }
    return n.toString();
  };

  const [target, setTarget] = useState(1);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [difficulty]); // Regenerate if difficulty changes

  const generateRound = () => {
    const num = Math.floor(Math.random() * maxNumber) + 1;
    const opts = [getWord(num)];
    while (opts.length < 4) {
      const rand = Math.floor(Math.random() * maxNumber) + 1;
      const randWord = getWord(rand);
      if (!opts.includes(randWord)) opts.push(randWord);
    }
    setTarget(num);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (word) => {
    if (isPaused) return;
    if (word === getWord(target)) {
      onScore(1);
      generateRound();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
         <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Number Range: 1 - {maxNumber}</p>
         <motion.div
           key={target}
           initial={{ scale: 0, rotate: -20 }}
           animate={{ scale: 1, rotate: 0 }}
           className="w-56 h-56 bg-white rounded-full border-8 border-yellow-400 flex items-center justify-center text-[8rem] font-black text-yellow-500 shadow-2xl mx-auto"
         >
           {target}
         </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-2xl py-8 font-black uppercase tracking-tighter"
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
