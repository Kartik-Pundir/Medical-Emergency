# Contributing to Medical Emergency Response System

First off, thank you for considering contributing to the Medical Emergency Response System! It's people like you that make this project better for everyone.

## 🤝 Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, PHP version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## 💻 Development Setup

### Prerequisites

- Node.js v14+
- PHP 7.4+
- MySQL 8.0+
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/medical-emergency.git
cd medical-emergency

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/medical-emergency.git

# Install frontend dependencies
cd frontend
npm install

# Setup database
mysql -u root -p < backend/database/schema.sql

# Configure backend
# Edit backend/config/database.php with your credentials
```

## 📝 Coding Standards

### PHP

- Follow PSR-12 coding standard
- Use meaningful variable and function names
- Add PHPDoc comments for functions
- Use prepared statements for database queries
- Validate and sanitize all inputs

Example:
```php
/**
 * Create a new emergency alert
 * 
 * @param array $data Alert data
 * @return array Response with success status
 */
public function createAlert($data) {
    // Implementation
}
```

### JavaScript/React

- Use functional components with hooks
- Follow ESLint rules
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Keep components small and focused

Example:
```javascript
/**
 * Emergency Alert Component
 * Handles emergency alert creation and submission
 */
function EmergencyAlert({ user, onLogout }) {
    // Implementation
}
```

### CSS

- Use BEM naming convention
- Keep selectors specific but not overly nested
- Use CSS variables for colors and common values
- Mobile-first responsive design

Example:
```css
.emergency-card {
    /* Styles */
}

.emergency-card__header {
    /* Styles */
}

.emergency-card__header--active {
    /* Styles */
}
```

## 🧪 Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test on multiple browsers
- Test responsive design on different screen sizes

```bash
# Run frontend tests
cd frontend
npm test

# Run PHP tests (if available)
cd backend
./vendor/bin/phpunit
```

## 📋 Commit Message Guidelines

Use clear and meaningful commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

Examples:
```
feat: Add video consultation feature
fix: Resolve login authentication issue
docs: Update API documentation
style: Format code according to PSR-12
refactor: Optimize database queries
test: Add unit tests for auth module
chore: Update dependencies
```

## 🔍 Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## 📚 Documentation

- Update README.md if you change functionality
- Add JSDoc/PHPDoc comments for new functions
- Update API documentation for new endpoints
- Include inline comments for complex logic

## 🎯 Priority Areas

We especially welcome contributions in these areas:

- [ ] Mobile app development (React Native)
- [ ] Real-time chat feature
- [ ] Video consultation integration
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Test coverage
- [ ] Documentation improvements

## 💡 Questions?

Feel free to:

- Open an issue for discussion
- Join our community chat (if available)
- Email the maintainers

## 🏆 Recognition

Contributors will be:

- Listed in the README
- Credited in release notes
- Given a shoutout on social media (if desired)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to better healthcare accessibility! 🏥❤️
