import { GAMES } from './games';

// Generate levels for EACH game module
export const getLevelsForGame = (gameId) => {
  return Array.from({ length: 20 }, (_, i) => {
    const levelNum = i + 1;
    const isBoss = levelNum % 5 === 0; // Boss every 5 levels for better pacing
    
    return {
      id: `${gameId}-${levelNum}`,
      num: levelNum,
      gameType: gameId,
      isBoss: isBoss,
      difficulty: Math.floor(i / 5) + 1,
      timeLimit: Math.max(15, 60 - (i * 3)),
      targetScore: 5 + (i * 2),
      reward: isBoss ? 200 : 50,
      xp: isBoss ? 100 : 20,
    };
  });
};

export const ACHIEVEMENTS = [
  { id: 'first_win', title: 'First Win!', icon: '🏆', description: 'Complete your first level' },
  { id: 'star_collector', title: 'Star Collector', icon: '⭐', description: 'Collect 100 stars' },
  { id: 'boss_slayer', title: 'Boss Slayer', icon: '👑', description: 'Beat your first boss level' },
];
