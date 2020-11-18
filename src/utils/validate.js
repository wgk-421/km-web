// 全局校验方法
/**
 * 校验用户名称
 * @param {string} str
 */
export function validUsername(str) {
  const valid_map = ['admin', 'km']
  return valid_map.indexOf(str.trim()) >= 0
}
