<!--分享给好友-->
<template>
  <div class="share-info">
    <div class="share-info-mask" v-if="showshareinfo">
      <img src="@/assets/images/share-bg.png" @click="closeShareInfo" alt="">
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';

export default{
  //import引入的组件需要注入到对象中才能使用
  components:{},
  data(){
    //这里存放数据
    return{};
  },
  props: {
    showshareinfo: Boolean,
  },
  methods: {
    closeShareInfo() {
      // 广播事件 setShareInfoStatus
      this.$emit("setShareInfoStatus", false);
    }
  }
}
</script>

<style lang="less">
  .share-info-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    img {
      width: 100%;
    }
  }
</style>