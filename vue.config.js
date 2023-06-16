module.exports = {
  publicPath: './',
  lintOnSave: false,

  pluginOptions: {
    'i18n-transform': {
      i18nPath: 'src/i18n/index.js'
    }
  },

  devServer: {
    proxy: {
      '/' : {
        target: 'http://8.134.187.183/',
        ws: true,
        changeOrigin: true,
      },
      '/wechat' : {
        target: 'https://qyapi.weixin.qq.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/wechat': ''
        }
      }
    },
  }
}
