<template>
  <div class="recommend">
    <div class="banner">
       <el-carousel  type="card" height="250px" :interval="4000" arrow="never">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.bannerUrl" class="banner_img"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <recommend-song-list :listData="recommendSongList"></recommend-song-list>
  </div>
</template>
<script>
import axios from 'axios'
import recommendSongList from './recommendSoneList'
export default {
  name: 'recommend',
  data () {
    return {
      bannerList: [],
      recommendSongList: {}
    }
  },
  components: {
    recommendSongList
  },
  methods: {
    getRecommendInfo (res) {
      const resData = res.data
      this.bannerList = resData.bannerList
      this.recommendSongList = resData.recommendSongList
    }
  },
  mounted () {
    // 获取个性推荐 推荐的歌单信息
    axios.get('/api/recommend.json').then((res) => {
      if (res.data.succ === true) {
        this.getRecommendInfo(res)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .recommend {
    margin-top: 24px;
    min-width: 950px;
    overflow: hidden;
    overflow-y: scroll;
    .banner {
      /deep/.el-carousel__container {
        width: 950px;
      }
      /deep/.el-carousel__item {
        width: 750px;
      }
      /deep/.el-carousel__button {
        width: 20px;
        height: 3px;
        background: #c8c8c8;
      }
      .banner_img {
        height: 250px;
      }
    }
  }
  .recommend::-webkit-scrollbar {
      width: 10px;
    }
  .recommend::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #e1e1e2;
  }
</style>
