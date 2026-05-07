import React, { createContext, useContext, useState, useEffect } from 'react';
import { GAMES } from '../data/games';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stars, setStars] = useState(() => parseInt(localStorage.getItem('aarav_kids_stars') || '0'));
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem('aarav_kids_coins') || '100'));
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('aarav_kids_xp') || '0'));
  
  // Stores completed levels as { "alphabet-matching-1": 3, "alphabet-matching-2": 2 }
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_completed_v3');
    return saved ? JSON.parse(saved) : {};
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('aarav_kids_theme') || 'light');
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('aarav_kids_muted') === 'true');

  // ALL games are unlocked by default now, progression is inside levels
  const unlockedGames = GAMES.map(g => g.id);
  const currentLevel = Math.floor(xp / 1000) + 1;

  useEffect(() => {
    localStorage.setItem('aarav_kids_stars', stars);
    localStorage.setItem('aarav_kids_coins', coins);
    localStorage.setItem('aarav_kids_xp', xp);
    localStorage.setItem('aarav_kids_completed_v3', JSON.stringify(completedLevels));
    localStorage.setItem('aarav_kids_theme', theme);
    localStorage.setItem('aarav_kids_muted', isMuted);
  }, [stars, coins, xp, completedLevels, theme, isMuted]);

  const addReward = (s, c, x) => {
    setStars(prev => prev + s);
    setCoins(prev => prev + c);
    setXp(prev => prev + x);
  };

  const completeLevel = (levelId, rating) => {
    setCompletedLevels(prev => ({ ...prev, [levelId]: rating }));
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <GameContext.Provider value={{
      stars,
      coins,
      xp,
      completedLevels,
      unlockedGames,
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
