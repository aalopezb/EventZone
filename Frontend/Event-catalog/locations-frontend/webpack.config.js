const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/', 
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
      filename: 'index.html'
    }),
  ],
  mode: 'production'
};

