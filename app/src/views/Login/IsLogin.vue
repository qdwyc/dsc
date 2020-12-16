<template>
  <div class="islogin">
    <div class="islogin-content">
      <div
        class="btn"
        @click="toLogin(0)"
      >短信登录</div>
      <div
        class="btn"
        @click="toLogin(1)"
      >账号登录</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {};
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toLogin (index) {
      console.log(index);
      this.$router.push("/login?id=" + index);
    }
  },
  //生命周期-创建之前
  beforeCreate () { },
  //生命周期-创建完成（可以访问当前this实例）
  created () { },
  //生命周期-挂载之前
  beforeMount () { },
  //生命周期-挂载完成（可以访问DOM元素）
  mounted () { },
  //生命周期-更新之前
  beforeUpdate () { },
  //生命周期-更新之后
  updated () { },
  //生命周期-销毁之前
  beforeDestroy () { },
  //生命周期-销毁完成
  destroyed () { },
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated () { },
}
</script>

<style lang="less">
.islogin {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .islogin-content {
    width: 90%;
    height: 4.4rem;
    background: #fff;
    display: flex;
    .btn {
      font-size: 1.4rem;
      line-height: 4.4rem;
      text-align: center;
      color: #fff;
      flex: 1;
      &:first-child {
        background: chocolate;
      }
      &:last-child {
        background: pink;
      }
    }
  }
}
</style>