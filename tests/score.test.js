// Import function from script.js
const { calculateScore } = require('../script.js');

describe('Score Calculation', () => {
  
  test('All correct answers should give 5/5 score', () => {
    const userAnswers = [
      { selected: 'a. Korea', correct: 'a. Korea' },
      { selected: 'b. Valentine', correct: 'b. Valentine' },
      { selected: 'c. Red', correct: 'c. Red' },
      { selected: 'a. Cupid', correct: 'a. Cupid' },
      { selected: 'b. Rose', correct: 'b. Rose' }
    ];
    
    const score = calculateScore(userAnswers);
    expect(score).toBe(5);
  });

  test('All incorrect answers should give 0/5 score', () => {
    const userAnswers = [
      { selected: 'b. Chad', correct: 'a. Korea' },
      { selected: 'a. Christmas', correct: 'b. Valentine' },
      { selected: 'a. Blue', correct: 'c. Red' },
      { selected: 'b. Santa', correct: 'a. Cupid' },
      { selected: 'c. Tulip', correct: 'b. Rose' }
    ];
    
    const score = calculateScore(userAnswers);
    expect(score).toBe(0);
  });

  test('Mixed answers should calculate correctly (3 correct, 2 wrong)', () => {
    const userAnswers = [
      { selected: 'a. Korea', correct: 'a. Korea' },      // correct
      { selected: 'a. Christmas', correct: 'b. Valentine' }, // wrong
      { selected: 'c. Red', correct: 'c. Red' },          // correct
      { selected: 'b. Santa', correct: 'a. Cupid' },      // wrong
      { selected: 'b. Rose', correct: 'b. Rose' }         // correct
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

// REMOVED the helper function - it was making tests pass incorrectly!