<template>
  <!-- 发布评价 -->
  <div>
    <my-top class="postevaluation-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="postevaluation">评价中心</div>
    </my-top>
    <div class="postevaluation-head">
      <div class="goods-img">
        <img :src="evaluated.image_path" alt />
      </div>
      <div class="goods-score">
        <div class="goods">商品评分</div>
        <div class="score">
          <van-rate v-model="value" />
        </div>
      </div>
    </div>
    <div class="postevaluation-body">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="7"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="发表点看法吧~~"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="postevaluation-submit">
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        size="large"
        @click="submit"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluated: {},
      value: 0,
      message: "",
      checked: false
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取商品数据
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          this.evaluated = res.data.list.filter(item => {
            return item.cid === this.$route.query.id;
          })[0];
          // console.log(this.evaluated);
          // this.images = this.evaluated.image_path;
        })
        .catch(err => {
          console.log(cath);
        });
    },
    //提交评价
    submit() {
      this.$api
        .comment({
          id: this.$route.query.id,
          rate: this.value,
          content: this.message,
          anonymous: this.checked,
          _id: this.evaluated._id,
          order_id: this.evaluated.order_id,
          image: []
        })
        .then(res => {
          this.$toast(res.msg);
          if (res.code === 200) {
            this.$router.go(-1);
          }
        });
    }
  },
  mounted() {
    this.tobeEvaluated();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.postevaluation-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .postevaluation {
    font-size: 16px;
  }
}
.postevaluation-head {
  display: flex;
  height: 11vh;
  background-color: #fff;
  justify-content: space-around;
  font-size: 16px;
  .goods-img {
    width: 73px;
    height: 11vh;
    img {
      width: 100%;
      height: 11vh;
    }
  }
  .goods-score {
    width: 230px;
    .score {
      margin-top: 20px;
    }
  }
}
.postevaluation-body {
  height: 31vh;
  /deep/ .van-field__control {
    height: auto !important;
  }
}
.postevaluation-submit {
  height: 44vh;
  background-color: #fff;
  padding: 20px;
  line-height: 170px;
}
</style>