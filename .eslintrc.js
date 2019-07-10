module.exports = {
    'root': true,
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
        'jest/globals': true
    },
    'extends': [
        'eslint:recommended',
        'eslint-config-prettier'
    ],
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    'rules': {
        'no-console': 0,
        'no-debugger': 0,
        'no-unused-vars': [
          'error',
          {vars: 'all', args: 'none', ignoreRestSiblings: true},
        ],
        'prettier/prettier': [
          'error',
          {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: false,
            jsxBracketSameLine: false,
            rangeStart: 0,
            rangeEnd: Infinity,
          },
        ],
    },
    'plugins': [
      'jest',
      'eslint-plugin-prettier'
    ]
};
