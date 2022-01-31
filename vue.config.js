const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/geme-of-life/'
    : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
}