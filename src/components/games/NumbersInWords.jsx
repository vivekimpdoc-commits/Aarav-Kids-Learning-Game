import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const NumbersInWords = ({ onBack }) => {
  const { addStars } = useGame();
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const numbers = [
    { n: 1, w: 'ONE' }, { n: 2, w: 'TWO' }, { n: 3, w: 'THREE' },
    { n: 4, w: 'FOUR' }, { n: 5, w: 'FIVE' }, { n: 6, w: 'SIX' },
    { n: 7, w: 'SEVEN' }, { n: 8, w: 'EIGHT' }, { n: 9, w: 'NINE' },
    { n: 10, w: 'TEN' }, { n: 11, w: 'ELEVEN' }, { n: 12, w: 'TWELVE' },
    { n: 13, w: 'THIRTEEN' }, { n: 14, w: 'FOURTEEN' }, { n: 15, w: 'FIFTEEN' },
    { n: 16, w: 'SIXTEEN' }, { n: 17, w: 'SEVENTEEN' }, { n: 18, w: 'EIGHTEEN' },
    { n: 19, w: 'NINETEEN' }, { n: 20, w: 'TWENTY' }, { n: 21, w: 'TWENTY-ONE' },
    { n: 22, w: 'TWENTY-TWO' }, { n: 23, w: 'TWENTY-THREE' }, { n: 24, w: 'TWENTY-FOUR' },
    { n: 25, w: 'TWENTY-FIVE' }, { n: 26, w: 'TWENTY-SIX' }, { n: 27, w: 'TWENTY-SEVEN' },
    { n: 28, w: 'TWENTY-EIGHT' }, { n: 29, w: 'TWENTY-NINE' }, { n: 30, w: 'THIRTY' },
    { n: 31, w: 'THIRTY-ONE' }, { n: 32, w: 'THIRTY-TWO' }, { n: 33, w: 'THIRTY-THREE' },
    { n: 34, w: 'THIRTY-FOUR' }, { n: 35, w: 'THIRTY-FIVE' }, { n: 36, w: 'THIRTY-SIX' },
    { n: 37, w: 'THIRTY-SEVEN' }, { n: 38, w: 'THIRTY-EIGHT' }, { n: 39, w: 'THIRTY-NINE' },
    { n: 40, w: 'FORTY' }, { n: 41, w: 'FORTY-ONE' }, { n: 42, w: 'FORTY-TWO' },
    { n: 43, w: 'FORTY-THREE' }, { n: 44, w: 'FORTY-FOUR' }, { n: 45, w: 'FORTY-FIVE' },
    { n: 46, w: 'FORTY-SIX' }, { n: 47, w: 'FORTY-SEVEN' }, { n: 48, w: 'FORTY-EIGHT' },
    { n: 49, w: 'FORTY-NINE' }, { n: 50, w: 'FIFTY' }
  ];

  const generateRound = () => {
    const target = numbers[Math.floor(Math.random() * numbers.length)];
    const opts = [target];
    while (opts.length < 4) {
      const random = numbers[Math.floor(Math.random() * numbers.length)];
      if (!opts.find(o => o.n === random.n)) opts.push(random);
    }
    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (n) => {
    if (n === current.n) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 50, spread: 60 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`${current.w} is ${current.n}`);
      synth.speak(utter);
      setTimeout(generateRound, 1000);
    } else {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Not that one!`);
      synth.speak(utter);
    }
  };

  if (!current) return null;

  return (
    <div className="min-h-screen bg-sky-50 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-black">{score}</span>
        </div>
      </header>

      <main className="max-w-2xl w-full text-center space-y-12">
        <h2 className="text-5xl font-black text-slate-800">Match the spelling!</h2>
        
        <Card className="py-16">
          <motion.h3 
            key={current.w}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-9xl font-black text-kids-sky tracking-widest"
          >
            {current.w}
          </motion.h3>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          {options.map((opt) => (
            <Button
              key={opt.n}
              onClick={() => handleChoice(opt.n)}
              variant="primary"
              className="text-6xl py-10 rounded-[3rem]"
            >
              {opt.n}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NumbersInWords;
