import React, { createContext, useContext, useState, useEffect } from 'react';
import { GAMES } from '../data/games';
import { LEVELS } from '../data/levels';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stars, setStars] = useState(() => parseInt(localStorage.getItem('aarav_kids_stars') || '0'));
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem('aarav_kids_coins') || '100'));
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('aarav_kids_xp') || '0'));
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_levels');
    return saved ? JSON.parse(saved) : [1]; 
  });
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_completed');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentLevel, setCurrentLevel] = useState(() => parseInt(localStorage.getItem('aarav_kids_current_level') || '1'));
  const [theme, setTheme] = useState(() => localStorage.getItem('aarav_kids_theme') || 'light');
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('aarav_kids_muted') === 'true');

  useEffect(() => {
    localStorage.setItem('aarav_kids_stars', stars);
    localStorage.setItem('aarav_kids_coins', coins);
    localStorage.setItem('aarav_kids_xp', xp);
    localStorage.setItem('aarav_kids_levels', JSON.stringify(unlockedLevels));
    localStorage.setItem('aarav_kids_completed', JSON.stringify(completedLevels));
    localStorage.setItem('aarav_kids_current_level', currentLevel);
    localStorage.setItem('aarav_kids_theme', theme);
    localStorage.setItem('aarav_kids_muted', isMuted);
  }, [stars, coins, xp, unlockedLevels, completedLevels, currentLevel, theme, isMuted]);

  const addReward = (s, c, x) => {
    setStars(prev => prev + s);
    setCoins(prev => prev + c);
    setXp(prev => prev + x);
    
    // Level up calculation based on XP
    const newGlobalLevel = Math.floor(xp / 1000) + 1;
    if (newGlobalLevel > currentLevel) {
      setCurrentLevel(newGlobalLevel);
    }
  };

  const completeLevel = (levelId, rating) => {
    setCompletedLevels(prev => ({ ...prev, [levelId]: rating }));
    const nextLevel = parseInt(levelId) + 1;
    if (nextLevel <= 100 && !unlockedLevels.includes(nextLevel)) {
      setUnlockedLevels(prev => [...prev, nextLevel]);
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <GameContext.Provider value={{
      stars,
      coins,
      xp,
      unlockedLevels,
      completedLevels,
      currentLevel,
      theme,
      isMuted,
      addReward,
      completeLevel,
      toggleTheme,
      toggleMute
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
