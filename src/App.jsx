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
import { ArrowLeft, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/KidsUI';

// Placeholder for other games
const GameStub = ({ id, onBack }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-kids-sky/10">
    <Button onClick={onBack} className="absolute top-8 left-8" variant="secondary">
      <ArrowLeft /> Back
    </Button>
    <div className="text-center space-y-6">
      <h2 className="text-6xl font-black text-slate-800 uppercase">{id.replace(/-/g, ' ')}</h2>
      <div className="text-8xl animate-bounce">🚀</div>
      <p className="text-3xl font-bold text-slate-600">Coming Soon!</p>
    </div>
  </div>
);

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
      default:
        if (activeGame) return <GameStub id={activeGame} onBack={() => setActiveGame(null)} />;
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
