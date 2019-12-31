<template>
  <div>
    <div class="recommend">
      <div v-for="(item,index) in recommend" :key="index" class="recommends" @click="goClassify(item.mallCategoryId)">
        <img :src="item.image" alt />
        <span>{{item.mallCategoryName}}</span>
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
    recommend: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    goClassify(val){
      this.$router.push({name:'classify',params: {CategoryId:val}});
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.recommend {
  width: 95%;
  margin: 0 auto;
  height: 92px;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 5px 5px;
  .recommends {
    width: 18%;
    img {
      width: 100%;
    }
    span{
        font-size: 16px;
    }
  }
}
</style>