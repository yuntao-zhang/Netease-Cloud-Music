<template>
  <div class="rightWrap">
    <!-- 增加一个命名视图 -->
   <router-view name="right"></router-view>
  </div>
</template>
<script>
export default {
  name: 'HomeRight'
}
</script>
<style lang="scss" scoped>
  .rightWrap {
    width: 100%;
    box-sizing: border-box;
    min-width: 645px;
  }
</style>
