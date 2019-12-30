<template>
  <!-- 我的 -->
  <div>
    <my-top>
      <div slot="centre">会员中心</div>
    </my-top>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    localStorage.getItem("args");
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>