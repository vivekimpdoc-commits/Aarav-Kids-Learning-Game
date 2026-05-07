import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star, Heart, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';

const DaysOfWeek = ({ onBack }) => {
  const { addStars } = useGame();
  const correctOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [items, setItems] = useState([]);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    setItems([...correctOrder].sort(() => Math.random() - 0.5));
  }, []);

  const checkOrder = () => {
    const isCorrect = items.every((val, index) => val === correctOrder[index]);
    if (isCorrect) {
      setIsWon(true);
      addStars(30);
      confetti({ particleCount: 150, spread: 70 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance("Amazing! You know all the days of the week!");
      synth.speak(utter);
    } else {
      setLives(l => {
        if (l <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return l - 1;
      });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance("Not quite! Try again.");
      synth.speak(utter);
    }
  };

  return (
    <div className="min-h-screen bg-kids-sky/5 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`w-8 h-8 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-300'}`} />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md w-full text-center space-y-8">
        <h2 className="text-5xl font-black text-slate-800">Days of the Week</h2>
        <p className="text-xl font-bold text-slate-600">Drag them into the correct order!</p>

        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
          {items.map((day) => (
            <Reorder.Item key={day} value={day}>
              <Card className="py-4 cursor-grab active:cursor-grabbing hover:bg-slate-50 transition-colors">
                <span className="text-2xl font-black text-slate-800">{day}</span>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <Button onClick={checkOrder} variant="success" className="w-full mt-8">
          Check My Order!
        </Button>
      </main>

      <AnimatePresence>
        {(isGameOver || isWon) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-50 p-4"
          >
            <Card className="max-w-md w-full text-center space-y-8 py-12">
              <h3 className="text-5xl font-black text-slate-800">
                {isWon ? 'YOU WON!' : 'OUT! (Game Over)'}
              </h3>
              <div className="text-8xl">
                {isWon ? '🌟' : '😢'}
              </div>
              <p className="text-2xl font-bold text-slate-600">
                {isWon ? 'You are a master of time!' : 'Oh no! You ran out of lives.'}
              </p>
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => {
                    setLives(3);
                    setItems([...correctOrder].sort(() => Math.random() - 0.5));
                    setIsGameOver(false);
                    setIsWon(false);
                  }}
                  variant="primary"
                >
                  Try Again
                </Button>
                <Button onClick={onBack} variant="secondary">
                  Exit
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DaysOfWeek;
