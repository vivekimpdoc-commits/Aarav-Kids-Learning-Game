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

export const LEVELS = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const themeIdx = Math.floor(i / 15) % THEMES.length;
  const weatherIdx = Math.floor(i / 10) % WEATHER.length;
  const isBoss = levelNum % 10 === 0;
  
  // Game Topic Cycles
  const gameIdx = i % GAMES.length;

  return {
    id: levelNum,
    title: `Level ${levelNum}`,
    gameType: GAMES[gameIdx].id,
    isBoss,
    theme: THEMES[themeIdx],
    weather: WEATHER[weatherIdx],
    difficulty: Math.floor(i / 5) + 1,
    timeLimit: Math.max(10, 60 - Math.floor(i / 2)),
    targetScore: 5 + Math.floor(i / 3),
    
    // New Action Mechanics
    hasEnemies: levelNum >= 5,
    enemySpeed: 1 + (i / 20),
    hasObstacles: levelNum >= 2,
    hasNightMode: levelNum >= 20,
    
    // Rewards
    reward: isBoss ? 500 : 50 + (i * 2),
    xp: isBoss ? 300 : 20 + (i * 5),
    
    // Mission Text
    mission: isBoss ? "Defeat the Topic Master!" : `Complete ${5 + Math.floor(i/3)} challenges!`
  };
});

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
