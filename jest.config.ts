import type { Config } from '@jest/types';

const ignoreLibs = ['react-leaflet', '@react-leaflet'].join('|');

const config: Config.InitialOptions = {
  verbose: true,
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
    '!<rootDir>/src/reducer/*',
    '!<rootDir>/src/store/*',
    '!<rootDir>/src/services/*',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/react-app-env.d.ts',
    '<rootDir>/src/reportWebVitals.ts',
    '<rootDir>/src/index.tsx',
    '<rootDir>/src/config/*',
    '<rootDir>/src/helpers/test/*',
    '<rootDir>/src/reducer/*',
    '<rootDir>/src/store/*',
    '<rootDir>/src/services/*',
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
  },
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${ignoreLibs})`
  ],
  testPathIgnorePatterns: [
    '/node_modules/*',
  ]
};

export default config;
