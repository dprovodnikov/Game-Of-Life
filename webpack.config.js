const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/view/index.tsx',

  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|.spec|.test/,
        use: 'ts-loader',
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'index.template.html'),
    }),
  ],

  devtool: 'inline-source-map',

  devServer: {
    port: 3000,
    hot: true,
  },
};