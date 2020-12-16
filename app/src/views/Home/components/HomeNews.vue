<template>
  <div>
    <div class="home-news">
      <div class="title-img">
        <img
          :src="titleimg"
          alt=""
        />
      </div>
      <ul
        ref="news"
        :class="{trans:flag}"
      >
        <li
          v-for="(news,index) in newsData"
          :key="index"
        >
          <h4>{{news.title}}</h4>
        </li>
      </ul>
      <div class="arr">
        <b class="iconfont icon-jiantou2"></b>
      </div>
    </div>
    <div class="center-img">
      <img
        :src="centerImg"
        alt=""
      />
    </div>
    <div class="miaosha-box">
      <!-- 秒杀上面部分 -->
      <div class="mb-up">
        <div class="miaosha-img">
          <img
            :src="miaoshaImg"
            alt=""
          >
        </div>
        <div class="miaosha-time">
          距结束还剩:<span>{{hours}}</span>:<span>{{mins}}</span>:<span>{{sec}}</span>
        </div>
      </div>
      <!-- 秒杀中间部分 -->
      <div class="mb-mid">
        <ul>
          <li>
            <div>16:00</div>
            <div>立即开始</div>
          </li>
          <li>
            <div>24:00</div>
            <div>立即开始</div>
          </li>
          <li>
            <div>8:00</div>
            <div>立即开始</div>
          </li>
          <li>
            <div>10:00</div>
            <div>立即开始</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeNews",
  components: {},
  data () {
    // 这里存放数据
    return {
      titleimg: require("@/assets/images/title.png"),
      centerImg: require("@/assets/images/center_ad.png"),
      miaoshaImg: require("@/assets/images/miaosha.png"),
      newsData: [
        {
          id: 1,
          title: "服务店突破2000多家",
        },
        {
          id: 2,
          title: "我们成为中国最大家电零售B2B2C系统",
        },
        {
          id: 3,
          title: "三大国际腕表品牌签约",
        }
      ],
      timer: null,
      flag: false,
      hours: 0,
      mins: 0,
      sec: 0,
      timer2: null,
      msDataIndex: 0
    }
  },
  methods: {
    scrollNewsFn () {
      let oUl = this.$refs.news;
      oUl.style.top = "-5rem";
      this.flag = !this.flag;
      setTimeout(() => {
        this.newsData.push(this.newsData[0]);
        this.newsData.shift();
        oUl.style.top = "0rem";
        this.flag = !this.flag;
      }, 1000);
    },
    miaoshaFn () {
      //当前时间
      var nowTime = new Date();
      //   console.log(nowTime);
      //   目标时间
      var targetTimer = new Date("Thu Dec 31 2020 12:00:00 GMT+0800");
      //   console.log(targetTimer - nowTime);
      //时间差 毫秒数
      var oTime = (targetTimer - nowTime) / 1000; //单位换算成秒
      //算出小时
      this.hours = parseInt((oTime % (60 * 60 * 24)) / 3600);
      //算出分钟
      //(oTime%(60*60*24))%3600/60
      this.mins = parseInt(((oTime % (60 * 60 * 24)) % 3600) / 60);
      //算出秒
      //oTime%(60*60*24)%3600%60
      this.sec = parseInt(((oTime % (60 * 60 * 24)) % 3600) % 60);
      //console.log(this.hours - this.mins - this.sec);
    }
  },
  mounted () {
    this.timer = setInterval(this.scrollNewsFn, 2000);
    this.timer2 = setInterval(this.miaoshaFn, 1000);
  },
  destroyed () {
    //销毁组件
    clearInterval(this.timer);
    clearInterval(this.timer2);
  }
}
</script>

<style lang="less">
.home-news {
  width: 100%;
  margin: 0 10px;
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  top: 0.5rem;
  .title-img {
    width: 20%;
    height: 3.5rem;
    margin-left: 0.7rem;
    img {
      height: 3rem;
    }
  }
  .trans {
    transition: all 0.5s linear;
  }
  ul {
    position: absolute;
    left: 20%;
    height: 5rem;
    width: 70%;
    margin-left: 2rem;
    li {
      line-height: 5rem;
      height: 5rem;
      font-size: 1.4rem;
    }
  }
  .arr {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
    color: rgb(185, 27, 27);
    margin-top: -0.4rem;
  }
}
.center-img {
  width: 100%;
  display: flex;
  position: absolute;
  margin-top: 0.5rem;
}
.center-img img {
  width: 94%;
  height: 35%;
  max-width: 100%;
  margin: 5px auto;
}
.miaosha-box {
  display: flex;
  height: 130px;
  max-width: 100%;
  border-radius: 10px;
  margin-top: 50%;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  background-color: #fff;
}
// 秒杀上面部分
.mb-up {
  width: 100%;
  height: 20%;
  position: absolute;
}
.miaosha-img {
  display: flex;
  margin-left: 20px;
  margin-top: 25px;
  float: left;
}
.miaosha-img img {
  height: 20px;
}
.miaosha-time {
  width: 180px;
  height: 20px;
  float: left;
  right: 0;
  margin-top: 25px;
  font-size: 16px;
  position: absolute;
}
.miaosha-time span {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-color: red;
  color: #fff;
  text-align: center;
  border-radius: 10px;
}
// 秒杀中间部分
.mb-mid {
  width: 100%;
  height: 82%;
  position: absolute;
  // background: red;
  margin-top: 18%;
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    text-align: center;
    li {
      flex: 1;
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: #858282;
    }
  }
}
</style>