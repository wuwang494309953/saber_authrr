// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8080', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/v1': '/v1'
        }
      }
    }
  }
}