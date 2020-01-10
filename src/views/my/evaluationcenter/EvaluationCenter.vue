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
      <van-tab title="待评价" name="1">
        <div class="to-evaluate">
          <div v-if="evaluateList.length <=0" class="no-goods">暂无需要评价的物品</div>
          <div v-else>
            <better-scroll class="wrapper" v-if="active==='1' || evaluateList.length >0">
              <div
                class="evaluate-goods"
                v-for="item in evaluateList"
                :key="item.id"
                @click="details(item.cid || item.id)"
              >
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
                    @click.stop="evaluate(item.cid)"
                  >晒单评论</van-button>
                </div>
              </div>
            </better-scroll>
          </div>
        </div>
      </van-tab>
      <van-tab title="已评价" name="2">
        <div class="evaluated">
          <div v-if="alreadyList.length <=0" class="no-evaluated">暂无评价</div>
          <div v-else>
            <better-scroll
              v-if="active==='2' || alreadyEvaluated.length >0"
              class="wrapper"
              @pullUp="alreadyEvaluated"
              :flag="flag"
            >
              <div
                class="evaluated-goods"
                v-for="(item,index) in alreadyList"
                :key="index"
                @click="details(item.cid || item.id)"
              >
                <div class="goods-img">
                  <img :src="item.image_path" alt />
                </div>
                <div class="goods-name">
                  <div>{{item.name}}</div>
                  <div>
                    <div class="times">{{times(list[index].comment_time)}}</div>
                    <van-button
                      icon="search"
                      type="primary"
                      size="small"
                      class="evaluate-btn"
                      color="black"
                      plain
                      @click.stop="evaluated(index)"
                    >查看评价</van-button>
                  </div>
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
      list: [],
      flag: false,
      page: 1
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //跳转详情
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    },
    //获取评价消息
    tobeEvaluated() {
      this.$api.tobeEvaluated().then(res => {
        this.evaluateList = res.data.list.reverse();
        // console.log(this.evaluateList);
      });
    },
    //查询已评价
    alreadyEvaluated() {
      // console.log(22);
      this.flag = false;
      this.$api.alreadyEvaluated(this.page).then(res => {
        if (res.code === 200) {
          if (res.data.count > this.alreadyList.length) {
            this.flag = true;
            this.page++;
            res.data.list.map(item => {
              this.alreadyList.push(item.goods[0]);
            });
            this.list.push(...res.data.list);
          } else {
            this.flag = true;
          }
        }

        // console.log(res.data.list);
        // console.log(res.data.list);
      });
    },
    //点击评论
    evaluate(cid) {
      this.$router.push({ name: "postevaluation", query: { id: cid } });
    },
    //查看评价
    evaluated(index) {
      this.$router.push({ name: "evaluationdetails" });
      this.$store.state.list = this.list[index];
      // console.log(this.$store.state.list);
    },
    //评价时间
    times(oldtime) {
      let nowtime = new Date();
      // valueOf是转换成时间戳
      let time =
        this.$dayjs(nowtime).valueOf() - this.$dayjs(oldtime).valueOf();
      let month = this.$dayjs(time).month();
      let days = time / (24 * 60 * 60 * 1000);
      let hours = time / (60 * 60 * 1000);
      let minu = time / (60 * 1000);
      if (month >= 1) {
        return parseInt(month + 1) + "月前";
      } else if (month < 1 && days >= 1) {
        return parseInt(days) + "天前";
      } else if (days < 1 && hours >= 1) {
        return parseInt(hours) + "小时前";
      } else if (hours < 1) {
        return parseInt(minu) + "分钟前";
      }
    }
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
    this.times();
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
      div {
        &:nth-child(2) {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
          .times {
            font-size: 14px;
            line-height: 29px;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
.wrapper {
  height: 55vh;
  overflow: hidden;
}
</style>