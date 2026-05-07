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
      ]
    }
  },
  'one-and-many': {
    type: 'quiz',
    title: 'One and Many',
    levels: {
      1: [
        { q: 'Plural of "CAT"?', a: 'CATS', opts: ['CATS', 'CATIES', 'CATA'] },
        { q: 'Plural of "BALL"?', a: 'BALLS', opts: ['BALLS', 'BALES', 'BALL'] },
      ],
      2: [
        { q: 'Plural of "BOX"?', a: 'BOXES', opts: ['BOXES', 'BOXS', 'BOXY'] },
        { q: 'Plural of "TOY"?', a: 'TOYS', opts: ['TOYS', 'TOIES', 'TOYA'] },
      ]
    }
  },
  'opposite-words': {
    type: 'match',
    title: 'Opposite Words',
    levels: {
      1: [
        { left: 'HOT', right: 'COLD' }, { left: 'BIG', right: 'SMALL' },
      ],
      2: [
        { left: 'UP', right: 'DOWN' }, { left: 'HAPPY', right: 'SAD' },
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
      ]
    }
  },
  'parts-of-body': {
    type: 'quiz',
    title: 'Parts of Body',
    levels: {
      1: [
        { q: 'What do you use to see?', a: 'Eyes', opts: ['Eyes', 'Ears', 'Nose'] },
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
      ]
    }
  }
};

export const getContentForLevel = (gameId, difficulty) => {
  const game = GAME_DATA[gameId];
  if (!game || !game.levels) return null;
  return game.levels[difficulty] || game.levels[1] || [];
};
