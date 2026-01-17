// app.js - UI Logic for Quiz Application

// Quiz data with correct answers
const quizQuestions = [
  { 
    id: 1, 
    question: 'In which month is Valentine\'s Day celebrated?', 
    correct: 'a) February' 
  },
  { 
    id: 2, 
    question: 'Which Roman God is often associated with love and fertility?', 
    correct: 'c) Cupid' 
  },
  { 
    id: 3, 
    question: 'Which country is credited with starting the tradition of exchanging love notes on Valentine\'s Day?', 
    correct: 'a) France' 
  },
  { 
    id: 4, 
    question: 'When was February 14 first declared to be Valentine\'s Day?', 
    correct: 'b) 1537' 
  },
  { 
    id: 5, 
    question: 'What country has a holiday on the 14th of every month?', 
    correct: 'c) South Korea' 
  }
];

// Store user answers
let userAnswers = [];

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
  let currentQuestionNumber = 1;
  
  // Start button click handler
  startButton.addEventListener('click', startQuiz);
  
  // Time's up modal okay button
  timeupOkayBtn.addEventListener('click', closeTimeupModal);
  
  function startQuiz() {
    // Reset user answers
    userAnswers = [];
    
    // Hide welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show first question
    question1Screen.classList.remove('hidden');
    
    // Set up answer buttons for first question
    setupAnswerButtons('question1-screen', 1);
    
    // Start timer for first question
    startQuestionTimer('question1-screen');
    
    console.log('Quiz started - Question 1 displayed with timer');
  }
  
  // Set up click handlers for answer buttons
  function setupAnswerButtons(screenId, questionNumber) {
    const screen = document.getElementById(screenId);
    const answerButtons = screen.querySelectorAll('.answer-option');
    const nextButton = screen.querySelector('.next-button');
    
    // Hide next button initially
    nextButton.classList.add('hidden');
    
    // Add click handlers to each answer button
    answerButtons.forEach(button => {
      // Remove any existing listeners by cloning
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add new click listener
      newButton.addEventListener('click', function() {
        handleAnswerClick(this, screenId, questionNumber);
      });
    });
  }
  
  // Handle answer button click
  function handleAnswerClick(clickedButton, screenId, questionNumber) {
    const screen = document.getElementById(screenId);
    const allButtons = screen.querySelectorAll('.answer-option');
    const nextButton = screen.querySelector('.next-button');
    
    // Get selected answer text
    const selectedAnswer = clickedButton.textContent.trim();
    
    // Get correct answer for this question
    const correctAnswer = quizQuestions[questionNumber - 1].correct;
    
    // Store answer
    userAnswers.push({
      question: questionNumber,
      selected: selectedAnswer,
      correct: correctAnswer
    });
    
    console.log('Answer selected:', selectedAnswer);
    console.log('Correct answer:', correctAnswer);
    
    // Stop timer
    if (currentTimer && currentTimer.isRunning()) {
      currentTimer.stop();
      console.log('Timer stopped');
    }
    
    // Disable all buttons (using TDD-tested function)
    const buttonArray = Array.from(allButtons);
    disableAllButtons(buttonArray);
    
    // Highlight selected answer
    clickedButton.classList.add('selected');
    
    // Show correct/incorrect feedback
    allButtons.forEach(button => {
      const buttonText = button.textContent.trim();
      if (buttonText === correctAnswer) {
        button.classList.add('correct');
      }
      if (buttonText === selectedAnswer && selectedAnswer !== correctAnswer) {
        button.classList.add('incorrect');
      }
    });
    
    // Show next button
    nextButton.classList.remove('hidden');
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
    const buttonArray = Array.from(answerButtons);
    disableAllButtons(buttonArray);
    
    // Store "no answer" for this question
    const questionNumber = parseInt(screenId.replace('question', '').replace('-screen', ''));
    const correctAnswer = quizQuestions[questionNumber - 1].correct;
    
    userAnswers.push({
      question: questionNumber,
      selected: 'No answer (time expired)',
      correct: correctAnswer
    });
    
    console.log('Time expired - no answer recorded');
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
  
  // Expose functions globally for navigation
  window.currentTimer = currentTimer;
  window.currentScreenId = currentScreenId;
  window.userAnswers = userAnswers;
  window.setupAnswerButtons = setupAnswerButtons;
  window.startQuestionTimer = startQuestionTimer;
  
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
    
    // Set up answer buttons
    window.setupAnswerButtons(`question${questionNumber}-screen`, questionNumber);
    
    // Start timer for this question
    window.startQuestionTimer(`question${questionNumber}-screen`);
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
  
  // Calculate score using TDD-tested function
  const finalScore = calculateScore(window.userAnswers);
  console.log('Final score:', finalScore);
  console.log('User answers:', window.userAnswers);
  
  // Update score display
  const scoreDisplay = document.getElementById('score-value');
  if (scoreDisplay) {
    scoreDisplay.textContent = finalScore;
  }
  
  // Show results screen
  const resultsScreen = document.getElementById('results-screen');
  if (resultsScreen) {
    resultsScreen.classList.remove('hidden');
  }
}
