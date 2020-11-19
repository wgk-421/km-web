import cookie from 'js-cookie'

const TokenKey = 'User-Auth-Token'

export function getToken() {
  return cookie.get(TokenKey)
}

export function setToken(token) {
  return cookie.set(TokenKey, token)
}

export function removeToken() {
  return cookie.remove(TokenKey)
}
