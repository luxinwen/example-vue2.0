var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  // // 提取多个入口文件的公共脚本部分，然后生成common.js方便多页面之间进行复用
  // new webpack.optimize.CommonsChunkPlugin('common.js'),
  // //
  // new ExtractTextPlugin('[name].css'),
  // // 压缩代码
  // new webpack.optimize.UglifyJsPlugin({
  //   compressor: {
  //     warnings: false
  //   }
  // }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: 2
  })
];

var config = {
  // 入口：要处理的实例
  entry: {
    vendor: ['vue', 'jquery'],
    app: './src/js/init.js'
  },

  // 出口：输出配置
  output: {
    // 输出到哪个目录
    path: path.resolve(__dirname, './assets'),
    // 静态资源的引用路径
    publicPath: '/assets/',
    // 实例最终输出的名字，[name]是基于上边entry中定义的key
    filename: '[name]-entry.js' // _[hash:5]
  },

  // 插件项
  plugins: plugins,

  // 模块加载
  module: {
    // 加载器配置
    loaders: [
      // .js 文件使用 babel-loader 来编译处理
      {
        test: /\.js[x]?$/,
        // query: {
        //   presets: ['es2015']
        // },
        include: [
          path.resolve(__dirname, './src/js'),
          path.resolve(__dirname, './src/vue')
        ],
        // exclude: /node_modules/,   //不加这个则 element-ui 无法编译
        loader: 'babel'
      },
      // .less 文件使用 style-loader、css-loader 和 less-loader 来编译处理
      {
        test: /\.less$/,
        loader: 'style!css!less?sourceMap'
      },
      // .css 文件使用 style-loader 和 css-loader 来处理
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'url?limit=8192'
      },
      // 字体文件使用 file-loader 来处理
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file'
      },
      // .vue 文件使用 vue-loader 来编译处理
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },

  babel: {
    presets: ['stage-2', 'es2015'],
    plugins: ['transform-runtime']
  },

  // 其它解决方案配置
  resolve: {
    // 绝对路径，查找module的话从这里开始查找
    // root: 'D:/web/nodejs/src',
    // 定义别名，方便后续直接引用别名，无须多写长长的地址
    alias: {
      vue: 'vue/dist/vue.js',   //VUE 2.0需要这样设置，否则会指向vue.common.js导致template编译报错
      'element-ui': 'element-ui/lib/index.js'
    },
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名。第一个是空字符串，对应不需要后缀的情况
    extensions: ['', '.js', '.vue', '.json']
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  // devServer: {
  //   historyApiFallback: true,
  //   noInfo: true
  // },
  devtool: '#eval-source-map'
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
