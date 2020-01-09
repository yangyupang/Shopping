<template>
  <div>
    <div v-show="login" class="log">
      <van-loading size="24px" class="loging">加载中...</van-loading>
    </div>
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
  computed: {
    login() {
      return this.$store.state.login;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.log {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  z-index: 9999;
  background: black;
  opacity: 0.5;

  .loging {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    margin-left: -50px;
  }
}
</style>