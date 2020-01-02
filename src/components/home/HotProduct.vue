<template>
  <!-- 热销商品 -->
  <div class="hotproduct">
    <div class="hot">热销商品</div>
    <div class="product">
      <div
        @click="details(item.goodsId)"
        class="product-item"
        v-for="(item,index) in hotproduct"
        :key="index"
      >
        <img :src="item.image" alt />
        <div class="productname">{{item.name}}</div>
        <div class="price">
          <span>￥{{item.mallPrice}}</span>
          <span>￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    hotproduct: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    details(id) {
      this.$router.push({ name: "commoditydetails", params: { goodsId: id } });
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.hotproduct {
  background-color: #fff;
  height: 2419px;
  .hot {
    color: red;
    font-size: 16px;
    text-align: center;
    padding: 10px;
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      border-bottom: 1px solid rgb(233, 232, 232);
      border-right: 1px solid rgb(233, 232, 232);
      img {
        width: 186px;
      }
      .productname {
        font-size: 14px;
        width: 186px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: red;
        text-align: center;
      }
      .price {
        display: flex;
        justify-content: center;
        margin: 10px;
        span {
          &:nth-child(1) {
            font-size: 14px;
          }
          &:nth-child(2) {
            font-size: 12px;
            text-decoration: line-through;
            color: red;
            margin: 2px 4px;
          }
        }
      }
    }
  }
}
</style>