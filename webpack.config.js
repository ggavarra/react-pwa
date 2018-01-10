//https://medium.com/@danilosilvadev/webpack-react-redux-babel-config-in-10-minutes-4ad8c4abc8b2
//https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474
//https://scotch.io/tutorials/routing-react-apps-the-complete-guide
var path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/';
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  //Content
  entry: './src/index.js',
  // A SourceMap without column-mappings ignoring loaded Source Maps.
  devtool: 'cheap-module-source-map',
  plugins: [
    //simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './src/index.html'
    }),
    //Auto replacement of page when i save some file, even css
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    path: path.join(__dirname, publicPath),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map',
  },

  devServer: {
    port: 3000,
    host: 'localhost',
    //Be possible go back pressing the "back" button at chrome
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: path.join(__dirname, publicPath),
    //hotmodulereplacementeplugin
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules=true&camelCase=true']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=./images/[name].[ext]',
          'image-webpack-loader'
        ]

      }
    ]
  },
}
