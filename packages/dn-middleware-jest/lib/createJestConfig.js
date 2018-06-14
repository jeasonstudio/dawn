module.exports = resolve => ({
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  testMatch: [
    '**/__tests__/**/*.{js,jsx,mjs}',
    '**/test/unit/**/*.{js,jsx,mjs}',
    '**/?(*.)(spec|test).{js,jsx,mjs}'
  ],
  // where to search for files/tests
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': resolve('lib/babelTransform.js'),
    '^.+\\.(css|less|sass|scss)$': resolve('lib/__mocks__/styleMock.js')
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
    '^.+\\.module\\.(css|less|sass|scss)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|less|sass|scss)$': resolve('lib/__mocks__/styleMock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      'lib/__mocks__/fileMock.js'
    // '\\.(css|less)$': 'lib/__mocks__/styleMock.js'
  },
  globals: {
    window: true
  },
  testEnvironmentOptions: {
    userAgent: 'jest-dawn'
  },
  moduleFileExtensions: [
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ]
});
