import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/KidsUI';
import { Volume2, MapPin, Sparkles } from 'lucide-react';

// ============================================================
// 100-QUESTION DATABASE — THIS / THAT GRAMMAR
// Organized by difficulty bands (10 questions per level band)
// "near" = THIS  |  "far" = THAT
// ============================================================
const ALL_QUESTIONS = [
  // ── LEVEL 1 : Very Simple, Everyday Objects ──────────────
  { sentence: '___ is a book.',        hint: 'near', answer: 'THIS', emoji: '📖',  distance: 'near',  category: 'classroom' },
  { sentence: '___ is a pen.',         hint: 'near', answer: 'THIS', emoji: '✏️',  distance: 'near',  category: 'classroom' },
  { sentence: '___ is a star.',        hint: 'far',  answer: 'THAT', emoji: '⭐',  distance: 'far',   category: 'sky' },
  { sentence: '___ is a dog.',         hint: 'far',  answer: 'THAT', emoji: '🐶',  distance: 'far',   category: 'animal' },
  { sentence: '___ is my bag.',        hint: 'near', answer: 'THIS', emoji: '🎒',  distance: 'near',  category: 'classroom' },
  { sentence: '___ is a ball.',        hint: 'near', answer: 'THIS', emoji: '⚽',  distance: 'near',  category: 'toy' },
  { sentence: '___ is a cat.',         hint: 'far',  answer: 'THAT', emoji: '🐱',  distance: 'far',   category: 'animal' },
  { sentence: '___ is a tree.',        hint: 'far',  answer: 'THAT', emoji: '🌳',  distance: 'far',   category: 'nature' },
  { sentence: '___ is my hand.',       hint: 'near', answer: 'THIS', emoji: '✋',  distance: 'near',  category: 'body' },
  { sentence: '___ is a mountain.',    hint: 'far',  answer: 'THAT', emoji: '⛰️', distance: 'far',   category: 'nature' },

  // ── LEVEL 2 : Home & School ───────────────────────────────
  { sentence: '___ is my table.',      hint: 'near', answer: 'THIS', emoji: '🪑',  distance: 'near',  category: 'home' },
  { sentence: '___ is a chair.',       hint: 'near', answer: 'THIS', emoji: '🪑',  distance: 'near',  category: 'home' },
  { sentence: '___ is a window.',      hint: 'far',  answer: 'THAT', emoji: '🪟',  distance: 'far',   category: 'home' },
  { sentence: '___ is a door.',        hint: 'far',  answer: 'THAT', emoji: '🚪',  distance: 'far',   category: 'home' },
  { sentence: '___ is a cup.',         hint: 'near', answer: 'THIS', emoji: '☕',  distance: 'near',  category: 'home' },
  { sentence: '___ is a clock.',       hint: 'far',  answer: 'THAT', emoji: '🕐',  distance: 'far',   category: 'home' },
  { sentence: '___ is my lunch box.',  hint: 'near', answer: 'THIS', emoji: '🍱',  distance: 'near',  category: 'school' },
  { sentence: '___ is a board.',       hint: 'far',  answer: 'THAT', emoji: '🖼️', distance: 'far',   category: 'school' },
  { sentence: '___ is my eraser.',     hint: 'near', answer: 'THIS', emoji: '🧼',  distance: 'near',  category: 'school' },
  { sentence: '___ is the teacher.',   hint: 'far',  answer: 'THAT', emoji: '👩‍🏫', distance: 'far',  category: 'school' },

  // ── LEVEL 3 : Animals & Nature ───────────────────────────
  { sentence: '___ is a butterfly.',   hint: 'near', answer: 'THIS', emoji: '🦋',  distance: 'near',  category: 'animal' },
  { sentence: '___ is an elephant.',   hint: 'far',  answer: 'THAT', emoji: '🐘',  distance: 'far',   category: 'animal' },
  { sentence: '___ is a flower.',      hint: 'near', answer: 'THIS', emoji: '🌸',  distance: 'near',  category: 'nature' },
  { sentence: '___ is a river.',       hint: 'far',  answer: 'THAT', emoji: '🏞️', distance: 'far',   category: 'nature' },
  { sentence: '___ is a small bird.',  hint: 'near', answer: 'THIS', emoji: '🐦',  distance: 'near',  category: 'animal' },
  { sentence: '___ is a big lion.',    hint: 'far',  answer: 'THAT', emoji: '🦁',  distance: 'far',   category: 'animal' },
  { sentence: '___ is a mango.',       hint: 'near', answer: 'THIS', emoji: '🥭',  distance: 'near',  category: 'food' },
  { sentence: '___ is a coconut tree.',hint: 'far',  answer: 'THAT', emoji: '🌴',  distance: 'far',   category: 'nature' },
  { sentence: '___ is a puppy.',       hint: 'near', answer: 'THIS', emoji: '🐕',  distance: 'near',  category: 'animal' },
  { sentence: '___ is a horse.',       hint: 'far',  answer: 'THAT', emoji: '🐴',  distance: 'far',   category: 'animal' },

  // ── LEVEL 4 : Food & Fruits ───────────────────────────────
  { sentence: '___ is an apple.',      hint: 'near', answer: 'THIS', emoji: '🍎',  distance: 'near',  category: 'food' },
  { sentence: '___ is a banana.',      hint: 'far',  answer: 'THAT', emoji: '🍌',  distance: 'far',   category: 'food' },
  { sentence: '___ is my pizza.',      hint: 'near', answer: 'THIS', emoji: '🍕',  distance: 'near',  category: 'food' },
  { sentence: '___ is a big cake.',    hint: 'far',  answer: 'THAT', emoji: '🎂',  distance: 'far',   category: 'food' },
  { sentence: '___ is an orange.',     hint: 'near', answer: 'THIS', emoji: '🍊',  distance: 'near',  category: 'food' },
  { sentence: '___ is a watermelon.',  hint: 'far',  answer: 'THAT', emoji: '🍉',  distance: 'far',   category: 'food' },
  { sentence: '___ is my biscuit.',    hint: 'near', answer: 'THIS', emoji: '🍪',  distance: 'near',  category: 'food' },
  { sentence: '___ is a tall bottle.', hint: 'far',  answer: 'THAT', emoji: '🍾',  distance: 'far',   category: 'food' },
  { sentence: '___ is my sandwich.',   hint: 'near', answer: 'THIS', emoji: '🥪',  distance: 'near',  category: 'food' },
  { sentence: '___ is an ice cream.',  hint: 'far',  answer: 'THAT', emoji: '🍦',  distance: 'far',   category: 'food' },

  // ── LEVEL 5 : Transport & Places ─────────────────────────
  { sentence: '___ is my bicycle.',    hint: 'near', answer: 'THIS', emoji: '🚲',  distance: 'near',  category: 'transport' },
  { sentence: '___ is a big bus.',     hint: 'far',  answer: 'THAT', emoji: '🚌',  distance: 'far',   category: 'transport' },
  { sentence: '___ is a car.',         hint: 'near', answer: 'THIS', emoji: '🚗',  distance: 'near',  category: 'transport' },
  { sentence: '___ is a plane.',       hint: 'far',  answer: 'THAT', emoji: '✈️',  distance: 'far',   category: 'transport' },
  { sentence: '___ is a boat.',        hint: 'far',  answer: 'THAT', emoji: '⛵',  distance: 'far',   category: 'transport' },
  { sentence: '___ is my scooter.',    hint: 'near', answer: 'THIS', emoji: '🛵',  distance: 'near',  category: 'transport' },
  { sentence: '___ is the airport.',   hint: 'far',  answer: 'THAT', emoji: '🏢',  distance: 'far',   category: 'place' },
  { sentence: '___ is my school.',     hint: 'near', answer: 'THIS', emoji: '🏫',  distance: 'near',  category: 'place' },
  { sentence: '___ is a hospital.',    hint: 'far',  answer: 'THAT', emoji: '🏥',  distance: 'far',   category: 'place' },
  { sentence: '___ is my house.',      hint: 'near', answer: 'THIS', emoji: '🏠',  distance: 'near',  category: 'place' },

  // ── LEVEL 6 : Clothes & Body ─────────────────────────────
  { sentence: '___ is my shirt.',      hint: 'near', answer: 'THIS', emoji: '👕',  distance: 'near',  category: 'clothes' },
  { sentence: '___ is a big dress.',   hint: 'far',  answer: 'THAT', emoji: '👗',  distance: 'far',   category: 'clothes' },
  { sentence: '___ is my shoe.',       hint: 'near', answer: 'THIS', emoji: '👟',  distance: 'near',  category: 'clothes' },
  { sentence: '___ is a red cap.',     hint: 'far',  answer: 'THAT', emoji: '🧢',  distance: 'far',   category: 'clothes' },
  { sentence: '___ is my watch.',      hint: 'near', answer: 'THIS', emoji: '⌚',  distance: 'near',  category: 'clothes' },
  { sentence: '___ is her umbrella.',  hint: 'far',  answer: 'THAT', emoji: '☂️',  distance: 'far',   category: 'clothes' },
  { sentence: '___ is my nose.',       hint: 'near', answer: 'THIS', emoji: '👃',  distance: 'near',  category: 'body' },
  { sentence: '___ is his ear.',       hint: 'far',  answer: 'THAT', emoji: '👂',  distance: 'far',   category: 'body' },
  { sentence: '___ is my mouth.',      hint: 'near', answer: 'THIS', emoji: '👄',  distance: 'near',  category: 'body' },
  { sentence: '___ is his leg.',       hint: 'far',  answer: 'THAT', emoji: '🦵',  distance: 'far',   category: 'body' },

  // ── LEVEL 7 : Question Form ───────────────────────────────
  { sentence: 'Is ___ a pen? (near)',  hint: 'near', answer: 'THIS', emoji: '✏️',  distance: 'near',  category: 'question' },
  { sentence: 'Is ___ a bird? (far)',  hint: 'far',  answer: 'THAT', emoji: '🐦',  distance: 'far',   category: 'question' },
  { sentence: 'What is ___? (near)',   hint: 'near', answer: 'THIS', emoji: '❓',  distance: 'near',  category: 'question' },
  { sentence: 'What is ___? (far)',    hint: 'far',  answer: 'THAT', emoji: '❓',  distance: 'far',   category: 'question' },
  { sentence: 'Is ___ a dog? (far)',   hint: 'far',  answer: 'THAT', emoji: '🐶',  distance: 'far',   category: 'question' },
  { sentence: 'Is ___ your book? (near)', hint: 'near', answer: 'THIS', emoji: '📚', distance: 'near', category: 'question' },
  { sentence: 'Is ___ a mango? (far)',    hint: 'far',  answer: 'THAT', emoji: '🥭', distance: 'far',  category: 'question' },
  { sentence: 'Is ___ a cap? (near)',     hint: 'near', answer: 'THIS', emoji: '🧢', distance: 'near', category: 'question' },
  { sentence: 'Is ___ a car? (far)',      hint: 'far',  answer: 'THAT', emoji: '🚗', distance: 'far',  category: 'question' },
  { sentence: 'Is ___ my toy? (near)',    hint: 'near', answer: 'THIS', emoji: '🧸', distance: 'near', category: 'question' },

  // ── LEVEL 8 : Negative Sentences ─────────────────────────
  { sentence: '___ is not a pen. (near)',  hint: 'near', answer: 'THIS', emoji: '❌✏️', distance: 'near', category: 'negative' },
  { sentence: '___ is not a cat. (far)',   hint: 'far',  answer: 'THAT', emoji: '❌🐱', distance: 'far',  category: 'negative' },
  { sentence: '___ is not a toy. (near)',  hint: 'near', answer: 'THIS', emoji: '❌🧸', distance: 'near', category: 'negative' },
  { sentence: '___ is not a car. (far)',   hint: 'far',  answer: 'THAT', emoji: '❌🚗', distance: 'far',  category: 'negative' },
  { sentence: '___ is not my bag. (near)', hint: 'near', answer: 'THIS', emoji: '❌🎒', distance: 'near', category: 'negative' },
  { sentence: '___ is not a lion. (far)',  hint: 'far',  answer: 'THAT', emoji: '❌🦁', distance: 'far',  category: 'negative' },
  { sentence: '___ is not a flower. (near)', hint: 'near', answer: 'THIS', emoji: '❌🌸', distance: 'near', category: 'negative' },
  { sentence: '___ is not a plane. (far)',   hint: 'far',  answer: 'THAT', emoji: '❌✈️', distance: 'far',  category: 'negative' },
  { sentence: '___ is not a book. (near)',   hint: 'near', answer: 'THIS', emoji: '❌📖', distance: 'near', category: 'negative' },
  { sentence: '___ is not a tree. (far)',    hint: 'far',  answer: 'THAT', emoji: '❌🌳', distance: 'far',  category: 'negative' },

  // ── LEVEL 9 : Tricky Context ──────────────────────────────
  { sentence: 'Look at ___ cloud! (far)',      hint: 'far',  answer: 'THAT', emoji: '☁️',  distance: 'far',  category: 'tricky' },
  { sentence: 'Hold ___ ball! (near)',         hint: 'near', answer: 'THIS', emoji: '⚽',  distance: 'near', category: 'tricky' },
  { sentence: 'Give me ___ book. (far)',       hint: 'far',  answer: 'THAT', emoji: '📖',  distance: 'far',  category: 'tricky' },
  { sentence: 'Pick up ___ pen. (near)',       hint: 'near', answer: 'THIS', emoji: '✏️',  distance: 'near', category: 'tricky' },
  { sentence: 'See ___ rainbow! (far)',        hint: 'far',  answer: 'THAT', emoji: '🌈',  distance: 'far',  category: 'tricky' },
  { sentence: 'Touch ___ flower. (near)',      hint: 'near', answer: 'THIS', emoji: '🌺',  distance: 'near', category: 'tricky' },
  { sentence: 'Buy me ___ toy. (far)',         hint: 'far',  answer: 'THAT', emoji: '🧸',  distance: 'far',  category: 'tricky' },
  { sentence: '___ is such a big elephant! (far)', hint: 'far', answer: 'THAT', emoji: '🐘', distance: 'far', category: 'tricky' },
  { sentence: '___ little kitten is mine. (near)', hint: 'near', answer: 'THIS', emoji: '😺', distance: 'near', category: 'tricky' },
  { sentence: 'Come and see ___ garden! (far)',    hint: 'far',  answer: 'THAT', emoji: '🌻', distance: 'far',  category: 'tricky' },

  // ── LEVEL 10 : Advanced / Compound ───────────────────────
  { sentence: '___ is my pen and ___ is your book. (near/far)', hint: 'near', answer: 'THIS', emoji: '✏️📖', distance: 'near', category: 'advanced' },
  { sentence: '___ is a big bus but ___ is a small car. (far/near)', hint: 'far', answer: 'THAT', emoji: '🚌🚗', distance: 'far', category: 'advanced' },
  { sentence: '___ dog is friendly! (near)',           hint: 'near', answer: 'THIS', emoji: '🐕',  distance: 'near', category: 'advanced' },
  { sentence: '___ mountain is very high! (far)',      hint: 'far',  answer: 'THAT', emoji: '🏔️', distance: 'far',  category: 'advanced' },
  { sentence: '___ is my favourite colour! (near)',    hint: 'near', answer: 'THIS', emoji: '🎨',  distance: 'near', category: 'advanced' },
  { sentence: '___ is a very old building. (far)',     hint: 'far',  answer: 'THAT', emoji: '🏛️', distance: 'far',  category: 'advanced' },
  { sentence: 'I like ___ song! (near)',               hint: 'near', answer: 'THIS', emoji: '🎵',  distance: 'near', category: 'advanced' },
  { sentence: 'Who lives in ___ house? (far)',         hint: 'far',  answer: 'THAT', emoji: '🏠',  distance: 'far',  category: 'advanced' },
  { sentence: '___ is the school I go to. (near)',     hint: 'near', answer: 'THIS', emoji: '🏫',  distance: 'near', category: 'advanced' },
  { sentence: '___ is the park we play in. (far)',     hint: 'far',  answer: 'THAT', emoji: '🏞️', distance: 'far',  category: 'advanced' },
];

