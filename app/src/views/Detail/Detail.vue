<template>
  <div class="detail-page">
    <!-- 详情页头部 -->
    <div
      class="detail-header"
      ref="header"
      :style="'background:rgba(255,255,255,' + bgOpacity + ')'"
    >
      <i
        class="iconfont icon-jiantou3"
        onclick="window.history.back()"
      ></i>
      <div
        class="detail-tabs"
        :style="'opacity:' + bgOpacity"
      >
        <ul>
          <li
            :class="navActive==index?'active':''"
            v-for="(item, index) in navList"
            :key="index"
            @click="changeNavTabs(index)"
          >{{item}}</li>
        </ul>
      </div>
      <i
        class="iconfont icon-fenxiang_2"
        @click="showShare"
      ></i>
    </div>
    <!-- 详情页轮播图 -->
    <div
      class="detail-swiper"
      id="title0"
    >
      <mt-swipe
        :auto="2000"
        :show-indicators="true"
      >
        <mt-swipe-item
          v-for="(detailData,index) in detailDatas.gallery_list"
          :key="index"
        >
          <img
            :src="detailData.img_url"
            alt
          />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 详情价格 -->
    <div class="w detail-price">
      <div class="price">{{detailDatas.shop_price}}</div>
      <div class="dprice">{{detailDatas.market_price}}</div>
    </div>
    <div class="w detail-title">{{detailDatas.goods_name}}</div>
    <div class="w detail-sale-info">
      <span>累计销量{{detailDatas.sales_volume}}</span>
      <span>库存{{detailDatas.goods_number}}</span>
      <span>{{detailDatasInfo.province_name}}{{detailDatasInfo.city_name}}</span>
    </div>

    <!-- 赠送积分及服务部分 -->
    <div class="detail_zaf">
      <div class="detail_zfone">
        <span>赠送积分:</span>
        <span>{{detailDatas.give_integral}} 积分</span>
      </div>
      <div class="detail_zftwo">
        <span>服务:</span>
        <span>正品保证 七天无理由退换 闪速配送</span>
      </div>
    </div>

    <!-- 点击分享按钮显示蒙版 -->
    <div
      class="share-mask"
      v-show="shareMask"
      @click="closeShare"
    ></div>
    <div
      class="share-content"
      v-show="shareMask"
    >
      <div
        class="share-item"
        v-if="!weixinshowHide"
        @click="showShareInfoFn"
      >
        <div class="iconfont icon-weixin"></div>
        <div class="text">发送给好友</div>
      </div>
      <div
        class="share-item"
        @click="showSharePosterFn"
      >
        <div class="iconfont icon-haibaofenxiang"></div>
        <div class="text">生成海报</div>
      </div>
    </div>

    <!-- 发送给好友 -->
    <ShareInfo
      v-on:setShareInfoStatus="setShareInfoStatus"
      :showshareinfo="showShareInfo"
    />

    <!-- 海报组件 -->
    <SharePoster
      @closeSharePoster="closeSharePoster"
      :showshareposter="showshareposter"
      :posterDatas="posterDatas"
    />

    <!-- 选择地址弹窗 -->
    <!-- 送至部分 -->
    <div class="detail_sy">
      <div
        class="songzhi"
        @click="showPopUp"
      >
        <span>送至:<span class="songzhi-data">{{province}}-{{city}}-{{country}}</span></span>
        <span class="iconfont icon-jiantou1"></span>
      </div>
      <!-- 运费部分 -->
      <div class="yunfei">
        <span>运费:</span>
        <span>{{detailDatas.formated_goods_rate}}</span>
      </div>
    </div>
    <!-- 弹窗部分 -->
    <div class="address-mask">
      <mt-popup
        v-model="popupVisible"
        position="bottom"
      >
        <div class="popBox">
          <div class="header">
            <i>确定</i>
          </div>
          <mt-picker
            :slots="slots"
            :visibleItemCount="visibleItemCount"
            @change="onValuesChange"
          ></mt-picker>
        </div>
      </mt-popup>
    </div>

    <!-- 已选部分 -->
    <div
      class="yixuan"
      @click="showMaskFn"
    >
      <span>已选：{{buyNum}}个</span>
      <span class="iconfont icon-jiantou1"></span>
    </div>

    <!-- tab切换 -->
    <div
      class="detail-tabs"
      id="title1"
    >
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab1">商品详情</mt-tab-item>
        <mt-tab-item id="tab2">规格参数</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="tab1">
          <div
            class="detail-content"
            v-html="detailDatas.desc_mobile"
          ></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="attr-params">
            <table>
              <tr
                v-for="(attr, index) in detailDatas.attr_parameter"
                :key="index"
              >
                <td>{{attr.attr_name}}</td>
                <td>{{attr.attr_value}}</td>
              </tr>
            </table>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <div
      style="height: 1000px; background: pink"
      id="title2"
    >
      <h2>商品评价</h2>
    </div>

    <!-- 购买数量弹窗 -->
    <div
      class="detail-mask2"
      :class="showMask?'showhide':''"
      @click="hideMask"
    ></div>
    <div class="detail-mask">
      <div
        class="detail-goods-info"
        :class="!showMask?'trams':''"
      >
        <div class="detail-goods-wrap">
          <div class="img">
            <img
              :src="detailDatas.goods_thumb"
              alt
            />
          </div>
          <div class="wrap">
            <div class="title">{{detailDatas.goods_name}}</div>
            <div class="price">{{detailDatas.shop_price}}</div>
            <div class="goods_number">库存：{{detailDatas.goods_number}}</div>
          </div>
          <div
            class="close"
            @click="hideMask"
          >
            <i class="iconfont icon-round_delete"></i>
          </div>
        </div>
        <div class="num-wrap">
          <div>数量</div>
          <div class="num">
            <a
              href="javascript:;"
              @click="minusNum"
            >-</a>
            <input
              type="text"
              v-model.number="buyNum"
            />
            <a
              href="javascript:;"
              @click="addNum"
            >+</a>
          </div>
        </div>
        <div class="mask-footer">
          <div class="buy">立即购买</div>
          <div
            class="cart"
            @click="addCart"
          >加入购物车</div>
        </div>
      </div>
    </div>

    <!-- 详情页底部 -->
    <div class="detail-page-footer">
      <div>
        <i class="iconfont icon-dkw_xiaoxi"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="iconfont icon-shoucang1"></i>
        <span>收藏</span>
      </div>
      <div @click="tocart">
        <i class="iconfont icon-gouwuche"></i>
        <em>{{countCart}}</em>
        <div
          :class="{'add-num':flag}"
          v-if="flag"
        >+{{buyNum}}</div>
        <span>购物车</span>
      </div>
      <div
        class="toCart"
        @click="addCart"
      >加入购物车</div>
      <div class="toBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import cityDatas from "@/assets/json/city.json";
