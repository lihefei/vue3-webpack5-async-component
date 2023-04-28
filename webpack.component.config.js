const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清理dist目录

module.exports = {
  mode: 'production',
  entry: {
    'component-a': ['/src/pages/component-a.vue'],
    'component-b': ['/src/pages/component-b.vue']
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].min.js',
    library: 'MyComponent',
    libraryTarget: 'umd'
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
    new webpack.ProgressPlugin(), // 打印构建进度
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['/static']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 设置别名
    },
    extensions: ['.js', '.json', '.vue'] // 引入 js、json、vue 文件时不需要写后缀名
  },
  externals: {
    vue: 'Vue',
    'element-plus': 'ElementPlus'
  }
};
