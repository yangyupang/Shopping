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
      <!-- 登录 -->
      <div class="my-islogin" v-if="username">
        <div class="my-welcome">
          <div class="welcome">欢迎您：{{username.nickname}}</div>
          <div @click="outlogin" class="outlogin">退出登录</div>
        </div>
      </div>
      <!-- 未登录 -->
      <div class="my-islogin" v-else>
        <div @click="tologin">登录/注册</div>
      </div>
    </div>
    <!-- 我的操作 -->
    <div class="my-operation">
      <div class="operate">
        <van-tabbar v-model="active" :fixed="false" @change="onChange">
          <van-tabbar-item icon="pending-payment">待付款</van-tabbar-item>
          <van-tabbar-item icon="gift-o">待发货</van-tabbar-item>
          <van-tabbar-item icon="free-postage">待收货</van-tabbar-item>
          <van-tabbar-item icon="orders-o" :info="num">评价</van-tabbar-item>
          <van-tabbar-item icon="certificate">已完成</van-tabbar-item>
        </van-tabbar>
        <div class="allorder" @click="allorder">
          <div class="order">
            <van-icon name="records" class="order-icon" />
            <div>所有订单</div>
          </div>
          <div class="to-order">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-divider />
      </div>
      <div class="handle">
        <!-- 收藏商品 -->
        <van-divider />
        <div class="collection" @click="collection">
          <div class="collections">
            <van-icon name="like-o" class="collections-icon" />
            <div>收藏商品</div>
          </div>
          <div class="to-collections">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-divider />
        <!-- 地址管理 -->
        <div class="collection" @click="address">
          <div class="collections">
            <van-icon name="location-o" class="collections-icon" />
            <div>地址管理</div>
          </div>
          <div class="to-collections">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-divider />
        <!-- 最近浏览 -->
        <div class="collection" @click="history">
          <div class="collections">
            <van-icon name="eye-o" class="collections-icon" />
            <div>最近浏览</div>
          </div>
          <div class="to-collections">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      active: "",
      num: 5
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
          // console.log(res);
          this.$toast("退出成功");
          this.username = "";
          localStorage.setItem("args", this.username);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(index) {
      if (this.username) {
        // 点击待付款
        if (index === 0) {
          this.$router.push("/myorder");
        }
        // 点击待发货
        else if (index === 1) {
          this.$router.push("/myorder");
        }
        // 点击待收货
        else if (index === 2) {
          this.$router.push("/myorder");
        }
        //点击已完成
        else if (index === 4) {
          this.$router.push("/myorder");
        }
      } else {
        this.$toast("亲!你还没有登录哟~");
        this.active = "";
      }
    },
    //点击所有订单
    allorder() {
      if (this.username) {
        this.$router.push("/myorder");
      } else {
        this.$toast("亲!你还没有登录哟~");
      }
    },
    //点击收藏页
    collection() {
      if (this.username) {
        this.$router.push("/collection");
      } else {
        this.$toast("亲!你还没有登录哟~");
      }
    },
    //点击地址管理
    address() {
      if (this.username) {
        this.$router.push("/addresslist");
      } else {
        this.$toast("亲!你还没有登录哟~");
      }
    },
    //点击历史浏览
    history() {
      this.$router.push("/browsinghistory");
    }
  },

  mounted() {
    if (localStorage.getItem("args") !== "") {
      this.username = JSON.parse(localStorage.getItem("args"));
    }
    // if (this.active !== "") {
    //   this.active = "";
    // }
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
  .operate {
    margin-bottom: 10px;
    /deep/ .van-tabbar-item__icon {
      font-size: 22px;
    }
    .allorder {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 0 10px;
      .order {
        display: flex;
      }
    }
  }
  .handle {
    .collection {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .collections {
        display: flex;
      }
    }
  }
}
</style>