import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stars, setStars] = useState(() => parseInt(localStorage.getItem('aarav_kids_stars') || '0'));
  const [unlockedGames, setUnlockedGames] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_unlocked');
    return saved ? JSON.parse(saved) : ['alphabet-matching'];
  });
  const [currentLevel, setCurrentLevel] = useState(() => parseInt(localStorage.getItem('aarav_kids_level') || '1'));
  const [theme, setTheme] = useState(() => localStorage.getItem('aarav_kids_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('aarav_kids_stars', stars.toString());
    localStorage.setItem('aarav_kids_unlocked', JSON.stringify(unlockedGames));
    localStorage.setItem('aarav_kids_level', currentLevel.toString());
    localStorage.setItem('aarav_kids_theme', theme);
  }, [stars, unlockedGames, currentLevel, theme]);

  const addStars = (amount) => {
    setStars(prev => prev + amount);
    // Check for level up every 100 stars
    const newLevel = Math.floor((stars + amount) / 100) + 1;
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
    }
  };

  const unlockGame = (gameId) => {
    if (!unlockedGames.includes(gameId)) {
      setUnlockedGames(prev => [...prev, gameId]);
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <GameContext.Provider value={{
      stars,
      addStars,
      unlockedGames,
      unlockGame,
      currentLevel,
      theme,
      toggleTheme
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
