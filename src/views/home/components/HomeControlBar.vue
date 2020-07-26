<template>
  <div class="controlBarWrap">
    <div class="controlBar-btns">
      <button class="btn iconfont" @click.stop="prevSong">&#xe800;</button>
      <button :class="{ btn:true, playBtn:!isPause, playPause:isPause}" @click.stop="changeIspause"></button>
      <button class="btn iconfont" @click.stop="nextSong">&#xe7ff;</button>
    </div>
    <div class="controlBar-progress">
      <span class="progress-current">{{currentTime}}</span>
      <div class="progress-wrap">
        <div class="progress-content" ref="progressContent" @click.stop="speedPlay">
          <div class="progress-current" ref="progressCurrent" @mousedown.stop="skipPlay"></div>
        </div>
      </div>
      <span class="progress-all">{{durationTime}}</span>
    </div>
    <div class="controlBar-volume">
      <span class="volume-icon"></span>
      <div class="volume-wrap">
        <div class="volume-content" ref="volumeContent" @click.stop="speedVolume">
          <div class="volume-current" ref="volumeCurrent" @mousedown.stop="skipVolume"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HomeControlBar',
  data () {
    return {
      isPause: false,
      isMmouseMove: false,
      isVolumeMmouseMove: false,
      dragingWidth: 0,
      volumeDragingWidth: 0,
      currentTime: '00:00',
      current: 0,
      durationTime: '00:00',
      duration: 0,
      progressWidth: 0,
      volumeWidth: 0,
      volumeCurrent: 0
    }
  },
  computed: {
    ...mapState({
      audioEl: 'audioEl',
      audio: 'audio',
      currentAudiosrc: 'currentAudiosrc',
      currentSongList: 'currentSongList'
    })
  },
  watch: {
    // 播放/暂停按钮的样式图标切换以及相应的功能
    isPause: function (newIsPause, oldIsPause) {
      if (newIsPause === true && oldIsPause === false) {
        this.playMusic()
      } else if (newIsPause === false && oldIsPause === true) {
        this.pauseMusic()
      }
    },
    // 当前播放的音乐SRC发生改变，说明用户切歌或者上一首播放完成，自动播放下一首
    currentAudiosrc: function () {
      this.audioEl.src = this.audio.src
      this.playMusic()
      if (this.isPause === false) {
        this.changeIspause()
      }
    },
    // 改变浏览器窗口时，动态调整当前播放的时长的宽度。
    // 解决在播放过程中，改变浏览器窗口大小，当前播放时长进度条过长或者过短的问题
    progressWidth: function () {
      this.$refs.progressCurrent.style.width = this.current / this.duration * this.progressWidth + 'px'
    }
  },
  methods: {
    ...mapActions(['create', 'changeSong', 'mapAudio']),
    // 根据输入的歌曲时间（秒单位）转换为分钟单位
    computedTime (time) {
      const MIN = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
      const SEC = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60)

      return `${MIN}:${SEC}`
    },
    // 创建audio播放器并且完成播放器的初始化
    createAudio () {
      const audio = new Audio()
      const currentProgress = this.$refs.progressCurrent
      // 初始化时的src从localStorage中获取，localStorage中报错用户最后一个播放的src
      audio.src = localStorage.getItem('audioSrc')
      // src的音量设置为默认音量
      audio.volume = this.volumeCurrent / this.volumeWidth
      // 歌曲播放时，动态改变进度条的长度
      // 增加isMouseMove标志位，当用户拖动进度条时，不要动态计算进度条的长度，防止用户鼠标拖拽停顿时的闪烁bug
      audio.addEventListener('timeupdate', () => {
        this.current = audio.currentTime
        this.currentTime = this.computedTime(audio.currentTime)
        if (this.isMmouseMove === false) {
          currentProgress.style.width = audio.currentTime / audio.duration * this.progressWidth + 'px'
        }
      })
      // 当audio加载完歌曲时，改变歌曲的时长
      audio.addEventListener('canplay', () => {
        this.duration = audio.duration
        this.durationTime = this.computedTime(audio.duration)
      })
      // 当audio播放完当前歌曲时，自动切歌
      // 切歌到最后一首时自动播放第一手
      audio.addEventListener('ended', () => {
        this.nextSong()
      })
      // 初始化完成，创建audio播放器
      this.create(audio)
    },
    // 获取进度条长度，进度条长度根据窗口大小动态调整
    getProgressWidth () {
      const progressEl = this.$refs.progressContent
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.progressWidth = progressEl.offsetWidth
        }, 100)
      })
      this.progressWidth = progressEl.offsetWidth
    },
    // 获取音量进度条的长度
    getVolumeWidth () {
      this.volumeWidth = this.$refs.volumeContent.offsetWidth
      this.volumeCurrent = this.$refs.volumeCurrent.offsetWidth
    },
    // 播放/ 暂停播放时的图标变换
    changeIspause () {
      this.isPause = !this.isPause
    },
    // 开始播放音乐
    playMusic () {
      // audio。play() ,返回一个promise
      const playPromise = this.audioEl.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.audioEl.play()
        }).catch(() => {})
      }
    },
    // 暂停播放音乐
    pauseMusic () {
      const pausePromise = this.audioEl.pause()
      if (pausePromise !== undefined) {
        pausePromise.then(() => {
          this.audioEl.pause()
        }).catch(() => {})
      }
    },
    /** 拖拽进度条，改变当前进度封装函数
     *  params {isMouseDown} 鼠标按下的标志位
     *  params {MouseMoveFlag} 鼠标正在移动标志位
     *  params {dragingWidth} 拖动的长度
     *  params {fatherOffsetLeft} 外层包裹warp元素的offsetLeft值
     *  params {totalWidth} 进度条的总长度
     *  params {targetEl} 当前播放长度进度条
     *  params {audio} audio元素
     *  params {aduioAttr} 需要操作的audio的属性
     *  params {maxNum} 进度条最大值
     */
    handleSkip (isMouseDown, MouseMoveFlag, dragingWidth, fatherOffsetLeft, totalWidth, targetEl, audio, aduioAttr, maxNum = 1) {
      const handleMouseMove = (event) => {
        if (isMouseDown === true) {
          setTimeout(() => {
            this[MouseMoveFlag] = true
            dragingWidth = event.pageX - fatherOffsetLeft
            if (dragingWidth > totalWidth) {
              dragingWidth = totalWidth
            }
            targetEl.style.width = dragingWidth + 'px'
          }, 16)
        }
      }
      const handleMouseUp = (event) => {
        const targetWidth = targetEl.offsetWidth
        isMouseDown = false
        if (this[MouseMoveFlag] === true) {
          audio[aduioAttr] = targetWidth / totalWidth * maxNum
        }
        this.isMmouseMove = false
        window.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    /** 点击进度条，改变当前进度封装函数
     *  params {event} 事件对象
     *  params {element} 进度条外层包裹HTML元素
     *  params {currentEl} 当前播放进度的HTML元素
     *  params {targetEl} audio元素
     *  params {targetAttr} 修改动态改变audio的属性名
     *  params {totalWidth} 进度条外层包裹HTML元素的长度
     *  params {maxNum} 进度条最大值
     */
    handleSpeed (event, element, currentEl, targetEl, targetAttr, totalWidth, maxNum = 1) {
      // 点击位置的pageX - 外层元素的offsetLeft获得点击的后变化的长度
      const targetWidth = event.pageX - element.offsetLeft
      currentEl.style.width = targetWidth + 'px'
      targetEl[targetAttr] = targetWidth / totalWidth * maxNum
    },
    // 点击进度条，跳转audio播放进度
    speedPlay (e) {
      const element = this.$refs.progressContent
      const currentEl = this.$refs.progressCurrent
      const targetAttr = 'currentTime'
      this.handleSpeed(e, element, currentEl, this.audioEl, targetAttr, this.progressWidth, this.duration)
    },
    // 拖拽进度条，跳转audio播放进度
    skipPlay (e) {
      var isMouseDown = true
      const progressOffsetLeft = this.$refs.progressContent.offsetLeft
      const progressOffsetWidth = this.progressWidth
      const audioAttr = 'currentTime'
      const mouseFlag = 'isMmouseMove'
      this.handleSkip(isMouseDown, mouseFlag, this.dragingWidth, progressOffsetLeft, progressOffsetWidth, this.$refs.progressCurrent, this.audioEl, audioAttr, this.duration)
    },
    speedVolume (e) {
      const element = this.$refs.volumeContent
      const currentEl = this.$refs.volumeCurrent
      const targetAttr = 'volume'
      this.handleSpeed(e, element, currentEl, this.audioEl, targetAttr, this.volumeWidth)
    },
    skipVolume (e) {
      var isMouseDown = true
      const progressOffsetLeft = this.$refs.volumeContent.offsetLeft
      const progressOffsetWidth = this.volumeWidth
      const audioAttr = 'volume'
      const mouseFlag = 'isVolumeMmouseMove'
      this.handleSkip(isMouseDown, mouseFlag, this.volumeDragingWidth, progressOffsetLeft, progressOffsetWidth, this.$refs.volumeCurrent, this.audioEl, audioAttr)
    },
    // 下一首
    nextSong () {
      var { list, index } = this.currentSongList.currentSongList
      let currentIndex = index + 1
      currentIndex = (currentIndex >= list.length) ? 0 : currentIndex
      this.changeSong(currentIndex)
      this.mapAudio(list[currentIndex])
    },
    // 上一首
    prevSong () {
      var { list, index } = this.currentSongList.currentSongList
      let currentIndex = index - 1
      currentIndex = (currentIndex < 0) ? list.length - 1 : currentIndex
      console.log(currentIndex)
      this.changeSong(currentIndex)
      this.mapAudio(list[currentIndex])
    }
  },
  mounted () {
    this.getProgressWidth()
    this.getVolumeWidth()
    this.createAudio()
  }
}
</script>
<style lang="scss" scoped>
 @import '~@/assets/styles/var.scss';
  .controlBarWrap{
    height: 60px;
    width: 100%;
    min-width: 1275px;
    background: #f6f6f8;
    position: absolute;
    bottom: 0;
    display: flex;
    .controlBar-btns {
      width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 35px;
      .btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: $bgColor-red;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }
      .playBtn, .playPause {
        width: 40px;
        height: 40px;
      }
      .playBtn{
        background: $bgColor-red url("http://localhost:8080/img/play.png") no-repeat;
        background-size: 90%;
        background-position: right 3px;
      }
      .playPause {
        background: $bgColor-red url("http://localhost:8080/img/pause.png") no-repeat;
        background-size: 90%;
        background-position: center 3px;
      }
    }
    .controlBar-progress {
      width: 71%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .progress-wrap {
        flex: 1;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        .progress-content {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background-color: #e6e6e8;
          cursor: pointer;
          .progress-current {
            width: 0px;
            height: 6px;
            border-radius: 3px;
            background-color: $bgColor-red;
            position: relative;
          }
          .progress-current::after {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("http://localhost:8080/img/iconall.png") no-repeat;
            background-position:-1px -252px;
            position: absolute;
            top: -6px;
            right: -10px;
          }
        }
      }
    }
    .controlBar-volume {
      width: 165px;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      .volume-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("http://localhost:8080/img/volume-max.png") no-repeat;
        cursor: pointer;
      }
        .volume-wrap {
          padding: 0 10px;
          width: 100%;
          .volume-content {
            flex: 1;
            height: 6px;
            border-radius: 3px;
            background-color:  #e6e6e8;
            .volume-current {
              width: 50px;
              height: 6px;
              border-radius: 3px;
              background-color: $bgColor-red;
              position: relative;
            }
            .volume-current::after {
              content: '';
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("http://localhost:8080/img/iconall.png") no-repeat;
              background-position:-1px -252px;
              position: absolute;
              top: -6px;
              right: -10px;
            }
          }
    }
  }
}
</style>
