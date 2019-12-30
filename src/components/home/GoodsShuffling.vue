<template>
  <!-- 商品轮播图 -->
  <div class="container">
    <van-swipe :autoplay="3000" indicator-color="white" :stop-propagation="false">
      <van-swipe-item v-for="(item,index) in swipelist" :key="index">
        <img :src="item.image" alt class="swipeImage" />
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
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.swipeImage {
  width: 100%;
}
</style>