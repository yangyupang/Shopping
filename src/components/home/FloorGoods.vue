<template>
  <!-- 休闲食品  新鲜水果 营养奶品-->
  <div class="floorgoods">
    <div class="floortitle">
      <div>{{indx}}</div>
      <div>{{floorName}}</div>
    </div>
    <div class="floorgood">
      <div class="floorgood-left">
        <div>
          <img :src="goods[0].image" alt />
        </div>
        <div>
          <img :src="goods[3].image" alt class="left-img2" />
        </div>
      </div>
      <div class="floorgood-rigth">
        <div>
          <img :src="goods[1].image" alt  class="rigth-img"/>
        </div>
        <div>
          <img :src="goods[2].image" alt  class="rigth-img"/>
        </div>
        <div>
          <img :src="goods[4].image" alt />
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
    goods: {
      type: Array,
      default: () => []
    },
    floorName: {
      type: String,
      default: ""
    },
    indx: {
      type: String,
      default: ""
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
.floorgoods {
  margin: 15px 0;
  .floortitle {
    font-size: 16px;
    margin-bottom: 10px;
    justify-content: center;
    display: flex;
    div {
      &:nth-child(1) {
        background-color: red;
        color: #fff;
        border-radius: 50%;
        padding: 2px;
      }
      &:nth-child(2) {
        color: red;
        line-height: 20px;
        margin-left: 5px;
      }
    }
  }
  .floorgood {
    display: flex;
    background-color: #fff;
    .floorgood-left {
      div {
        border-right: 1px solid rgb(233, 232, 232);
        img {
          width: 100%;
        }
      }
      .left-img2 {
        border-top: 1px solid rgb(233, 232, 232);
      }
    }
  }
  .floorgood-rigth {
    div {
      img {
        width: 100%;
      }
    }
    .rigth-img{
      border-bottom: 1px solid rgb(233, 232, 232);
    }
  }
}
</style>