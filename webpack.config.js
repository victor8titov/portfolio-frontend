
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

require('dotenv').config()

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const config = {
  target: 'browserslist',
  entry: './src/index.tsx',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: isProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js',
    chunkFilename: isProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext][query]',
    clean: true
  },

  devServer: {
    host: 'localhost',
    port: 3001,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    compress: true,
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true
    }),

    new StylelintPlugin({
      files: 'src/*.s?(a|c)ss'
    }
    ),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css.[name].[contenthash:8].chunk.css'
    }),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      REST_API_URL: JSON.stringify(process.env.REST_API_URL)
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: process.env.PUBLIC_URL
    }),

    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),

    // new webpack.HotModuleReplacementPlugin(),

    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    'autoprefixer'
                  ],
                  'postcss-normalize'
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    'autoprefixer'
                  ],
                  'postcss-normalize'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  devtool: isProduction
    ? 'source-map'
    : 'cheap-module-source-map',

  optimization: {
    minimize: isProduction,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          compress: {
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          },
          warnings: false
        }
      }),
      // This is only used in production mode
      new CssMinimizerPlugin()
    ]
  },

  bail: isProduction
}

module.exports = config
