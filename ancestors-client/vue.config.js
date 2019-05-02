const path = require('path')
const process = require('process')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html'
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 80,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
        '/api': {
            target: 'http://localhost/api/',
            ws: true,
            changOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    // ....
  }
}