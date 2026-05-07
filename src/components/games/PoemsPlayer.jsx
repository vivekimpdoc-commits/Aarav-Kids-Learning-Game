import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Play, Volume2 } from 'lucide-react';

const poems = [
  { title: "Twinkle Twinkle Little Star", emoji: "⭐", text: "Twinkle, twinkle, little star, How I wonder what you are!" },
  { title: "Baa Baa Black Sheep", emoji: "🐑", text: "Baa, baa, black sheep, Have you any wool?" },
  { title: "Old MacDonald", emoji: "🚜", text: "Old MacDonald had a farm, E-I-E-I-O!" }
];

const PoemsPlayer = ({ onScore, difficulty, isPaused }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (text) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => {
      setIsPlaying(false);
      onScore(1);
    };
    synth.speak(utter);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {poems.map((p, i) => (
            <Card 
              key={i} 
              onClick={() => { setCurrent(i); setIsPlaying(false); }}
              className={`cursor-pointer transition-all p-4 ${current === i ? 'border-sky-500 scale-105 bg-sky-50' : 'opacity-60'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{p.emoji}</span>
                <span className="text-xl font-black text-slate-800">{p.title}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white border-8 border-slate-800 rounded-[3rem]">
          <motion.div 
            key={current}
            animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-9xl"
          >
            {poems[current].emoji}
          </motion.div>
          <h3 className="text-3xl font-black text-slate-800">{poems[current].title}</h3>
          <p className="text-lg font-bold text-slate-500 italic">"{poems[current].text}"</p>
          <Button 
            onClick={() => { setIsPlaying(true); speak(poems[current].text); }}
            className="w-full py-8 text-2xl"
            disabled={isPlaying || isPaused}
          >
            {isPlaying ? <Volume2 className="animate-pulse" /> : <Play />} LISTEN NOW
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PoemsPlayer;
