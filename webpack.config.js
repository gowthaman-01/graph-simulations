const path = require('path');

module.exports = {
  mode: 'development', // or 'production' for production builds
  entry: './public/script.ts', // Entry point of your application
  devtool: 'inline-source-map', // Source maps support
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'public'), // Output directory
  },
};
