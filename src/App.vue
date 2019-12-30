<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="scss">
@import "./styles/common";
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
body{
  background-color: #ececec;
}
</style>
