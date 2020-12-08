module.exports = {
  title: 'K-M',

  /**
   * @type {boolean} true | false
   * @description 是否在右面板显示设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签查看
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复标题
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在边栏中显示徽标
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日志组件。
   * 默认仅在生产环境中使用
   * 如果您还想在开发中使用它，可以通过 ['production', 'development']
   */
  errorLog: 'production'
}
