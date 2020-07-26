<template>
  <div :class="{active:isActive, navitem:true}" @click="handleActiveItem">
    <slot name="navIcon"></slot>
    <slot name="navTitle"></slot>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SideNav',
  props: ['index'],
  computed: {
    isActive () {
      return this.$store.state.navList[this.index]
    }
  },
  methods: {
    ...mapActions(['activeNav']),
    handleActiveItem () {
      this.activeItem(this.index)
    },
    activeItem (index) {
      // 点击导航栏跳转相应的页面，并且修改增加acitve样式
      this.activeNav(index)
      this.$router.push(`/${this.index}`)
    }
  }
}

</script>
<style lang="scss" scoped>
  .navitem {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left:15px ;
    box-sizing: border-box;
    border-left: 3px solid transparent ;
    cursor: pointer;
    .navIcon {
      width: 20px;
      margin-right: 10px;
    }
  }
  .navitem:hover {
    color: #000;
  }
  .active{
    border-left: 3px solid red;
    background: #e6e7ea;
  }
</style>
