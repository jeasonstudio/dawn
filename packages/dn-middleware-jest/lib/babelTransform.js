const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  babelrc: false,
  // cache: true,
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-typecheck'),
    require.resolve('babel-plugin-transform-decorators-legacy')
  ]
});
