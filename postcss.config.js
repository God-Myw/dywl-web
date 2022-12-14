module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 37.5, //将100px转化为1rem 由于设置了pc端的html默认为 100px=1rem
      // 新建文件不转化rem需要添加忽略
      exclude:
        /node_modules|components|home|details|aboutUs|tool|product|register|login|amendCode|perfection|workbench|walliance|otherServe|Main/i,
    },
  },
}
