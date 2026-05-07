import { GAMES } from './games';

// Generate 100 levels dynamically based on our 28 game modules
// Difficulty scales: 
// - timeLimit: starts at 60s, decreases to 10s
// - targetScore: starts at 3, increases to 15
// - complexity: 1 to 5
export const LEVELS = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const isBoss = levelNum % 10 === 0;
  
  // Cycle through games, but make boss levels special
  const gameIndex = i % GAMES.length;
  const gameTemplate = GAMES[gameIndex];
  
  return {
    id: levelNum,
    title: `Level ${levelNum}`,
    gameType: gameTemplate.id,
    isBoss: isBoss,
    difficulty: Math.floor(i / 10) + 1, // 1 to 10
    timeLimit: Math.max(10, 60 - Math.floor(i / 2)), // Decreases over levels
    targetScore: 3 + Math.floor(i / 5), // Increases over levels
    reward: isBoss ? 500 : 100,
    xp: isBoss ? 200 : 50,
    requiredStars: Math.floor(i * 1.5)
  };
});

export const ACHIEVEMENTS = [
  { id: 'first_win', title: 'First Win!', icon: '🏆', description: 'Complete your first level' },
  { id: 'star_collector', title: 'Star Collector', icon: '⭐', description: 'Collect 100 stars' },
  { id: 'boss_slayer', title: 'Boss Slayer', icon: '👑', description: 'Beat your first boss level' },
  { id: 'perfect_score', title: 'Perfect Score', icon: '✨', description: 'Complete a level with no mistakes' },
];
