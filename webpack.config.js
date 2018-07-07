const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = ['source-map'].map(devtool => ({
  entry: {
    index: './src/frontend/index.ts',
  },
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/frontend'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'discord-roll20-bot',
      template: 'src/frontend/index.hbs',
    }),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
  ],
  devtool,
  mode: 'production',
  watch: true,
  watchOptions: {
    aggregateTimeout: 2000,
  },
}))
