const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  'source-map'
].map(devtool => ({
  entry: {
    index: './src/index.js',
  },
  resolve: {
    alias: {
        Api: path.resolve(__dirname, 'src/api/'),
        Bot: path.resolve(__dirname, 'src/bot/'),
        Frontend: path.resolve(__dirname, 'src/frontend/'),
        Utilities: path.resolve(__dirname, 'src/utilities/')
    },
    extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true}}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'},
        ]
      },
      {
        test: /\.tsx?$/, loader: 'ts-loader'
      },
      {
        test: /\.(handlebars|hbs)$/, loader: "handlebars-loader"
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'discord-roll20-bot',
        template: 'src/index.hbs'
    })
  ],
  devtool,
  mode: 'production',
  watch: true,
  watchOptions: {
    aggregateTimeout: 2000
  }
}));