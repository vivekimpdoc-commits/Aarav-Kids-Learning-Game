import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Dashboard from './components/layout/Dashboard';
import AlphabetMatching from './components/games/AlphabetMatching';
import VowelsConsonants from './components/games/VowelsConsonants';
import AIFriend from './components/games/AIFriend';
import PictureMatch from './components/games/PictureMatch';
import InteractiveStory from './components/games/InteractiveStory';
import NamingWords from './components/games/NamingWords';
import ActionWords from './components/games/ActionWords';
import NumbersInWords from './components/games/NumbersInWords';
import ColoursGame from './components/games/ColoursGame';
import DaysOfWeek from './components/games/DaysOfWeek';
import HeSheQuiz from './components/games/HeSheQuiz';
import LetterTracing from './components/games/LetterTracing';
import PoemsPlayer from './components/games/PoemsPlayer';
import UniversalGame from './components/games/UniversalGame';
import { ArrowLeft, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/KidsUI';

const AppContent = () => {
  const [activeGame, setActiveGame] = useState(null);
  const { theme, toggleTheme } = useGame();
  const [isMuted, setIsMuted] = useState(false);

  const renderGame = () => {
    switch (activeGame) {
      case 'alphabet-matching':
        return <AlphabetMatching onBack={() => setActiveGame(null)} />;
      case 'vowels-consonants':
        return <VowelsConsonants onBack={() => setActiveGame(null)} />;
      case 'ai-chatbot':
        return <AIFriend onBack={() => setActiveGame(null)} />;
      case 'simple-words':
        return <PictureMatch onBack={() => setActiveGame(null)} />;
      case 'story-reading':
        return <InteractiveStory onBack={() => setActiveGame(null)} />;
      case 'naming-words':
        return <NamingWords onBack={() => setActiveGame(null)} />;
      case 'action-words':
        return <ActionWords onBack={() => setActiveGame(null)} />;
      case 'numbers-words':
        return <NumbersInWords onBack={() => setActiveGame(null)} />;
      case 'colours-name':
        return <ColoursGame onBack={() => setActiveGame(null)} />;
      case 'days-week':
        return <DaysOfWeek onBack={() => setActiveGame(null)} />;
      case 'he-she':
        return <HeSheQuiz onBack={() => setActiveGame(null)} />;
      case 'letter-tracing':
        return <LetterTracing onBack={() => setActiveGame(null)} />;
      case 'poems-rhymes':
        return <PoemsPlayer onBack={() => setActiveGame(null)} />;
      default:
        // Use Universal Game for all other modules! No more "Coming Soon"
        if (activeGame) {
          return <UniversalGame id={activeGame} onBack={() => setActiveGame(null)} />;
        }
        return (
          <div className="min-h-screen">
            <nav className="p-4 flex justify-end gap-4">
              <Button size="sm" variant="secondary" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              <Button size="sm" variant="secondary" onClick={toggleTheme}>
                {theme === 'light' ? <Moon /> : <Sun />}
              </Button>
            </nav>
            <Dashboard onSelectGame={(id) => setActiveGame(id)} />
          </div>
        );
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-slate-900 text-white min-h-screen' : 'bg-sky-50 min-h-screen'}>
      {renderGame()}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
