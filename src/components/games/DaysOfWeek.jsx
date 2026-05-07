import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

const DaysOfWeek = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    generateRound();
  }, [current]);

  const generateRound = () => {
    const target = DAYS[current];
    const opts = [target];
    while (opts.length < 4) {
      const random = DAYS[Math.floor(Math.random() * DAYS.length)];
      if (!opts.includes(random)) opts.push(random);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (day) => {
    if (isPaused) return;
    if (day === DAYS[current]) {
      onScore(1);
      setCurrent((current + 1) % DAYS.length);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <p className="text-slate-500 font-bold uppercase tracking-widest mb-2 italic">What comes next?</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {DAYS.slice(0, current).map(d => (
            <div key={d} className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-black border-2 border-green-200 opacity-50">
              {d}
            </div>
          ))}
          <div className="bg-sky-500 text-white px-8 py-3 rounded-2xl text-2xl font-black border-4 border-white shadow-lg animate-bounce">
            ???
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
        {options.map(opt => (
          <Button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="text-3xl py-8"
            variant="secondary"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeek;
