<template>
  <div class="songList-wrap">
    <div class="songList-title">
      <img class="title-img" :src="data.titleImg">
      <div class="title-description">
          <div class="title-name">
            <span class="title-flag">歌单</span>
            <h3 class="title-content">{{data.titleContent}}</h3>
          </div>
          <div class="title-create">
            <img class="create-photo create" :src="data.createPhoto" />
            <p class="create-name create">{{data.createName}}</p>
            <span class="create-time create">{{data.createTime}}</span>
          </div>
          <div class="title-functionBtn">
            <a class="btn play">
              <i class="iconfont">&#xe624;</i>
              <button class="play-all" @click.stop="changeSongList">播放全部</button>
            </a>
            <a class="btn">
              <i class="iconfont">&#xe761;</i>
              <button class="collect">收藏</button>
            </a>
            <a class="btn">
              <i class="iconfont">&#xe6ff;</i>
              <button class="share">分享</button>
            </a>
            <a class="btn">
              <i class="iconfont">&#xe650;</i>
              <button class="download-all">下载全部</button>
            </a>
          </div>
          <div class="title-flag">
            <span class="flag-caption">标签：</span>
            <a v-for="item in data.flagName" :key="item.id" class="flag-name">{{item.flag}}</a>
          </div>
          <p class="title-intro">
            <span class="intro-caption">简介：</span>
            {{data.introCaption}}
          </p>
      </div>
    </div>
    <div class="congList-nav">
      <div :class="{ nav_item:true, nav_item__active:isActive }" @click.stop="routeToList">歌曲列表</div>
      <div :class="{ nav_item:true, nav_item__active:!isActive }" @click.stop="routeToComment">评论</div>
    </div>
    <!-- 命名视图，用来显示歌曲列表或者评论列表 -->
    <router-view name="list" @getSongsDone="storageListContent"></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'songListContent',
  data () {
    return {
      data: {},
      listData: [],
      isActive: false
    }
  },
  methods: {
    ...mapActions(['actionChangeSongList']),
    // 获取歌单中歌曲列表的数据
    getSongListContent () {
      // 根据动态路由参数配置的json名称，获取此歌单的信息，不包含合歌曲列表
      axios.get(`/api/songList/${this.$route.params.id}.json`).then((res) => {
        this.data = res.data.data
      })
    },
    // 跳转到歌曲列表
    routeToList () {
      this.isActive = true
      this.$router.replace({ name: 'list' })
    },
    // 跳转到评论列表
    routeToComment () {
      this.isActive = false
      this.$router.replace({ name: 'comment' })
    },
    // 获取子组件list 中传递来的歌曲列表信息
    storageListContent (data) {
      this.listData = data
    },
    // 点击全波播放按钮，切边歌单，将从新歌单的第一首歌开始循环播放
    changeSongList () {
      this.actionChangeSongList(this.listData)
    }
  },
  mounted () {
    this.routeToList()
    this.getSongListContent()
  }
}
</script>
<style lang="scss" scoped>
 @import  '~@/assets/styles/var.scss';
  .songList-wrap {
    width: 100%;
    height: 345px;
    // background-color: skyblue;
    min-width: 950px;
    box-sizing: border-box;
    .songList-title {
      display: flex;
      padding: 40px 40px 0 40px;
      height: 265px;
      .title-img {
        width: 200px;
        height: 200px;
      }
      .title-description {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        .title-name {
          display: flex;
          align-items: center;
          padding: 10px 10px 0 0;
          .title-flag {
            color: $bgColor-red;
            border: 1px solid $bgColor-red;
            margin-right: 10px;
            padding: 1px 5px;
            font-size: 12px;
          }
          .title-content {
            font-size: 25px;
            font-weight: 500;
            color: #333;
          }
        }
        .title-create {
          display: flex;
          align-items: center;
          margin-top: 10px;
          .create {
            margin-right: 10px;
          }
          .create-photo {
            border-radius: 50%;
          }
          .create-name {
            color: #666
          }
          .create-time {
            color: #888;
            font-size: 12px;
          }
        }
        .title-functionBtn {
          display: flex;
          margin-top: 10px;
          color: #333;
          .btn {
            margin-right: 10px;
            padding: 5px;
            display: flex;
            align-items: center;
            border: 1px solid #e1e1e2;
            border-radius: 5px;
            cursor: pointer;
            button {
              background: transparent;
              cursor: pointer;
            }
            i {
              color: #8a8a8a;
              padding-right: 5px;
              cursor: pointer;
            }
          }
          .play {
            background-color: $bgColor-red;
            i {
              color: #fff;
            }
            .play-all {
              color: #fff;
            }
          }
        }
        .title-flag {
          margin-top: 10px;
          font-size: 14px;
          .flag-caption {
            margin-right: 5px;
          }
          .flag-name {
            margin-right: 5px;
            color: #0c73c2;
            cursor: pointer;
          }
        }
        .title-intro {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
    .congList-nav {
      display: flex;
      height: 40px;
      .nav_item {
        margin-left: 70px;
        cursor: pointer;
        color: #333;
        font-size: 18px;
        line-height: 40px;
      }
      .nav_item__active {
        border-bottom: 3px solid $bgColor-red;
        color: $bgColor-red;
      }
    }
  }
</style>
