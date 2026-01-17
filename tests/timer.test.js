const { TimerManager } = require('../script.js');

describe('Timer Logic', () => {
  
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Timer should start at 25 seconds', () => {
    const timer = new TimerManager(25);
    expect(timer.getSeconds()).toBe(25);
  });

  test('Timer should count down correctly', () => {
    const timer = new TimerManager(25);
    timer.start();
    
    jest.advanceTimersByTime(3000); // 3 seconds
    expect(timer.getSeconds()).toBe(22);
    
    timer.stop();
  });

  test('Timer should stop at 0', () => {
    const timer = new TimerManager(2);
    let autoSubmitted = false;
    
    timer.start(() => {
      autoSubmitted = true;
    });
    
    jest.advanceTimersByTime(3000);
    expect(timer.getSeconds()).toBe(0);
    expect(autoSubmitted).toBe(true);
  });

  test('Timer should clear on answer selection', () => {
    const timer = new TimerManager(15);
    timer.start();
    
    timer.stop();
    
    expect(timer.isRunning()).toBe(false);
  });

  test('Timer should auto-submit when reaching 0', () => {
    const timer = new TimerManager(1);
    let submitted = false;
    
    timer.start(() => {
      submitted = true;
    });
    
    jest.advanceTimersByTime(1500);
    expect(submitted).toBe(true);
  });
});