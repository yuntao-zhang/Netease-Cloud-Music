// 修改配置完成需要重新启动项目

const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src/'))
      .set('styles', path.join(__dirname, './src/assets/styles'))
      .set('common', path.join(__dirname, './src/common'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': 'mock'
        }
      }
    }
  }
}
