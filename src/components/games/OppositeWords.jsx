import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Zap } from 'lucide-react';

// ============================================================
// 100-QUESTION OPPOSITE WORDS DATABASE — 10 bands × 10 items
// ============================================================
const ALL_OPPOSITES = [
  // Level 1 — Basic Adjectives
  { word: 'HOT',    opposite: 'COLD',   emoji: '🔥',  hint: 'Temperature' },
  { word: 'BIG',    opposite: 'SMALL',  emoji: '🐘',  hint: 'Size' },
  { word: 'UP',     opposite: 'DOWN',   emoji: '⬆️',  hint: 'Direction' },
  { word: 'FAST',   opposite: 'SLOW',   emoji: '🐇',  hint: 'Speed' },
  { word: 'DAY',    opposite: 'NIGHT',  emoji: '☀️',  hint: 'Time' },
  { word: 'HAPPY',  opposite: 'SAD',    emoji: '😊',  hint: 'Feeling' },
  { word: 'OPEN',   opposite: 'CLOSE',  emoji: '🚪',  hint: 'State' },
  { word: 'LIGHT',  opposite: 'DARK',   emoji: '💡',  hint: 'Brightness' },
  { word: 'GOOD',   opposite: 'BAD',    emoji: '👍',  hint: 'Quality' },
  { word: 'CLEAN',  opposite: 'DIRTY',  emoji: '🧼',  hint: 'Cleanliness' },

  // Level 2 — Nature & Space
  { word: 'TALL',   opposite: 'SHORT',  emoji: '📏',  hint: 'Height' },
  { word: 'HEAVY',  opposite: 'LIGHT',  emoji: '⚖️',  hint: 'Weight' },
  { word: 'WET',    opposite: 'DRY',    emoji: '💧',  hint: 'Moisture' },
  { word: 'LOUD',   opposite: 'QUIET',  emoji: '🔊',  hint: 'Sound' },
  { word: 'FULL',   opposite: 'EMPTY',  emoji: '🪣',  hint: 'Quantity' },
  { word: 'NEW',    opposite: 'OLD',    emoji: '🆕',  hint: 'Age' },
  { word: 'NEAR',   opposite: 'FAR',    emoji: '📍',  hint: 'Distance' },
  { word: 'LEFT',   opposite: 'RIGHT',  emoji: '👈',  hint: 'Direction' },
  { word: 'FRONT',  opposite: 'BACK',   emoji: '🔙',  hint: 'Position' },
  { word: 'INSIDE', opposite: 'OUTSIDE',emoji: '🏠',  hint: 'Location' },

  // Level 3 — Feelings & Personality
  { word: 'KIND',   opposite: 'CRUEL',  emoji: '💗',  hint: 'Character' },
  { word: 'BRAVE',  opposite: 'COWARD', emoji: '🦁',  hint: 'Courage' },
  { word: 'SMART',  opposite: 'SILLY',  emoji: '🧠',  hint: 'Intelligence' },
  { word: 'POLITE', opposite: 'RUDE',   emoji: '🤝',  hint: 'Manners' },
  { word: 'BUSY',   opposite: 'FREE',   emoji: '📅',  hint: 'Activity' },
  { word: 'AWAKE',  opposite: 'ASLEEP', emoji: '😴',  hint: 'State' },
  { word: 'STRONG', opposite: 'WEAK',   emoji: '💪',  hint: 'Strength' },
  { word: 'HEALTHY',opposite: 'SICK',   emoji: '🏥',  hint: 'Health' },
  { word: 'CALM',   opposite: 'ANGRY',  emoji: '😤',  hint: 'Emotion' },
  { word: 'FUNNY',  opposite: 'SERIOUS',emoji: '😄',  hint: 'Mood' },

  // Level 4 — Actions
  { word: 'PUSH',   opposite: 'PULL',   emoji: '🤜',  hint: 'Action' },
  { word: 'RUN',    opposite: 'WALK',   emoji: '🏃',  hint: 'Movement' },
  { word: 'GIVE',   opposite: 'TAKE',   emoji: '🎁',  hint: 'Exchange' },
  { word: 'BUY',    opposite: 'SELL',   emoji: '🛒',  hint: 'Commerce' },
  { word: 'LAUGH',  opposite: 'CRY',    emoji: '😂',  hint: 'Expression' },
  { word: 'LOVE',   opposite: 'HATE',   emoji: '❤️',  hint: 'Feeling' },
  { word: 'RISE',   opposite: 'FALL',   emoji: '📈',  hint: 'Movement' },
  { word: 'WIN',    opposite: 'LOSE',   emoji: '🏆',  hint: 'Result' },
  { word: 'START',  opposite: 'STOP',   emoji: '▶️',  hint: 'Action' },
  { word: 'COME',   opposite: 'GO',     emoji: '🚶',  hint: 'Movement' },

  // Level 5 — Nature
  { word: 'SUMMER', opposite: 'WINTER', emoji: '🌞',  hint: 'Season' },
  { word: 'SUNRISE',opposite: 'SUNSET', emoji: '🌅',  hint: 'Time of day' },
  { word: 'NORTH',  opposite: 'SOUTH',  emoji: '🧭',  hint: 'Direction' },
  { word: 'EAST',   opposite: 'WEST',   emoji: '🧭',  hint: 'Direction' },
  { word: 'OCEAN',  opposite: 'DESERT', emoji: '🏝️', hint: 'Environment' },
  { word: 'MOUNTAIN',opposite:'VALLEY', emoji: '⛰️', hint: 'Landform' },
  { word: 'FOREST', opposite: 'CITY',   emoji: '🌳',  hint: 'Environment' },
  { word: 'WILD',   opposite: 'TAME',   emoji: '🐅',  hint: 'Animal' },
  { word: 'NATURAL',opposite: 'ARTIFICIAL',emoji:'🌿',hint: 'Origin' },
  { word: 'ROUGH',  opposite: 'SMOOTH', emoji: '🪨',  hint: 'Texture' },

  // Level 6 — School
  { word: 'CORRECT',opposite: 'WRONG',  emoji: '✅',  hint: 'Answer' },
  { word: 'PASS',   opposite: 'FAIL',   emoji: '📝',  hint: 'Result' },
  { word: 'QUESTION',opposite:'ANSWER', emoji: '❓',  hint: 'Learning' },
  { word: 'TEACHER',opposite:'STUDENT', emoji: '👩‍🏫',hint: 'School' },
  { word: 'WRITE',  opposite: 'ERASE',  emoji: '✏️',  hint: 'Action' },
  { word: 'LEARN',  opposite: 'FORGET', emoji: '📚',  hint: 'Memory' },
  { word: 'FIRST',  opposite: 'LAST',   emoji: '🥇',  hint: 'Order' },
  { word: 'HARD',   opposite: 'EASY',   emoji: '🧩',  hint: 'Difficulty' },
  { word: 'MORE',   opposite: 'LESS',   emoji: '➕',  hint: 'Quantity' },
  { word: 'SAME',   opposite: 'DIFFERENT',emoji:'🔄', hint: 'Comparison' },

  // Level 7 — Food & Taste
  { word: 'SWEET',  opposite: 'SOUR',   emoji: '🍭',  hint: 'Taste' },
  { word: 'BITTER', opposite: 'MILD',   emoji: '☕',  hint: 'Taste' },
  { word: 'FRESH',  opposite: 'STALE',  emoji: '🥖',  hint: 'Freshness' },
  { word: 'RAW',    opposite: 'COOKED', emoji: '🥩',  hint: 'Food state' },
  { word: 'JUICY',  opposite: 'DRY',    emoji: '🍊',  hint: 'Food' },
  { word: 'THICK',  opposite: 'THIN',   emoji: '🥞',  hint: 'Size' },
  { word: 'SPICY',  opposite: 'BLAND',  emoji: '🌶️', hint: 'Taste' },
  { word: 'RIPE',   opposite: 'UNRIPE', emoji: '🍎',  hint: 'Fruit' },
  { word: 'SOLID',  opposite: 'LIQUID', emoji: '🧊',  hint: 'State' },
  { word: 'FROZEN', opposite: 'MELTED', emoji: '🍦',  hint: 'Temperature' },

  // Level 8 — Advanced Adjectives
  { word: 'ANCIENT',opposite:'MODERN',  emoji: '🏛️', hint: 'Age' },
  { word: 'VISIBLE',opposite:'HIDDEN',  emoji: '👁️', hint: 'Visibility' },
  { word: 'REAL',   opposite: 'FAKE',   emoji: '💎',  hint: 'Authenticity' },
  { word: 'SIMPLE', opposite: 'COMPLEX',emoji: '🧩',  hint: 'Complexity' },
  { word: 'PUBLIC', opposite: 'PRIVATE',emoji: '🏟️', hint: 'Access' },
  { word: 'SAFE',   opposite: 'DANGEROUS',emoji:'⚠️',hint: 'Safety' },
  { word: 'POSSIBLE',opposite:'IMPOSSIBLE',emoji:'🚫',hint: 'Ability' },
  { word: 'ACCEPT', opposite: 'REJECT', emoji: '✋',  hint: 'Decision' },
  { word: 'INCLUDE',opposite:'EXCLUDE', emoji: '📋',  hint: 'Inclusion' },
  { word: 'EXPAND', opposite: 'SHRINK', emoji: '📦',  hint: 'Size change' },

  // Level 9 — Verbs & Advanced Actions
  { word: 'CREATE', opposite: 'DESTROY',emoji: '🔨',  hint: 'Making' },
  { word: 'UNITE',  opposite: 'DIVIDE', emoji: '🤝',  hint: 'Group' },
  { word: 'PROTECT',opposite: 'ATTACK', emoji: '🛡️', hint: 'Defence' },
  { word: 'SAVE',   opposite: 'WASTE',  emoji: '💰',  hint: 'Resource' },
  { word: 'TRUST',  opposite: 'DOUBT',  emoji: '🤔',  hint: 'Belief' },
  { word: 'LEAD',   opposite: 'FOLLOW', emoji: '👑',  hint: 'Role' },
  { word: 'REWARD', opposite: 'PUNISH', emoji: '🏅',  hint: 'Consequence' },
  { word: 'CONNECT',opposite:'DISCONNECT',emoji:'🔗', hint: 'Link' },
  { word: 'ADVANCE',opposite:'RETREAT', emoji: '⚔️',  hint: 'Movement' },
  { word: 'SUCCEED',opposite:'FAIL',    emoji: '🥇',  hint: 'Result' },

  // Level 10 — Expert / Abstract
  { word: 'OPTIMISM',opposite:'PESSIMISM',emoji:'🌈',hint: 'Attitude' },
  { word: 'FREEDOM',opposite:'CAPTIVITY',emoji:'🕊️',hint: 'Liberty' },
  { word: 'TRUTH',  opposite: 'LIE',    emoji: '📜',  hint: 'Honesty' },
  { word: 'PEACE',  opposite: 'WAR',    emoji: '☮️',  hint: 'State' },
  { word: 'RICH',   opposite: 'POOR',   emoji: '💰',  hint: 'Wealth' },
  { word: 'URBAN',  opposite: 'RURAL',  emoji: '🏙️', hint: 'Area' },
  { word: 'CHAOS',  opposite: 'ORDER',  emoji: '🌀',  hint: 'State' },
  { word: 'UNIQUE', opposite: 'COMMON', emoji: '💎',  hint: 'Rarity' },
  { word: 'GAIN',   opposite: 'LOSS',   emoji: '📉',  hint: 'Result' },
  { word: 'DAWN',   opposite: 'DUSK',   emoji: '🌅',  hint: 'Time' },
];

