<template>
  <!-- 评价详情 -->
  <div>
    <my-top class="evaluationdetails-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="evaluationdetails">评价中心</div>
    </my-top>
    <div class="evaluationdetails-head">
      <div class="head-portrait">
        <img src="../../../assets/img/head.jpg" alt />
      </div>
      <div class="score">
        <van-rate v-model="value" />
      </div>
      <div class="time">{{commentTime}}</div>
    </div>
    <div class="evaluationdetails-body">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="7"
          autosize
          label="评论内容:"
          type="textarea"
          maxlength="150"
          show-word-limit
          disabled
        />
      </van-cell-group>
    </div>
    <div class="evaluationdetails-back">
      <div class="goods">
        <div class="goods-img">
          <img :src="imgPath" alt />
        </div>
        <div class="goods-name">{{name}}</div>
        <div class="goods-add" @click="add(id)">
          <van-icon name="shopping-cart" color="red" />
        </div>
      </div>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large" @click="back">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //加入购物车
    add(id) {
      // console.log(id);
      // 238bc2e023844769a6b67d9a4c04b2ea
      this.$api.addShop({ id: id }).then(res => {
        if (res.code === 200) {
          this.$toast(res.msg);
          //获取购物车数据
          this.$api
            .getCard()
            .then(res => {
              if (res.shopList.length > 0) {
                this.$store.state.shoppingcart = res.shopList;
                // console.log(res.shopList);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  mounted() {
    // console.log(this.$store.state.list);
  },
  watch: {},
  computed: {
    value() {
      let val = 0;
      val = this.$store.state.list.rate;
      return val;
    },
    commentTime() {
      let time = "";
      time = this.$store.state.list.comment_time;
      return time;
    },
    message() {
      let message = "";
      message = this.$store.state.list.content;
      return message;
    },
    imgPath() {
      let imgPath = "";
      imgPath = this.$store.state.list.goods[0].image;
      return imgPath;
    },
    name() {
      let name = "";
      name = this.$store.state.list.goods[0].name;
      return name;
    },
    id() {
      let id = "";
      id = this.$store.state.list.goods[0].id;
      return id;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.evaluationdetails-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .evaluationdetails {
    font-size: 16px;
  }
}
.evaluationdetails-head {
  display: flex;
  font-size: 16px;
  background-color: #fff;
  padding: 10px;
  justify-content: space-around;
  .head-portrait {
    width: 57px;
    height: 57px;
    img {
      width: 57px;
      border-radius: 50%;
    }
  }
  .score {
    height: 57px;
    line-height: 57px;
  }
  .time {
    font-size: 14px;
    height: 57px;
    line-height: 57px;
  }
}
.evaluationdetails-body {
  height: 31vh;
  /deep/ .van-field__control {
    height: auto !important;
  }
}
.evaluationdetails-back {
  height: 43.4vh;
  background-color: #fff;
  padding: 40px 15px 0;
  .goods {
    display: flex;
    font-size: 16px;
    margin-bottom: 100px;
    justify-content: space-around;
    .goods-img {
      width: 57px;
      height: 57px;
      img {
        width: 100%;
      }
    }
    .goods-name {
      width: 236.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .goods-add {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgb(255, 232, 226);
      text-align: center;
      line-height: 32px;
      margin: 12px 0 12px 3px;
    }
  }
}
</style>