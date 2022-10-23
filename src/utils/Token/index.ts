
const TokenKey = 'DAdmin'

export function getlocalStorageToken() {
  return localStorage.getItem(TokenKey)
}

export function setlocalStorageToken(token:string) {
  localStorage.setItem(TokenKey,token)
}

export function removelocalStorageToken() {
  localStorage.removeItem(TokenKey)
}