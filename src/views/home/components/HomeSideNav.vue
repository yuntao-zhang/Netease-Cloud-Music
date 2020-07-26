<template>
  <div class="sideNavWrap">
    <div class="navWrap">
      <div v-for="item in itemList" :key="item.id" class="navItem" >
        <p class="itemName">{{item.name}}</p>
        <side-nav v-for="content in item.content" :key="content.id" :index="content.id" >
          <template v-slot:navIcon>
            <img :src="content.iconSrc" class="navIcon">
          </template>
          <template v-slot:navTitle>
            <span>{{content.title}}</span>
          </template>
        </side-nav>
      </div>
    </div>
    <div class="songWindow">
      <img
       :src="audio.coverImg"
       class="song-coverImg"
      />
      <div class="song-Info">
        <p class="song-name ellipsis">{{audio.title}}</p>
        <p class="song-singer ellipsis">{{audio.singer}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import SideNav from './SideNav'
export default {
  name: 'HomeSideNav',
  components: {
    SideNav
  },
  computed: {
    // 将store 中的左侧导航栏item 循环渲染到页面中
    // 可以将login后的状态请求一次ajax来增加登录以后的导航栏选项以模仿登录和非登录状态
    ...mapState(['itemList', 'audio'])
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/var.scss';
  .sideNavWrap{
    width: 250px;
    box-sizing: border-box;
    border-right: 1px solid #e1e1e2;
    display: flex;
    flex-direction: column;
    min-width: 190px;
    .navWrap{
      overflow-y: scroll;
      overflow: auto;
      flex: 1;
      background: #f5f5f7;
      .navItem {
        color: #5c5c5c;
        .itemName{
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
        }
      }
    }
    .navWrap::-webkit-scrollbar {
      width: 10px;
    }
    .navWrap::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #e1e1e2;
    }
    .songWindow{
      height: 70px;
      display: flex;
      align-items: center;
      padding: 8px 0 8px 8px;
      box-sizing: border-box;
      border:1px solid #e1e1e1;
      border-right: transparent;
      background: #f5f5f7;
      cursor: pointer;
      .song-coverImg {
        height: 55px;
        margin-right: 8px;
      }
      .song-Info {
        display: flex;
        flex-direction: column;
        .song-name, .song-singer {
          width: 110px;
          font-size: 14px;
          padding: 3px 0;
          color: #666;
        }
      }
    }
  }
</style>
