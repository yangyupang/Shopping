<template>
  <!-- 我的订单 -->
  <div>
    <my-top class="myorder-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="myorder">我的订单</div>
    </my-top>
    <van-tabs v-model="active">
      <van-tab title="全部" name="0">
        <div class="all">功能尚未开发！尽情期待！</div>
      </van-tab>
      <van-tab title="待付款" name="1">
        <div class="all">功能尚未开发！尽情期待！</div>
      </van-tab>
      <van-tab title="待发货" name="2">
        <div class="all">功能尚未开发！尽情期待！</div>
      </van-tab>
      <van-tab title="待收货" name="3">
        <div class="all">功能尚未开发！尽情期待！</div>
      </van-tab>
      <van-tab title="已完成" name="4">
        <better-scroll class="wrapper">
          <div class="order" v-for="item in completedList" :key="item.id">
            <div class="order_id">
              <div>订单编号:{{item.order_id}}</div>
              <div class="achieve">交易完成</div>
            </div>
            <!-- 商品 -->
            <div
              v-for="item0 in item.order_list"
              :key="item0.id"
              class="achieve-goods"
              @click="details(item0.cid || item0.id)"
            >
              <div class="goods-img">
                <img :src="item0.image_path" alt />
              </div>
              <div class="goods-name">{{item0.name}}</div>
              <div class="goods-count-price">
                <div class="goods-price">￥{{item0.present_price}}</div>
                <div class="goods-count">×{{item0.count}}</div>
              </div>
            </div>
            <!-- 订单创建时间 -->
            <div class="order-details">
              <div>创建时间:{{item.add_time}}</div>
              <div>收货地址:{{item.address}}</div>
              <div>共{{item.count}}件商品 &nbsp; 合计:￥{{item.mallPrice}}</div>
            </div>
          </div>
        </better-scroll>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "myorder",
  data() {
    return {
      active:'',
      completedList: []
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/my");
    },
    //跳转详情
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    },
    getMyOrder() {
      this.$api.getMyOrder().then(res => {
        this.completedList = res.list;
        this.completedList.map(item => {
          this.totalcount = 0;
          item.order_list.map(item0 => {
            this.totalcount += item0.count;
          });
          item.count = this.totalcount;
        });
      });
    }
  },
  mounted() {
    this.getMyOrder();
    this.active= this.$route.query.active;
    // console.log(this.active);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.myorder-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .myorder {
    font-size: 16px;
  }
}
.all {
  font-size: 16px;
  height: 85vh;
  background-color: #fff;
  text-align: center;
  color: skyblue;
}
.order {
  width: 340px;
  border-radius: 10px;
  background-color: #fff;
  margin: 15px auto;
  padding: 5px;
  font-size: 14px;
  .order_id {
    display: flex;
    padding-bottom: 5px;
    border-bottom: 1px solid #b1adad;
    justify-content: space-between;
    .achieve {
      color: red;
    }
  }
  .achieve-goods {
    display: flex;
    margin: 10px 0;
    justify-content: space-around;
    .goods-img {
      width: 57px;
      height: 57px;
      img {
        width: 57px;
        height: 57px;
        border: 1px solid #b1adad;
        border-radius: 5px;
      }
    }
    .goods-name {
      width: 206.8px;
    }
    .goods-count-price {
      text-align: center;
    }
  }
  .order-details {
    margin: 10px 0;
    border-top: 1px solid #b1adad;
    text-align: end;
    line-height: 20px;
  }
}
.wrapper {
  height: 85vh;
  overflow: hidden;
}
/deep/ .van-tab {
  flex-basis: 20% !important;
}
</style>