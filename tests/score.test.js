// Import function from script.js
const { calculateScore } = require('../script.js');

describe('Score Calculation', () => {
  
  test('All correct answers should give 5/5 score', () => {
    const userAnswers = [
      { selected: 'a. Korea', correct: 'a. Korea', isCorrect: true },
      { selected: 'b. Valentine', correct: 'b. Valentine', isCorrect: true },
      { selected: 'c. Red', correct: 'c. Red', isCorrect: true },
      { selected: 'a. Cupid', correct: 'a. Cupid', isCorrect: true },
      { selected: 'b. Rose', correct: 'b. Rose', isCorrect: true }
    ];
    
    const score = calculateScore(userAnswers);
    expect(score).toBe(5);
  });

  test('All incorrect answers should give 0/5 score', () => {
    const userAnswers = [
      { selected: 'b. Chad', correct: 'a. Korea', isCorrect: false },
      { selected: 'a. Christmas', correct: 'b. Valentine', isCorrect: false },
      { selected: 'a. Blue', correct: 'c. Red', isCorrect: false },
      { selected: 'b. Santa', correct: 'a. Cupid', isCorrect: false },
      { selected: 'c. Tulip', correct: 'b. Rose', isCorrect: false }
    ];
    
    const score = calculateScore(userAnswers);
    expect(score).toBe(0);
  });

  test('Mixed answers should calculate correctly (3 correct, 2 wrong)', () => {
    const userAnswers = [
      { selected: 'a. Korea', correct: 'a. Korea', isCorrect: true },
      { selected: 'a. Christmas', correct: 'b. Valentine', isCorrect: false },
      { selected: 'c. Red', correct: 'c. Red', isCorrect: true },
      { selected: 'b. Santa', correct: 'a. Cupid', isCorrect: false },
      { selected: 'b. Rose', correct: 'b. Rose', isCorrect: true }
    ];
    
    const score = calculateScore(userAnswers);
    expect(score).toBe(3);
  });

  test('Empty answers array should return 0', () => {
    const userAnswers = [];
    const score = calculateScore(userAnswers);
    expect(score).toBe(0);
  });
});
