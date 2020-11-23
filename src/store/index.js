import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
// 获取`./modules` 下`.js`文件,不需要导入每个./modules下的文件
const modulesFiles = require.context('./modules', true, /\.js/)

// 解析文件，自动导入
const modules = modulesFiles.keys().reduce((file, path) => {
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(path)
  file[moduleName] = value.default
  debugger
  return file
}, {})
const store = new Vuex.Store(
  modules,
  getters
)
export default store
