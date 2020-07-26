<template>
  <div>
    <div class="findMusicNav" @click="activeNav">
      <router-link to="/11/recommend" class="navItem navItemActive">个性推荐</router-link>
      <router-link to="/11/songList" class="navItem">歌单</router-link>
      <router-link to="/11/hostStation" class="navItem">主播电台</router-link>
      <router-link to="/11/rankingList" class="navItem">排行榜</router-link>
      <router-link to="/11/singer" class="navItem">歌手</router-link>
      <router-link to="/11/newMusic" class="navItem">最新音乐</router-link>
    </div>
    <router-view name="content" class="content"></router-view>
  </div>
</template>
<script>
export default {
  name: 'findMusic',
  methods: {
    activeNav (e) {
      e.target.parentNode.children.forEach(element => {
        element.classList.remove('navItemActive')
      })
      e.target.classList.add('navItemActive')
    }
  },
  mounted () {
    this.$router.push('/11/recommend')
  }
}
</script>
<style lang="scss" scoped>
 @import '~@/assets/styles/var.scss';
  div {
    display: flex;
    flex-direction: column;
    // position: relative;
    height: 100%;
    overflow: hidden;
    .findMusicNav {
      height: 52px;
      line-height: 52px;
      border-bottom: 2px solid #e1e1e2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 40px;
      .navItem {
        margin: 0 27px;
      }
      .navItem:hover {
        color: $bgColor-red;
      }
      .navItemActive {
        border-bottom: 2px solid $bgColor-red;
        color: $bgColor-red;
      }
  }
  .content {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  }
</style>
