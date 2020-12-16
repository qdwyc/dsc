<template>
  <div class="category-list">
    <CatetoryHeader :showhide="showhide" />
    <div :style="{height:oH}" v-infinite-scroll="loadMore">
      <div class="tabs-wrap">
        <div :class="activeTab0?'tabs-item':'tabs-item active'" @click="sortZonghe">
          <span>综合</span>
          <i :class="!activeTab00?'iconfont icon-iconfontjiantou':'iconfont icon-jiantou'"></i>
        </div>
        <div :class="activeTab1?'tabs-item':'tabs-item active'" @click="sortNew">
          <span>新品</span>
          <i></i>
        </div>
        <div :class="activeTab2?'tabs-item':'tabs-item active'" @click="sortSale">
          <span>销量</span>
          <i></i>
        </div>
        <div :class="activeTab3?'tabs-item':'tabs-item active'" @click="sortPrice">
          <span>价格</span>
          <i :class="activeTab11?'iconfont icon-iconfontjiantou':'iconfont icon-jiantou'"></i>
        </div>
        <div class="tabs-item" @click="showMask=!showMask">
          <span>筛选</span>
          <i></i>
        </div>
      </div>
      <div :class="this.$store.state.toggleStyle?'list-wrap':'list-wrap2'">
        <ul ref="listwrap">
          <li v-for="categoryListData in categoryListDatas" :key="categoryListData.goods_id">
            <router-link :to="'/goodsdetail/'+categoryListData.goods_id">
              <img :src="categoryListData.goods_thumb" alt />
              <div>
                <h4>{{categoryListData.goods_name}}</h4>
                <h5>{{categoryListData.shop_price}}</h5>
                <div class="info">
                  <span class="shop">进店</span>
                  <span>已经有10人购买</span>
                  <i class="iconfont icon-gouwuche"></i>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-if="nomore" class="nodata">我也是有底线的</div>
      </div>
    </div>
    <transition name="hg">
      <div class="mask" v-if="showMask">
        <div class="mask-title">
          <h2>自营产品</h2>
        </div>
        <div class="attr">
          <div>仅看有货</div>
          <div>促销</div>
        </div>
        <div class="price-wrap">
          <h2>价格区间</h2>
          <div>
            <input type="text" v-model="min" placeholder="最低价" />
            —
            <input type="text" v-model="max" placeholder="最高价" />
          </div>
        </div>
        <div class="mask-footer">
          <div class="close" @click="showMask=!showMask">关闭</div>
          <div class="ok" @click="okFn">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CatetoryHeader from "./CategoryHeader";
