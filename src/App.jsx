import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import LevelSelection from './components/layout/LevelSelection';
import GameManager from './components/layout/GameManager';

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
  const [activeLevel, setActiveLevel] = useState(null);
  const { theme } = useGame();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {activeLevel ? (
        <GameManager 
          level={activeLevel} 
          gameComponent={COMPONENT_MAP[activeLevel.gameType] || UniversalGame}
          onBack={() => setActiveLevel(null)}
        />
      ) : (
        <LevelSelection 
          onSelectLevel={(level) => setActiveLevel(level)} 
          onOpenSettings={() => {}} 
        />
      )}
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
