export const GAME_DATA = {
  'phonics-sounds': {
    type: 'audio-quiz',
    title: 'Phonics Sounds',
    questions: [
      { q: 'Which letter says "Ah"?', a: 'A', opts: ['A', 'B', 'C'] },
      { q: 'Which letter says "Buh"?', a: 'B', opts: ['B', 'D', 'P'] },
      { q: 'Which letter says "Cuh"?', a: 'C', opts: ['C', 'K', 'S'] },
    ]
  },
  'rhyming-words': {
    type: 'match',
    title: 'Rhyming Pairs',
    pairs: [
      { left: 'CAT', right: 'BAT' },
      { left: 'DOG', right: 'LOG' },
      { left: 'SUN', right: 'RUN' },
      { left: 'PAN', right: 'FAN' },
    ]
  },
  'one-and-many': {
    type: 'match',
    title: 'One & Many',
    pairs: [
      { left: '🍎 Apple', right: '🍎🍎 Apples' },
      { left: '🐶 Dog', right: '🐶🐶 Dogs' },
      { left: '🐱 Cat', right: '🐱🐱 Cats' },
      { left: '🚗 Car', right: '🚗🚗 Cars' },
    ]
  },
  'opposite-words': {
    type: 'match',
    title: 'Opposite Words',
    pairs: [
      { left: 'HOT ☀️', right: 'COLD ❄️' },
      { left: 'BIG 🐘', right: 'SMALL 🐭' },
      { left: 'HAPPY 😄', right: 'SAD 😢' },
      { left: 'DAY ☀️', right: 'NIGHT 🌙' },
    ]
  },
  'use-of-a-an': {
    type: 'quiz',
    title: 'A or An?',
    questions: [
      { q: '___ Apple', a: 'An', opts: ['A', 'An'] },
      { q: '___ Dog', a: 'A', opts: ['A', 'An'] },
      { q: '___ Elephant', a: 'An', opts: ['A', 'An'] },
      { q: '___ Umbrella', a: 'An', opts: ['A', 'An'] },
    ]
  },
  'this-that': {
    type: 'quiz',
    title: 'This or That?',
    questions: [
      { q: 'Near object (here): ___ is a book.', a: 'This', opts: ['This', 'That'] },
      { q: 'Far object (there): ___ is a star.', a: 'That', opts: ['This', 'That'] },
    ]
  },
  'parts-of-body': {
    type: 'quiz',
    title: 'Parts of Body',
    questions: [
      { q: 'What do you use to see?', a: 'Eyes', opts: ['Eyes', 'Ears', 'Nose'] },
      { q: 'What do you use to smell?', a: 'Nose', opts: ['Eyes', 'Ears', 'Nose'] },
      { q: 'What do you use to walk?', a: 'Legs', opts: ['Hands', 'Legs', 'Arms'] },
    ]
  },
  'fruits-veggies': {
    type: 'sorting',
    title: 'Fruit or Vegetable?',
    items: [
      { name: 'Apple', cat: 'Fruit', emoji: '🍎' },
      { name: 'Carrot', cat: 'Veggie', emoji: '🥕' },
      { name: 'Banana', cat: 'Fruit', emoji: '🍌' },
      { name: 'Potato', cat: 'Veggie', emoji: '🥔' },
    ]
  },
  'find-missing': {
    type: 'quiz',
    title: 'Find Missing Letter',
    questions: [
      { q: 'A B _ D', a: 'C', opts: ['C', 'E', 'F'] },
      { q: 'H _ J K', a: 'I', opts: ['L', 'I', 'M'] },
      { q: 'P Q R _', a: 'S', opts: ['T', 'S', 'U'] },
    ]
  }
};
