import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [ '<rootDir>/src/tests'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testTimeout: 30000,
  globals: {
    'ts-jest': {
      isolatedModules: false,
      diagnostics: true,
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
