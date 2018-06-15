/* global process, __dirname */

const path = require('path');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

// eslint-disable-next-line max-statements
module.exports = function (argv, jestConf) {

  const createJestConfig = require('./createJestConfig');
  const JEST_CONF = Object.assign(
    createJestConfig(relativePath => path.resolve(__dirname, '..', relativePath)),
    jestConf
  );
  
  argv.push(
    '--config',
    JSON.stringify(JEST_CONF)
  );

  const resolve = require('resolve');
  function resolveJestDefaultEnvironment(name) {
    const jestDir = path.dirname(
      resolve.sync('jest', {
        basedir: __dirname
      })
    );
    const jestCLIDir = path.dirname(
      resolve.sync('jest-cli', {
        basedir: jestDir
      })
    );
    const jestConfigDir = path.dirname(
      resolve.sync('jest-config', {
        basedir: jestCLIDir
      })
    );
    return resolve.sync(name, {
      basedir: jestConfigDir
    });
  }
  let cleanArgv = [];
  let env = 'jsdom';
  let next;
  do {
    next = argv.shift();
    if (next === '--env') {
      env = argv.shift();
    } else if (next.indexOf('--env=') === 0) {
      env = next.substring('--env='.length);
    } else {
      cleanArgv.push(next);
    }
  } while (argv.length > 0);
  argv = cleanArgv;
  let resolvedEnv;
  try {
    resolvedEnv = resolveJestDefaultEnvironment(`jest-environment-${env}`);
  } catch (e) {
  // ignore
  }
  if (!resolvedEnv) {
    try {
      resolvedEnv = resolveJestDefaultEnvironment(env);
    } catch (e) {
    // ignore
    }
  }
  const testEnvironment = resolvedEnv || env;
  argv.push('--env', testEnvironment);

  return argv;
};
