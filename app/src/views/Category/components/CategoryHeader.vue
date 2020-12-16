<!-- 分类头部 -->
<template>
  <div class="category-header">
    <header>
      <a
        href="JavaScript:;"
        class="iconfont icon-jiantou3"
        onclick="window.history.back()"
      ></a>
      <form action>
        <input
          type="text"
          placeholder="请输入关键字"
          v-model="keywords"
          @click="gotoSearch"
        />
        <i class="iconfont icon-sousuo2"></i>
      </form>
      <a
        href="JavaScript:;"
        :class="togglestyle ? 'iconfont icon-leimupinleifenleileibie' : 'iconfont icon-leimupinleifenleileibie2'"
        v-if="showhide"
        @click="toggle"
      >
      </a>
    </header>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["showhide", "keywords"],
  data () {
    //这里存放数据
    return {};
  },
  computed: {
    togglestyle () {
      return this.$store.state.toggleStyle;
    }
  },
  methods: {
    gotoSearch () {
      this.$router.push("/search");
    },
    toggle () {
      this.$store.commit("changeToggleStyle", !this.$store.state.toggleStyle)
    }
  },
};
</script>
<style lang="less">
.category-header {
  width: 100%;
  height: 4.4rem;
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 99;
  border-bottom: 1px solid #efefef;
  header {
    display: flex;
    a {
      width: 10%;
      height: 4.4rem;
      display: block;
      line-height: 4.4rem;
      text-align: center;
    }
    form {
      width: 85%;
      position: relative;
      input {
        height: 3rem;
        margin-top: 0.7rem;
        border: 1px solid #efefef;
        width: 100%;
        border-radius: 1.5rem;
        text-indent: 1rem;
      }
      i {
        position: absolute;
        height: 4.4rem;
        line-height: 4.4rem;
        color: #ccc;
        right: 1rem;
        top: 0;
      }
    }
  }
}
</style>