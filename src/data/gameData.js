export const GAME_DATA = {
  'phonics-sounds': {
    type: 'audio-quiz',
    title: 'Phonics Sounds',
    levels: {
      1: [
        { q: 'Which letter says "Ah"?', a: 'A', opts: ['A', 'B', 'C'] },
        { q: 'Which letter says "Buh"?', a: 'B', opts: ['B', 'D', 'P'] },
      ],
      2: [
        { q: 'Which letter says "Cuh"?', a: 'C', opts: ['C', 'K', 'S'] },
        { q: 'Which letter says "Duh"?', a: 'D', opts: ['D', 'T', 'B'] },
      ],
      3: [
        { q: 'Which letter says "Eh"?', a: 'E', opts: ['E', 'I', 'A'] },
        { q: 'Which letter says "Fuh"?', a: 'F', opts: ['F', 'V', 'P'] },
      ],
      4: [
        { q: 'Which letter says "Guh"?', a: 'G', opts: ['G', 'J', 'K'] },
        { q: 'Which letter says "Huh"?', a: 'H', opts: ['H', 'W', 'K'] },
      ],
      5: [
        { q: 'Which letter says "Ih"?', a: 'I', opts: ['I', 'E', 'Y'] },
        { q: 'Which letter says "Juh"?', a: 'J', opts: ['J', 'G', 'Z'] },
      ]
    }
  },
  'rhyming-words': {
    type: 'match',
    title: 'Rhyming Pairs',
    levels: {
      1: [
        { left: 'CAT', right: 'BAT' }, { left: 'DOG', right: 'LOG' },
      ],
      2: [
        { left: 'SUN', right: 'RUN' }, { left: 'PAN', right: 'FAN' },
      ],
      3: [
        { left: 'MAP', right: 'TAP' }, { left: 'PEN', right: 'HEN' },
      ],
      4: [
        { left: 'BIG', right: 'PIG' }, { left: 'HOT', right: 'POT' },
      ],
      5: [
        { left: 'WALL', right: 'BALL' }, { left: 'CAKE', right: 'BAKE' },
      ]
    }
  },
  'naming-words': {
    type: 'sorting',
    title: 'Naming Words',
    levels: {
      1: [
        { name: 'Teacher', cat: 'Person', emoji: '🧑‍🏫' },
        { name: 'Lion', cat: 'Animal', emoji: '🦁' },
      ],
      2: [
        { name: 'School', cat: 'Place', emoji: '🏫' },
        { name: 'Pencil', cat: 'Thing', emoji: '✏️' },
      ],
      3: [
        { name: 'Doctor', cat: 'Person', emoji: '👨‍⚕️' },
        { name: 'Elephant', cat: 'Animal', emoji: '🐘' },
      ],
      4: [
        { name: 'Hospital', cat: 'Place', emoji: '🏥' },
        { name: 'Book', cat: 'Thing', emoji: '📖' },
      ],
      5: [
        { name: 'Farmer', cat: 'Person', emoji: '👨‍🌾' },
        { name: 'Tiger', cat: 'Animal', emoji: '🐯' },
      ]
    }
  },
  'use-of-a-an': {
    type: 'quiz',
    title: 'A or An?',
    levels: {
      1: [
        { q: '___ Apple', a: 'An', opts: ['A', 'An'] },
        { q: '___ Dog', a: 'A', opts: ['A', 'An'] },
      ],
      2: [
        { q: '___ Orange', a: 'An', opts: ['A', 'An'] },
        { q: '___ Hat', a: 'A', opts: ['A', 'An'] },
      ],
      3: [
        { q: '___ Elephant', a: 'An', opts: ['A', 'An'] },
        { q: '___ Umbrella', a: 'An', opts: ['A', 'An'] },
      ],
      4: [
        { q: '___ Ball', a: 'A', opts: ['A', 'An'] },
        { q: '___ Car', a: 'A', opts: ['A', 'An'] },
      ],
      5: [
        { q: '___ Ice Cream', a: 'An', opts: ['A', 'An'] },
        { q: '___ Uniform', a: 'A', opts: ['A', 'An'] },
      ]
    }
  },
  'this-that': {
    type: 'quiz',
    title: 'This or That?',
    levels: {
      1: [
        { q: 'Near: ___ is a book.', a: 'This', opts: ['This', 'That'] },
        { q: 'Far: ___ is a star.', a: 'That', opts: ['This', 'That'] },
      ],
      2: [
        { q: 'Near: ___ is my toy.', a: 'This', opts: ['This', 'That'] },
        { q: 'Far: ___ is the moon.', a: 'That', opts: ['This', 'That'] },
      ]
    }
  },
  'parts-of-body': {
    type: 'quiz',
    title: 'Parts of Body',
    levels: {
      1: [
        { q: 'What do you use to see?', a: 'Eyes', opts: ['Eyes', 'Ears', 'Nose'] },
        { q: 'What do you use to smell?', a: 'Nose', opts: ['Eyes', 'Ears', 'Nose'] },
      ],
      2: [
        { q: 'What do you use to walk?', a: 'Legs', opts: ['Hands', 'Legs', 'Arms'] },
        { q: 'What do you use to eat?', a: 'Mouth', opts: ['Mouth', 'Eyes', 'Ears'] },
      ]
    }
  },
  'fruits-veggies': {
    type: 'sorting',
    title: 'Fruit or Vegetable?',
    levels: {
      1: [
        { name: 'Apple', cat: 'Fruit', emoji: '🍎' },
        { name: 'Carrot', cat: 'Veggie', emoji: '🥕' },
      ],
      2: [
        { name: 'Banana', cat: 'Fruit', emoji: '🍌' },
        { name: 'Potato', cat: 'Veggie', emoji: '🥔' },
      ]
    }
  }
};

export const getContentForLevel = (gameId, difficulty) => {
  const game = GAME_DATA[gameId];
  if (!game || !game.levels) return null;
  return game.levels[difficulty] || game.levels[1] || [];
};
