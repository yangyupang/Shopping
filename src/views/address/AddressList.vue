<template>
  <!-- 地址列表 -->
  <div>
    <van-sticky>
      <my-top class="address-top">
        <div slot="left" class="back" @click="back">
          <van-icon name="arrow-left" />
        </div>
        <div slot="centre" class="address">地址列表</div>
      </my-top>
    </van-sticky>

    <div v-if="addressList.length<= 0">
      <div class="no-address">暂无收获地址</div>
      <div class="newaddress" @click="newaddress">新增地址</div>
    </div>
    <div v-else class="is-address">
      <!-- @select="onSelect" -->
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { parse } from "querystring";
export default {
  data() {
    return {
      addressList: [],
      chosenAddressId: "1",
      default: {}
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 修改地址
    onEdit(item) {
      // console.log(item);
      this.$router.push({ name: "editaddress", params: { val: item } });
    },
    //添加新地址
    onAdd() {
      this.$router.push("/editaddress");
    },
    //添加新地址
    newaddress() {
      this.$router.push("/editaddress");
    },
    //查询用户收获地址
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            this.addressList = res.address;
            // console.log(this.addressList);
            let defaultAddress;
            // 循环收获地址将默认选项置顶并且选中
            for (let i = 0; i < this.addressList.length; i++) {
              if (this.addressList[i].isDefault === true) {
                defaultAddress = this.addressList[i];
                defaultAddress.id = "1";
                this.addressList.splice(i, 1);
                this.addressList.unshift(defaultAddress);
              } else {
                this.addressList[i].id = String(i + 2);
              }
            }
            this.chosenAdd();
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
            this.default = res.defaultAdd;
            // console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选中某一项地址
    onSelect(item) {
      this.$store.state.chosenAddress = item;
    },
    //没有默认地址选择第一项
    chosenAdd() {
      //每一项都没有设置默认
      if (this.addressList.length > 1) {
        this.addressList.map(item => {
          if (item.isDefault === false) {
            this.addressList[0].id = "1";
          }
        });
      }
      // 只有一项的时候默认选择
      else if (this.addressList.length === 1) {
        this.addressList[0].id = "1";
      }
    }
  },
  mounted() {
    this.getAddress();
    this.getDefaultAddress();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.address-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .address {
    font-size: 16px;
  }
}
.no-address {
  width: 100vw;
  height: 517px;
  background-color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 16px;
  color: #d3d0d0;
}
.is-address {
  width: 100vw;
  height: 84.4vh;
  background-color: #fff;
}
.newaddress {
  padding: 20px 0;
  background-color: rgb(255, 85, 62);
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100vw;
  // position:absolute;
}
/deep/ .van-radio__icon{
  font-size: 5.333vw !important;
}
</style>