module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
        // 根据设计稿/10得到rootValue的值
        //一般是75，但是vant组件是37.5
      rootValue: (arg) => {
        return arg.file.includes('vant') ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
