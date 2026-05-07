import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const MissingLetter = ({ onScore, difficulty, isPaused }) => {
  const [sequence, setSequence] = useState([]);
  const [missingIdx, setMissingIdx] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateRound();
  }, [difficulty]);

  const generateRound = () => {
    const seqLength = Math.min(6, 3 + Math.floor(difficulty / 2));
    const startIdx = Math.floor(Math.random() * (ALPHABET.length - seqLength));
    const newSeq = ALPHABET.slice(startIdx, startIdx + seqLength);
    
    const mIdx = Math.floor(Math.random() * seqLength);
    const target = newSeq[mIdx];
    
    const opts = [target];
    while (opts.length < 4) {
      const rand = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!opts.includes(rand)) opts.push(rand);
    }

    setSequence(newSeq);
    setMissingIdx(mIdx);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (choice) => {
    if (isPaused) return;
    if (choice === sequence[missingIdx]) {
      onScore(1);
      generateRound();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">What comes in the blank?</p>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          {sequence.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`
                w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-4 flex items-center justify-center text-5xl font-black shadow-xl
                ${i === missingIdx 
                  ? 'bg-yellow-100 border-yellow-400 border-dashed text-yellow-600 animate-pulse' 
                  : 'bg-white border-slate-200 text-slate-800'
                }
              `}
            >
              {i === missingIdx ? '?' : letter}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-4xl py-10 font-black"
            variant="secondary"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MissingLetter;
