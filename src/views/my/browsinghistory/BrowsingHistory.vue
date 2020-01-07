<template>
  <!-- 历史浏览 -->
  <div>
    <van-sticky>
      <my-top class="history-top">
        <div slot="left" class="back" @click="back">
          <van-icon name="arrow-left" />
        </div>
        <div slot="centre" class="history">历史浏览</div>
      </my-top>
    </van-sticky>
    <better-scroll class="wrapper">
      <goods-card v-for="item in history" :key="item.id" class="historycard">
        <div slot="left" class="goods-img" @click="details(item.id)">
          <div class="imgs">
            <img :src="item.image_path" alt />
          </div>
        </div>
        <div slot="centre" class="goods" @click="details(item.id)">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-price">￥{{item.present_price}}</div>
        </div>
        <div slot="right" class="cancel" @click="cancel(item)">
          <van-icon name="close" />
        </div>
      </goods-card>
    </better-scroll>
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
    cancel(val) {
      this.$dialog
        .confirm({
          title: "删除最近浏览",
          message: "您确定要删除吗？"
        })
        .then(() => {
          this.$store.state.history = this.$store.state.history.filter(item => {
            return item !== val;
          });
          this.$toast("删除成功");
          // on confirm
        })
        .catch(() => {
          this.$toast("您取消了删除操作");
          // on cancel
        });
    },
    details(id) {
      this.$router.push({ name: "commoditydetails", params: { goodsId: id } });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    history() {
      return this.$store.state.history;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.history-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .history {
    font-size: 16px;
  }
}
.goods-img {
  .imgs {
    width: 115px;
    padding: 5px;
  }
  img {
    width: 103px;
  }
}
.goods {
  font-size: 16px;
  .goods-name {
    padding: 2.667vw 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
  }
  .goods-price {
    color: red;
    margin-top: 43px;
  }
}
.cancel {
  height: 4.267vw;
  margin-top: 12vh;
  font-size: 4.267vw;
  width: 50px;
  text-align: center;
}
.wrapper {
  height: 92vh;
  overflow: hidden;
}
.historycard {
  height: 113px;
}
</style>