import Vue from 'vue'
import Vuex from 'vuex'
import audio from './audio'
import currentSongList from './currentSongList'
import MapAudio from './mapAudio'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否显示登录框
    isShowLoginBox: false,
    // 默认手机号码的区号
    currentLocationCode: '+86',
    // 是否是登录状态
    isLogin: false,
    userName: '未登陆',
    headPhotoSrc: 'img/user.png',
    // 左侧导航栏的active状态管理
    navList: [false, false, false, false, false, false, false, false, false, false, false, true],
    // 左侧导航栏的内容
    itemList: [{
      name: '推荐',
      id: '1',
      content: [{
        id: '11',
        iconSrc: '/img/navIcon/music.png',
        title: '发现音乐'
      }, {
        id: '12',
        iconSrc: '/img/navIcon/broadcast.png',
        title: '私人FM'
      }, {
        id: '13',
        iconSrc: '/img/navIcon/LookHover.png',
        title: 'Look直播'
      }, {
        id: '14',
        iconSrc: '/img/navIcon/live.png',
        title: '视频'
      }, {
        id: '15',
        iconSrc: '/img/navIcon/friend.png',
        title: '朋友'
      }]
    }, {
      name: '我的音乐',
      id: '2',
      content: [{
        id: '21',
        iconSrc: '/img/navIcon/music.png',
        title: '本地音乐'
      }, {
        id: '22',
        iconSrc: '/img/navIcon/download.png',
        title: '下载管理'
      }]
    }],
    // audio的缩略图显示的内容
    audio: audio,
    // audio元素
    audioEl: '',
    // 当前播放歌曲信息
    currentAudiosrc: '',
    audioToogle: false,
    audioPause: true,
    audioPlay: false,
    // 当前歌单
    currentSongList: currentSongList
  },
  mutations: {
    showLoginBox (state, isShowLoginBox) {
      state.isShowLoginBox = isShowLoginBox
    },
    changeCurrentLocation (state, currentLocationCode) {
      state.currentLocationCode = currentLocationCode
    },
    changeIsLoginStatus (state, isLoginStatus) {
      state.isLogin = isLoginStatus
      try {
        localStorage.setItem('isLogin', isLoginStatus)
      } catch (e) {}
    },
    changeUserName (state, userName) {
      state.userName = userName
      try {
        localStorage.setItem('userName', userName)
      } catch (error) {}
    },
    changeHeadPhoto (state, headPhotoSrc) {
      state.headPhotoSrc = headPhotoSrc
      try {
        localStorage.setItem('headPhotoSrc', headPhotoSrc)
      } catch (error) {}
    },
    activeNav (state, index) {
      state.navList = []
      state.navList[index] = true
    },
    create (state, el) {
      state.audioEl = el
    },
    mapAudio (state, data) {
      MapAudio(state, data)
    },
    mapNextSong (state, data) {
      state.currentSongList.currentSongList.index = data
    },
    changeSong (state, data) {
      state.currentSongList.currentSongList.index = data
    },
    actionChangeSongList (state, data) {
      state.currentSongList.currentSongList.list = data
      state.currentSongList.currentSongList.index = 0
      MapAudio(state, data[0])
    }
  },
  actions: {
    // 显示/隐藏登录框
    showLoginBox (ctx, isShowLoginBox) {
      ctx.commit('showLoginBox', isShowLoginBox)
    },
    // 改变手机区号
    changeCurrentLocation (ctx, currentLocationCode) {
      ctx.commit('changeCurrentLocation', currentLocationCode)
    },
    // 改变登录状态
    changeIsLoginStatus (ctx, isLoginStatus) {
      ctx.commit('changeIsLoginStatus', isLoginStatus)
    },
    // 改变用户名
    changeUserName (ctx, userName) {
      ctx.commit('changeUserName', userName)
    },
    // 改变用户头像
    changeHeadPhoto (ctx, headPhotoSrc) {
      ctx.commit('changeHeadPhoto', headPhotoSrc)
    },
    // 激活左侧导航栏样式
    activeNav (ctx, index) {
      ctx.commit('activeNav', index)
    },
    // 创建audio元素
    create (ctx, el) {
      ctx.commit('create', el)
    },
    // 映射audio属性
    mapAudio (ctx, data) {
      ctx.commit('mapAudio', data)
    },
    // 上一首/ 下一首
    changeSong (ctx, data) {
      ctx.commit('mapNextSong', data)
    },
    // 改变歌单
    actionChangeSongList (ctx, data) {
      ctx.commit('actionChangeSongList', data)
    }
  },
  modules: {
  }
})