// Map difficulty (1-10) to the right question band (10 questions per band)
const getQuestionsForDifficulty = (difficulty) => {
  const bandIdx = Math.min(difficulty - 1, 9);
  const start   = bandIdx * 10;
  return ALL_QUESTIONS.slice(start, start + 10);
};

// ============================================================
// COMPONENT
// ============================================================
const ThisThatGame = ({ onScore, difficulty, isPaused }) => {
  const [pool,     setPool]     = useState([]);
  const [idx,      setIdx]      = useState(0);
  const [feedback, setFeedback] = useState(null);   // 'correct' | 'wrong'
  const [count,    setCount]    = useState({ THIS: 0, THAT: 0 });

  useEffect(() => {
    const q = getQuestionsForDifficulty(difficulty);
    // Shuffle the pool each time difficulty changes
    setPool(q.sort(() => Math.random() - 0.5));
    setIdx(0);
    setFeedback(null);
  }, [difficulty]);

  const current = pool[idx % pool.length];

  const speak = (text) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88;
    u.pitch = 1.1;
    synth.speak(u);
  };

  const handleAnswer = (answer) => {
    if (isPaused || feedback) return;

    if (answer === current.answer) {
      setFeedback('correct');
      setCount(c => ({ ...c, [answer]: c[answer] + 1 }));
      speak(`Correct! We say ${current.answer.toLowerCase()} when the object is ${current.distance}.`);
      setTimeout(() => {
        onScore(1);
        setIdx(i => i + 1);
        setFeedback(null);
      }, 1600);
    } else {
      setFeedback('wrong');
      speak(`Try again! The object is ${current.distance}, so we use ${current.answer}.`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (!current) return null;

  const isNear = current.answer === 'THIS';
  const cardGrad = isNear
    ? 'from-sky-400 to-blue-500'
    : 'from-purple-500 to-violet-600';

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">

      {/* Distance Hint bar */}
      <div className="flex gap-6 mb-8">
        <div className={`px-6 py-2 rounded-full border-4 font-black text-xl uppercase tracking-wider ${isNear ? 'bg-sky-400 border-sky-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
          📍 NEAR = THIS
        </div>
        <div className={`px-6 py-2 rounded-full border-4 font-black text-xl uppercase tracking-wider ${!isNear ? 'bg-purple-500 border-purple-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
          🏔️ FAR = THAT
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          className={`bg-gradient-to-br ${cardGrad} rounded-[4rem] border-8 border-white shadow-2xl p-10 text-center max-w-xl w-full mb-10`}
        >
          <div className="text-9xl mb-6 drop-shadow-xl">{current.emoji}</div>
          <p className="text-4xl font-black text-white leading-tight mb-4"
             style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            {current.sentence}
          </p>
          <span className="inline-block bg-white/30 px-6 py-1 rounded-full text-white font-bold uppercase text-sm tracking-widest border border-white/40">
            {current.category} · {current.distance === 'near' ? '📍 nearby' : '🏔️ far away'}
          </span>

          <button
            onClick={() => speak(`${current.sentence.replace('___', current.answer)}`)}
            className="mt-6 mx-auto flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white font-black px-6 py-2 rounded-full border-2 border-white/30 transition-all"
          >
            <Volume2 size={20} /> Hear It
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Answer Buttons */}
      <div className="flex gap-8 w-full max-w-md">
        {['THIS', 'THAT'].map(opt => {
          let cls = 'bg-white text-slate-800 border-slate-800 shadow-[0_12px_0_0_rgba(30,41,59,1)] hover:bg-sky-50';
          if (feedback === 'correct' && opt === current.answer)
            cls = 'bg-green-400 text-white border-green-700 shadow-[0_6px_0_0_rgba(21,128,61,1)] scale-105';
          if (feedback === 'wrong' && opt !== current.answer)
            cls = 'bg-red-400 text-white border-red-700 opacity-60';
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleAnswer(opt)}
              className={`flex-1 py-12 rounded-[3rem] border-4 text-5xl font-black uppercase transition-all active:translate-y-2 active:shadow-none ${cls}`}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-8 py-3 px-10 rounded-full border-4 font-black text-2xl uppercase tracking-widest ${
              feedback === 'correct'
                ? 'bg-green-400 border-green-700 text-white'
                : 'bg-red-400 border-red-700 text-white'
            }`}
          >
            {feedback === 'correct' ? '⭐ Correct!' : '❌ Try Again!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Mini-bar */}
      <div className="mt-8 flex gap-8 text-center">
        <div className="bg-sky-100 px-6 py-2 rounded-2xl border-2 border-sky-300">
          <p className="text-xs font-black uppercase text-sky-500">THIS</p>
          <p className="text-3xl font-black text-sky-700">{count.THIS}</p>
        </div>
        <div className="bg-purple-100 px-6 py-2 rounded-2xl border-2 border-purple-300">
          <p className="text-xs font-black uppercase text-purple-500">THAT</p>
          <p className="text-3xl font-black text-purple-700">{count.THAT}</p>
        </div>
      </div>
    </div>
  );
};

export default ThisThatGame;
