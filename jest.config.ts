import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testPathIgnorePatterns: [
    'node_modules/*'
  ],
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    /** Ignore. */
    '!<rootDir>/src/helpers/test/**/*',
    '!<rootDir>/src/react-app-env.d.ts',
    '!<rootDir>/src/reportWebVitals.ts',
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/config/*',
    '!<rootDir>/src/components/Counter/*',
    '!<rootDir>/src/reducer/counter/*',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/react-app-env.d.ts',
    '<rootDir>/src/reportWebVitals.ts',
    '<rootDir>/src/index.tsx',
    '<rootDir>/src/config/*',
    '<rootDir>/src/helpers/test/*',
    '<rootDir>/src/reducer/counter/*',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      functions: 100,
      branches: 100
    }
  }
};
export default config;