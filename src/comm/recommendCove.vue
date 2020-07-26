<template>
<!-- 歌单封面 -->
  <div class="recommend-cover-wrap">
    <img
     class="recommend-cover-img"
     :src="this.itemData.coverImg"
     @click.stop="goTosongListContent"
    />
    <div class="recommend-cover-palyTimes-wrap">
      <div class="recommend-cover-palyTimes">
        <span class="iconfont playIcon">&#xe647;</span>
        <span class="playTimes ellipsis">{{this.itemData.playTimes}}</span>
      </div>
    </div>
    <p class="recommend-cover-description twoEllipsis">{{this.itemData.description}}</p>
  </div>
</template>
<script>
export default {
  name: 'recommendCove',
  props: ['itemData'],
  methods: {
    goTosongListContent () {
      // 点击歌单跳转到相应的路由中
      this.$router.push(`${this.itemData.router}`)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/var.scss';
  .recommend-cover-wrap {
    margin-top: 12px;
    width: 172px;
    height: 225px;
    position: relative;
    cursor: pointer;
    .recommend-cover-img {
      width: 172px;
      vertical-align: top;
    }
    .recommend-cover-palyTimes-wrap {
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      top:0;
      color: #fff;
      font-size: 14px;
      line-height: 18px;
      background: linear-gradient(90deg,transparent 45%, rgba(0, 0, 0, .3));
      padding-right: 10px;
      .recommend-cover-palyTimes {
        display: flex;
        justify-content: flex-end;
        width: 50%;
        float: right;
        .playTimes{
          display: inline-block;
        }
      }
    }
    .recommend-cover-description {
      padding: 5px 0;
      width: 172px;
      font-size: 14px;
    }
  }
</style>
