<template>
  <!-- 底部父路由 -->
  <div>
    <!-- <keep-alive include="classify"></keep-alive> -->
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o" name="home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="points" name="classify">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shoppingcart" icon="shopping-cart-o" name="shoppingcart">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o" name="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.active = this.$route.name;
  },
  watch: {
    $route(val) {
      // console.log(val);
      this.active = val.name;
    }
  },
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
// .top{
//   display: flex;
//   justify-content:space-around;
//   z-index: 999 !important;
// }
/deep/.van-tabbar {
  height: 10vh;
}
</style>