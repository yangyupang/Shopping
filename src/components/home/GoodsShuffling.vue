<template>
  <!-- 商品轮播图 -->
  <div class="container">
    <van-swipe :autoplay="3000" indicator-color="white" :stop-propagation="false">
      <van-swipe-item v-for="(item,index) in swipelist" :key="index">
        <img :src="item.image" alt class="swipeImage" @click="details(item.goodsId)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    swipelist: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    details(id){
      this.$router.push({name:'commoditydetails',query: {goodsId:id}})
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.container{
  height: 169px;
}
.swipeImage {
  width: 100%;
}
</style>