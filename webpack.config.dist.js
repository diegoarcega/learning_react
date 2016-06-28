var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.resolve(__dirname, 'src');

var CONFIG = {
    entry: SRC_DIR + '/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    resolve: {
        root:[
            SRC_DIR,
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js']
    },
    module: {
          loaders: [
              { test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader' },
              { test: /\.(css|scss)$/, loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]', 'sass'] },
              { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
              { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
              { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
          ]
      },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    devtool: 'source-map'
}

module.exports = CONFIG;
