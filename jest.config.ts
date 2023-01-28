import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

export default createJestConfig({
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./feature/**', './pages/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^source/(.*)$': '<rootDir>/$1',
  },
});
