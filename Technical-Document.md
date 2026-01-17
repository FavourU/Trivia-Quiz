# Technical Documentation

## Overview

This is a Valentine's Day quiz built for my team's quarterly meeting ice breakers. It's a simple web app with 5 questions, a timer, and instant feedback. I used Test Driven Development (TDD) to write the core functions first.

**Built with:**
- HTML, CSS, JavaScript
- Jest for testing
- GitHub Actions for CI/CD

---

## File Structure

```
Trivia-Quiz/
├── .github/workflows/test.yml          # Auto-runs tests
├── TDD test output/                    # TDD iterations and Outputs
│   ├── Failed scripts - TDD/
│   │   ├── attempt 1 - all fail
│   │   └── attempt 2 - some fail
│   ├── test-output-1-all-fail.txt
│   ├── test-output-2-all-fail.txt
│   └── test-output-3-all-pass.txt
├── prototype/                          # Figma designs
│   ├── Figma design - main screens.png
│   └── figma link
├── tests/                              # Jest tests (13 total)
│   ├── answerValidation.test.js
│   ├── score.test.js
│   └── timer.test.js
├── index.html                          # Main page
├── style.css                           # Format and styling of web pages
├── script.js                           # TDD tested functions
├── app.js                              # UI and event handling
├── package.json                        # npm config
└── README.md
```

---

## How the Code Works

### Main Files

**index.html**
Has all screens: welcome screen, 5 question screens, results screen, and a Time's Up modal.

**style.css**
I used CSS variables for the colors (purple/pink theme), flexbox for layout, and added some animations for the modal. The `.correct` class makes buttons green and `.incorrect` makes them red.

**script.js**
This file has all the functions I wrote using TDD such as:
- `validateAnswer()` - checks if answer is right or wrong
- `calculateScore()` - counts how many you got correct
- `TimerManager` - handles the countdown timer
- `disableAllButtons()` - disables buttons after you select

I had to export these functions twice - once for Jest tests (`module.exports`) and once for the browser (`window.validateAnswer` etc).

**app.js**
This is where all the UI logic happens. It has the quiz questions hardcoded, sets up event listeners for buttons, handles the timer display updates, and does all the screen navigation ('goToQuestion()', 'goToResults()').

### How Data Flows

1. User clicks answer
   ↓
2. handleAnswerClick() captures selection
   ↓
3. validateAnswer() checks if correct (TDD-tested)
   ↓
4. Store in window.userAnswers with isCorrect property
   ↓
5. Apply visual feedback (.correct or .incorrect CSS)
   ↓
6. User completes all 5 questions
   ↓
7. calculateScore() counts correct answers (TDD-tested)
   ↓
8. Display final score on results screen

---

## Running Locally

### Quick Way

```bash
git clone https://github.com/favouru/Trivia-Quiz.git
cd Trivia-Quiz
```
Then open index.html in your browser


### Local Web Server (Recommended)

If you have Python installed:
```bash
python -m http.server 8000
```
Then go to `http://localhost:8000`

Or use VS Code's Live Server extension.

**Live version:** https://favouru.github.io/Trivia-Quiz/

---

## Running the Tests

### Setup

First install Node.js or

```bash
npm install
```

This installs Jest.

### Run Tests

```bash
npm test
```

You should see all 13 tests pass:
```
PASS  tests/answerValidation.test.js
PASS  tests/score.test.js
PASS  tests/timer.test.js

Test Suites: 3 passed, 3 total
Tests:       13 passed, 13 total
```

If you want to run just one test file:
```bash
npm test score.test.js
```

### TDD Process

I followed the Red-Green-Refactor cycle. You can see my three iterations in the `TDD test output` folder:

1. **Iteration 1 (Red):** Wrote all tests first, they all failed (0/13 passing)
2. **Iteration 2 (Yellow):** Added basic code, some passed (8/13 passing)
3. **Iteration 3 (Green):** Fixed everything, all passed (13/13 passing)

The failed script versions are saved in `TDD test output/Failed scripts - TDD/` to show my process.

---

## Important Functions

### `validateAnswer(selected, correct)`

Checks if your answer is right. Returns an object with `isCorrect` (true/false) and `className` ('correct' or 'incorrect').

```javascript
const result = validateAnswer('a) February', 'a) February');
// Returns: { isCorrect: true, className: 'correct' }
```

### `calculateScore(userAnswers)`

Goes through all the answers and counts how many have `isCorrect: true`. Returns a number 0-5.

```javascript
const score = calculateScore(window.userAnswers);
console.log(score);  // e.g., 3
```

### `TimerManager` Class

Handles the countdown timer. Created it with `new TimerManager(25)` for 25 seconds, then call `start()` with a callback function that runs when time's up.

```javascript
const timer = new TimerManager(25);
timer.start(() => {
  console.log('Times up!');
});
```

You can also `stop()` it early if the user picks an answer.

### `goToQuestion(questionNumber)`

Hides all screens, shows the question you want, sets up the answer buttons for that question, and starts a new timer. Called by the "Next" buttons.

### `goToResults()`

Calculates your final score, shows it on the results screen, and displays a message based on how you did.

---

## Common Issues

**Tests fail:** Make sure you ran `npm install` and you're using Node 18+

**Score shows 0:** Check the browser console (F12). The `calculateScore` function needs to use `answer.isCorrect`, not compare strings

**Timer popup doesn't appear:** Make sure the modal CSS is in style.css and `TimerManager` is exported to `window`

**Start button doesn't work:** Check for syntax errors in app.js (console will show them)

---

## Tech Details

**Node version used:** 18.x  
**Browser compatibility:** Chrome, Firefox, Safari, Edge (latest versions)  
**No external libraries** except Jest for testing

---

## Links

- **Live quiz:** https://favouru.github.io/Trivia-Quiz/
- **GitHub repo:** https://github.com/favouru/Trivia-Quiz
- **Figma design:** See `prototype/figma link` file
