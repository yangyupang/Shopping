<template>
  <div ref="wrapper">
    <div class="scroll-content">
      <slot class="height"></slot>
      <div class="pullup-wrapper">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">没有更多了~</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
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
      isPullUpLoad: false
    };
  },
  components: {},
  methods: {
    init() {
      if (this.bs) {
        this.bs.refresh();
      } else {
        this.bs = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          pullUpLoad: {
            threshold: 50
          },
          probeType: 3 // listening scroll hook,
        });
      }
      // this.bs.on("pullingUp", () => {
      //   console.log(111);
      //   this.$emit("pullUp");
      // });
      this.bs.on("pullingUp", this.pullingUpHandler);
    },

    pullingUpHandler() {
      this.isPullUpLoad = true;
      setTimeout(() => {
        // console.log(11);
        this.$emit("pullUp");
      }, 1000);
      this.bs.refresh();
      this.isPullUpLoad = false;
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
          this.bs.finishPullUp();
        }, 0);
      }
    }
  },
  computed: {}
};
</script>

<style lang='scss'>
.pullup-wrapper {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>