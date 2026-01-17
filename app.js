// app.js - UI Logic for Quiz Application

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Get DOM elements
  const startButton = document.querySelector('.cta-button');
  const welcomeScreen = document.querySelector('.container');
  const question1Screen = document.getElementById('question1-screen');
  const timeupModal = document.getElementById('timeup-modal');
  const timeupOkayBtn = document.getElementById('timeup-okay-btn');
  
  // Timer management
  let currentTimer = null;
  let currentScreenId = null;
  
  // Start button click handler
  startButton.addEventListener('click', startQuiz);
  
  // Time's up modal okay button
  timeupOkayBtn.addEventListener('click', closeTimeupModal);
  
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
    
    // Store current screen ID
    currentScreenId = screenId;
    
    // Get timer display element for this screen
    const screen = document.getElementById(screenId);
    const timerDisplay = screen.querySelector('.timer');
    
    // Create new timer (using TDD-tested TimerManager class)
    currentTimer = new TimerManager(25);
    
    // Start the timer with callback for when it reaches 0
    currentTimer.start(() => {
      console.log('Time is up! Showing modal...');
      timerDisplay.textContent = '⏳ 0s';
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
    // Show Time's Up modal
    timeupModal.classList.remove('hidden');
    
    const screen = document.getElementById(screenId);
    const answerButtons = screen.querySelectorAll('.answer-option');
    
    // Disable all answer buttons
    answerButtons.forEach(button => {
      button.disabled = true;
    });
  }
  
  // Close Time's Up modal
  function closeTimeupModal() {
    // Hide modal
    timeupModal.classList.add('hidden');
    
    // Show next button on current question screen
    if (currentScreenId) {
      const screen = document.getElementById(currentScreenId);
      const nextButton = screen.querySelector('.next-button');
      if (nextButton) {
        nextButton.classList.remove('hidden');
      }
    }
  }
  
  // Stop timer when answer is selected
  function handleAnswerSelection() {
    if (currentTimer && currentTimer.isRunning()) {
      currentTimer.stop();
      console.log('Answer selected - timer stopped');
    }
  }
  
  // Expose functions globally for navigation
  window.handleAnswerSelection = handleAnswerSelection;
  window.startQuestionTimer = startQuestionTimer;
  window.currentTimer = currentTimer;
  window.currentScreenId = currentScreenId;
  
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
    if (window.startQuestionTimer) {
      window.startQuestionTimer(`question${questionNumber}-screen`);
    }
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
