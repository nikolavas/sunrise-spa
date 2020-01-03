module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      Shop: {
        // paths: [`src/stores/${process.env.STORE || 'clothes'}/`],
        paths: ['src/shops/clothes/'],
      },
    },
  },
  env: {
    node: true,
    jquery: true,
  },

  extends: ['plugin:vue/essential', '@vue/airbnb'],

  rules: {
    'import/no-dynamic-require': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'max-len': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],

    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        schemaJson: require('./graphql.schema.json'),
      },
    ],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  plugins: ['graphql'],
};
