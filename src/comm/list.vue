<template>
  <div class="list-wrap">
    <div class="list-title">
      <p class="item">序号</p>
      <p class="item">操作</p>
      <p class="item">音乐标题</p>
      <p class="item">歌手</p>
      <p class="item">专辑</p>
      <p class="item">时长</p>
    </div>
    <div class="list-content" v-for="item in content" :key="item.id" @dblclick="playAudio(item)">
      <p class="item">{{item.id}}</p>
      <p class="item"></p>
      <p class="item">{{item.title}}</p>
      <p class="item">{{item.singer}}</p>
      <p class="item">{{item.album}}</p>
      <p class="item">{{item.duration}}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      content: []
    }
  },
  methods: {
    ...mapActions(['mapAudio']),
    // 双击歌曲，播放音乐
    playAudio (data) {
      // 将当前的item歌曲信息，映射到vuex中
      // 在HomeControlBar组件中，监听vuex的currentAudioSrc属性，此属性改变说明用户切歌，自动播放音乐
      this.mapAudio(data)
    },
    getSongsInfo () {
      // 根据路由参数配置json，获取动态路由参数，获取歌曲列表信息
      axios.get(`/api/songs/${this.$route.params.id}-songs.json`).then((res) => {
        this.content = res.data.list
        // 将信息传递给父组件 songListContent
        this.$emit('getSongsDone', this.content)
      })
    }
  },
  mounted () {
    this.getSongsInfo()
  }
}
</script>
<style lang="scss" scoped>
  .item {
    box-sizing: border-box;
    padding-left: 15px;
    border: 1px solid #e1e1e2;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #666;
  }
  .item:nth-child(2n+1) {
    border-left: transparent;
  }
  .item:nth-child(1),.item:nth-child(2) {
    width: 5%;
  }
  .item:nth-child(3), .item:nth-child(4) {
    width: 30%;
  }
  .item:nth-child(5), .item:nth-child(6) {
    width: 15%;
  }
  .list-wrap {
    margin-top: 5px;
    .list-title{
      display: flex;
    }
    .list-content {
      display: flex;
      user-select: none;
      cursor: pointer;
      .item {
        border: none;
      }
    }
    .list-content:hover {
      background-color: #eee;
    }
  }
</style>
