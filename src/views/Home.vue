<template>
  <div>
    <my-top>
      <div slot="left" class="city">
        <span v-if="city !=='' ">{{city}}</span>
        <span v-else>定位中..</span>
        <img src="../../src/assets/img/city-icon.svg" alt />
      </div>
      <div slot="centre">
        <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
      </div>
      <div slot="right" class="search">搜索</div>
    </my-top>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <better-scroll>
        <!-- 商品轮播 -->
        <GoodsShuffling :swipelist="list.slides" class="swipe"></GoodsShuffling>
        <!-- 新鲜水果，中外名酒 -->
        <Recommend :recommend="list.category" class="swipe"></Recommend>
        <!-- 广告  内测期间 仅对公司内部配送 -->
        <img :src="picture" alt class="delivery" />
        <!-- 商品推荐 -->
        <GoodsRecommend :goodsrecommend="list.recommend" class="swipe"></GoodsRecommend>
        <!-- 1F休闲水果 -->
        <LeisureGoods :leisuregoods="list.floor1" class="swipe"></LeisureGoods>
      </better-scroll>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsShuffling from "../../src/components/home/GoodsShuffling";
import Recommend from "../../src/components/home/Recommend";
import GoodsRecommend from "../../src/components/home/GoodsRecommend";
import LeisureGoods from "../../src/components/home/LeisureGoods";
export default {
  data() {
    return {
      city: "",
      searchValue: "",
      list: {},
      isLoading: false,
      picture:"",
    };
  },
  components: { GoodsShuffling, Recommend,GoodsRecommend,LeisureGoods },
  methods: {
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.list = res.data;
          this.picture=res.data.advertesPicture.PICTURE_ADDRESS;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },
  mounted() {
    let _this = this;
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: "RB", //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "err", onError);
    });
    //解析定位结果
    function onComplete(data) {
      _this.city = data.addressComponent.city;
    }
    //解析定位错误信息
    function onError(data) {}
    this.recommend();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.lh {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  font-size: 20px;
}
.city {
  display: flex;
  padding: 5px;
  font-size: 16px;
  width: 96px;
  span {
    line-height: 30px;
  }
  img {
    display: block;
    width: 32px;
  }
}
.search {
  padding: 2.667vw 3.2vw;
  font-size: 16px;
  width: 56px;
}
.swipe {
  margin-bottom: 10px;
}
.delivery {
  width: 100vw;
  margin-bottom: 10px;
}
</style>