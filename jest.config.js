module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
};
