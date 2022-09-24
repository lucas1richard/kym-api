// const fs = require('fs');

module.exports = {
  extends: ['standard', 'plugin:chai-friendly/recommended'],
  // parser: 'babel-eslint',
  globals: {
    __DEV__: true,
    Raven: true,
    include: true,
    testData: true,
    agent: true,
    globals: true,
    AppError: true,
  },
  env: {
    node: true,
    es2022: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['chai-friendly'],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'comma-dangle': ['error', 'always-multiline'],
    // "node/exports-style": ["error", "module.exports"],
    // "node/prefer-global/buffer": ["error", "always"],
    // "node/prefer-global/console": ["error", "always"],
    // "node/prefer-global/process": ["error", "always"],
    // "node/prefer-global/url-search-params": ["error", "always"],
    // "node/prefer-global/url": ["error", "always"],
    // "node/no-extraneous-require": 0,
    // "no-process-exit": 0,
    // 'class-methods-use-this': 0,
    // 'object-curly-newline': 0,
    // 'react/prefer-stateless-function': 0,
    // 'function-paren-newline': 0,
    // 'arrow-body-style': 0,
    // 'comma-dangle': [0, 'always-multiline'],
    // 'import/imports-first': 0,
    // 'import/newline-after-import': 0,
    // 'import/no-dynamic-require': 0,
    // 'import/no-extraneous-dependencies': 0,
    // 'import/no-named-as-default': 0,
    // 'import/no-webpack-loader-syntax': 0,
    // 'import/prefer-default-export': 0,
    // 'arrow-parens': [1, 'always'],
    // indent: [
    //   2,
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],
    // 'max-len': 0,
    // 'no-undefined': 1,
    // 'newline-per-chained-call': 0,
    // 'no-confusing-arrow': 0,
    'no-console': 1,
    // 'semi': ['error', 'always'],
    // 'quotes': ['error', 'single'],
    // 'no-use-before-define': 0,
    // 'prefer-template': 2,
    // 'require-yield': 0,
  },
  overrides: [
    // {
    //   files: [ 'server/**/*.js', 'server/*.js' ],
    //   rules: {
    //     // 'no-console': 0,
    //     camelcase: 0,
    //     'global-require': 0,
    //     'prefer-arrow-callback': 0
    //   }
    // },
    // {
    //   files: ['*.test*js'],
    //   rules: {
    //     'no-undefined': 0
    //   }
    // }
  ],
  settings: {
    // 'import/resolver': {
    //   webpack: {
    //     config: './internals/webpack/webpack.prod.babel.js',
    //   },
    // },
  },
};
