const path = require('path');
const webpack = require('webpack');

// const srcDir = path.resolve(__dirname, 'theme/assets');
const srcDir = path.resolve(__dirname, 'theme');
const srcDirAssets = path.join(srcDir, '/assets');
const srcDirViews = path.join(srcDir, '/views');
const dstDir = path.resolve(__dirname, 'assets');
const javascriptsDstPath = path.join(dstDir, '/javascripts');
const stylesheetsDstPath = path.join(dstDir, '/stylesheets');
const stylesheetDst = '../stylesheets/screen.css';

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


let webpackConfig = {
  entry: [
    path.join(srcDirAssets, '/main.js'),
    // path.join(srcDirAssets, '/stylesheets/fonts.sass'),
    path.join(srcDirAssets, '/stylesheets/screen.sass'),
  ],

  // mode: 'development',
  mode: 'production',

  output: {
    filename: 'application.js',
    // filename: '[name].bundle.js',
    path: javascriptsDstPath,
  },

  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // },
    minimizer: [new UglifyJsPlugin()],
  },

  stats: "minimal",
  // stats: "normal",

  // devtool: 'source-map',
  devtool: 'cheap-module-source-map',

  performance: {
    hints: "warning"
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: [/node_modules/],
      //   use: [
      //     {
      //       loader: 'buble-loader',
      //       options: {
      //         objectAssign: 'Object.assign'
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            // { loader: 'cache' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: 'file-loader?hash=sha512&digest=hex&name=../images/[hash].[ext]' },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: false
                },
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 7
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '../fonts/[hash].[ext]'
          }
        }
      }
    ],
  },
  externals: {
    jquery: 'jQuery',
  },

  plugins: [
    new ExtractTextPlugin({
      filename: stylesheetDst
      // filename:  (getPath) => {
      //   return getPath('../stylesheets/[name].css')
      // },
      // filename: "../stylesheets/[name].min.css",
      // allChunks: true
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),

    new webpack.WatchIgnorePlugin([/safe/]),

    // new webpack.HotModuleReplacementPlugin(),

    // new BrowserSyncPlugin({
    //   // online: true,
    //   // cors: true,
    //   // reloadOnRestart: true,
    //   host: 'localhost',
    //   post: 3000,
    //   proxy: 'http://178.62.115.197:8080/',
    //   // ghostMode: false,
    //   files: [{
    //     match: [
    //       "theme/views/**/*.pug",
    //       "theme/views/**/*.sass",
    //     ],
    //     options: { ignored: '*safe*' }
    //   }],
    //   // open: false,
    //   delay: 200,
    //   reload: false,
    // })
  ],
};

module.exports = webpackConfig;