const getPoolForDifficulty = (d) => {
  const band = Math.min(d - 1, 9);
  return ALL_OPPOSITES.slice(band * 10, (band + 1) * 10);
};

const OppositeWords = ({ onScore, difficulty, isPaused }) => {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const q = getPoolForDifficulty(difficulty).sort(() => Math.random() - 0.5);
    setPool(q);
    setIdx(0);
    setFeedback(null);
  }, [difficulty]);

  const current = pool[idx % (pool.length || 1)];

  useEffect(() => {
    if (!current) return;
    const pool2 = getPoolForDifficulty(difficulty);
    const wrong = pool2
      .filter(p => p.opposite !== current.opposite)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => p.opposite);
    setOptions([current.opposite, ...wrong].sort(() => Math.random() - 0.5));
  }, [current, difficulty]);

  const speak = (text) => {
    if (isPaused) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  };

  const handleAnswer = (choice) => {
    if (isPaused || feedback || !current) return;
    if (choice === current.opposite) {
      setFeedback('correct');
      speak(`Correct! The opposite of ${current.word} is ${current.opposite}.`);
      setTimeout(() => { onScore(1); setIdx(i => i + 1); setFeedback(null); }, 1500);
    } else {
      setFeedback('wrong');
      speak(`Try again! Think about ${current.hint}.`);
      setTimeout(() => setFeedback(null), 1400);
    }
  };

  if (!current) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8 text-center">

        {/* Word Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.word}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-[4rem] border-8 border-white shadow-2xl p-10"
          >
            <div className="text-9xl mb-4">{current.emoji}</div>
            <p className="text-slate-100 uppercase tracking-widest text-sm font-bold mb-2">{current.hint}</p>
            <h2 className="text-6xl font-black text-white mb-2" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.3)' }}>
              {current.word}
            </h2>
            <p className="text-white/80 font-black text-2xl">What is the opposite?</p>
            <button
              onClick={() => speak(`What is the opposite of ${current.word}?`)}
              className="mt-4 mx-auto flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white font-black px-5 py-2 rounded-full border border-white/30 transition-all"
            >
              <Volume2 size={18} /> Hear It
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-2 gap-5">
          {options.map((opt, i) => {
            let cls = 'bg-white text-slate-800 border-slate-800 shadow-[0_10px_0_0_rgba(30,41,59,1)] hover:bg-orange-50';
            if (feedback === 'correct' && opt === current.opposite)
              cls = 'bg-green-400 text-white border-green-700 shadow-[0_6px_0_0_rgba(21,128,61,1)] scale-105';
            if (feedback === 'wrong' && opt !== current.opposite)
              cls = 'opacity-40 bg-white text-slate-400 border-slate-300';
            return (
              <motion.button
                key={opt}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleAnswer(opt)}
                className={`py-9 rounded-[3rem] border-4 text-3xl font-black uppercase transition-all active:translate-y-2 active:shadow-none ${cls}`}
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

export default OppositeWords;
