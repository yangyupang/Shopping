<template>
  <!-- 购物车 -->
  <div>
    <my-top class="shoppingcart-top">
      <div slot="centre" class="shoppingcart-title">购物车</div>
    </my-top>
    <div class="shoppingcart-goods">
      <div class="shoppingcart-login" v-if="loginobj">
        <van-sticky :offset-top="50">
          <div class="submit">
            <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
            <div class="submit-right">
              <div class="sum">
                合计：
                <span>￥{{sum}}</span>
              </div>
              <div class="but">
                <van-button type="danger" size="mini" @click="del">删除</van-button>
                <van-button type="danger" size="mini" @click="settlement">结算</van-button>
              </div>
            </div>
          </div>
        </van-sticky>
        <better-scroll class="wrapper">
          <div v-for="(item,index) in cartlist" :key="index" class="shoppingcart">
            <!-- 单选 -->
            <van-checkbox v-model="item.check" @click="isCheck(index)"></van-checkbox>
            <van-card
              :num="item.count"
              :price="item.present_price | price"
              :title="item.name"
              :thumb="item.image_path"
            >
              <div slot="footer">
                <van-stepper v-model="item.count" />
              </div>
            </van-card>
          </div>
        </better-scroll>
      </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginobj: "",
      cartlist: [],
      checked: false
    };
  },
  components: {},
  methods: {
    tologin() {
      this.$router.push("/login");
    },
    //获取购物车数据
    getCard() {
      this.$api
        .getCard()
        .then(res => {
          this.cartlist = res.shopList;
          this.$store.state.shoppingcart = res.shopList;
          console.log(res.shopList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //全选
    checkAll() {
      this.checked = !this.checked;
      this.cartlist.map(item => {
        item.check = this.checked;
      });
    },
    //单选
    isCheck(index) {
      this.cartlist[index].check = !this.cartlist[index].check;
      this.checked = this.cartlist.every(item => {
        return item.check;
      });
    },
    //付款
    settlement() {},
    //删除商品
    del() {}
  },
  mounted() {
    if (localStorage.getItem("args") !== "") {
      this.loginobj = localStorage.getItem("args");
    }
    this.getCard();
    // console.log(this.loginobj);
  },
  watch: {},
  computed: {
    sum() {
      let all = 0;
      this.cartlist.map(item => {
        if (item.check === true) {
          return (all += item.present_price * item.count);
        }
      });
      return all.toFixed(2);
    },

  },
  filters: {
    price(price) {
      return price.toFixed(2);
    }
  }
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
  background-color: #fff;
  //未登录
  .shoppingcart-logout {
    overflow: hidden;
    height: 540px;
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
/deep/ .van-card {
  height: 130px;
  width: 320px;
}
.wrapper {
  height: 74vh;
  overflow: hidden;
}
.shoppingcart {
  display: flex;
  // height: 130px;
  /deep/ .van-checkbox {
    width: 37px;
    height: 20px;
    margin-top: 60px;
    padding: 15px;
  }
  /deep/ .van-submit-bar {
    // bottom: 66px;
    position: inherit;
  }
}
//全选 提交 删除
.submit {
  display: flex;
  height: 50px;
  background-color: #fff;
  font-size: 16px;
  padding: 0 15px;
  justify-content: space-between;
  .sum {
    display: flex;
    span {
      color: red;
      width: 100px;
      display: block;
    }
  }
  .submit-right {
    line-height: 22px;
  }
}
</style>