import debounce from "lodash.debounce"; //防抖
// console.log(debounce);
import { isWeixin } from "@/utils/index";
console.log(isWeixin());
import ShareInfo from "./components/ShareInfo"
import SharePoster from "./components/SharePoster"

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    ShareInfo,
    SharePoster
  },
  data () {
    //这里存放数据
    return {
      goods_id: 1153,
      buyNum: 1,
      showMask: false,
      selected: "tab1",
      popupVisible: false,
      visibleItemCount: 5,
      province: "选择省",
      city: "选择市",
      country: "市/区",
      navList: ["商品", "详情", "评论"],
      navActive: 0,
      bgOpacity: 0,
      shareMask: false,
      weixinshowHide: false,
      showShareInfo: false,
      showshareposter: false,
      flag: false,
      flagTimer: null,
      slots: [
        {
          flex: 1,
          values: Object.keys(cityDatas),
          className: "slot1",
          defaultIndex: 0,
        },
        {
          divider: true,
          content: "-",
          className: "slot2",
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
        },
        {
          divider: true,
          content: "-",
          className: "slot4",
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
        },
      ]
    };
  },
  computed: {
    detailDatas () {
      return this.$store.state.detailDatas;
    },
    detailDatasInfo () {
      return this.$store.state.detailDatasInfo;
    },
    posterDatas () {
      return this.$store.state.posterDatas;
    },
    countCart () {
      let count = 0;
      this.$store.state.cartDatas.map((item) => {
        count += Number(item.value);
      })
      return count;
    }
  },
  methods: {
    // 商品数量--
    minusNum () {
      if (this.buyNum > 1) {
        this.buyNum--
      } else {
        this.buyNum = 1
      }
    },
    // 商品数量++
    addNum () {
      this.buyNum += 1
    },
    setShareInfoStatus (data) {
      this.showShareInfo = data;
    },
    // 显示发送给好友的蒙版
    showShareInfoFn () {
      this.showShareInfo = true;
      this.shareMask = false;
    },
    // 显示生成海报的蒙版
    showSharePosterFn () {
      this.showshareposter = true;
      this.shareMask = false;
    },
    closeSharePoster () {
      this.showshareposter = false;
    },
    showShare () {
      this.shareMask = true;
      if (isWeixin()) {
        this.weixinshowHide = true;
      }
    },
    closeShare () {
      this.shareMask = false;
    },
    showPopUp () {
      this.popupVisible = true;
    },
    onValuesChange (picker, values) {
      // console.log(picker);
      picker.setSlotValues(1, Object.keys(cityDatas[values[0]]));
      picker.setSlotValues(2, cityDatas[values[0]][values[1]]);
      // console.log(values);
      this.province = values[0];
      this.city = values[1];
      this.country = values[2];
    },
    reqDetail () {
      let params = {
        url: "/goods/show",
        params: {
          goods_id: this.goods_id,
        },
        type: "post",
      };
      this.$store.dispatch("actChangeDetail", params);
    },
    showMaskFn () {
      // console.log(123456);
      this.showMask = true;
    },
    hideMask () {
      this.showMask = false;
    },
    //加入购物车
    addCart () {
      this.showMask = false;
      this.flag = true;
      this.flagTimer = setTimeout(() => {
        this.flag = false;
      }, 1000);
      //添加购物车
      // console.log(this.$store.state.detailDatas);
      let detailDatas = this.$store.state.detailDatas;
      //判断购物车中是否存在当前数据
      // console.log(this.$store.state.cartDatas);
      var isCart = this.$store.state.cartDatas.find((item) => {
        if (item.goods_id == detailDatas.goods_id) {
          // console.log(11111111);
          item.value = item.value + this.buyNum;
        }
        return item.goods_id == detailDatas.goods_id;
      });
      // console.log(isCart);
      //!isCart如果条件成立，说明购物车中不存在当前数据
      if (!isCart) {
        var addCartDatas = {
          goods_id: detailDatas.goods_id,
          goods_name: detailDatas.goods_name,
          shop_price: detailDatas.shop_price,
          market_price: detailDatas.market_price,
          goods_thumb: detailDatas.goods_thumb,
          value: 1,
          isSelect: true,
        };
      }
      this.$store.commit("setCartDatas", addCartDatas);
      // let arr = [];
      // arr.push(detailDatas);
      // localStorage.setItem("carts", JSON.stringify(arr));
      // console.log(this.$store.state.cartDatas);
    },
    tocart () {
      this.$router.push("/cart");
    },
    changeNavTabs (index) {
      // console.log(index);
      this.$nextTick(() => {
        this.navActive = index;
        let element = document.querySelector("#title" + index);
        // console.log(element.offsetTop);
        let top = element.offsetTop - window.scrollY - this.$refs.header.offsetHeight;
        // console.log(window.scrollY);
        window.scrollBy({ top: top, left: 0, behavior: "smooth" });
        // behavior: "smooth"添加一个滚动条效果，滑动效果
        // console.dir(window.scrollBy);
      })
    },
    scrollChangeOpacity () {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      var opacity = top / 200;
      opacity = opacity > 1 ? 1 : opacity;
      this.bgOpacity = opacity;
    },
    scrollPage: debounce(function () {
      //使用防抖模块
      const headerHeight = this.$refs.header.offsetHeight;
      const titles = [];
      titles.push(document.querySelector("#title0"));
      titles.push(document.querySelector("#title1"));
      titles.push(document.querySelector("#title2"));
      const { scrollY } = window; //解构赋值--对象解构

      titles.reduce((total, title, index) => {
        if (
          !document.querySelector("#title0") &&
          !document.querySelector("#title1") &&
          !document.querySelector("#title2")
        ) {
          return;
        }
        if (total) return total;
        if (scrollY + headerHeight < title.offsetTop + title.offsetHeight) {
          this.navActive = index;
          total = true;
        }
        return total;
      }, false);
    }, 500)
  },
  mounted () {
    // console.log(this.$route.params);
    let oTop = document.documentElement || document.body;
    oTop.scrollTop = 0;
    let gid = this.$route.params.gid;
    this.goods_id = gid;
    this.reqDetail();
    this.$nextTick(() => {
      this.slots[0].defaultIndex = 15;
    });
    document.addEventListener("scroll", this.scrollPage, false);
    window.addEventListener("scroll", this.scrollChangeOpacity, false);
  },
  beforeDestroy () {
    document.removeEventListener("scroll", this.scrollPage, false);
    window.removeEventListener("scroll", this.scrollChangeOpacity, false);
  }
};
</script>
<style lang="less">
.detail-page {
  //分享样式
  .share-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .share-content {
    width: 100%;
    height: 8rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .share-item {
      flex: 1;
      .iconfont {
        font-size: 3rem;
        color: #80d640;
      }
      .text {
        font-size: 1.4rem;
      }
    }
  }
  .address-mask {
    .mint-popup {
      width: 100%;
    }
    .popBox {
      .header {
        text-align: right;
        height: 4.4rem;
        line-height: 4.4rem;
        i {
          width: 6rem;
          height: 4.4rem;
          display: block;
          float: right;
          font-style: normal;
          font-size: 1.4rem;
          background-color: #efefef;
          line-height: 4.4rem;
          text-align: center;
        }
      }
    }
  }
  .detail-tabs {
    .mint-tab-container-item {
      .attr-params {
        table {
          width: 96%;
          margin-left: 2%;
          border-collapse: collapse;
          td {
            border: 1px solid #efefef;
            height: 3rem;
            line-height: 3rem;
            padding-left: 1rem;
            &:first-child {
              width: 20%;
            }
          }
        }
      }
      .detail-content {
        .move-remove {
          display: none;
        }
        img {
          width: 96%;
          margin-left: 2%;
        }
      }
    }
    .mint-navbar {
      .mint-tab-item {
        .mint-tab-item-label {
          font-size: 1.4rem;
        }
      }
      .is-selected {
        color: #f44;
        border-bottom: 0 solid #f44;
        &::after {
          content: "";
          width: 6rem;
          height: 0.2rem;
          display: block;
          background: #f44;
          margin: 1.5rem auto 0;
        }
      }
    }
  }
  .detail-page-footer {
    z-index: 99;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    border-top: 1px solid #efefef;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      i {
        font-size: 2.2rem;
      }
      .add-num {
        color: #f44;
        font-size: 2rem;
        width: 100%;
        position: absolute;
        z-index: 99;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        opacity: 0;
        top: 0rem;
        animation: moveNum 1s linear;
      }
      @keyframes moveNum {
        0% {
          top: 1;
          opacity: 0;
        }
        50% {
          top: -3rem;
          opacity: 1;
        }
        100% {
          top: -3rem;
          opacity: 0;
        }
      }
      em {
        position: absolute;
        min-width: 2rem;
        height: 2rem;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 2rem;
        border-radius: 2rem;
        right: 0.5rem;
        top: -0.5rem;
        font-style: normal;
      }
    }
    .toCart {
      flex: 2;
      background: #f44;
      line-height: 5rem;
      color: #fff;
    }
    .toBuy {
      flex: 2;
      background: #ff976a;
      line-height: 5rem;
      color: #fff;
    }
  }
  .yixuan {
    height: 4.4rem;
    border-top: 1rem solid #efefef;
    border-bottom: 1rem solid #efefef;
    line-height: 4.4rem;
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 1rem;
      font-size: 1.4rem;
    }
  }
  .showhide {
    display: block !important;
  }
  .detail-mask2 {
    display: none;
    position: fixed;
    top: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
  }
  .detail-mask {
    position: fixed;
    bottom: 0;
    z-index: 999;
    background: transparent;
    width: 100%;
    // vh 视图高度
    .mask-footer {
      height: 5rem;
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      margin-left: -1rem;
      div {
        flex: 1;
        line-height: 5rem;
        text-align: center;
        font-size: 1.4rem;
        color: #fff;
      }
      .buy {
        background: #fba534;
      }
      .cart {
        background: #f92028;
      }
    }
    .trams {
      transform: translateY(40vh);
    }
    .detail-goods-info {
      transition: all 0.5s;
      height: 30vh;
      background: #fff;
      position: absolute;
      bottom: 0;
      padding: 1rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      width: calc(100% - 2rem);

      .num-wrap {
        width: 100%;
        height: 4.4rem;
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.4rem;
        .num {
          display: flex;
          a {
            display: block;
            width: 3rem;
            height: 3rem;
            background: #efefef;
            text-align: center;
            line-height: 3rem;
            font-size: 1.4rem;
          }
          input {
            height: 3rem;
            border: 1px solid #efefef;
            box-sizing: border-box;
            width: 6rem;
            text-align: center;
          }
        }
      }
      .detail-goods-wrap {
        width: 100%;
        display: flex;
        .img {
          width: 30%;
          position: relative;
          img {
            width: 9rem;
            height: 9rem;
            position: absolute;
            top: -3rem;
            border-radius: 1rem;
          }
        }
        .wrap {
          width: 60%;
          .title {
            height: 4rem;
            line-height: 2rem;
            overflow: hidden;
            font-size: 1.4rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .price {
            font-size: 1.8rem;
            line-height: 3rem;
            color: red;
          }
          .goods_number {
            font-size: 1.2rem;
            color: #666;
          }
        }
        .close {
          width: 10%;
          text-align: right;
        }
      }
    }
  }
  .detail-sale-info {
    justify-content: space-between;
    font-size: 1.2rem;
  }
  .detail-title {
    font-size: 1.4rem;
    line-height: 2.4rem;
  }
  .w {
    width: 100%;
    margin: 1rem;
    width: calc(100% - 2rem);
    display: flex;
  }
  .detail-price {
    height: 4.4rem;
    line-height: 4.4rem;
    div {
      font-weight: bold;
      &::before {
        content: "￥";
      }
    }
    .price {
      font-size: 1.8rem;
      color: red;
    }
    .dprice {
      text-decoration: line-through;
      color: #666;
      font-size: 1.2rem;
      margin-left: 2rem;
    }
  }
  // 赠送积分、服务部分
  .detail_zaf {
    height: 8.9rem;
    border-top: 1rem solid #efefef;
    border-bottom: 1rem solid #efefef;
    position: relative;
    .detail_zfone {
      width: 100%;
      height: 4.4rem;
      border-bottom: 0.1rem solid #efefef;
      line-height: 4.4rem;
      position: absolute;
      span {
        padding: 0 1rem;
        font-size: 1.4rem;
      }
    }
    .detail_zftwo {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      position: absolute;
      margin-top: 4.5rem;
      span {
        padding: 0 1rem;
        font-size: 1.4rem;
      }
    }
  }
  // 送至、运费部分
  .detail_sy {
    height: 8.9rem;
    border-bottom: 1rem solid #efefef;
    position: relative;
    .songzhi {
      width: 100%;
      height: 4.4rem;
      border-bottom: 0.1rem solid #efefef;
      line-height: 4.4rem;
      position: absolute;
      display: flex;
      justify-content: space-between;
      span {
        padding: 0 1rem;
        font-size: 1.4rem;
      }
      .songzhi-data {
        display: inline-block;
        position: absolute;
        margin-left: 1rem;
      }
    }
    .yunfei {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      position: absolute;
      margin-top: 4.5rem;
      span {
        padding: 0 1rem;
        font-size: 1.4rem;
      }
    }
  }

  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 4.4rem;
    width: 100%;
    line-height: 4.4rem;
    justify-content: space-between;
    font-size: 1.4rem;
    z-index: 99;
    i {
      width: 15%;
      display: block;
      text-align: center;
    }
    .detail-tabs {
      width: 70%;
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
        }
        .active {
          color: red;
          border-bottom: 0.2rem solid red;
          height: 4.2rem;
        }
      }
    }
  }

  .detail-swiper {
    width: 100%;
    height: 37.5rem;
    img {
      width: 100%;
      height: 37.5rem;
    }
  }
}
</style>