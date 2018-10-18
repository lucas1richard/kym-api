require('babel-polyfill');

const path = require('path');

global.base_dir = path.resolve(__dirname, '..', 'server');

global.abs_path = (pth) => global.base_dir + pth;

// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));


console.log('mocha setup complete');

// Test route controllers independently
