const { validateAnswer, disableAllButtons, preventMultipleClicks } = require('../script.js');

describe('Answer Validation', () => {
  
  test('Correct answer gets .correct class applied', () => {
    const selectedAnswer = 'a. Korea';
    const correctAnswer = 'a. Korea';
    const result = validateAnswer(selectedAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(true);
    expect(result.className).toBe('correct');
  });

  test('Incorrect answer gets .incorrect class applied', () => {
    const selectedAnswer = 'b. Chad';
    const correctAnswer = 'a. Korea';
    const result = validateAnswer(selectedAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(false);
    expect(result.className).toBe('incorrect');
  });

  test('All answer buttons should be disabled after selection', () => {
    const buttons = [
      { disabled: false },
      { disabled: false },
      { disabled: false }
    ];
    
    disableAllButtons(buttons);
    
    buttons.forEach(button => {
      expect(button.disabled).toBe(true);
    });
  });

  test('Multiple clicks should only count first click', () => {
    const clicks = preventMultipleClicks();
    
    expect(clicks.firstClick()).toBe(true);   // First click allowed
    expect(clicks.firstClick()).toBe(false);  // Second click blocked
    expect(clicks.getCount()).toBe(1);
  });
});