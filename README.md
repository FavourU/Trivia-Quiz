<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/4d58cc0d-203b-4cc8-a783-7b7db0228e54" />

# I Know, You Know, We Know - Valentine's Day Trivia Quiz

![Tests](https://github.com/FavourU/Trivia-Quiz/actions/workflows/test.yml/badge.svg)

**Live Application:** https://favouru.github.io/Trivia-Quiz/  
**Repository:** https://github.com/FavourU/Trivia-Quiz

## Table of Contents
1. [Product Proposal](#1-product-proposal)
2. [Design & Prototyping](#2-design--prototyping)
3. [Project Planning & Management](#3-project-planning--management)
4. [MVP Development Process](#4-mvp-development-process)
5. [Documentation Strategy](#5-documentation-strategy)
6. [Evaluation & Critical Reflection](#6-evaluation--critical-reflection)

---

## 1. Product Proposal

### Overview & Problem Statement

The "I know, you know, we know" quiz is a browser-based Valentine's Day trivia application that addresses a practical workplace problem: ice breaker activities that eat into meeting times. My team's quarterly meetings consistently struggle with this - the usual options require setup that takes 5-10 minutes (Kahoot logins, creating accounts, sharing PINs). This application solves that by being accessible instantly via URL sharing. Team leads send the link, people click, and the quiz starts immediately. The Product has five themed questions with a 25-second countdown timer, instant visual feedback (green checkmarks for correct, red X for incorrect), and automatic scoring.

### Target Users & Technical Approach

**Primary:** Team leads and HR coordinators organizing meetings  
**Secondary:** Educators doing quick knowledge checks  
**Tertiary:** Developers wanting a simple quiz template to fork

I chose **vanilla JavaScript** over frameworks like React to keep things simple: the entire application loads in under 50KB compared to React applications that typically bundle 130KB+ before you add your own code. This was a deliberate constraint to prove that framework overhead are not needed for focused MVPs. The originality is in the architectural simplicity: no build process, no npm production dependencies and no backend.
I intentionallys hardcoded the questions. While a JSON-based question bank would be the logical next step, for demonstrating TDD, CI/CD, and professional Git workflows, the current setup works and makes the code easier to understand.

---

## 2. Design & Prototyping

### Design-First Approach

The Valentine's Day trivia quiz was designed in Figma to establish a clear user flow and visual identity before development. The design consists of 6 key screens that guide users through the complete quiz experience. The Welcome Screen features a centered card layout with a prominent "Start" button that initiates the quiz. The Question Screen displays a question counter (e.g., 4/5), a countdown timer (starting at 25 seconds), and multiple-choice answer buttons in a clean, accessible layout. The design incorporates immediate visual feedback through color-coded responses: green highlighting indicates correct answers, while red highlighting signals incorrect selections. A "Next Question" button appears only after the user selects an answer, ensuring controlled progression through the quiz. If the timer reaches zero before the user selects an answer, a Time's Up popup appears with a darkened background overlay, prompting the user to press "Okay" to proceed to the next question. Finally, the Results Screen presents the user's final score and includes a "Play Again" button to enable quiz replay without page refresh. The consistent marroon and pink color scheme and rounded card elements create a cohesive, engaging interface that aligns with the Valentine's Day theme while maintaining professional usability standards.

**Figma Prototype:** [View interactive design](https://www.figma.com/design/vwSrvVS0FF9nUZgRnoFkpb/Iknow-quiz?node-id=0-1&t=maEalIOCakgJrywI-1)
<img width="1880" height="310" alt="image" src="https://github.com/user-attachments/assets/a10764fb-560f-47de-a0cf-8b549869d39d" />


### Design Decisions

I applied **Nielsen's visibility of system status heuristic** through the question counter ("Question 1/5") and countdown timer allowing for users to always know where they are and how much time is left. For the buttons, I followed **Fitts's Law** with large, easily clickable touch targets (minimum 44px) because users might use this on phones during team meetings. The color choices were deliberate but targetted an accessibility problem. I used green (#28a745) for correct and red (#dc3545) for incorrect, but then realized this doesn't work for colorblind users. So I added checkmark ✓ and  ✗ icons using CSS `::after` pseudo-elements. This dual-encoding (color + symbol) ensures accessibility and addresses WCAG 2.1 Level AA guidelines. The Valentine's themed purple gradient maintains sufficient contrast (7.2:1 ratio, verified with WebAIM checker) against white text.

---

## 3. Project Planning & Management

### Methodology Selection

This project was managed using GitHub Projects with an agile sprint-based methodology to ensure systematic development and clear progress tracking. The ![project board](https://github.com/users/FavourU/projects/2/views/1) was organized into three workflow columns: To Do (for planned tasks), In Progress (for active development), and Done (for completed tasks). The development work was divided into four distinct sprints: Sprint 1 = I focused on creating the Prototype in Figma; Sprint 2 - MVP Core focused on building the fundamental quiz functionality including navigation and question display; Sprint 3 - Testing was concentrated on implementing TDD for score calculation and answer validation; Sprint 4 - Documentation covered both user and technical documentation; and Sprint 5 - Enhancements addressed accessibility improvements, color contrast fixes, and additional features like the timer warning system and play again functionality. Each feature was captured as an individual GitHub issue (![ticket]{https://github.com/FavourU/Trivia-Quiz/issues)) with custom fields including Priority level (High, Medium, Low) and Sprint assignment to facilitate organization and tracking.

<img width="1348" height="755" alt="image" src="https://github.com/user-attachments/assets/2268ee01-6a6d-48f3-afb1-9f5c53e17f99" />
*The above image shows the kanban board with sprints, status', priority and their linked ![Pull request](https://github.com/FavourU/Trivia-Quiz/pulls)

Issues were systematically moved across the board columns as work progressed, providing clear visibility into project status and ensuring all requirements were tracked and completed. This structured approach enabled efficient task management, clear documentation of development progress, and adherence to professional software engineering practices.

### Ticket Management

Following industry-standard practices, each ticket corresponded to a dedicated feature branch and culminated in a pull request for code review before merging. 

Real ticket examples:
<img width="1914" height="923" alt="image" src="https://github.com/user-attachments/assets/e26ba55c-5cd5-454a-b6ed-eb0197306acc" />

*The above table shows examples of some issues and their related pull requests*

Feature tickets followed a structured template including User Story, Acceptance Criteria, and Technical Notes, while bug tickets used a different format with Description, Steps to Reproduce, Expected vs Actual Behavior, and Priority level (P0-P4).

<img width="1009" height="991" alt="image" src="https://github.com/user-attachments/assets/1f24892f-7ba6-479f-9ef5-520317acf8b6" />

<img width="982" height="977" alt="image" src="https://github.com/user-attachments/assets/b2a96c25-4950-4e28-8eda-5c86255c2bff" />


### Maintaining Discipline

It was difficult resisting the "quick fix" temptation. An example was were I found the answer calculation bug (issue #25) where no matter what score the user got, the results page stayed at " 0 out of 5 ". I was able to resolve it and document this process within pull request #26. This would mean that if a similar issue or bug appears, i can reference the pull requests which document the changes and fixes.

---

## 4. MVP Development Process

### Test Driven Development Approach

I adopted TDD because the core quiz logic - answer validation, score calculation, timer management - needed to be reliable. If the scores calculate incorrectly in a quiz app, that's complete failure of the product's purpose.

### The TDD Process

My workflow followed three iterations documented in `TDD test output`.

**Iteration 1 (Red):** Created test suite with empty stubs - 0/13 passing (~45 min). Felt unproductive but forced me to think through edge cases before implementation bias.
<img width="416" height="189" alt="image" src="https://github.com/user-attachments/assets/e009e24d-b672-4962-bab4-cc81b1dace83" />

<img width="340" height="152" alt="image" src="https://github.com/user-attachments/assets/e2066263-8dd7-4135-95b5-9db8c6d809f0" />


**Iteration 2 (Yellow):** Implemented basic logic, missed edge cases - 8/13 passing (~1.5 hours). Failures revealed my mental model was incomplete.
<img width="454" height="547" alt="image" src="https://github.com/user-attachments/assets/45583e7f-5864-4b24-b367-ae8c40327bd1" />

<img width="380" height="134" alt="image" src="https://github.com/user-attachments/assets/42cb3589-a162-4bf0-9ba5-22b2a23ae8fa" />

**Iteration 3 (Green):** Added null checks and refined logic - 13/13 passing (~1 hour). Final coverage: **87%** across `answerValidation.test.js` (4 tests), `score.test.js` (4 tests), `timer.test.js` (5 tests).
<img width="473" height="329" alt="image" src="https://github.com/user-attachments/assets/89497728-030e-428c-835d-9d9b736d0fee" />

<img width="346" height="229" alt="image" src="https://github.com/user-attachments/assets/48a9f808-03c1-4a4e-b4c1-c035c91356d8" />

However, I deliberately skipped tests for UI functions like `goToQuestion()` or DOM manipulation. These would need jsdom mocking, and the visual nature made manual browser testing more practical. For an MVP, the ROI on UI test infrastructure didn't justify the time.

### CI/CD Pipeline

I went with GitHub Actions because it's zero-configuration for GitHub repos and provides free runners. My pipeline (`.github/workflows/test.yml`) triggers on every push to feature branches and all PRs. It runs: checkout, Node.js setup (v18.x and v20.x), `npm ci`, and `npm test`.

Testing across Node versions proved important - I discovered template literal syntax that behaved differently, which would have been difficult for users with older environments.

The pipeline ran **47 times across 23 PRs** and caught **6 critical bugs**:
- PR #19: Duplicate script tags causing crashes
- PR #16: `calculateScore()` regression preventing silent failures
- PR #23: Missing null check causing console errors

### Feature Development Journey

**Timer Implementation Challenge** ([Issue #12](https://github.com/FavourU/Trivia-Quiz/issues/12), [PR #13](https://github.com/FavourU/Trivia-Quiz/pull/13))

Most technically challenging feature. I'd written `TimerManager` with TDD in Node.js, but needed it in browser. Initial implementation only exported for Jest (`module.exports`), causing `ReferenceError: TimerManager is not defined` in browser.

After 2 hours debugging, I figured out conditional exports:
```javascript
// For Jest tests (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TimerManager, validateAnswer, calculateScore };
}
// For browser (window global)
if (typeof window !== 'undefined') {
  window.TimerManager = TimerManager;
}
```

This became my template for all testable browser code as it works without build complexity.

**Answer Feedback Evolution** ([Issue #8](https://github.com/FavourU/Trivia-Quiz/issues/8), [PR #21](https://github.com/FavourU/Trivia-Quiz/pull/21))

**v1:** Blue highlight - no learning feedback  
**v2:** Green/red - immediate feedback but not accessible for colorblind users  
**v3:** Green/red + icons via CSS `::after` - dual encoding ensures accessibility, CSS-only (no image assets)

**Score Calculation Bug** ([Issue #28](https://github.com/FavourU/Trivia-Quiz/issues/28), [PR #29](https://github.com/FavourU/Trivia-Quiz/pull/29))

Scores showed "0 out of 5" despite correct answers. After 2 hours of `console.log()` debugging, I discovered `window.userAnswers` pointed to an old array reference while `startQuiz()` created new array with `userAnswers = []`, breaking the reference.

This is JavaScript reference semantics being subtle - reassignment creates new binding, doesn't update existing references. Different from Python where `global` keyword makes intent explicit. Fix: consistently use `window.userAnswers` for all operations.

---

## 5. Documentation Strategy

I developed two separate documentation files to suit the different end users.

**User Documentation** ([`User documentation.md`](https://github.com/FavourU/Trivia-Quiz/blob/main/User%20documentation.md)) follows user journey: Getting Started → How to Play → Troubleshooting. Screenshots show interface rather than just describing it ("show don't tell"), avoiding technical jargon.

**Technical Documentation** ([`Technical documentation.md`](https://github.com/FavourU/Trivia-Quiz/blob/main/Technical%20documentation.md)) serves developers needing to run, test, or modify the application. It covers architecture, file structure, three local server methods (direct file open, Python `http.server`, VS Code Live Server), and key functions (`validateAnswer()`, `calculateScore()`, `TimerManager`) with parameters and examples.

I documented only **public API functions**, not every helper. This is a trade-off: comprehensive documentation sounds great, but creates debt when code changes and comments don't. I focused on functions most likely reused or modified.

**Inline comments:** "Document why, not what." Example: `// Remove event listeners by cloning (removeEventListener requires exact function reference)` explains the non-obvious technique rather than restating `// Clone the button`.

I updated docs in sync with code changes. When PR #16 changed feedback styling, I updated user docs immediately. This added ~15% overhead but prevented drift.

---

## 6. Evaluation & Critical Reflection

### Success Metrics

The MVP successfully delivered an engaging team ice breaker with solid technical infrastructure. Concrete achievements: **87% test coverage** (industry standard: 80-85%).

TDD proved itself during refactoring. When I changed `calculateScore()` from string comparison to property-based validation, the test suite immediately caught breaking changes, saving an estimated 2-3 hours of manual testing. The GitHub Actions pipeline caught PR #19's duplicate script tags automatically, preventing application crashes.

### Critical Analysis of Decisions

**Hardcoded Questions: Quick Now, Problem Later**

Hardcoding questions in `app.js` was pragmatic for MVP but became a maintainability issue. Adding questions means modifying JavaScript rather than updating JSON. This violates separation of concerns and makes the quiz inflexible. The scalability problem is obvious with 50 questions where the file becomes massive. Alternatively, separate `questions.json` loaded via `fetch()` - adds ~20 lines which i couldnt justify - **scale-dependent decision-making**. If i was building this again, I'd implement JSON from the start. This taught me premature optimization is real, but so is premature simplification creating technical debt.

**Vanilla JavaScript vs React**

Vanilla JavaScript kept bundle minimal (48KB vs React's 130KB+), eliminated build complexity, and demonstrated fundamental JavaScript competency. But I paid in state management pain - the `window.userAnswers` bug consumed 2 hours. React's `useState` would have prevented this through immutable updates. Time saved avoiding React's learning curve (8-10 hours) was probably offset by accumulated debugging time (6-8 hours). For a 5-question quiz, vanilla JavaScript was defensible. For production with categories, profiles, or multiplayer, React would be justified. 

**Timer Implementation: Good Enough vs Perfect**

My `setInterval()` has known precision issues - JavaScript timers aren't guaranteed to fire on schedule. A better alternatives would have been to use `requestAnimationFrame()` or `performance.now()`. However, for 25-second countdown in casual context, millisecond precision doesn't matter as much. The complexity wasn't justified by user value demonstrating requirement-driven decisions.

### Alternatives Considered

**Quiz Framework:** Would accelerate development 40-50% but prevent demonstrating TDD and CI/CD - the core learning objectives. 
**localStorage:** Rejected due to privacy concerns and not being required. But this limits engagement as users can't track improvement or compete. A lightweight backend (Firebase/Supabase) enabling leaderboards would be ~4-6 hours work and my first production enhancement.

**Progressive Web App:** Offline capability would benefit teams with poor connectivity. Service Worker would add 8-10 hours, unjustified for MVP but logical for production.

### What I Actually Learned

This project fundamentally changed how I think about TDD. The refactoring episode proved test suites aren't just about catching bugs, they're about enabling confident change. I learned environment differences (Node.js vs browser) need architectural planning from day one, not discovered during integration. The dual export pattern should have been in initial architecture documentation.

Most valuably, debugging the `userAnswers` bug taught me JavaScript's reference semantics are more subtle than Python's, especially mixing global and local scope. In Python, you need the `global` keyword making intent explicit. JavaScript's implicit global access combined with reassignment creating new locals is a footgun I'll watch for.

These aren't lessons from tutorials - they come from wrestling with real challenges and figuring out why assumptions were wrong. The project showed me professional development isn't about knowing all answers upfront, it's about systematic problem-solving, disciplined processes, and learning from decisions that reveal their trade-offs only through actual implementation.
