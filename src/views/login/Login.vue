<template>
  <!-- 登录注册 -->
  <div class="bg">
    <my-top>
      <div slot="left" class="icon" @click="back">
        <van-icon name="arrow-left" class="arrow" />
      </div>
    </my-top>
    <div class="from van_hairline--top-bottom">
      <p class="login-title">登录 / 注册</p>
      <van-cell-group>
        <van-field
          v-model="username"
          left-icon="contact"
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('要输入完整信息哟')"
        />
        <van-field
          v-model="password"
          :type="types"
          label="密码"
          placeholder="请输入密码"
          :left-icon="icon"
          @click-left-icon="iconchange"
        />
      </van-cell-group>
      <!-- 手机号验证 -->
      <van-cell-group>
        <van-field
          v-model="phone"
          center
          clearable
          label="手机号码"
          placeholder="仅注册需要"
          class="sms"
          type="number"
          maxlength="11"
        ></van-field>
      </van-cell-group>
      <!-- 短信验证 -->
      <van-cell-group>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="仅注册需要"
          class="sms"
          maxlength="4"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            v-if="!retry"
            @click="sendCode"
          >发送验证码</van-button>
          <van-button slot="button" disabled type="primary" v-else size="small">{{retry}}秒后再试</van-button>
        </van-field>
      </van-cell-group>
      <!-- 图形验证 -->
      <van-cell-group class="van_icon__image">
        <van-field
          v-model="verify"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          class="sms"
          maxlength="4"
          :right-icon="verifyicon"
          @click-right-icon="changeCaptcha"
          ref="captcha"
        ></van-field>
      </van-cell-group>
      <div class="button">
        <van-button type="primary" @click="login">登录</van-button>
        <van-button type="danger" @click="register">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      icon: "closed-eye",
      types: "password",
      phone: "",
      sms: "",
      retry: "", // 5秒倒计时
      dataTimer: 5, // 5秒倒计时;
      timer: null,
      verify: "",
      verifyicon: "api/verify"
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    iconchange() {
      if (this.icon === "closed-eye") {
        this.icon = "eye-o";
        this.types = "text";
      } else {
        this.icon = "closed-eye";
        this.types = "password";
      }
    },
    // 发送验证码
    sendCode() {
      if (
        !this.phone ||
        this.phone.length != 11 ||
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
      ) {
        this.$toast("请输入正确的手机号");
      } else {
        this.dataTimer = 5;
        let t = setInterval(() => {
          if (this.dataTimer <= 0) {
            this.retry = "";
            clearInterval(t);
            return;
          }
          this.retry = this.dataTimer--;
        }, 1000);
      }
    },
    // 刷新验证码
    changeCaptcha() {
      this.verifyicon = "api/verify?time=" + Date.now();
    },
    login() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.changeCaptcha();
            this.$router.go(-1);
            localStorage.setItem("args", JSON.stringify(res.userInfo));
          } else if (res.code === -1) {
            this.$toast(res.msg);
            this.username = this.password = this.verify = "";
            this.changeCaptcha();
          } else if (res.code === -2) {
            this.$toast(res.msg);
            this.verify = "";
            this.changeCaptcha();
          }
          this.list = res.data;
          //this.paging();
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.changeCaptcha();
            this.$router.go(-1);
            localStorage.setItem("args", JSON.stringify(res.userInfo));
          } else if (res.code === -1) {
            this.$toast(res.msg);
            this.username = this.password = this.verify = "";
            this.changeCaptcha();
          } else if (res.code === -2) {
            this.$toast(res.msg);
            this.verify = "";
            this.changeCaptcha();
          }
          this.list = res.data;
          //this.paging();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.changeCaptcha();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/login.jpg");
  background-size: cover;
}
.icon {
  position: fixed;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  top: 1.3%;
  left: 2%;
  text-align: center;
  line-height: 35px;
  z-index: 15;
}
.arrow {
  color: #fff;
  margin-top: 9px;
  margin-left: -2px;
  font-size: 18px;
}
.from {
  background: #fff;
  position: relative;
  top: 32vw;
  width: 93vw;
  height: 68vh;
  margin: 0 auto;
  padding: 10px 7px;
  box-shadow: -2px 3px 23px 1px rgba(0, 0, 0, 0.1);
  .login-title {
    letter-spacing: 1px;
    font-size: 24px;
    margin: 0 0 30px 0;
    color: #000000;
    font-weight: 550;
  }
  .button {
    margin: 0 auto;
    width: 45%;
    display: flex;
    justify-content: space-between;
  }
}
</style>