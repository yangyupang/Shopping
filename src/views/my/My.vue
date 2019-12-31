<template>
  <!-- 我的 -->
  <div>
    <my-top class="my-top">
      <div slot="centre" class="my-title">会员中心</div>
    </my-top>
    <div class="my-profilephoto">
      <div class="my-set">
        <van-icon v-if="username" name="setting" color="#fff" />
      </div>
      <div class="my-head">
        <img src="../../assets/img/head.jpg" alt />
      </div>
      <div class="my-islogin" v-if="username">
        <div class="my-welcome">
          <div class="welcome">欢迎您：{{username.nickname}}</div>
          <div @click="outlogin" class="outlogin">退出登录</div>
        </div>
      </div>
      <div class="my-islogin" @click="tologin" v-else>登录/注册</div>
    </div>
    <div class="my-operation"></div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  components: {},
  methods: {
    tologin() {
      this.$router.push("/login");
    },
    outlogin() {
      this.$api
        .loginOut()
        .then(res => {
          this.$toast("退出成功");
          this.username = "";
          localStorage.setItem("args", this.username);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (localStorage.getItem("args") !== "") {
      this.username = JSON.parse(localStorage.getItem("args"));
    }
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.my-top {
  background: #fff;
  font-size: 16px;
  margin-bottom: 5px;
  .my-title {
    padding: 10px;
  }
}
//头像
.my-profilephoto {
  width: 100%;
  height: 33vh;
  background-color: rgb(243, 38, 122);
  overflow: hidden;
  .my-set {
    font-size: 22px;
    display: flex;
    height: 32px;
    justify-content: flex-end;
    margin: 10px 10px 0 0;
  }
  .my-head {
    width: 120px;
    margin: 0 auto;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .my-islogin {
    font-size: 16px;
    display: flex;
    justify-content: center;
    padding: 10px;
    color: #fff;
    .my-welcome {
      .welcome {
        font-size: 18px;
        font-weight: 600;
      }
      .outlogin {
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}
//操作
.my-operation {
  width: 100%;
  height: 52vh;
  background-color: #fff;
}
</style>