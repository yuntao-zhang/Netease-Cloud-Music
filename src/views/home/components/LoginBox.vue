<template>
  <div class="loginBox">
    <h4 class="title">
      手机号登录
      <i
       class="iconfont loginClose"
       @click="closeLoginBox"
      >
        &#xe69e;
      </i>
    </h4>
    <div class="loginContent">
      <div class="loginPhone">
        <a class="phoneHomeLocation" href="javascript:;" @click="showLocationList">
          {{currentLocationCode}}
          <i class="iconfont arrow-down">&#xe65c;</i>
        </a>
        <input type="text" placeholder="请输入手机号" class="phoneInput" v-model="phoneNum"/>
      </div>
      <input type="password" placeholder="请输入密码" class="loginPassword" v-model="loginPassWord"/>
      <el-checkbox  v-model="checked" class="atuoLogin">自动登录</el-checkbox>
      <button
        :class="{commitLogin:CommitMouseDown, commitLoginMouseDown:isCommitMouseDown}"
        @mousedown.stop="handelCommitMouseDown"
        @mouseup.stop="handelCommitMouseUp"
      >
        登录
      </button>
      <ul class="phoneLocationList" v-show="isShowLocationList">
          <li class="list-item" v-for="item of homeLocationList" :key="item.id" @click.stop="changeLocation(item.code)">
            <span class="locationName">{{item.location}}</span>
            <span class="locationCode">{{item.code}}</span>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'LoginBox',
  data () {
    return {
      isShowLocationList: false,
      homeLocationList: [],
      checked: true,
      CommitMouseDown: true,
      isCommitMouseDown: false,
      mouseDown: false,
      phoneNum: '',
      loginPassWord: ''
    }
  },
  computed: {
    ...mapState(['currentLocationCode'])
  },
  methods: {
    ...mapActions(['changeCurrentLocation', 'showLoginBox', 'changeUserName', 'changeHeadPhoto', 'changeIsLoginStatus']),
    showLocationList () {
      this.isShowLocationList = !this.isShowLocationList
    },
    changeLocation (currentLocationCode) {
      this.isShowLocationList = !this.isShowLocationList
      this.changeCurrentLocation(currentLocationCode)
    },
    getPhoneHomeLocationInfo () {
      this.ajaxGetPhoneLocation()
    },
    ajaxGetPhoneLocation () {
      axios.get('/api/homeLocationInfo.json').then((res) => {
        this.homeLocationList = res.data.data
      })
    },
    // 用来改变登录按钮按下后的样式
    handelCommitMouseDown () {
      this.CommitMouseDown = false
      this.isCommitMouseDown = true
    },
    // 改变登录按钮抬起后的样式
    // 登录后获取登录后的信息
    handelCommitMouseUp () {
      this.CommitMouseDown = true
      this.isCommitMouseDown = false
      axios.get('/api/isLogin.json').then((res) => {
        const resData = res.data
        if (Boolean(resData.isLogin) === true && this.phoneNum !== '' && this.loginPassWord !== '') {
          this.changeIsLoginStatus(true)
          this.changeUserName(resData.userName)
          this.changeHeadPhoto(resData.headPhoto)
          this.closeLoginBox()
        }
      })
    },
    // 关闭登录窗口
    closeLoginBox () {
      this.showLoginBox(false)
    }
  },
  mounted () {
    // 获取号码区号信息。
    this.getPhoneHomeLocationInfo()
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/var.scss';
    .loginBox {
    width: 530px;
    height: 313px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fafafa;
    border-radius: 5px;
    z-index: 99;
    box-shadow: 0 5px 16px rgba($color: #000000, $alpha: 0.8);
    .title {
      height: 38px;
      width: 510px;
      background-color: #333;
      line-height: 38px;
      color: #fff;
      padding-left:20px;
      position: relative;
      border-radius: 5px / 5px 5px 0 0 ;
      cursor: move;
      .loginClose{
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
    }
    .loginContent{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0 0 0;
      border-radius: 5px / 0 0 5px 5px ;
      .loginPhone {
        width: 218px;
        height: 30px;
        border: 1px solid #cdcdcd;
        border-radius: 3px;
        display: flex;
        .phoneHomeLocation {
          display: inline-block;
          color: #333;
          width: 45px;
          line-height: 30px;
          font-size: 12px;
          display: flex;
          align-items: center;
          border-right: 1px solid #cdcdcd;
        }
        .phoneInput {
          outline: none;
          border: none;
          padding-left: 10px;
        }
        .phoneInput::-webkit-input-placeholder {
          font-size: 12px;
        }
      }
      .phoneLocationList {
          position: absolute;
          top: 90px;
          width: 218px;
          height: 128px;
          border: 1px solid #cdcdcd;
          border-top: transparent;
          background: #fafafa;
          overflow: auto;
          z-index: 5;
          .list-item {
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            color: #333;
            padding: 0 5px 0 5px;
            cursor: pointer;
            .locationName{
              float: left;
            }
            .locationCode {
              float: right;
            }
          }
      }
      .loginPassword {
        width: 208px;
        height: 30px;
        border: 1px solid #cdcdcd;
        padding-left: 10px;
        margin-top: .5rem;
        border-radius: 3px;
      }
      .loginPassword::-webkit-input-placeholder {
        font-size: 12px;
      }
      .atuoLogin{
        position: absolute;
        top: 140px;
        left: 155px;
      }
      .commitLogin, .commitLoginMouseDown {
        width: 218px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        margin-top: 40px;
        background: linear-gradient(#5798dd, #1e79c4);
        cursor: pointer;
      }
      .commitLoginMouseDown {
        background: linear-gradient(#1e79c4, #5798dd)
      }
    }
  }
</style>
