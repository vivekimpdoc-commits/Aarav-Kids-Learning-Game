import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/KidsUI';
import { Volume2, Music, Star, Sparkles } from 'lucide-react';

// The KEY fix: Instead of abstract "Buh", we use real sentence TTS can pronounce correctly.
// The pattern: "The letter [X] makes the sound... [word starting with X]"
const PHONICS_DATA = [
  // Vowels
  { letter: 'A', spokenPhrase: 'The letter A says aaaa... like in Apple!',   displaySound: 'A ... as in Apple',   word: 'Apple',    emoji: '🍎', color: 'from-red-400 to-rose-500' },
  { letter: 'E', spokenPhrase: 'The letter E says ehhh... like in Egg!',     displaySound: 'E ... as in Egg',     word: 'Egg',      emoji: '🥚', color: 'from-yellow-300 to-amber-400' },
  { letter: 'I', spokenPhrase: 'The letter I says ihhh... like in Igloo!',   displaySound: 'I ... as in Igloo',   word: 'Igloo',    emoji: '🛖', color: 'from-sky-400 to-blue-500' },
  { letter: 'O', spokenPhrase: 'The letter O says ohh... like in Orange!',   displaySound: 'O ... as in Orange',  word: 'Orange',   emoji: '🍊', color: 'from-orange-400 to-amber-500' },
  { letter: 'U', spokenPhrase: 'The letter U says uhh... like in Umbrella!', displaySound: 'U ... as in Umbrella', word: 'Umbrella', emoji: '☂️', color: 'from-purple-400 to-violet-500' },
  // Consonants
  { letter: 'B', spokenPhrase: 'The letter B says buh... like in Ball!',     displaySound: 'B ... as in Ball',    word: 'Ball',     emoji: '⚽', color: 'from-green-400 to-emerald-500' },
  { letter: 'C', spokenPhrase: 'The letter C says kuh... like in Cat!',      displaySound: 'C ... as in Cat',     word: 'Cat',      emoji: '🐱', color: 'from-pink-400 to-rose-500' },
  { letter: 'D', spokenPhrase: 'The letter D says duh... like in Dog!',      displaySound: 'D ... as in Dog',     word: 'Dog',      emoji: '🐶', color: 'from-brown-400 to-amber-600' },
  { letter: 'F', spokenPhrase: 'The letter F says fff... like in Fish!',     displaySound: 'F ... as in Fish',    word: 'Fish',     emoji: '🐟', color: 'from-cyan-400 to-sky-500' },
  { letter: 'G', spokenPhrase: 'The letter G says guh... like in Goat!',     displaySound: 'G ... as in Goat',   word: 'Goat',     emoji: '🐐', color: 'from-lime-400 to-green-500' },
  { letter: 'H', spokenPhrase: 'The letter H says hhh... like in Hat!',      displaySound: 'H ... as in Hat',    word: 'Hat',      emoji: '🎩', color: 'from-slate-400 to-slate-500' },
  { letter: 'J', spokenPhrase: 'The letter J says juh... like in Jungle!',   displaySound: 'J ... as in Jungle', word: 'Jungle',   emoji: '🌴', color: 'from-green-500 to-teal-500' },
  { letter: 'K', spokenPhrase: 'The letter K says kuh... like in Kite!',     displaySound: 'K ... as in Kite',   word: 'Kite',     emoji: '🪁', color: 'from-sky-500 to-blue-600' },
  { letter: 'L', spokenPhrase: 'The letter L says lll... like in Lion!',     displaySound: 'L ... as in Lion',   word: 'Lion',     emoji: '🦁', color: 'from-amber-400 to-yellow-500' },
  { letter: 'M', spokenPhrase: 'The letter M says mmm... like in Moon!',     displaySound: 'M ... as in Moon',   word: 'Moon',     emoji: '🌙', color: 'from-indigo-400 to-purple-500' },
  { letter: 'N', spokenPhrase: 'The letter N says nnn... like in Nest!',     displaySound: 'N ... as in Nest',   word: 'Nest',     emoji: '🪹', color: 'from-orange-300 to-amber-400' },
  { letter: 'P', spokenPhrase: 'The letter P says puh... like in Pig!',      displaySound: 'P ... as in Pig',    word: 'Pig',      emoji: '🐷', color: 'from-pink-300 to-rose-400' },
  { letter: 'R', spokenPhrase: 'The letter R says rrr... like in Rabbit!',   displaySound: 'R ... as in Rabbit', word: 'Rabbit',   emoji: '🐰', color: 'from-gray-300 to-slate-400' },
  { letter: 'S', spokenPhrase: 'The letter S says sss... like in Sun!',      displaySound: 'S ... as in Sun',    word: 'Sun',      emoji: '☀️', color: 'from-yellow-400 to-orange-400' },
  { letter: 'T', spokenPhrase: 'The letter T says tuh... like in Tiger!',    displaySound: 'T ... as in Tiger',  word: 'Tiger',    emoji: '🐯', color: 'from-orange-500 to-amber-600' },
  // Blends
  { letter: 'SH', spokenPhrase: 'The letters S and H together say shhhh... like in Ship!',  displaySound: 'SH ... as in Ship',    word: 'Ship',    emoji: '🚢', color: 'from-blue-500 to-cyan-500' },
  { letter: 'CH', spokenPhrase: 'The letters C and H together say chhh... like in Chair!', displaySound: 'CH ... as in Chair',   word: 'Chair',   emoji: '🪑', color: 'from-teal-400 to-green-500' },
  { letter: 'TH', spokenPhrase: 'The letters T and H together say thhh... like in Thumb!', displaySound: 'TH ... as in Thumb',   word: 'Thumb',   emoji: '👍', color: 'from-violet-400 to-purple-500' },
  { letter: 'PH', spokenPhrase: 'The letters P and H together say fff... like in Phone!',  displaySound: 'PH ... as in Phone',   word: 'Phone',   emoji: '📱', color: 'from-emerald-400 to-teal-500' },
];

