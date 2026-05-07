import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================
// 100-QUESTION BEFORE & AFTER DATABASE — 10 bands × 10 items
// ============================================================
const ALL_QUESTIONS = [
  // Level 1 — Numbers 1-10
  { q: 'What comes BEFORE 5?',   answer: '4',    type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 3?',    answer: '4',    type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 2?',   answer: '1',    type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 7?',    answer: '8',    type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 10?',  answer: '9',    type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 1?',    answer: '2',    type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 8?',   answer: '7',    type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 9?',    answer: '10',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 4?',   answer: '3',    type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 6?',    answer: '7',    type: 'after',  context: 'Numbers',   emoji: '🔢' },

  // Level 2 — Numbers 11-20
  { q: 'What comes BEFORE 15?',  answer: '14',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 12?',   answer: '13',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 20?',  answer: '19',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 16?',   answer: '17',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 18?',  answer: '17',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 11?',   answer: '12',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 13?',  answer: '12',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 19?',   answer: '20',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 11?',  answer: '10',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 14?',   answer: '15',   type: 'after',  context: 'Numbers',   emoji: '🔢' },

  // Level 3 — Alphabet Letters
  { q: 'Which letter comes BEFORE C?',  answer: 'B', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER D?',   answer: 'E', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE G?',  answer: 'F', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER H?',   answer: 'I', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE K?',  answer: 'J', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER M?',   answer: 'N', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE P?',  answer: 'O', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER R?',   answer: 'S', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE V?',  answer: 'U', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER X?',   answer: 'Y', type: 'after',  context: 'Alphabet', emoji: '🔤' },

  // Level 4 — Days of the Week
  { q: 'Which day comes BEFORE Wednesday?',  answer: 'Tuesday',   type: 'before', context: 'Days',    emoji: '📅' },
  { q: 'Which day comes AFTER Monday?',      answer: 'Tuesday',   type: 'after',  context: 'Days',    emoji: '📅' },
  { q: 'Which day comes BEFORE Friday?',     answer: 'Thursday',  type: 'before', context: 'Days',    emoji: '📅' },
  { q: 'Which day comes AFTER Saturday?',    answer: 'Sunday',    type: 'after',  context: 'Days',    emoji: '📅' },
  { q: 'Which day comes BEFORE Tuesday?',    answer: 'Monday',    type: 'before', context: 'Days',    emoji: '📅' },
  { q: 'Which day comes AFTER Thursday?',    answer: 'Friday',    type: 'after',  context: 'Days',    emoji: '📅' },
  { q: 'Which day comes BEFORE Sunday?',     answer: 'Saturday',  type: 'before', context: 'Days',    emoji: '📅' },
  { q: 'Which day comes AFTER Wednesday?',   answer: 'Thursday',  type: 'after',  context: 'Days',    emoji: '📅' },
  { q: 'Which day comes BEFORE Monday?',     answer: 'Sunday',    type: 'before', context: 'Days',    emoji: '📅' },
  { q: 'Which day comes AFTER Friday?',      answer: 'Saturday',  type: 'after',  context: 'Days',    emoji: '📅' },

  // Level 5 — Months of the Year
  { q: 'Which month comes BEFORE March?',    answer: 'February',  type: 'before', context: 'Months',  emoji: '📆' },
  { q: 'Which month comes AFTER April?',     answer: 'May',       type: 'after',  context: 'Months',  emoji: '📆' },
  { q: 'Which month comes BEFORE July?',     answer: 'June',      type: 'before', context: 'Months',  emoji: '📆' },
  { q: 'Which month comes AFTER August?',    answer: 'September', type: 'after',  context: 'Months',  emoji: '📆' },
  { q: 'Which month comes BEFORE November?', answer: 'October',   type: 'before', context: 'Months',  emoji: '📆' },
  { q: 'Which month comes AFTER December?',  answer: 'January',   type: 'after',  context: 'Months',  emoji: '📆' },
  { q: 'Which month comes BEFORE February?', answer: 'January',   type: 'before', context: 'Months',  emoji: '📆' },
  { q: 'Which month comes AFTER June?',      answer: 'July',      type: 'after',  context: 'Months',  emoji: '📆' },
  { q: 'Which month comes BEFORE October?',  answer: 'September', type: 'before', context: 'Months',  emoji: '📆' },
  { q: 'Which month comes AFTER January?',   answer: 'February',  type: 'after',  context: 'Months',  emoji: '📆' },

  // Level 6 — Tens (skip-counting)
  { q: 'What comes BEFORE 30?',  answer: '20',   type: 'before', context: 'Tens',      emoji: '🔢' },
  { q: 'What comes AFTER 40?',   answer: '50',   type: 'after',  context: 'Tens',      emoji: '🔢' },
  { q: 'What comes BEFORE 60?',  answer: '50',   type: 'before', context: 'Tens',      emoji: '🔢' },
  { q: 'What comes AFTER 70?',   answer: '80',   type: 'after',  context: 'Tens',      emoji: '🔢' },
  { q: 'What comes BEFORE 100?', answer: '90',   type: 'before', context: 'Tens',      emoji: '🔢' },
  { q: 'What comes AFTER 20?',   answer: '30',   type: 'after',  context: 'Tens',      emoji: '🔢' },
  { q: 'What comes BEFORE 80?',  answer: '70',   type: 'before', context: 'Tens',      emoji: '🔢' },
  { q: 'What comes AFTER 90?',   answer: '100',  type: 'after',  context: 'Tens',      emoji: '🔢' },
  { q: 'What comes BEFORE 50?',  answer: '40',   type: 'before', context: 'Tens',      emoji: '🔢' },
  { q: 'What comes AFTER 60?',   answer: '70',   type: 'after',  context: 'Tens',      emoji: '🔢' },

  // Level 7 — Seasons & Events
  { q: 'Which season comes AFTER Summer?',   answer: 'Autumn',    type: 'after',  context: 'Seasons', emoji: '🍂' },
  { q: 'Which season comes BEFORE Winter?',  answer: 'Autumn',    type: 'before', context: 'Seasons', emoji: '❄️' },
  { q: 'Which season comes AFTER Spring?',   answer: 'Summer',    type: 'after',  context: 'Seasons', emoji: '☀️' },
  { q: 'Which season comes BEFORE Spring?',  answer: 'Winter',    type: 'before', context: 'Seasons', emoji: '🌸' },
  { q: 'Which comes BEFORE Breakfast?',      answer: 'Sleep',     type: 'before', context: 'Events',  emoji: '🌅' },
  { q: 'Which comes AFTER Breakfast?',       answer: 'School',    type: 'after',  context: 'Events',  emoji: '🏫' },
  { q: 'Which comes BEFORE Lunch?',          answer: 'Morning',   type: 'before', context: 'Events',  emoji: '🌤️' },
  { q: 'Which comes AFTER Lunch?',           answer: 'Evening',   type: 'after',  context: 'Events',  emoji: '🌇' },
  { q: 'Which comes BEFORE Night?',          answer: 'Evening',   type: 'before', context: 'Events',  emoji: '🌙' },
  { q: 'Which comes AFTER Dawn?',            answer: 'Morning',   type: 'after',  context: 'Events',  emoji: '🌄' },

  // Level 8 — Numbers 21-50
  { q: 'What comes BEFORE 25?',  answer: '24',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 33?',   answer: '34',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 42?',  answer: '41',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 49?',   answer: '50',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 31?',  answer: '30',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 28?',   answer: '29',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 47?',  answer: '46',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 36?',   answer: '37',   type: 'after',  context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes BEFORE 23?',  answer: '22',   type: 'before', context: 'Numbers',   emoji: '🔢' },
  { q: 'What comes AFTER 44?',   answer: '45',   type: 'after',  context: 'Numbers',   emoji: '🔢' },

  // Level 9 — Alphabet (advanced)
  { q: 'Which letter comes BEFORE Z?',   answer: 'Y', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER A?',    answer: 'B', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE W?',   answer: 'V', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER T?',    answer: 'U', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE N?',   answer: 'M', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER Q?',    answer: 'R', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE L?',   answer: 'K', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER I?',    answer: 'J', type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE F?',   answer: 'E', type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes AFTER S?',    answer: 'T', type: 'after',  context: 'Alphabet', emoji: '🔤' },

  // Level 10 — Mixed Challenge
  { q: 'What comes BEFORE 99?',         answer: '98',        type: 'before', context: 'Numbers',  emoji: '🔢' },
  { q: 'What comes AFTER 100?',         answer: '101',       type: 'after',  context: 'Numbers',  emoji: '🔢' },
  { q: 'Which month comes AFTER May?',   answer: 'June',      type: 'after',  context: 'Months',   emoji: '📆' },
  { q: 'Which day comes AFTER Sunday?',  answer: 'Monday',    type: 'after',  context: 'Days',     emoji: '📅' },
  { q: 'Which letter comes AFTER Y?',    answer: 'Z',         type: 'after',  context: 'Alphabet', emoji: '🔤' },
  { q: 'Which letter comes BEFORE B?',   answer: 'A',         type: 'before', context: 'Alphabet', emoji: '🔤' },
  { q: 'Which month comes BEFORE January?', answer: 'December', type: 'before', context: 'Months', emoji: '📆' },
  { q: 'What comes BEFORE 51?',         answer: '50',        type: 'before', context: 'Numbers',  emoji: '🔢' },
  { q: 'Which day comes BEFORE Saturday?',  answer: 'Friday',   type: 'before', context: 'Days',   emoji: '📅' },
  { q: 'Which season comes AFTER Autumn?',  answer: 'Winter',   type: 'after',  context: 'Seasons',emoji: '❄️' },
];

const getOptions = (q, allQ) => {
  const opts = [q.answer];
  const pool = allQ.map(x => x.answer).filter(a => a !== q.answer);
  while (opts.length < 4 && pool.length > 0) {
    const rand = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    if (!opts.includes(rand)) opts.push(rand);
  }
  return opts.sort(() => Math.random() - 0.5);
};

const BeforeAfterGame = ({ onScore, difficulty, isPaused }) => {
  const [pool,     setPool]     = useState([]);
  const [idx,      setIdx]      = useState(0);
  const [options,  setOptions]  = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const band = Math.min(difficulty - 1, 9);
    const q    = ALL_QUESTIONS.slice(band * 10, (band + 1) * 10).sort(() => Math.random() - 0.5);
    setPool(q);
    setIdx(0);
    setFeedback(null);
  }, [difficulty]);

  const current = pool[idx % (pool.length || 1)];

  useEffect(() => {
    if (!current) return;
    setOptions(getOptions(current, ALL_QUESTIONS));
  }, [current]);

  const speak = (text) => {
    if (isPaused) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  };

  const handleAnswer = (choice) => {
    if (isPaused || feedback || !current) return;
    if (choice === current.answer) {
      setFeedback('correct');
      speak(`Correct! The answer is ${current.answer}.`);
      setTimeout(() => { onScore(1); setIdx(i => i + 1); setFeedback(null); }, 1500);
    } else {
      setFeedback('wrong');
      speak(`Try again! Think carefully.`);
      setTimeout(() => setFeedback(null), 1400);
    }
  };

  if (!current) return null;

  const isBefore = current.type === 'before';
  const cardGrad = isBefore ? 'from-blue-500 to-indigo-600' : 'from-emerald-400 to-teal-500';

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8 text-center">

        {/* Type badge */}
        <div className="flex justify-center gap-4">
          <span className={`px-6 py-2 rounded-full border-4 font-black text-lg uppercase ${isBefore ? 'bg-blue-500 border-blue-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
            <ChevronLeft className="inline" size={18}/> BEFORE
          </span>
          <span className={`px-6 py-2 rounded-full border-4 font-black text-lg uppercase ${!isBefore ? 'bg-emerald-500 border-emerald-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
            AFTER <ChevronRight className="inline" size={18}/>
          </span>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-gradient-to-br ${cardGrad} rounded-[4rem] border-8 border-white shadow-2xl p-10`}
          >
            <div className="text-8xl mb-4">{current.emoji}</div>
            <p className="text-white/70 uppercase tracking-widest text-sm font-bold mb-3">{current.context}</p>
            <h2 className="text-3xl font-black text-white leading-tight mb-4" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.3)' }}>
              {current.q}
            </h2>
            <button
              onClick={() => speak(current.q)}
              className="mx-auto flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white font-black px-5 py-2 rounded-full border border-white/30 transition-all"
            >
              <Volume2 size={18}/> Hear It
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-2 gap-5">
          {options.map((opt, i) => {
            let cls = 'bg-white text-slate-800 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)] hover:bg-sky-50';
            if (feedback === 'correct' && opt === current.answer)
              cls = 'bg-green-400 text-white border-green-700 shadow-none scale-105';
            if (feedback === 'wrong' && opt !== current.answer)
              cls = 'opacity-40 bg-white border-slate-300 text-slate-400';
            return (
              <motion.button
                key={opt}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleAnswer(opt)}
                className={`py-9 rounded-[3rem] border-4 text-2xl font-black uppercase transition-all active:translate-y-2 active:shadow-none ${cls}`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`py-3 px-10 rounded-full border-4 font-black text-2xl uppercase inline-block ${
                feedback === 'correct' ? 'bg-green-400 border-green-700 text-white' : 'bg-red-400 border-red-700 text-white'
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

export default BeforeAfterGame;
