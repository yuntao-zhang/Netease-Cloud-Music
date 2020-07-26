<template>
  <div class="recommend-song-wrap">
    <div class="recommend-song-title">
      <h4 class="title-content">{{this.listData.title}}</h4>
      <a class="title-more">更多&gt;</a>
    </div>
    <div class="recommend-song-content">
      <!-- 从父组件 recommend 中获取数据，循环渲染 -->
      <recommend-cover
       v-for="item in listData.songList"
       :key="item.id"
       :itemData="item"
      >
      </recommend-cover>
    </div>
  </div>
</template>
<script>
import recommendCover from '@/comm/recommendCove'
export default {
  name: 'recommendSongList',
  props: ['listData'],
  components: {
    recommendCover
  }
}
</script>
<style lang="scss" scoped>
.recommend-song-wrap {
  width: 950px;
  .recommend-song-title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #e1e1e2;
    .title-content{
      flex: 1;
      font-size: 22px;
      line-height: 35px;
      color: #333;
      font-weight: 500;
    }
    .title-more{
      color: #666;
      cursor: pointer;
    }
  }
  .recommend-song-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

</style>
