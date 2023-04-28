const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 模板插件
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清理dist目录

module.exports = {
  mode: 'development',
  devtool: 'source-map', // 生成源码映射方便调试
  entry: path.resolve(__dirname, './src/main.js'), // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 打包输出的目录
    filename: 'js/[name]-[chunkhash:8].js' // 打包输出的文件名
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html', //输出的文件名
      title: 'hello webpack',
      inject: true
    }),
    new webpack.ProgressPlugin(), // 打印构建进度
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 设置别名
    },
    extensions: ['.js', '.json', '.vue'] // 引入 js、json、vue 文件时不需要写后缀名
  },
  devServer: {
    static: path.join(__dirname, './dist'), // 服务器web静态目录
    host: 'localhost', // 主机地址
    port: 8080, // 端口
    hot: true, // 热更新
    compress: true, // 开启gzip压缩
    open: true // 初次打包完自动打开浏览器
  }
};
