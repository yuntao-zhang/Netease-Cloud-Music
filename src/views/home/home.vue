// 主窗口视图

<template>
  <div class="warp">
    <div class="content">
      <home-side-nav></home-side-nav>
      <home-right></home-right>
      <home-control-bar></home-control-bar>
    </div>
    <home-header></home-header>
    <login-box v-show="isShowLoginBox"></login-box>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import HomeHeader from './components/HomeHeader.vue'
import HomeSideNav from './components/HomeSideNav.vue'
import LoginBox from './components/LoginBox.vue'
import HomeControlBar from './components/HomeControlBar.vue'
import HomeRight from './components/HomeRight.vue'

export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeSideNav,
    LoginBox,
    HomeControlBar,
    HomeRight
  },
  computed: {
    ...mapState({
      isShowLoginBox: 'isShowLoginBox'
    })
  },
  mounted () {
    this.$router.push('/11/recommend')
  }
}
</script>
<style lang="scss" scoped>
  .warp{
    width: 100%;
    height: 100vh;
    min-width: 1275px;
    .content{
      height: 100%;
      box-sizing: border-box;
      padding-top: 62px;
      padding-bottom: 60px;
      display: flex;
      position: relative;
      min-height: 900px;
      // min-height: 835px;
    }
  }
</style>
