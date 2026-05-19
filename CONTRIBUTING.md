# Contributing to GHSentinel

Thank you for your interest in contributing to GHSentinel!

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/cesarojeda1-dot/GHSentinel/issues)
2. If not, create a new issue with clear description and steps to reproduce

### Suggesting Enhancements
1. Check existing issues to avoid duplicates
2. Create an issue with detailed description

### Development Setup

```bash
git clone https://github.com/cesarojeda1-dot/GHSentinel.git
cd GHSentinel
npm install
cp .env.example .env.local
npm run dev
```

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit with clear messages: `git commit -m 'Add your feature'`
5. Push to your fork: `git push origin feature/your-feature`
6. Create a Pull Request

## Code Standards

- Use TypeScript for type safety
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## Testing

```bash
npm run test              # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
