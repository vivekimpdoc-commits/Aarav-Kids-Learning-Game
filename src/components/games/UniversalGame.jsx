import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GAME_DATA } from '../../data/gameData';

const UniversalGame = ({ id, onBack }) => {
  const { addStars } = useGame();
  const config = GAME_DATA[id] || { type: 'quiz', title: id, questions: [{ q: 'Loading...', a: 'Ok', opts: ['Ok'] }] };
  
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleChoice = (choice) => {
    const current = config.type === 'quiz' || config.type === 'audio-quiz' 
      ? config.questions[step] 
      : config.items ? config.items[step] : null;

    const isCorrect = config.type === 'match' 
      ? choice === config.pairs[step].right
      : choice === (current.a || current.cat);

    if (isCorrect) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 40, spread: 50 });
      speak("Great job!");
      
      const totalSteps = (config.questions || config.pairs || config.items).length;
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        setIsWon(true);
      }
    } else {
      setLives(l => {
        if (l <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return l - 1;
      });
      speak("Try again!");
    }
  };

  const renderContent = () => {
    if (config.type === 'quiz' || config.type === 'audio-quiz') {
      const q = config.questions[step];
      return (
        <div className="space-y-12">
          <Card className="py-16">
            <h3 className="text-5xl font-black text-slate-800">{q.q}</h3>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {q.opts.map(opt => (
              <Button key={opt} onClick={() => handleChoice(opt)} className="text-3xl py-8">
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
        <div className="space-y-12 text-center">
          <div className="flex justify-center items-center gap-12">
            <Card className="w-64 h-64 flex items-center justify-center bg-kids-sun/20">
              <span className="text-5xl font-black">{pair?.left}</span>
            </Card>
            <div className="text-6xl text-slate-400">➡️</div>
            <div className="w-64 h-64 border-4 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center">
              <span className="text-xl font-bold text-slate-300 italic uppercase">Find Match</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {config.pairs.map((p, i) => (
              <Button key={i} onClick={() => handleChoice(p.right)} variant="secondary" className="text-2xl">
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
        <div className="space-y-12 text-center">
          <motion.div key={item?.name} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[12rem]">
            {item?.emoji}
          </motion.div>
          <h3 className="text-5xl font-black text-slate-800 uppercase">{item?.name}</h3>
          <div className="grid grid-cols-2 gap-8">
            <Button onClick={() => handleChoice('Fruit')} variant="primary" className="py-10 text-3xl">FRUIT 🍎</Button>
            <Button onClick={() => handleChoice('Veggie')} variant="success" className="py-10 text-3xl">VEGGIE 🥕</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-20">
        <h3 className="text-3xl font-bold text-slate-400">Oops! This game is still being set up.</h3>
        <Button onClick={onBack} className="mt-8">Go Back</Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-kids-sky/5 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-black">{score}</span>
          </div>
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-300'}`} />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl w-full">
        <h2 className="text-5xl font-black text-center text-slate-800 mb-12 underline decoration-kids-sun">{config.title}</h2>
        {renderContent()}
      </main>

      <AnimatePresence>
        {(isGameOver || isWon) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-50 p-4">
            <Card className="max-w-md w-full text-center space-y-8 py-12">
              <h3 className="text-5xl font-black text-slate-800">{isWon ? 'COMPLETED!' : 'OUT!'}</h3>
              <div className="text-8xl">{isWon ? '🏆' : '😢'}</div>
              <div className="flex flex-col gap-4">
                <Button onClick={() => { setStep(0); setScore(0); setLives(3); setIsGameOver(false); setIsWon(false); }} variant="primary">Play Again</Button>
                <Button onClick={onBack} variant="secondary">Back to Menu</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UniversalGame;
