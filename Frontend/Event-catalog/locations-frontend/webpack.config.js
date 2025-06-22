const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/', // necesario para SPA
    clean: true, // limpia la carpeta build antes de cada build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JS o JSX
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
    extensions: ['.js', '.jsx'], // permite imports sin extensión
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // origen del HTML base
      filename: 'index.html' // nombre del archivo en /build
    }),
  ],
  mode: 'production'
};

