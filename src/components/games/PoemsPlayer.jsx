import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Play, Music, Volume2 } from 'lucide-react';

const poems = [
  { title: "Twinkle Twinkle Little Star", emoji: "⭐", text: "Twinkle, twinkle, little star, How I wonder what you are!" },
  { title: "Baa Baa Black Sheep", emoji: "🐑", text: "Baa, baa, black sheep, Have you any wool?" },
  { title: "Old MacDonald", emoji: "🚜", text: "Old MacDonald had a farm, E-I-E-I-O!" }
];

const PoemsPlayer = ({ onBack }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => setIsPlaying(false);
    synth.speak(utter);
  };

  return (
    <div className="min-h-screen bg-kids-bubblegum/5 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm"><ArrowLeft /> Back</Button>
        <h2 className="text-4xl font-black text-slate-800">Poems & Rhymes</h2>
        <div className="w-10" />
      </header>

      <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          {poems.map((p, i) => (
            <Card 
              key={i} 
              onClick={() => { setCurrent(i); setIsPlaying(false); }}
              className={`cursor-pointer transition-all ${current === i ? 'border-kids-bubblegum scale-105' : 'opacity-60'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{p.emoji}</span>
                <span className="text-xl font-black">{p.title}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white min-h-[400px]">
          <div className="text-9xl animate-bounce">{poems[current].emoji}</div>
          <h3 className="text-3xl font-black text-slate-800">{poems[current].title}</h3>
          <p className="text-xl font-bold text-slate-600 italic">"{poems[current].text}"</p>
          <Button 
            onClick={() => { setIsPlaying(true); speak(poems[current].text); }}
            className="w-full py-6 text-2xl"
          >
            {isPlaying ? <Volume2 className="animate-pulse" /> : <Play />} Listen Now
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default PoemsPlayer;
