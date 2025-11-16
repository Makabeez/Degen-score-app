# Contributing to DeGen Score App

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to DeGen Score App. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples** to demonstrate the steps
* **Describe the behavior you observed** and what you expected to see
* **Include screenshots** if possible
* **Specify your wallet address** (if relevant to the bug)
* **Which browser and OS** are you using?

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* **Use a clear and descriptive title**
* **Provide a detailed description** of the suggested enhancement
* **Explain why this enhancement would be useful**
* **List some examples** of where this enhancement could be used

### Pull Requests

* Fork the repo and create your branch from `main`
* If you've added code that should be tested, add tests
* Ensure the test suite passes
* Make sure your code lints
* Update the README.md with details of changes if needed

## Development Process

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Degen-score-app.git
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Comment your code when necessary

4. **Test your changes**
   - Test locally with `npm run dev`
   - Ensure all existing functionality still works
   - Test on Base testnet before proposing mainnet changes

5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

## Code Style

* Use meaningful variable and function names
* Write comments for complex logic
* Follow the existing code formatting
* Use TypeScript types where applicable
* Keep functions small and focused

## Smart Contract Changes

If you're proposing changes to the smart contract:

* **Test thoroughly** on Base testnet first
* **Consider gas optimization**
* **Document all functions** with NatSpec comments
* **Add unit tests** for new functionality
* **Get a security review** for critical changes

## Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## Questions?

Feel free to open an issue with your question or reach out on:
* Farcaster: [@YourHandle]
* Twitter: [@YourHandle]

Thank you for contributing! 🚀
