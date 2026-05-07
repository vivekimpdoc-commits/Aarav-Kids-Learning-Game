import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const NamingWords = ({ onBack }) => {
  const { addStars } = useGame();
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);

  const words = [
    { name: 'Teacher', category: 'Person', emoji: '🧑‍🏫' },
    { name: 'School', category: 'Place', emoji: '🏫' },
    { name: 'Lion', category: 'Animal', emoji: '🦁' },
    { name: 'Pencil', category: 'Thing', emoji: '✏️' },
    { name: 'Mother', category: 'Person', emoji: '👩' },
    { name: 'Park', category: 'Place', emoji: '🌳' },
    { name: 'Elephant', category: 'Animal', emoji: '🐘' },
    { name: 'Book', category: 'Thing', emoji: '📖' },
    { name: 'Doctor', category: 'Person', emoji: '👨‍⚕️' },
    { name: 'Hospital', category: 'Place', emoji: '🏥' },
    { name: 'Tiger', category: 'Animal', emoji: '🐯' },
    { name: 'Bag', category: 'Thing', emoji: '🎒' },
    { name: 'Farmer', category: 'Person', emoji: '👨‍🌾' },
    { name: 'Farm', category: 'Place', emoji: '🚜' },
    { name: 'Dog', category: 'Animal', emoji: '🐶' },
    { name: 'Car', category: 'Thing', emoji: '🚗' },
    { name: 'Sister', category: 'Person', emoji: '👧' },
    { name: 'Zoo', category: 'Place', emoji: '🦁' },
    { name: 'Monkey', category: 'Animal', emoji: '🐒' },
    { name: 'Bottle', category: 'Thing', emoji: '🍼' },
    { name: 'Pilot', category: 'Person', emoji: '👨‍✈️' },
    { name: 'Airport', category: 'Place', emoji: '🛫' },
    { name: 'Cat', category: 'Animal', emoji: '🐱' },
    { name: 'Umbrella', category: 'Thing', emoji: '☂️' },
    { name: 'Brother', category: 'Person', emoji: '👦' },
    { name: 'Kitchen', category: 'Place', emoji: '🍳' },
    { name: 'Giraffe', category: 'Animal', emoji: '🦒' },
    { name: 'Ball', category: 'Thing', emoji: '⚽' },
    { name: 'Nurse', category: 'Person', emoji: '🧑‍⚕️' },
    { name: 'Beach', category: 'Place', emoji: '🏖️' },
    { name: 'Cow', category: 'Animal', emoji: '🐮' },
    { name: 'Computer', category: 'Thing', emoji: '💻' },
    { name: 'Fireman', category: 'Person', emoji: '👨‍🚒' },
    { name: 'Forest', category: 'Place', emoji: '🌲' },
    { name: 'Rabbit', category: 'Animal', emoji: '🐰' },
    { name: 'Table', category: 'Thing', emoji: '🪑' },
    { name: 'Chef', category: 'Person', emoji: '👨‍🍳' },
    { name: 'Bank', category: 'Place', emoji: '🏦' },
    { name: 'Bird', category: 'Animal', emoji: '🐦' },
    { name: 'Cycle', category: 'Thing', emoji: '🚲' },
    { name: 'Police', category: 'Person', emoji: '👮' },
    { name: 'Library', category: 'Place', emoji: '📚' },
    { name: 'Snake', category: 'Animal', emoji: '🐍' },
    { name: 'Watch', category: 'Thing', emoji: '⌚' },
    { name: 'King', category: 'Person', emoji: '🤴' },
    { name: 'Garden', category: 'Place', emoji: '🌻' },
    { name: 'Zebra', category: 'Animal', emoji: '🦓' },
    { name: 'Lamp', category: 'Thing', emoji: '💡' },
    { name: 'Queen', category: 'Person', emoji: '👸' },
    { name: 'Museum', category: 'Place', emoji: '🏛️' },
  ];

  const categories = ['Person', 'Place', 'Animal', 'Thing'];

  const generateRound = () => {
    setCurrent(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => generateRound(), []);

  const handleChoice = (cat) => {
    if (cat === current.category) {
      setScore(s => s + 10);
      addStars(5);
      confetti({ particleCount: 50, spread: 60 });
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Correct! ${current.name} is a ${cat}`);
      synth.speak(utter);
      setTimeout(generateRound, 1200);
    } else {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Oops! Try again.`);
      synth.speak(utter);
    }
  };

  if (!current) return null;

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="bg-white px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-black">{score}</span>
        </div>
      </header>

      <main className="max-w-3xl w-full text-center space-y-12">
        <h2 className="text-5xl font-black text-slate-800 italic underline decoration-kids-sun">Noun Detective!</h2>
        
        <motion.div
          key={current.name}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-8 border-slate-800 shadow-[0_15px_0_0_rgba(30,41,59,1)] space-y-6"
        >
          <div className="text-[10rem]">{current.emoji}</div>
          <h3 className="text-6xl font-black text-slate-800 uppercase tracking-tighter">{current.name}</h3>
          <p className="text-2xl font-bold text-slate-500 italic">Is this a Person, Place, Animal, or Thing?</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => handleChoice(cat)}
              className="text-2xl py-6"
            >
              {cat}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NamingWords;
