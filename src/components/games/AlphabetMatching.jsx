import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const AlphabetMatching = ({ onBack }) => {
  const { addStars, unlockGame } = useGame();
  const [round, setRound] = useState(1);
  const [letters, setLetters] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isWon, setIsWon] = useState(false);

  const generateRound = () => {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const selected = [];
    while (selected.length < 4) {
      const char = allLetters[Math.floor(Math.random() * allLetters.length)];
      if (!selected.includes(char)) selected.push(char);
    }
    
    setLetters(selected.map(char => ({ char, id: Math.random() })));
    setMatched([]);
    setIsWon(false);
  };

  useEffect(() => generateRound(), []);

  const handleMatch = (char) => {
    if (matched.includes(char)) return;
    
    const newMatched = [...matched, char];
    setMatched(newMatched);
    
    // Play success sound
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(char);
    utter.rate = 1.2;
    synth.speak(utter);

    if (newMatched.length === 4) {
      setIsWon(true);
      addStars(20);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Unlock next game (Vowels & Consonants)
      unlockGame('vowels-consonants');
    }
  };

  return (
    <div className="min-h-screen bg-kids-bubblegum/10 p-4 md:p-8">
      <header className="flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)]">
          <span className="text-xl font-black text-slate-800 uppercase tracking-widest">Round {round}/5</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-4 animate-bounce-gentle">
            Match the Letters!
          </h2>
          <p className="text-2xl text-slate-600 font-bold">Tap the letter that matches the shadow!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {letters.map((item) => (
            <div key={item.id} className="relative aspect-square">
              {/* Target Slot */}
              <div className="absolute inset-0 bg-slate-200 rounded-[2rem] border-4 border-dashed border-slate-400 flex items-center justify-center">
                <span className="text-8xl font-black text-slate-300 select-none">
                  {item.char}
                </span>
              </div>
              
              {/* Matched Letter Overlay */}
              <AnimatePresence>
                {matched.includes(item.char) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute inset-0 bg-kids-sun rounded-[2rem] border-4 border-slate-800 shadow-[0_8px_0_0_rgba(30,41,59,1)] flex items-center justify-center z-10"
                  >
                    <span className="text-8xl font-black text-slate-800">{item.char}</span>
                    <div className="absolute -top-4 -right-4 bg-kids-grass p-2 rounded-full border-4 border-slate-800">
                      <CheckCircle2 className="text-white w-8 h-8" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Options to click */}
        <div className="flex flex-wrap justify-center gap-6">
          {letters.map((item) => (
            <motion.div
              key={`opt-${item.id}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Card
                onClick={() => handleMatch(item.char)}
                className={`w-32 h-32 flex items-center justify-center cursor-pointer transition-opacity ${matched.includes(item.char) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <span className="text-6xl font-black text-slate-800">{item.char}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 p-4"
            >
              <Card className="max-w-md w-full text-center space-y-8 py-12">
                <div className="flex justify-center">
                  <div className="bg-kids-sun p-6 rounded-full border-4 border-slate-800 animate-bounce">
                    <Star className="w-20 h-20 fill-yellow-500 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-5xl font-black text-slate-800">AMAZING!</h3>
                <p className="text-2xl font-bold text-slate-600">You matched all the letters!</p>
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => {
                      if (round < 5) {
                        setRound(r => r + 1);
                        generateRound();
                      } else {
                        onBack();
                      }
                    }}
                    variant="success"
                    className="w-full"
                  >
                    {round < 5 ? 'Next Round!' : 'Finish Game!'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AlphabetMatching;
