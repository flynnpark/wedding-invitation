const fs = require('fs');

const foldersUnderSrc = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: 'react-app',
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@?\\w'],
          [`^(${foldersUnderSrc.join('|')})(/.*|$)`, '^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
};
