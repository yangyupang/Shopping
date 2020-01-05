<template>
  <!-- 编辑地址 -->
  <div>
    <my-top class="editaddress-top">
      <div slot="left" class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div slot="centre" class="editaddress">编辑地址</div>
    </my-top>
    <div class="addresslist">
      <van-address-edit
        :area-list="areaList"
        :show-delete="flag"
        show-set-default
        show-search-result
        :addressInfo="AddressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-default="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import area from "../../assets/js/area";
export default {
  data() {
    return {
      areaList: area,
      searchResult: [],
      flag: false,
      AddressInfo: {},
      default: {},
      detail: false
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //保存地址
    onSave(val) {
      //所有信息填完后才调用接口存入收货地址信息
      this.$api
        .postAddress({
          name: val.name,
          tel: val.tel,
          province: val.province,
          city: val.city,
          county: val.county,
          addressDetail: val.addressDetail,
          isDefault: val.isDefault,
          areaCode: val.areaCode,
          address: val.province + val.city + val.county,
          id: this.AddressInfo ? this.AddressInfo._id : undefined
        })
        .then(res => {
          this.$toast(res.msg);
          this.$router.go(-1);
          // 修改默认地址
          if (this.detail) {
            // this.default
            this.$api.postAddress({
              name: this.default.name,
              tel: this.default.tel,
              province: this.default.province,
              city: this.default.city,
              county: this.default.county,
              addressDetail: this.default.addressDetail,
              isDefault: false,
              areaCode: this.default.areaCode,
              address: this.default.province + this.default.city + this.default.county,
              id: this.default._id
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除地址
    onDelete(val) {
      this.$api.deleteAddress(val._id).then(res => {
        this.$toast(res.msg);
        this.$router.go(-1);
      });
    },
    //查询用户默认收获地址
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          if (res.code === 200) {
            this.default = res.defaultAdd;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改是否默认时触发
    onChangeDetail(val) {
      if (val) {
        this.detail = val;
      }
    }
  },
  mounted() {
    // 传参用于渲染点击修改跳转过来的页面
    if (this.$route.params.val) {
      this.flag = true;
      this.AddressInfo = this.$route.params.val;
    }
    // 调用 查询用户默认收获地址
    this.getDefaultAddress();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.editaddress-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .editaddress {
    font-size: 16px;
  }
}
.addresslist {
  width: 100vw;
  height: 92vh;
  font-size: 16px;
  background-color: #fff;
}
</style>