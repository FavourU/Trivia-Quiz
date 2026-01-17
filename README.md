# Trivia-Quiz

## Continuous Integration/Continuous Deployment (CI/CD)

![Tests](https://github.com/FavourU/Trivia-Quiz/actions/workflows/test.yml/badge.svg)
GitHub Actions was used for automated testing and continuous integration.

### Automated Testing Workflow

**Workflow Steps:**
1. **Checkout code** - Retrieves the latest code from repository
2. **Setup Node.js** - Configures Node.js environment (versions 18.x and 20.x)
3. **Install dependencies** - Runs `npm ci` for clean dependency installation
4. **Run tests** - Executes `npm test` to run all Jest test suites

The workflow runs tests on multiple Node.js versions to ensure compatibility:


Workflow File Location: `.github/workflows/test.yml`
