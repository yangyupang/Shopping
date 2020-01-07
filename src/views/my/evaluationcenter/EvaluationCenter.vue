<template>
  <!-- 评价中心 -->
  <div>
    <my-top class="evaluation-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="evaluation">评价中心</div>
    </my-top>
    <div class="evaluate-img">
      <img src="../../../assets/img/evaluate.jpg" alt />
    </div>
    <van-tabs v-model="active" class="van__tabs">
      <van-tab title="待评价">
        <div class="to-evaluate">
          <div v-if="evaluateList.length <=0" class="no-goods">暂无需要评价的物品</div>
          <div v-else>
            <better-scroll class="wrapper">
              <div class="evaluate-goods" v-for="item in evaluateList" :key="item.name">
                <div class="goods-img">
                  <img :src="item.image_path" alt />
                </div>
                <div class="goods-name">
                  <div>{{item.name}}</div>
                  <van-button
                    icon="chat-o"
                    type="primary"
                    size="small"
                    class="evaluate-btn"
                    color="red"
                    plain
                    @click="evaluate(item.cid)"
                  >晒单评论</van-button>
                </div>
              </div>
            </better-scroll>
          </div>
        </div>
      </van-tab>
      <van-tab title="已评价">
        <div class="evaluated">
          <div v-if="alreadyList.length <=0" class="no-evaluated">暂无评价</div>
          <div v-else>
            <better-scroll class="wrapper">
              <div class="evaluated-goods" v-for="(item,index) in alreadyList" :key="index">
                <div class="goods-img">
                  <img :src="item.image_path" alt />
                </div>
                <div class="goods-name">
                  <div>{{item.name}}</div>
                  <van-button
                    icon="search"
                    type="primary"
                    size="small"
                    class="evaluate-btn"
                    color="black"
                    plain
                    @click="evaluated(index)"
                  >查看评价</van-button>
                </div>
              </div>
            </better-scroll>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      //待评价的商品
      evaluateList: [],
      //已经评价的商品
      alreadyList: [],
      //已经评价的商品 和 评价内容
      list:[]
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取评价消息
    tobeEvaluated() {
      this.$api.tobeEvaluated().then(res => {
        this.evaluateList = res.data.list;
      });
    },
    //查询已评价
    alreadyEvaluated() {
      this.$api.alreadyEvaluated().then(res => {
        res.data.list.map(item => {
          this.alreadyList.push(item.goods[0]);
        });
        this.list = res.data.list
        // res.data.list.map(item => {
        //   this.alreadyList.push(item);
        // });
        // console.log(res.data.list);
        // console.log(this.alreadyList);
      });
    },
    //点击评论
    evaluate(cid) {
      this.$router.push({ name: "postevaluation", query: { id: cid } });
    },
    //查看评价
    evaluated(index) {
      this.$router.push({ name: "evaluationdetails"});
      this.$store.state.list = this.list[index]
      // console.log(this.$store.state.list);
    }
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.evaluation-top {
  background-color: #fff;

  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .evaluation {
    font-size: 16px;
  }
}
.evaluate-img {
  height: 33vh;
  img {
    width: 100%;
    height: 33vh;
  }
}
// /deep/ .van-tabs__nav {
//   height: 5vh;
// }
.to-evaluate {
  height: 55vh;
  background-color: #fff;
  font-size: 16px;
  padding-top: 25px;
  .no-goods {
    text-align: center;
    padding-top: 20px;
  }
  .evaluate-goods {
    display: flex;
    border-bottom: 1px solid #c9c7c7;
    justify-content: space-around;
    .goods-img {
      width: 80px;
      height: 12vh;
      img {
        height: 12vh;
        width: 100%;
      }
    }
    .goods-name {
      width: 240px;
      padding-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .evaluate-btn {
        margin: 10px 0 0 130px;
      }
    }
  }
}
.evaluated {
  height: 55vh;
  background-color: #fff;
  font-size: 16px;
  padding-top: 25px;
  .no-evaluated {
    text-align: center;
    padding-top: 20px;
  }
  .evaluated-goods {
    display: flex;
    border-bottom: 1px solid #c9c7c7;
    justify-content: space-around;
    .goods-img {
      width: 80px;
      height: 12vh;
      img {
        height: 12vh;
        width: 100%;
      }
    }
    .goods-name {
      width: 240px;
      padding-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .evaluate-btn {
        margin: 10px 0 0 130px;
      }
    }
  }
}
.wrapper {
  height: 55vh;
  overflow: hidden;
}
</style>