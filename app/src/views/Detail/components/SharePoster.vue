<!-- 海报 -->
<template>
  <div
    class="share-poster"
    v-if="showshareposter"
    @click="closeSharePoster"
  >
    <div class="poster-content">
      <div class="poster-text">长按保存至相册</div>
      <div
        class="close-poster"
        @click="closeSharePoster"
      >
        <img
          src="@/assets/images/poster-close.png"
          alt=""
        >
      </div>
      <div class="poster-img">
        <img
          :src="posterImage"
          alt=""
        >
      </div>
      <div class="carate-poster">
        <!-- 合并海报 -->
        <div class="hideCanvas">
          <canvas ref="mycanvas"></canvas>
        </div>
      </div>
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
    return {
      posterImage: ""
    };
  },
  props: {
    showshareposter: Boolean,
    posterDatas: Object,
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    showshareposter () {
      if (this.showshareposter == true) {
        this.$nextTick(() => {
          this.savePoster()
        })
      }
    }
  },
  //方法集合
  methods: {
    closeSharePoster () {
      this.$emit("closeSharePoster");
    },
    savePoster () {
      console.log("在这里执行生成海报的函数");
      var canvas = this.$refs.mycanvas;
      var ctx = canvas.getContext("2d")
      // console.log(canvas);

      let W = window.screen.availWidth; //获取屏幕的宽度，不包含任务栏
      let H = window.screen.availHeight; //获取屏幕的高度，不包含任务栏

      let devicePixelRatio = window.devicePixelRatio || 1; //获取设备的像素比 //pc端1倍，iphone6,7,8 2倍关系   iphone6p,7p,8p,X 3倍关系

      //在canvas context中也存在一个webkitBackingStorePixelRatio的属性（仅safari和chrome），该属性的值决定了浏览器在渲染canvas之前会用几个像素来存储画布信息。
      let backingPixelRatio = ctx.webkitBackingStorePixelRatio || 1;
      let ratio = devicePixelRatio / backingPixelRatio //计算出比例

      // console.log(W);
      // console.log(H);
      // console.log(devicePixelRatio);
      // console.log(ratio);
      canvas.width = W * ratio;
      canvas.height = H * ratio;
      canvas.style.width = W * ratio + "px"; //设置canvas容器的宽度
      canvas.style.height = H * ratio + "px"; //设置canvas容器的高度
      ctx.scale(ratio, ratio); //将对象内容缩放

      //getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布：
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // console.log(imgData.data);
      //定义一个白色画布
      for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255;
        imgData.data[i + 1] = 255;
        imgData.data[i + 2] = 255;
        imgData.data[i + 3] = 255;
      }

      ctx.putImageData(imgData, 0, 0);

      //生成图像
      var img = new Image(); //定义一个图片对象
      img.src = this.posterDatas.image;
      // console.log(img);
      img.onload = function () {
        ctx.drawImage(img, 0, 0, W, W);
      };

      // 生成标题
      ctx.font = "20px Arial"; //设置字体大小
      ctx.fillStyle = "#333333"; //设置字体的颜色
      // ctx.textAlign = "center"; //设置文本的对齐方式
      // ctx.fillText(this.posterDatas.title, 20, W + 30);
      let title = this.posterDatas.title;
      this.titleAutoLine(title, canvas, 20, W + 30, 30, W - 40, 2);

      // 生成价格
      ctx.font = "30px Arial"; //设置字体大小
      ctx.fillStyle = "#FF4444"; //设置字体的颜色
      ctx.textAlign = "center"; //设置文本的对齐方式
      ctx.fillText("￥" + this.posterDatas.price, W / 2, W + 130);

      //生成二维码图像
      var img2 = new Image(); //定义一个图片对象
      img2.src = this.posterDatas.code;
      // console.log(img);
      img2.onload = function () {
        ctx.drawImage(img2, 127, W + 160, W / 3, W / 3);
      };

      // //生成logo图像
      // var logo = new Image(); //定义一个图片对象
      // logo.src = this.posterDatas.logo;
      // // console.log(img);
      // logo.onload = function () {
      //   ctx.drawImage(logo, 0, 0, 100, 50);
      // };

      // 用定时器模拟异步
      setTimeout(() => {
        // console.log(canvas.toDataURL());
        this.posterImage = canvas.toDataURL();
      }, 500);
    },

    // 处理标题
    titleAutoLine (title, canvas, x, y, lineHeight, canvasWidth, lines) {
      //需要标题文字 title
      //需要画布 canvas
      //绘制标题的水平方向起始位置 x
      //绘制标题的垂直方向起始位置 y
      //绘制标题的行高，自己定义一个值即可 lineHeight
      //绘制标题的宽度 canvasWidth
      //绘制的行数 lines
      //this.titleAutoLine(title, canvas, 20, W + 30, 30, W - 40, 2);

      var ctx = canvas.getContext("2d"); //创建一个2d画布
      var lineWidth = 0; //绘制标题文本的宽度
      var lastSubStringIndex = 0; //绘制标题文本字符串的索引
      var beginY = y //绘制标题文本的起始y坐标

      for (let i = 0; i < title.length; i++) {
        lineWidth += ctx.measureText(title[i]).width;
        console.log(lineWidth);
        if (lineWidth > canvasWidth) {
          if (y >= beginY + lineHeight * (lines - 1)) {
            ctx.fillText(title.substring(lastSubStringIndex, i - 5) + "...", x, y);
            return;
          } else {
            ctx.fillText(title.substring(lastSubStringIndex, i), x, y);
            y += lineHeight;
            lineWidth = 0;
            lastSubStringIndex = i;
          }
        }
      }
      // ctx.fillText(title, substring(0, 23), x, y);
      // ctx.fillText(title, substring(23, 40) + "...", x, y + 30);
    }
  }
}
</script>

<style lang="less">
.share-poster {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  .carate-poster {
    position: fixed;
    top: 0;
    left: 0;
    .hideCanvas {
      display: none;
    }
  }
  .poster-content {
    width: 70%;
    margin-left: 15%;
    background: #fff;
    height: 70%;
    margin-top: 15%;
    position: relative;
    .poster-text {
      position: absolute;
      bottom: -4.4rem;
      height: 4.4rem;
      line-height: 4.4rem;
      text-align: center;
      width: 100%;
      color: #ffffff;
    }
    .close-poster {
      position: absolute;
      right: 2rem;
      top: -3rem;
      img {
        height: 3rem;
      }
    }
    .poster-img {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>