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
    <better-scroll class="wrapper" v-if="historylist.length >0 ">
      <goods-card v-for="item in historylist" :key="item.id" class="historycard">
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
    <div class="no-history">暂无浏览记录~</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      browsingHis: false,
      historylist: []
    };
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
          let name = `${
            JSON.parse(localStorage.getItem("args")).nickname
          }_browsing`;
          let history = JSON.parse(localStorage.getItem(name));
          // console.log(val);
          history = history.filter(item => {
            return item.id !== val.id;
          });
          this.historylist = history;
          localStorage.setItem(name, JSON.stringify(history));

          // this.$store.state.history = this.$store.state.history.filter(item => {
          //   return item !== val;
          // });
          this.$toast("删除成功");
        })
        .catch(() => {
          this.$toast("您取消了删除操作");
          // on cancel
        });
    },
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    },
    history() {
      // if (this.browsingHis) {
      //   return;
      // } else {}
      if (JSON.parse(localStorage.getItem("args")).nickname) {
        let name = `${
          JSON.parse(localStorage.getItem("args")).nickname
        }_browsing`;
        if (localStorage.getItem(name) !== "") {
          this.historylist = JSON.parse(localStorage.getItem(name));
        }
      }

      // return this.$store.state.history
    }
  },
  mounted() {
    this.history();
  },
  watch: {},
  computed: {},
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
.no-history {
  font-size: 16px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
</style>