import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, BookOpen } from 'lucide-react';

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

const InteractiveStory = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentStory = stories[0];

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop current speech
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.onend = () => setIsPlaying(false);
    synth.speak(utter);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    speak(currentStory.pages[currentPage].text);
  };

  return (
    <div className="min-h-screen bg-kids-purple/5 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft /> Back
        </Button>
        <div className="flex items-center gap-2 text-kids-purple">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-3xl font-black">{currentStory.title}</h2>
        </div>
      </header>

      <main className="max-w-4xl w-full">
        <Card className="p-12 min-h-[500px] flex flex-col items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center gap-12 text-center"
            >
              <div className="text-[12rem] leading-none drop-shadow-lg">
                {currentStory.pages[currentPage].emoji}
              </div>
              <p className="text-4xl font-bold text-slate-800 leading-relaxed">
                {currentStory.pages[currentPage].text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="w-full flex justify-between items-center mt-12">
            <Button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              variant="secondary"
              size="sm"
            >
              <SkipBack />
            </Button>

            <Button onClick={handlePlay} className="px-12">
              {isPlaying ? <Pause /> : <Play />} Listen
            </Button>

            <Button 
              onClick={() => setCurrentPage(p => Math.min(currentStory.pages.length - 1, p + 1))}
              disabled={currentPage === currentStory.pages.length - 1}
              variant="secondary"
              size="sm"
            >
              <SkipForward />
            </Button>
          </div>
        </Card>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-slate-200 rounded-full mt-8 overflow-hidden border-2 border-slate-800">
          <motion.div
            className="h-full bg-kids-purple"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / currentStory.pages.length) * 100}%` }}
          />
        </div>
      </main>
    </div>
  );
};

export default InteractiveStory;
