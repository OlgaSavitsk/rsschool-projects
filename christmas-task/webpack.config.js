const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  experiments: {
    asset: true
   },
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
          {
            test:/\.(s*)css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ]
         },
            
          {
              test: /\.[tj]s?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
          },
              {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, 
                type: 'asset/resource'
              },
              {
                  test: /\.svg$/,
                  use: [
                    {
                      loader: 'svg-url-loader',
                      options: {
                        limit: 10000,
                      },
                    },
                  ],
              },
          ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },  
      extensions: ['', '.ts', '.js', 'json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'index.css',
       }),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/assets', to: 'assets' },
            { from: './public' }],
        })
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
