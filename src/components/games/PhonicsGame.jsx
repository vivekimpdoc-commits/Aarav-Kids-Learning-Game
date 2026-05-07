import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Volume2, Music, Sparkles } from 'lucide-react';

const PHONICS_DATA = {
  vowels: [
    { letter: 'A', sound: 'ah', word: 'Apple', emoji: '🍎', speakAs: 'ah' },
    { letter: 'E', sound: 'eh', word: 'Egg', emoji: '🥚', speakAs: 'eh' },
    { letter: 'I', sound: 'ih', word: 'Igloo', emoji: '🛖', speakAs: 'ih' },
    { letter: 'O', sound: 'oh', word: 'Orange', emoji: '🍊', speakAs: 'o' },
    { letter: 'U', sound: 'uh', word: 'Umbrella', emoji: '☂️', speakAs: 'uh' },
  ],
  consonants: [
    { letter: 'B', sound: 'buh', word: 'Ball', emoji: '⚽', speakAs: 'buh' },
    { letter: 'C', sound: 'cuh', word: 'Cat', emoji: '🐱', speakAs: 'cuh' },
    { letter: 'D', sound: 'duh', word: 'Dog', emoji: '🐶', speakAs: 'duh' },
    { letter: 'F', sound: 'fff', word: 'Fish', emoji: '🐟', speakAs: 'ffff' },
    { letter: 'G', sound: 'guh', word: 'Goat', emoji: '🐐', speakAs: 'guh' },
    { letter: 'H', sound: 'huh', word: 'Hat', emoji: '🎩', speakAs: 'huh' },
    { letter: 'J', sound: 'juh', word: 'Jam', emoji: '🍓', speakAs: 'juh' },
    { letter: 'K', sound: 'kuh', word: 'Kite', emoji: '🪁', speakAs: 'kuh' },
    { letter: 'L', sound: 'lll', word: 'Lion', emoji: '🦁', speakAs: 'llll' },
    { letter: 'M', sound: 'mmm', word: 'Moon', emoji: '🌙', speakAs: 'mmmm' },
  ],
  blends: [
    { letter: 'SH', sound: 'shhh', word: 'Ship', emoji: '🚢', speakAs: 'shhhhh' },
    { letter: 'CH', sound: 'chuh', word: 'Chair', emoji: '🪑', speakAs: 'chuh' },
    { letter: 'TH', sound: 'thuh', word: 'Thumb', emoji: '👍', speakAs: 'thuh' },
  ]
};

const PhonicsGame = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateRound();
  }, [difficulty]);

  const speakPhonic = (item) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    
    // We use a specific rate and pitch for phonics
    const utter = new SpeechSynthesisUtterance(item.speakAs);
    utter.rate = 0.5; // Very slow for clarity
    utter.pitch = 1.1;
    utter.volume = 1;
    
    // Some browsers need a tiny delay
    setTimeout(() => synth.speak(utter), 50);
  };

  const speakPrompt = (item) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(`Which letter makes the sound ${item.speakAs}?`);
    utter.rate = 0.9;
    synth.speak(utter);
  };

  const generateRound = () => {
    let pool = PHONICS_DATA.vowels;
    if (difficulty > 3) pool = [...PHONICS_DATA.vowels, ...PHONICS_DATA.consonants];
    if (difficulty > 8) pool = [...PHONICS_DATA.vowels, ...PHONICS_DATA.consonants, ...PHONICS_DATA.blends];

    const target = pool[Math.floor(Math.random() * pool.length)];
    const opts = [target.letter];
    while (opts.length < 4) {
      const rand = pool[Math.floor(Math.random() * pool.length)].letter;
      if (!opts.includes(rand)) opts.push(rand);
    }

    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
    
    // Automatically play the prompt
    setTimeout(() => speakPrompt(target), 500);
  };

  const handleChoice = (choice) => {
    if (isPaused) return;
    if (choice === current.letter) {
      onScore(1);
      const synth = window.speechSynthesis;
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(`Great! ${current.letter} makes the ${current.speakAs} sound for ${current.word}!`);
      utter.rate = 0.9;
      synth.speak(utter);
      generateRound();
    } else {
      const utter = new SpeechSynthesisUtterance("Try again!");
      window.speechSynthesis.speak(utter);
    }
  };

  if (!current) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md p-8 rounded-[4rem] border-4 border-white/40 shadow-2xl space-y-10 text-center">
        
        <div className="space-y-4">
           <h3 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter bg-white/50 inline-block px-8 py-1 rounded-full border-2 border-white">
             Phonics Master
           </h3>
           <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Tap the button to hear the sound!</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => speakPhonic(current)}
          className="w-56 h-56 bg-gradient-to-br from-kids-sun to-orange-500 rounded-[3rem] border-8 border-white shadow-[0_20px_0_0_rgba(245,158,11,1)] mx-auto flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Volume2 size={100} className="text-white relative z-10" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-4 right-4 bg-white/30 p-2 rounded-full"
          >
            <Music className="text-white" size={24} />
          </motion.div>
        </motion.button>

        <div className="grid grid-cols-2 gap-6 pt-4">
          {options.map((opt, i) => (
            <motion.button
              key={opt}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              onClick={() => handleChoice(opt)}
              className="bg-white hover:bg-sky-50 text-7xl font-black text-slate-800 py-12 rounded-[3.5rem] border-4 border-slate-800 shadow-[0_12px_0_0_rgba(30,41,59,1)] active:translate-y-2 active:shadow-none transition-all uppercase"
            >
              {opt}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 opacity-60">
           <div className="h-[2px] w-12 bg-slate-400" />
           <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Learning Phonetics</span>
           <div className="h-[2px] w-12 bg-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default PhonicsGame;
