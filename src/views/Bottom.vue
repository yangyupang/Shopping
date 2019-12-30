<template>
  <!-- 底部父路由 -->
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="points">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingcart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
.top{
  display: flex;
  justify-content:space-around;
  z-index: 999 !important;
}
</style>