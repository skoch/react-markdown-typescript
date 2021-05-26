const path = require('path');

module.exports = {
  entry: './dist/App.js',
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'app.js',
  },
  watch: true,
  mode: 'development',
};
