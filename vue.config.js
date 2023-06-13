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
  		'/server' : {
        target: 'http://127.0.0.1/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server' : '',
        }
      }
  	}
  }
}
