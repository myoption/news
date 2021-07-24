// const autoprefixer = require('autoprefixer')
// const pxtorem = require('postcss-pxtorem')
module.exports = {
  plugins: {
    'autoprefixer': {
      Browserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 如果是vant样式rootValue为37.5 其他为75
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}