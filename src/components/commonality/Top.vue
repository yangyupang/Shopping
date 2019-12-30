<template>
  <div>
    <div class="top">
      <div>
        <slot name="left"></slot>
      </div>
      <div>
        <slot name="centre"></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
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
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
}
/deep/.van-search{
  padding: 0 !important;
}
</style>