import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { GAME_DATA, getContentForLevel } from '../../data/gameData';

const UniversalGame = ({ id, onScore, difficulty, isPaused }) => {
  const config = GAME_DATA[id] || { title: id };
  
  // Get fresh content based on the current level's difficulty
  const levelContent = useMemo(() => {
    return getContentForLevel(id, difficulty);
  }, [id, difficulty]);

  const [step, setStep] = useState(0);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleChoice = (choice) => {
    if (isPaused || !levelContent) return;

    const current = levelContent[step];
    if (!current) return;

    const isCorrect = config.type === 'match' 
      ? choice === current.right
      : choice === (current.a || current.cat);

    if (isCorrect) {
      onScore(1);
      speak("Great job!");
      setStep((step + 1) % levelContent.length);
    } else {
      speak("Try again!");
    }
  };

  if (!levelContent || levelContent.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/20 backdrop-blur-md rounded-[3rem]">
        <h3 className="text-4xl font-black text-slate-800 mb-4 uppercase italic">Level {difficulty} Challenge</h3>
        <p className="text-xl font-bold text-slate-600">Get ready for more exciting learning!</p>
        <Button onClick={() => onScore(1)} className="mt-8">Start Practice</Button>
      </div>
    );
  }

  const renderContent = () => {
    const current = levelContent[step];

    if (config.type === 'quiz' || config.type === 'audio-quiz') {
      return (
        <div className="space-y-8">
          <Card className="py-12 bg-white/80 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-slate-800 text-center">{current.q}</h3>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.opts.map(opt => (
              <Button key={opt} onClick={() => handleChoice(opt)} className="text-2xl py-6">
                {opt}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === 'match') {
      return (
        <div className="space-y-8 text-center">
          <div className="flex justify-center items-center gap-8">
            <Card className="w-48 h-48 flex items-center justify-center bg-white border-4 border-kids-sun shadow-xl">
              <span className="text-4xl font-black text-slate-800">{current?.left}</span>
            </Card>
            <div className="text-4xl text-slate-400">➡️</div>
            <div className="w-48 h-48 border-4 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center bg-white/50">
              <span className="text-sm font-black text-slate-300 italic uppercase">Match</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {levelContent.map((p, i) => (
              <Button key={i} onClick={() => handleChoice(p.right)} variant="secondary" className="text-xl">
                {p.right}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === 'sorting') {
      return (
        <div className="space-y-8 text-center">
          <motion.div key={current?.name} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-9xl mb-4">
            {current?.emoji}
          </motion.div>
          <h3 className="text-4xl font-black text-slate-800 uppercase bg-white/50 inline-block px-8 py-2 rounded-full border-2 border-slate-200">{current?.name}</h3>
          <div className="grid grid-cols-2 gap-6 mt-8">
            {['Person', 'Place', 'Animal', 'Thing'].slice(0, Math.min(4, difficulty + 1)).map(cat => (
              <Button key={cat} onClick={() => handleChoice(cat)} variant="primary" className="py-8 text-2xl uppercase">{cat}</Button>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-black text-center text-slate-800 mb-8 uppercase tracking-widest bg-white/40 inline-block px-10 py-1 rounded-full border-2 border-white/60 mx-auto block w-fit">
          {config.title} - Level {difficulty}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default UniversalGame;
