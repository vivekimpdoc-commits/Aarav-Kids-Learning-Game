import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Dashboard from './components/layout/Dashboard';
import LevelSelection from './components/layout/LevelSelection';
import GameManager from './components/layout/GameManager';
import CharacterShop from './components/layout/CharacterShop';

// Import all game components
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
import { GAMES } from './data/games';

const COMPONENT_MAP = {
  'alphabet-matching': AlphabetMatching,
  'vowels-consonants': VowelsConsonants,
  'ai-chatbot': AIFriend,
  'simple-words': PictureMatch,
  'story-reading': InteractiveStory,
  'naming-words': NamingWords,
  'action-words': ActionWords,
  'numbers-words': NumbersInWords,
  'colours-name': ColoursGame,
  'days-week': DaysOfWeek,
  'he-she': HeSheQuiz,
  'letter-tracing': LetterTracing,
  'poems-rhymes': PoemsPlayer,
};

const AppContent = () => {
  const [view, setView] = useState('dashboard'); // dashboard, shop, levels, gameplay
  const [activeGame, setActiveGame] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const { theme } = useGame();

  const renderView = () => {
    switch (view) {
      case 'gameplay':
        return (
          <GameManager 
            level={activeLevel} 
            gameComponent={COMPONENT_MAP[activeLevel.gameType] || UniversalGame}
            onBack={() => setView('levels')}
          />
        );
      case 'levels':
        return (
          <LevelSelection 
            game={activeGame}
            onSelectLevel={(level) => {
              setActiveLevel(level);
              setView('gameplay');
            }}
            onBack={() => setView('dashboard')}
          />
        );
      case 'shop':
        return <CharacterShop onBack={() => setView('dashboard')} />;
      default:
        return (
          <Dashboard 
            onSelectGame={(gameId) => {
              const game = GAMES.find(g => g.id === gameId);
              setActiveGame(game);
              setView('levels');
            }} 
            onOpenShop={() => setView('shop')}
          />
        );
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-slate-900 min-h-screen' : 'bg-sky-50 min-h-screen'}>
      {renderView()}
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
