import { getToken } from '@/utils/auth-token'
// 用户的全局属性state
const state = {
  token: getToken,
  name: '', // 用户名称
  avatar: '', // 用户头像
  roles: [] // 用户角色
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NMAE: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
