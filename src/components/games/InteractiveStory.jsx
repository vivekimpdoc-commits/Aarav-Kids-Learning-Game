import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const stories = [
  {
    title: "The Brave Little Rabbit",
    pages: [
      { text: "Once upon a time, there was a little rabbit named Benny.", emoji: "🐰" },
      { text: "Benny lived in a beautiful green forest with many friends.", emoji: "🌳" },
      { text: "One day, Benny found a giant golden carrot!", emoji: "🥕" },
      { text: "He shared the carrot with all his friends, and they had a big party.", emoji: "🎉" },
      { text: "Benny was the happiest rabbit in the world. The End!", emoji: "💖" }
    ]
  }
];

const InteractiveStory = ({ onScore, difficulty, isPaused }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentStory = stories[0];

  const speak = (text) => {
    if (isPaused) return;
    const synth = window.speechSynthesis;
    synth.cancel(); 
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.onend = () => setIsPlaying(false);
    synth.speak(utter);
  };

  const handleNext = () => {
    if (currentPage < currentStory.pages.length - 1) {
      setCurrentPage(p => p + 1);
      onScore(1);
    }
  };

  const handleBack = () => {
    setCurrentPage(p => Math.max(0, p - 1));
  };

  const handlePlay = () => {
    setIsPlaying(true);
    speak(currentStory.pages[currentPage].text);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-12 min-h-[500px] flex flex-col items-center justify-between bg-white/80 border-8 border-slate-800 rounded-[3rem] shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="text-[12rem] leading-none drop-shadow-xl">{currentStory.pages[currentPage].emoji}</div>
            <p className="text-4xl font-black text-slate-800 leading-tight">
              {currentStory.pages[currentPage].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex justify-between items-center mt-12 gap-4">
          <Button 
            onClick={handleBack}
            disabled={currentPage === 0}
            variant="secondary"
            className="flex-1 py-6 rounded-2xl"
          >
            <SkipBack />
          </Button>

          <Button onClick={handlePlay} className="flex-[2] py-6 rounded-2xl text-2xl font-black shadow-[0_8px_0_0_rgba(14,165,233,1)]">
            {isPlaying ? <Pause /> : <Play />} LISTEN
          </Button>

          <Button 
            onClick={handleNext}
            disabled={currentPage === currentStory.pages.length - 1}
            variant="success"
            className="flex-1 py-6 rounded-2xl shadow-[0_8px_0_0_rgba(16,185,129,1)]"
          >
            <SkipForward />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveStory;
