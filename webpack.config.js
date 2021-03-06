const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: ['babel-polyfill', './client/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({template: path.join(__dirname, './index.html')})],
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                  },
                },
              },
            {
                test: /\.(png|jpg|gif)$/i,
                use:[{
                        loader: 'file-loader',
                }]
            },
            {
                test: /\.s?[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                  process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
              },
        ],
    },
    devServer: {
      compress: true,
      port: 8080,
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000',
        secure: true,
      },
      static: {
        directory: path.join(__dirname, '/'),
        publicPath: '/',
      },
    }
}