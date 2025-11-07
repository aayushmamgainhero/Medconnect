# Contributing to Medconnect

Thank you for your interest in contributing to Medconnect! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/aayushmamgainhero/Medconnect.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements to existing features
   - `Docs:` for documentation changes
   - `Refactor:` for code refactoring
   - `Test:` for test additions or changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Ensure all tests pass
   - Wait for review and address feedback

## Development Guidelines

### Code Style

- Use ES6+ features
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions
- Follow existing patterns in the codebase

### Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test edge cases and error conditions

### Security

- Never commit sensitive data (passwords, API keys, etc.)
- Use environment variables for configuration
- Validate and sanitize all user inputs
- Follow security best practices for healthcare applications

### Documentation

- Update README.md for user-facing changes
- Update DEVELOPER.md for technical changes
- Add inline comments for complex logic
- Update API documentation for endpoint changes

## Getting Help

If you need help or have questions:
- Check existing issues and discussions
- Create a new issue with your question
- Reach out to maintainers

## License

By contributing to Medconnect, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Medconnect!
