<!--  -->
<template>
  <div class="footer-wrap">
    <ul>
      <router-link to="/home" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-1" v-if="!active.includes('/home')"></i>
          <i class="iconfont icon-shouye2" v-else></i>
        </div>
        <span>首页</span>
      </router-link>

      <router-link to="/category" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-leimupinleifenleileibie" v-if="active!='/category'"></i>
          <i class="iconfont icon-leimupinleifenleileibie2" v-else></i>
        </div>
        <span>分类</span>
      </router-link>
      <router-link to="/find" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-dongtaiweixuanzhong" v-if="active!='/find'"></i>
          <i class="iconfont icon-dongtaixuanzhong" v-else></i>
        </div>
        <span>发现</span>
      </router-link>
      <router-link to="/cart" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-gouwuche" v-if="active!='/cart'"></i>
          <i class="iconfont icon-gouwucheman" v-else></i>
        </div>
        <span>购物车</span>
      </router-link>
      <router-link to="/mine" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-profile" v-if="active!='/mine'"></i>
          <i class="iconfont icon-wodedangxuan" v-else></i>
        </div>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: "/home",
    };
  },
  mounted() {
    console.log(this.$route.path);
    this.active = this.$route.path;
  },
};
</script>


<style lang="less">
//lang="less"  指明css规则
.footer-wrap {
  height: 4.9rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #efefef;
  ul {
    display: flex;
    height: 4.9rem;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    li {
      width: 20%;
      text-align: center;
      i {
        font-size: 2.2rem;
      }
    }
  }
}
.router-link-active {
  color: red;
}
</style>