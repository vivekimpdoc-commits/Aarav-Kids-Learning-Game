import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { Star, Heart } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

const UniversalGame = ({ id, onScore, difficulty, isPaused }) => {
  const config = GAME_DATA[id] || { 
    type: 'quiz', 
    title: id, 
    questions: [{ q: 'Loading...', a: 'Ok', opts: ['Ok'] }] 
  };
  
  const [step, setStep] = useState(0);
  const [lives, setLives] = useState(3);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleChoice = (choice) => {
    if (isPaused) return;

    const current = config.type === 'quiz' || config.type === 'audio-quiz' 
      ? config.questions[step] 
      : config.items ? config.items[step] : null;

    const isCorrect = config.type === 'match' 
      ? choice === config.pairs[step].right
      : choice === (current.a || current.cat);

    if (isCorrect) {
      onScore(1); // Notify GameManager
      speak("Great job!");
      
      const totalSteps = (config.questions || config.pairs || config.items).length;
      setStep((step + 1) % totalSteps); // Infinite cycle for practice
    } else {
      setLives(l => Math.max(0, l - 1));
      speak("Try again!");
    }
  };

  const renderContent = () => {
    if (config.type === 'quiz' || config.type === 'audio-quiz') {
      const q = config.questions[step];
      return (
        <div className="space-y-8">
          <Card className="py-12 bg-white/80 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-slate-800 text-center">{q.q}</h3>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.opts.map(opt => (
              <Button key={opt} onClick={() => handleChoice(opt)} className="text-2xl py-6">
                {opt}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === 'match' && config.pairs) {
      const pair = config.pairs[step];
      return (
        <div className="space-y-8 text-center">
          <div className="flex justify-center items-center gap-8">
            <Card className="w-48 h-48 flex items-center justify-center bg-white border-4 border-kids-sun shadow-xl">
              <span className="text-4xl font-black text-slate-800">{pair?.left}</span>
            </Card>
            <div className="text-4xl text-slate-400">➡️</div>
            <div className="w-48 h-48 border-4 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center bg-white/50">
              <span className="text-sm font-black text-slate-300 italic uppercase">Match</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {config.pairs.slice(0, 4).map((p, i) => (
              <Button key={i} onClick={() => handleChoice(p.right)} variant="secondary" className="text-xl">
                {p.right}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === 'sorting' && config.items) {
      const item = config.items[step];
      return (
        <div className="space-y-8 text-center">
          <motion.div key={item?.name} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-9xl mb-4">
            {item?.emoji}
          </motion.div>
          <h3 className="text-4xl font-black text-slate-800 uppercase bg-white/50 inline-block px-8 py-2 rounded-full border-2 border-slate-200">{item?.name}</h3>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <Button onClick={() => handleChoice('Fruit')} variant="primary" className="py-8 text-2xl">FRUIT 🍎</Button>
            <Button onClick={() => handleChoice('Veggie')} variant="success" className="py-8 text-2xl">VEGGIE 🥕</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-20 bg-white/30 rounded-[3rem]">
        <h3 className="text-3xl font-black text-slate-400 uppercase italic tracking-tighter">Setting Up Game...</h3>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-black text-center text-slate-800 mb-8 uppercase tracking-widest bg-white/40 inline-block px-10 py-1 rounded-full border-2 border-white/60 mx-auto block w-fit">
          {config.title}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default UniversalGame;
