import path from 'path';

const dirname = path.resolve();

export default {
  testMatch: [path.join(dirname, '/src/tests/*.test.js')],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};