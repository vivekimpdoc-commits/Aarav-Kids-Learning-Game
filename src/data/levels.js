import { GAMES } from './games';

const THEMES = [
  { id: 'meadow', bg: 'bg-green-400', sky: 'bg-sky-300', music: 'happy' },
  { id: 'forest', bg: 'bg-emerald-600', sky: 'bg-teal-500', music: 'adventurous' },
  { id: 'desert', bg: 'bg-amber-400', sky: 'bg-orange-300', music: 'mystic' },
  { id: 'ocean', bg: 'bg-blue-600', sky: 'bg-cyan-400', music: 'calm' },
  { id: 'night', bg: 'bg-slate-900', sky: 'bg-indigo-950', music: 'mystery' },
  { id: 'space', bg: 'bg-black', sky: 'bg-purple-950', music: 'epic' },
  { id: 'volcano', bg: 'bg-red-600', sky: 'bg-orange-600', music: 'intense' }
];

const WEATHER = ['sunny', 'rainy', 'snowy', 'windy', 'cloudy', 'stormy'];

export const getLevelsForGame = (gameId) => {
  return Array.from({ length: 20 }, (_, i) => {
    const levelNum = i + 1;
    const themeIdx = Math.floor(i / 4) % THEMES.length;
    const weatherIdx = Math.floor(i / 3) % WEATHER.length;
    const isBoss = levelNum % 5 === 0;
    
    return {
      id: `${gameId}-${levelNum}`,
      num: levelNum,
      gameType: gameId,
      isBoss,
      theme: THEMES[themeIdx],
      weather: WEATHER[weatherIdx],
      difficulty: Math.floor(i / 2) + 1,
      timeLimit: Math.max(15, 60 - (i * 3)),
      targetScore: 5 + (i * 2),
      
      // Action Mechanics
      hasEnemies: levelNum >= 3,
      enemySpeed: 1 + (i / 10),
      hasObstacles: levelNum >= 2,
      hasNightMode: levelNum >= 10,
      
      // Rewards
      reward: isBoss ? 200 : 50 + (i * 10),
      xp: isBoss ? 100 : 20 + (i * 5),
      mission: isBoss ? "Defeat the Master!" : `Complete ${5 + (i*2)} challenges!`
    };
  });
};

export const RANKS = [
  { xp: 0, title: 'Novice', color: 'text-slate-400' },
  { xp: 1000, title: 'Apprentice', color: 'text-green-400' },
  { xp: 5000, title: 'Hero', color: 'text-blue-400' },
  { xp: 15000, title: 'Legend', color: 'text-purple-400' },
  { xp: 50000, title: 'Mythic', color: 'text-red-500' },
];

export const CHARACTERS = [
  { id: 'aarav', name: 'Aarav', emoji: '👦', price: 0 },
  { id: 'maya', name: 'Maya', emoji: '👧', price: 1000 },
  { id: 'leo', name: 'Lion Leo', emoji: '🦁', price: 5000 },
  { id: 'owl', name: 'Wise Owl', emoji: '🦉', price: 15000 },
];

export const ACHIEVEMENTS = [
  { id: 'first_win', title: 'First Win!', icon: '🏆', description: 'Complete your first level' },
  { id: 'star_collector', title: 'Star Collector', icon: '⭐', description: 'Collect 100 stars' },
  { id: 'boss_slayer', title: 'Boss Slayer', icon: '👑', description: 'Beat your first boss level' },
];
