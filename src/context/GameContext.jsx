import React, { createContext, useContext, useState, useEffect } from 'react';
import { GAMES } from '../data/games';
import { RANKS } from '../data/levels';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stars, setStars] = useState(() => parseInt(localStorage.getItem('aarav_kids_stars') || '0'));
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem('aarav_kids_coins') || '100'));
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('aarav_kids_xp') || '0'));
  
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_completed_v3');
    return saved ? JSON.parse(saved) : {};
  });

  const [unlockedCharacters, setUnlockedCharacters] = useState(() => {
    const saved = localStorage.getItem('aarav_kids_characters');
    return saved ? JSON.parse(saved) : ['aarav'];
  });

  const [selectedCharacter, setSelectedCharacter] = useState(() => localStorage.getItem('aarav_kids_selected_char') || 'aarav');
  const [theme, setTheme] = useState(() => localStorage.getItem('aarav_kids_theme') || 'light');
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('aarav_kids_muted') === 'true');

  const currentRank = RANKS.reduce((acc, curr) => (xp >= curr.xp ? curr : acc), RANKS[0]);

  useEffect(() => {
    localStorage.setItem('aarav_kids_stars', stars);
    localStorage.setItem('aarav_kids_coins', coins);
    localStorage.setItem('aarav_kids_xp', xp);
    localStorage.setItem('aarav_kids_completed_v3', JSON.stringify(completedLevels));
    localStorage.setItem('aarav_kids_characters', JSON.stringify(unlockedCharacters));
    localStorage.setItem('aarav_kids_selected_char', selectedCharacter);
    localStorage.setItem('aarav_kids_theme', theme);
    localStorage.setItem('aarav_kids_muted', isMuted);
  }, [stars, coins, xp, completedLevels, unlockedCharacters, selectedCharacter, theme, isMuted]);

  const addReward = (s, c, x) => {
    setStars(prev => prev + s);
    setCoins(prev => prev + c);
    setXp(prev => prev + x);
  };

  const completeLevel = (levelId, rating) => {
    setCompletedLevels(prev => ({ ...prev, [levelId]: rating }));
  };

  const purchaseCharacter = (id, price) => {
    if (coins >= price && !unlockedCharacters.includes(id)) {
      setCoins(prev => prev - price);
      setUnlockedCharacters(prev => [...prev, id]);
      return true;
    }
    return false;
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <GameContext.Provider value={{
      stars, coins, xp, completedLevels, unlockedCharacters, selectedCharacter, 
      currentRank, theme, isMuted, setSelectedCharacter,
      addReward, completeLevel, purchaseCharacter, toggleTheme, toggleMute
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
