<template>
  <div class="loading">
    <img src="@/assets/images/loading.gif" alt />
    <div style="color: #fff">玩命加载中...</div>
  </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style lang="less">
  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 3rem;
      height: 3rem;
    }
  }
</style>