const PhonicsGame = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentRef = useRef(null);

  useEffect(() => {
    generateRound();
  }, [difficulty]);

  const getPool = () => {
    const count = Math.min(PHONICS_DATA.length, 5 + difficulty * 2);
    return PHONICS_DATA.slice(0, count);
  };

  const speak = (text, onDone) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85;
    utter.pitch = 1.1;
    utter.volume = 1;
    setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      if (onDone) onDone();
    };
    synth.speak(utter);
  };

  const generateRound = () => {
    const pool = getPool();
    const target = pool[Math.floor(Math.random() * pool.length)];
    currentRef.current = target;
    const opts = [target.letter];
    while (opts.length < 4) {
      const rand = pool[Math.floor(Math.random() * pool.length)].letter;
      if (!opts.includes(rand)) opts.push(rand);
    }
    setCurrent(target);
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
    // Auto-speak after a short delay
    setTimeout(() => speak(target.spokenPhrase), 600);
  };

  const handleChoice = (choice) => {
    if (isPaused || feedback) return;
    const target = currentRef.current;
    if (choice === target.letter) {
      setFeedback('correct');
      speak(`Correct! The letter ${target.letter} is for ${target.word}! Great job!`, () => {
        setTimeout(() => {
          onScore(1);
          generateRound();
        }, 400);
      });
    } else {
      setFeedback('wrong');
      speak('Try again! Listen carefully.', () => {
        setFeedback(null);
        setTimeout(() => speak(target.spokenPhrase), 300);
      });
    }
  };

  if (!current) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">

        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter bg-black/20 inline-block px-8 py-2 rounded-full mb-2">
            🔊 Listen &amp; Pick the Letter!
          </h3>
        </div>

        {/* Big Sound Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.letter}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className={`relative bg-gradient-to-br ${current.color} rounded-[4rem] border-8 border-white shadow-2xl p-10 mx-auto max-w-sm`}
          >
            {/* Word Example */}
            <div className="text-[8rem] leading-none mb-4">{current.emoji}</div>
            <div className="bg-white/90 rounded-3xl p-4 border-4 border-white shadow-lg">
              <p className="text-3xl font-black text-slate-800">{current.displaySound}</p>
            </div>

            {/* Speaker button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => speak(current.spokenPhrase)}
              className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full border-4 border-white shadow-2xl flex items-center justify-center transition-colors ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-yellow-400 hover:bg-yellow-300'}`}
            >
              <Volume2 size={36} className="text-white" />
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-5 pt-4">
          {options.map((opt, i) => {
            let btnClass = 'bg-white text-slate-800 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)] hover:bg-sky-50';
            if (feedback && opt === current.letter) {
              btnClass = 'bg-green-400 text-white border-green-700 shadow-[0_6px_0_0_rgba(21,128,61,1)] scale-105';
            }
            return (
              <motion.button
                key={opt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleChoice(opt)}
                className={`py-10 rounded-[2.5rem] border-4 text-5xl font-black uppercase transition-all active:translate-y-2 active:shadow-none ${btnClass}`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`py-4 px-10 rounded-full border-4 font-black text-2xl uppercase tracking-widest inline-block mx-auto ${
                feedback === 'correct' 
                  ? 'bg-green-400 border-green-700 text-white' 
                  : 'bg-red-400 border-red-700 text-white'
              }`}
            >
              {feedback === 'correct' ? '⭐ Correct!' : '❌ Try Again!'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhonicsGame;
