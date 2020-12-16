<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="logo">
        <img
          :src="logo"
          alt=""
        />
      </div>
      <div class="tabs">
        <div
          class="tabs-item"
          :class="{active:loginFlag==0}"
          @click="changeLoginTabs(0)"
        >短信登录</div>
        <div
          class="tabs-item"
          :class="{active:loginFlag==1}"
          @click="changeLoginTabs(1)"
        >账号登录</div>
      </div>
      <div class="tabs-content">
        <!-- 短信登录内容 -->
        <div
          class="tabs-message"
          v-if="loginFlag==0"
        >
          <div class="tabs-input">
            <input
              type="text"
              placeholder="验证码"
              name="captcha"
              v-model="captcha"
            >
            <img
              src="http://192.168.174.1:3000/adminapi/captcha"
              alt=""
              @click="getCaptcha"
              ref="captcha"
            >
          </div>
          <div class="tabs-input">
            <input
              type="text"
              placeholder="请输入手机号"
              name="phone"
              v-model.number="phone"
              maxlength="11"
            >
            <button
              v-if="!num"
              @click="getPhoneCode"
            >{{text}}</button>
            <button v-else>已发送{{num}}s</button>
          </div>
          <div class="tabs-input">
            <input
              type="text"
              placeholder="输入短信验证码"
              style="width:100%"
              name="code"
              v-model="code"
            >
          </div>
          <div class="tabs-input">
            <input
              type="button"
              value="短信登录"
              style="width:100%;background:#f44;color:#fff"
              @click="phoneLoginFn"
            >
          </div>
        </div>
        <!-- 账号登录内容 -->
        <div
          class="tabs-message tabs-login"
          v-if="loginFlag==1"
        >
          <div class="tabs-input">
            <input
              type="text"
              placeholder="验证码"
              name="captcha"
              v-model="captcha"
            >
            <img
              src="http://192.168.174.1:3000/adminapi/captcha"
              alt=""
              @click="getCaptcha"
              ref="captcha"
            >
          </div>
          <div class="tabs-input">
            <input
              type="text"
              placeholder="用户名"
              style="width:100%"
              name="user_name"
              v-model="user_name"
            >
          </div>
          <div class="tabs-input">
            <input
              type="password"
              placeholder="密码"
              style="width:100%"
              name="login_password"
              v-if="hidePass"
              v-model="login_password"
            >
            <input
              type="text"
              placeholder="密码"
              style="width:100%"
              name="login_password"
              v-else
              v-model="login_password"
            >
            <i
              class="iconfont icon-yincang"
              v-if="hidePass"
              @click="showHidePass"
            ></i>
            <i
              class="iconfont icon-xianshi"
              v-else
              @click="showHidePass"
            ></i>
          </div>
          <div class="tabs-input">
            <input
              type="button"
              value="用户登录"
              style="width:100%;background:#f44;color:#fff"
              @click="login"
            >
          </div>
        </div>
      </div>
      <div class="toRegister">
        <router-link to="/register">
          没有账号？去注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';
// import { Toast } from 'mint-ui';
import { getPhoneCode, getPhoneLogin, getLogin } from "@/api/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      logo: require("@/assets/images/logo.png"),
      loginFlag: 0,
      num: 0,
      phone: "",
      timer: null,
      text: "获取验证码",
      code: "",
      captcha: "",
      hidePass: true,
      user_name: "",
      login_password: ""
    };
  },
  //监听属性类似于data概念
  computed: {
    validatePhone () {
      return /^1[3|5|7|8][0-9]{9}$/.test(this.phone);
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeLoginTabs (index) {
      this.loginFlag = index
    },
    getCaptcha () {
      // 刷新验证码
      // console.log(this.$refs.captcha);
      this.$refs.captcha.src = "http://192.168.174.1:3000/adminapi/captcha?t=" + new Date().getTime();
    },
    showHidePass () {
      this.hidePass = !this.hidePass
    },
    async getPhoneCode () {
      // 获取手机验证码
      if (this.validatePhone) { //该条件成立则说明手机号可用
        this.num = 10;
        this.text = "重新获取验证码";
        this.timer = setInterval(() => {
          this.num--;
          if (this.num == 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      } else { //手机号不可用
        alert("手机号格式不正确");
        // Toast({
        //   message: "手机号格式不正确",
        //   position: "center",
        //   duration: 2000
        // })
      }
      let result = await getPhoneCode("/getcode", this.phone, "post");
      console.log(result);
    },
    async phoneLoginFn () {
      var params = {
        captcha: this.captcha,
        phone: this.phone,
        code: this.code
      };
      let result = await getPhoneLogin("/phonelogin", params, "post")
      console.log(result.data);
      if (result.status == 200) {
        this.$router.push("/home");
      }
    },
    async login () {
      console.log("账号登录");
      console.log(getLogin);
      var params = {
        captcha: this.captcha,
        user_name: this.user_name,
        login_password: this.login_password
      };
      let result = await getLogin("/login", params,
        "post");
      this.$store.dispatch("setUserInfo", result);
      // console.log(result);
      if (result.status == 200) {
        this.$router.push("/home");
      }
    }
  },
  mounted () {
    // console.log(this.$route.query.id);
    this.loginFlag = this.$route.query.id
  }
}
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .toRegister {
    text-align: center;
    line-height: 4.4rem;
    text-decoration: underline;
  }
  .login-content {
    width: 100%;
    width: calc(100% - 2rem);
    margin: 0 1rem;
    .logo {
      width: 10rem;
      height: 10rem;
      border: 1rem solid #efefef;
      border-radius: 50%;
      margin: 0 auto;
      img {
        width: 10rem;
        height: 10rem;
      }
    }
    .tabs {
      width: 100%;
      height: 4.4rem;
      background: #efefef;
      display: flex;
      justify-content: center;
      align-content: center;
      text-align: center;
      font-size: 1.4rem;
      line-height: 4.4rem;
      margin-top: 2rem;
      .tabs-item {
        flex: 1;
      }
      .active {
        background-color: #f44;
        color: #fff;
      }
    }
    .tabs-content {
      width: 100%;
      .tabs-message {
        width: 100%;
        .tabs-input {
          height: 4rem;
          margin: 1rem 0;
          display: flex;
          position: relative;
          input {
            border: 1px solid #efefef;
            height: 4rem;
            box-sizing: border-box;
            text-indent: 1rem;
            width: 70%;
          }
          button {
            height: 4rem;
            width: 30%;
          }
          i {
            position: absolute;
            height: 4rem;
            width: 4rem;
            font-size: 2.4rem;
            color: #666;
            text-align: center;
            line-height: 4rem;
            right: 0;
          }
        }
      }
    }
  }
}
</style>