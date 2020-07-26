<template>
  <header class="container">
    <div class="header-logo"></div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left"></el-button>
      <el-button type="primary"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <div class="header-search">
      <input type="text" class="header-input" placeholder="搜索音乐，视频，歌词，电台">
      <i class="iconfont search-icon">&#xe63c;</i>
    </div>
    <div class="header-right">
        <div class="user">
          <img :src="headPhotoSrc" class="headPhoto">
          <p class="userName" @click="handleLoginclick">{{userName}}</p>
          <i class="iconfont arrow-down">&#xe65c;</i>
        </div>
    </div>
  </header>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      headPhotoSrc: 'headPhotoSrc',
      userName: 'userName'
    })
  },
  methods: {
    // 显示登录框
    handleLoginclick () {
      this.showLoginBox(true)
    },
    ...mapActions(['showLoginBox'])
  }

}
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/var.scss';
  @import '~@/assets/styles/iconfont/iconfont.css';
  header {
    width: 100%;
    height: 62px;
    background: $bgColor-red;
    position: absolute;
    z-index: 999;
    top: 0;
    .header-logo{
      width: 140px;
      height: 62px;
      background:  url(https://s2.music.126.net/style/web2/img/frame/topbar.png?45b199e09a0530c035ff56d6d133611c) no-repeat;
      background-size: 145%;
      position: absolute;
      left: 20px;
    }
    /deep/.el-button-group{
      position: absolute;
      left: 240px;
      top: 50%;
      transform: translate(0, -50%);
    }
    /deep/.el-button {
      background: transparent;
      padding: 0;
      height: 28px;
      width: 33px;
    }
    /deep/.el-button--primary{
      background-color: transparent;
      border-color: #a72727;
    }
    .header-search{
      width: 272px;
      height: 28px;
      border-radius: 14px;
      background-color: #a82828;
      position: absolute;
      top: 50%;
      left: 318px;
      transform: translate(0, -50%);
      padding: 1px 0 0 13px;
      box-sizing: border-box;;
      .header-input{
        width: 88%;
        height: 25px;
        background-color: #a82828;
        outline: none;
        border:none;
        color: #fff;
        font-size: 16px;
      }
      .header-input::-webkit-input-placeholder{
        font-size: 16px;
        color: #c77373;
      }
      .search-icon {
        color:#cf8989
      }
      .search-icon:hover{
        color: #fff;
      }
    }
    .header-right {
      position: absolute;
      top: 50%;
      right: 100px;
      transform: translate(0, -50%);
      .user{
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .headPhoto {
          width: 30px;
          border-radius: 50%;
          margin: 5px;
        }
        .userName {
          font-size: 12px;
          color:#eec1c1;
          font-weight: 300;
        }
        .arrow-down {
          color: #eec1c1;
        }
      }
    }
  }
</style>
