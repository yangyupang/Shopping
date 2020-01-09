<template>
  <div ref="wrapper">
    <div class="scroll-content">
      <div class="pulldown-wrapper">
        <div v-show="beforePullDown">
          <span>下拉刷新</span>
        </div>
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <van-loading size="16px">加载中...</van-loading>
          </div>
        </div>
      </div>
      <slot class="height"></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false
    };
  },
  components: {},
  methods: {
    init() {
      if (this.bs) {
        this.bs.refresh();
      } else {
        this.bs = new BScroll(".wrapper", {
          scrollY: true,
          click: true,
          bounceTime: 2000,
          probeType: 3, // listening scroll hook,
          pullDownRefresh: {
            threshold: 50,
            stop: 0
          }
        });
      }
      this.bs.on("pullingDown", this.pullingDownHandler);
    },
    pullingDownHandler() {
      // console.log(111);
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit("func");
      this.$store.state.pullDown=true;
    },
    finishPullDown() {
      new Promise(resolve => {
        setTimeout(() => {
          this.bs.finishPullDown();
          resolve();
        }, 600);
      });
      setTimeout(() => {
        this.beforePullDown = true;
        this.$toast("刷新成功");
        this.bs.refresh();
        this.$store.state.pullDown=false;
      }, 1500);
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 500);
  },
  beforeDestroy() {},
  watch: {
    flag(val) {
      if (val) {
        setTimeout(() => {
          this.isPullingDown = false;
        }, 400);

        this.finishPullDown();
      }
    }
  },
  computed: {}
};
</script>

<style lang='scss'>
.pulldown-wrapper {
  // position: relative;
  // height: 100%;
  // overflow: hidden;
  font-size: 16px;
  text-align: center;
}
</style>