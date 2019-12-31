<template>
  <!-- 购物车 -->
  <div>
    <my-top class="shoppingcart-top">
      <div slot="centre" class="shoppingcart-title">购物车</div>
    </my-top>
    <better-scroll class="wrapper">
      <div class="shoppingcart-goods">
        <div class="shoppingcart-login" v-if="loginobj">您已经登录啦</div>
        <div class="shoppingcart-logout" v-else>
          <div class="logout-img">
            <img src="../../assets/img/logout.gif" alt />
          </div>
          <div class="logout-prompt">请先登录呦~~</div>
          <div class="logout-tologin">
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="tologin">点我去登录</van-button>
          </div>
        </div>
      </div>
    </better-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginobj: ""
    };
  },
  components: {},
  methods: {
    tologin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    if (localStorage.getItem("args") !== "") {
      this.loginobj = localStorage.getItem("args");
    }

    // console.log(this.loginobj);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.shoppingcart-top {
  background: #fff;
  font-size: 16px;
  margin-bottom: 5px;
  .shoppingcart-title {
    padding: 10px;
  }
}
.shoppingcart-goods {
  width: 100%;
  height: 82vh;
  background-color: #fff;
  //为登录
  .shoppingcart-logout {
    overflow: hidden;
    .logout-img {
      display: flex;
      justify-content: center;
      height: 120px;
      margin: 10px auto;
      img {
        width: 170px;
      }
    }
    .logout-prompt {
      font-size: 16px;
      text-align: center;
      margin: 20px;
    }
    .logout-tologin {
      display: flex;
      justify-content: center;
    }
  }
}

.wrapper {
  height: 82vh;
  overflow: hidden;
}
</style>