const defaultIsShowLoginBox = false
const defaultCurrentLocationCode = '+86'
let defaultIsLogin = false
let defaultUserName = '未登陆'
let defaultHeadPhotoSrc = 'img/user.png'
try {
  if (localStorage.getItem) {
    defaultIsLogin = localStorage.getItem('isLogin')
    defaultUserName = localStorage.getItem('userName')
    defaultHeadPhotoSrc = localStorage.getItem('headPhotoSrc')
  }
} catch (e) {}

export default {
  isShowLoginBox: defaultIsShowLoginBox,
  currentLocationCode: defaultCurrentLocationCode,
  isLogin: defaultIsLogin,
  userName: defaultUserName,
  headPhotoSrc: defaultHeadPhotoSrc
}
