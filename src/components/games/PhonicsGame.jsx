import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Volume2, Music, Sparkles } from 'lucide-react';

const PHONICS_DATA = {
  vowels: [
    { letter: 'A', sound: 'Ah', word: 'Apple', emoji: '🍎' },
    { letter: 'E', sound: 'Eh', word: 'Egg', emoji: '🥚' },
    { letter: 'I', sound: 'Ih', word: 'Igloo', emoji: '🛖' },
    { letter: 'O', sound: 'Oh', word: 'Orange', emoji: '🍊' },
    { letter: 'U', sound: 'Uh', word: 'Umbrella', emoji: '☂️' },
  ],
  consonants: [
    { letter: 'B', sound: 'Buh', word: 'Ball', emoji: '⚽' },
    { letter: 'C', sound: 'Cuh', word: 'Cat', emoji: '🐱' },
    { letter: 'D', sound: 'Duh', word: 'Dog', emoji: '🐶' },
    { letter: 'F', sound: 'Fuh', word: 'Fish', emoji: '🐟' },
    { letter: 'G', sound: 'Guh', word: 'Goat', emoji: '🐐' },
  ],
  blends: [
    { letter: 'SH', sound: 'Shhh', word: 'Ship', emoji: '🚢' },
    { letter: 'CH', sound: 'Chuh', word: 'Chair', emoji: '🪑' },
    { letter: 'TH', sound: 'Thuh', word: 'Thumb', emoji: '👍' },
  ]
};

const PhonicsGame = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [mode, setMode] = useState('listen'); // listen, match

  useEffect(() => {
    generateRound();
  }, [difficulty]);

  const speak = (text, isPhonic = false) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = isPhonic ? 0.6 : 0.9;
    utter.pitch = 1.2;
    synth.speak(utter);
  };

  const generateRound = () => {
    // Select pool based on difficulty
    let pool = PHONICS_DATA.vowels;
    if (difficulty > 5) pool = [...PHONICS_DATA.vowels, ...PHONICS_DATA.consonants];
    if (difficulty > 10) pool = [...PHONICS_DATA.vowels, ...PHONICS_DATA.consonants, ...PHONICS_DATA.blends];

    const target = pool[Math.floor(Math.random() * pool.length)];
    const opts = [target.letter];
    while (opts.length < 4) {
      const rand = pool[Math.floor(Math.random() * pool.length)].letter;
      if (!opts.includes(rand)) opts.push(rand);
    }

    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
    
    // Automatically play sound for 'listen' mode
    setTimeout(() => speak(`Which letter says ${target.sound}?`, true), 500);
  };

  const handleChoice = (choice) => {
    if (isPaused) return;
    if (choice === current.letter) {
      onScore(1);
      speak(`Correct! ${current.letter} is for ${current.word}`);
      generateRound();
    } else {
      speak("Try again!");
    }
  };

  if (!current) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md p-8 rounded-[4rem] border-4 border-white/40 shadow-2xl space-y-12 text-center">
        
        <div className="space-y-4">
           <h3 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter bg-white/50 inline-block px-8 py-1 rounded-full">
             Phonics Challenge
           </h3>
           <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Listen to the sound and pick the letter!</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => speak(current.sound, true)}
          className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-8 border-white shadow-2xl mx-auto flex items-center justify-center group relative"
        >
          <Volume2 size={80} className="text-white group-hover:animate-bounce" />
          <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg border-2 border-orange-500 animate-pulse">
            <Music className="text-orange-500" />
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-6">
          {options.map((opt, i) => (
            <motion.button
              key={opt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleChoice(opt)}
              className="bg-white hover:bg-sky-50 text-6xl font-black text-slate-800 py-10 rounded-[3rem] border-4 border-slate-800 shadow-[0_12px_0_0_rgba(30,41,59,1)] active:translate-y-2 active:shadow-none transition-all uppercase"
            >
              {opt}
            </motion.button>
          ))}
        </div>

        <div className="pt-4">
           <div className="flex justify-center gap-2">
              <Sparkles className="text-yellow-500" />
              <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Mastering Sounds</span>
              <Sparkles className="text-yellow-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default PhonicsGame;
