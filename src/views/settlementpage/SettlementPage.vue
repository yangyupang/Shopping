<template>
  <!-- 结算页面 -->
  <div>
    <my-top class="pay-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="pay">订单结算</div>
    </my-top>
    <div class="no-address" @click="address" v-if=" this.addressList ===null">
      <van-icon name="add-o" />
      <div>点击添加收货地址</div>
    </div>
    <div class="is-address" v-else>
      <div class="address-icon">
        <van-icon name="location-o" />
      </div>
      <div class="address-details">
        <div class="consignee">
          <div>收货人:{{addressList.name}}</div>
          <div>{{addressList.tel}}</div>
        </div>
        <div class="site">
          <div>收货地址:{{addressList.address + addressList.addressDetail}}</div>
        </div>
        <div class="prompt">(收货不便时,可选择免费待收货服务)</div>
      </div>
      <div class="address-change">
        <van-icon name="arrow" @click="address" />
      </div>
    </div>
    <div class="caitiao">
      <img src="../../assets/img/caitiao.jpg" alt />
    </div>
    <better-scroll class="wrapper">
      <goods-card v-for="item in this.$store.state.settlementList" :key="item.id">
        <div slot="left" class="goods-img" @click="details(item.cid || item.id)">
          <div class="imgs">
            <img :src="item.image_path" alt />
          </div>
        </div>
        <div slot="centre" class="goods" @click="details(item.cid || item.id)">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-price">￥{{item.present_price}}</div>
        </div>
        <div slot="right" class="count">×{{item.count}}</div>
      </goods-card>
    </better-scroll>
    <div class="invoicing">
      <div class="total">
        合计:
        <span>￥ {{sum}}</span>
      </div>
      <div class="invoicing-btn" @click="invoicingBtn">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [],
      idDirect: false
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
      this.$store.state.settlementList = [];
    },
    address() {
      this.$router.push("/addresslist");
    },
    //查询用户收获地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            this.addressList = res.address[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询用户默认收获地址
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          if (res.code === 200) {
            if (res.defaultAdd !== null) {
              this.addressList = res.defaultAdd;
            } else {
              this.getAddress();
            }
            //点击选择地址后展示出来
            if (this.$store.state.chosenAddress.name) {
              this.addressList = this.$store.state.chosenAddress;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    },
    //提交订单
    invoicingBtn() {
      this.$api
        .placeOrder({
          address: this.addressList.address + this.addressList.addressDetail,
          tel: this.addressList.tel,
          orderId: this.orderId,
          idDirect: this.idDirect,
          count: this.$store.state.settlementList[0].count
        })
        .then(res => {
          this.$toast(res.msg);
          this.$router.go(-1);
          this.$store.state.settlementList = [];
        });
    }
  },
  mounted() {
    this.getDefaultAddress();
    if (this.$route.params.item) {
      this.$store.state.settlementList.push(this.$route.params.item);
      this.idDirect = true;
    }

  },
  watch: {},
  computed: {
    sum() {
      let all = 0;
      this.$store.state.settlementList.map(item => {
        return (all += item.present_price * item.count);
      });
      return all.toFixed(2);
    },
    orderId() {
      let id = [];
      this.$store.state.settlementList.map(item => {
        if (item.id) {
          return id.push(item.id);
        } else {
          return id.push(item.cid);
        }
      });
      return id;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.pay-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .pay {
    font-size: 16px;
  }
}
.is-address {
  font-size: 16px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .address-icon {
    font-size: 20px;
    padding: 30px 10px;
  }
  .address-details {
    .consignee {
      font-size: 16px;
      display: flex;
      padding: 10px 0;
      justify-content: space-between;
    }
    .site {
      width: 265px;
      font-size: 14px;
      padding: 10px 0;
      div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .prompt {
      font-size: 14px;
      color: rgb(249, 204, 157);
    }
  }
  .address-change {
    font-size: 20px;
    padding: 30px 10px;
  }
}
.no-address {
  padding: 30px 0;
  background-color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
}
.caitiao {
  background-color: #fff;
  img {
    width: 100%;
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
    padding: 10px 0;
  }
  .goods-price {
    color: red;
    margin-top: 40px;
  }
}
.count {
  font-size: 16px;
  height: 16px;
  margin-top: 92px;
  text-align: center;
  width: 49px;
}
.wrapper {
  height: 69vh;
  overflow: hidden;
}
.invoicing {
  margin-top: 2px;
  height: 52px;
  background-color: #fff;
  display: flex;
  font-size: 16px;
  justify-content: flex-end;
  .total {
    height: 52px;
    line-height: 52px;
    margin-right: 20px;
    span {
      color: red;
    }
  }
  .invoicing-btn {
    background-color: rgb(255, 68, 68);
    color: #fff;
    padding: 20px;
  }
}
</style>