// import { getCategoryList } from "@/api/api.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CatetoryHeader,
  },
  data() {
    //这里存放数据
    return {
      showhide: true,
      cid: 1131,
      size: 10,
      page: 1,
      sort: "goods_id",
      order: "desc",
      min: "",
      max: "",
      activeTab0: false,
      activeTab1: true,
      activeTab2: true,
      activeTab3: true,
      activeTab00: false,
      activeTab11: true,
      showMask: false,
      oH: 0,
    };
  },
  watch: {
    //cid监视data中cid的变化
    cid: function () {
      this.$store.state.categoryListDatas = [];
      this.$store.state.nomore = false;
    },
  },
  methods: {
    sortZonghe() {
      this.activeTab0 = false;
      this.activeTab1 = true;
      this.activeTab2 = true;
      this.activeTab3 = true;
      this.activeTab00 = !this.activeTab00;
      this.sort = "goods_id";
      if (this.activeTab00) {
        this.order = "asc";
        this.reqDatas();
      } else {
        this.order = "desc";
        this.reqDatas();
      }
    },
    sortNew() {
      this.activeTab0 = true;
      this.activeTab1 = false;
      this.activeTab2 = true;
      this.activeTab3 = true;
      this.activeTab00 = false;
      this.sort = "last_update";
      this.reqDatas();
    },
    sortSale() {
      this.activeTab0 = true;
      this.activeTab1 = true;
      this.activeTab2 = false;
      this.activeTab3 = true;
      this.sort = "sales_volume";
      this.reqDatas();
    },
    sortPrice() {
      this.activeTab0 = true;
      this.activeTab1 = true;
      this.activeTab2 = true;
      this.activeTab3 = false;
      this.activeTab11 = !this.activeTab11;
      this.sort = "shop_price";
      if (this.activeTab11) {
        this.order = "asc";
        this.reqDatas();
      } else {
        this.order = "desc";
        this.reqDatas();
      }
    },
    okFn() {
      this.reqDatas();
      this.min = "";
      this.max = "";
      this.showMask = false;
    },
    loadMore() {
      this.reqDatas();
      this.page++;
    },
    reqDatas() {
      let params = {
        url: "/catalog/goodslist",
        params: {
          cat_id: this.cid,
          size: this.size,
          page: this.page,
          sort: this.sort,
          order: this.order,
          min: this.min,
          max: this.max,
        },
        type: "post",
      };
      this.$store.dispatch("actChangeCategoryList", params);
    },
  },

  computed: {
    categoryListDatas() {
      return this.$store.state.categoryListDatas;
    },
    nomore() {
      return this.$store.state.nomore;
    },
  },
  mounted() {
    let cid = this.$route.params.cid;
    this.cid = cid;
  },

  updated() {
    this.oH = this.$refs.listwrap.offsetHeight + "px";
  },
};
</script>
<style lang="less">
.hg-enter-active,
.hg-leave-active {
  transition: all 0.5s linear;
}
.hg-enter,
.hg-leave-to {
  transform: translateX(100%);
}
.nodata {
  height: 4.4rem;
  text-align: center;
  line-height: 4.4rem;
  margin: 0 auto;
}
.category-list {
  background: #efefef;
  height: 100%;
}
.mask {
  position: fixed;
  z-index: 9999;
  background: #efefef;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .mask-title {
    height: 4.4rem;
    background: #fff;
    line-height: 4.4rem;

    h2 {
      font-weight: normal;
      text-indent: 1rem;
    }
  }
  .attr {
    display: flex;
    div {
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      border: 1px solid #ccc;
      background: #fff;
      margin: 1rem;
    }
  }
  .price-wrap {
    h2 {
      height: 4.4rem;
      background: #fff;
      line-height: 4.4rem;
      font-weight: normal;
      text-indent: 1rem;
    }
    input {
      width: 15rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      border: 1px solid #ccc;
      background: #fff;
      margin: 1rem;
    }
  }
  .mask-footer {
    height: 5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    div {
      flex: 1;
      text-align: center;
      line-height: 5rem;
      font-size: 1.4rem;
    }
    .ok {
      background: #e93b3d;
      color: #fff;
    }
  }
}
.tabs-wrap {
  margin-top: 5rem;
  height: 4.4rem;
  display: flex;
  background: #fff;
  .tabs-item {
    flex: 1;
    text-align: center;
    line-height: 4.4rem;
    font-size: 1.4rem;
  }
  .active {
    color: red;
  }
}
.list-wrap {
  width: 100%;

  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      margin: 0.5rem;
      width: calc(50% - 1rem);
      text-align: center;
      background: #fff;
      img {
        width: 17.8rem;
        height: 17.8rem;
      }
      h4 {
        height: 4rem;
        line-height: 2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 1.4rem;
        font-weight: normal;
        color: #333;
        width: 90%;
        margin-left: 5%;
      }
      h5 {
        font-size: 1.8rem;
        color: #f00;
        &::before {
          content: "￥";
        }
        margin: 0.5rem 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin-left: 5%;
        height: 4.4rem;
        line-height: 4.4rem;
        .shop {
          background: #fef0f0;
          height: 2rem;
          margin-top: 1.2rem;
          line-height: 2rem;
          color: #f00;
          padding: 0 0.5rem;
        }
        i {
          color: red;
        }
      }
    }
  }
}
.list-wrap2 {
  width: 100%;
  ul {
    width: 100%;
    margin: 0 1rem;
    width: calc(100% - 2rem);
    a {
      display: flex;
      width: 100%;
      text-align: center;
      background: #fff;
      img {
        width: 9rem;
        height: 9rem;
      }
      h4 {
        height: 4rem;
        line-height: 2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 1.4rem;
        font-weight: normal;
        color: #333;
        width: 90%;
        margin-left: 5%;
      }
      h5 {
        font-size: 1.8rem;
        text-align: left;
        padding-left: 1rem;
        color: #f00;
        &::before {
          content: "￥";
        }
        margin: 0.5rem 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin-left: 5%;
        height: 4.4rem;
        line-height: 4.4rem;
        .shop {
          background: #fef0f0;
          height: 2rem;
          margin-top: 1.2rem;
          line-height: 2rem;
          color: #f00;
          padding: 0 0.5rem;
        }
        i {
          color: red;
        }
      }
    }
  }
}
</style>