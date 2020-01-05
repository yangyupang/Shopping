<template>
  <!-- 结算页面 -->
  <div>
    <my-top class="pay-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="pay">订单结算</div>
    </my-top>
    <div class="is-address"></div>
    <div class="no-address" @click="address">
      <van-icon name="add-o" />
      <div>点击添加收货地址</div>
    </div>
    <div class="caitiao">
      <img src="../../assets/img/caitiao.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [],
      default: {}
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
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
            // console.log(res.address[0]);
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
            if (res.defaultAdd !==null) {
              this.default = res.defaultAdd;
              // console.log(res.defaultAdd);
            } else {
              this.getAddress();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDefaultAddress();
    console.log(this.$route.params.settlementList);
  },
  watch: {},
  computed: {},
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
</style>