// app.js - UI Logic for Quiz Application

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Get DOM elements
  const startButton = document.querySelector('.cta-button');
  const welcomeScreen = document.querySelector('.container');
  const question1Screen = document.getElementById('question1-screen');
  
  // Timer management
  let currentTimer = null;
  
  // Start button click handler
  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
    // Hide welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show first question
    question1Screen.classList.remove('hidden');
    
    // Start timer for first question
    startQuestionTimer('question1-screen');
    
    console.log('Quiz started - Question 1 displayed with timer');
  }
  
  // Start timer for a specific question screen
  function startQuestionTimer(screenId) {
    // Stop any existing timer
    if (currentTimer) {
      currentTimer.stop();
    }
    
    // Get timer display element for this screen
    const screen = document.getElementById(screenId);
    const timerDisplay = screen.querySelector('.timer');
    
    // Create new timer (using TDD-tested TimerManager class)
    currentTimer = new TimerManager(25);
    
    // Start the timer with callback for when it reaches 0
    currentTimer.start(() => {
      console.log('Time is up! Auto-submitting...');
      timerDisplay.textContent = '⏳ 0s';
      // TODO: Auto-submit answer logic here
      handleTimeUp(screenId);
    });
    
    // Update display every second
    const displayInterval = setInterval(() => {
      if (currentTimer && currentTimer.isRunning()) {
        const timeLeft = currentTimer.getSeconds();
        timerDisplay.textContent = `⏳ ${timeLeft}s`;
      } else {
        clearInterval(displayInterval);
      }
    }, 1000);
    
    // Initial display
    timerDisplay.textContent = '⏳ 25s';
  }
  
  // Handle when timer reaches 0
  function handleTimeUp(screenId) {
    const screen = document.getElementById(screenId);
    const answerButtons = screen.querySelectorAll('.answer-option');
    
    // Disable all answer buttons
    answerButtons.forEach(button => {
      button.disabled = true;
    });
    
    // Show next button
    const nextButton = screen.querySelector('.next-button');
    if (nextButton) {
      nextButton.classList.remove('hidden');
    }
  }
  
  // Stop timer when answer is selected
  function handleAnswerSelection() {
    if (currentTimer && currentTimer.isRunning()) {
      currentTimer.stop();
      console.log('Answer selected - timer stopped');
    }
  }
  
  // Expose handleAnswerSelection globally for answer buttons
  window.handleAnswerSelection = handleAnswerSelection;
  
});

// Navigation function for question screens
function goToQuestion(questionNumber) {
  // Hide all question screens
  const allScreens = document.querySelectorAll('.question-screen');
  allScreens.forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // Show the requested question screen
  const nextScreen = document.getElementById(`question${questionNumber}-screen`);
  if (nextScreen) {
    nextScreen.classList.remove('hidden');
    
    // Start timer for this question
    startQuestionTimer(`question${questionNumber}-screen`);
  }
}

// Helper function to start timer (accessible by goToQuestion)
function startQuestionTimer(screenId) {
  // This needs to be accessible by goToQuestion
  // Same implementation as above
  if (window.currentTimer) {
    window.currentTimer.stop();
  }
  
  const screen = document.getElementById(screenId);
  const timerDisplay = screen.querySelector('.timer');
  
  window.currentTimer = new TimerManager(25);
  
  window.currentTimer.start(() => {
    timerDisplay.textContent = '⏳ 0s';
    handleTimeUp(screenId);
  });
  
  const displayInterval = setInterval(() => {
    if (window.currentTimer && window.currentTimer.isRunning()) {
      const timeLeft = window.currentTimer.getSeconds();
      timerDisplay.textContent = `⏳ ${timeLeft}s`;
    } else {
      clearInterval(displayInterval);
    }
  }, 1000);
  
  timerDisplay.textContent = '⏳ 25s';
}

// Handle when timer reaches 0
function handleTimeUp(screenId) {
  const screen = document.getElementById(screenId);
  const answerButtons = screen.querySelectorAll('.answer-option');
  
  answerButtons.forEach(button => {
    button.disabled = true;
  });
  
  const nextButton = screen.querySelector('.next-button');
  if (nextButton) {
    nextButton.classList.remove('hidden');
  }
}

// Navigation function for results screen
function goToResults() {
  // Stop timer if running
  if (window.currentTimer) {
    window.currentTimer.stop();
  }
  
  // Hide all question screens
  const allScreens = document.querySelectorAll('.question-screen');
  allScreens.forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // Show results screen
  const resultsScreen = document.getElementById('results-screen');
  if (resultsScreen) {
    resultsScreen.classList.remove('hidden');
  }
}
