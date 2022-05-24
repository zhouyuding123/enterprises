module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 官方文档中使用的是["es2015", { "modules": false }]，要替换
    ['@babel/preset-env', { 'modules': false }]
  ],
  //plugins照抄文档即可
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
