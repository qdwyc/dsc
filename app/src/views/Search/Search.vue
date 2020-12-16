<!--分类搜索页面-->
<template>
  <div class="category-header">
    <!-- 头部 -->
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
        />
        <i
          class="iconfont icon-sousuo2"
          @click="searchKeywords"
        ></i>
      </form>
    </header>

    <!-- 搜索部分 -->
    <div class="search-content">
      <!-- 最近搜索 -->
      <div class="search-wrap">
        <div class="search-wrap-title">
          <div class="title">最近搜索</div>
          <div
            class="iconfont icon-shanchu1"
            @click="deleKeywords"
          ></div>
        </div>
        <ul class="search-list">
          <li v-if="keywordsDatas.length==0">暂无</li>
          <li
            v-for="(keywordsData, index) in keywordsDatas"
            :key="index"
          >
            <router-link :to="'/searchlist?keywords='+keywordsData">{{keywordsData}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 热门搜索 -->
      <div class="search-wrap">
        <div class="search-wrap-title">
          <div class="title">热门搜索</div>
        </div>
        <ul class="search-list">
          <li>手机</li>
          <li>手机</li>
          <li>手机</li>
          <li>手机</li>
          <li>手机</li>
        </ul>
      </div>
    </div>

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';
import Footer from "@/components/Footer";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data () {
    //这里存放数据
    return {
      keywords: "",
    };
  },
  //监听属性类似于data概念
  computed: {
    keywordsDatas () {
      return this.$store.state.searchKeywords;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    searchKeywords () {
      if (this.keywords) {
        this.$store.commit("searchKeywords", this.keywords);
        this.$router.push("/searchlist?keywords=" + this.keywords);
      }
    },
    deleKeywords () {
      this.$store.commit("deleKeywords");
    }
  }
}
</script>

<style lang="less">
.search-content {
  margin: 0 0 5rem 0;
  .search-wrap {
    width: 100%;
    margin: 0 1rem;
    width: calc(100% - 2rem);
    .search-wrap-title {
      height: 4.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.4rem;
    }
    .search-list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 20%;
        border: 1px solid #efefef;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        margin: 1% 2.5%;
        box-sizing: border-box;
      }
    }
  }
}
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