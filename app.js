// app.js - UI Logic for Quiz Application

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Get DOM elements
  const startButton = document.querySelector('.cta-button');
  const welcomeScreen = document.querySelector('.container');
  const question1Screen = document.getElementById('question1-screen');
  
  // Start button click handler
  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
    // Hide welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show first question
    question1Screen.classList.remove('hidden');
    
    // Optional: Log for debugging
    console.log('Quiz started - Question 1 displayed');
  }
  
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
  }
}

// Navigation function for results screen
function goToResults() {
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
