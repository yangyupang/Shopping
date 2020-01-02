<template>
  <div class="home">
    <my-top class="top">
      <div slot="left" class="city" @click="changecity(city)">
        <span v-if="city !=='' ">{{city}}</span>
        <span v-else>定位中..</span>
        <img src="../../src/assets/img/city-icon.svg" alt />
      </div>
      <div slot="centre" class="search">
        <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
      </div>
      <div slot="right" class="closeSearch" v-if="show" @click="closeSearch">取消</div>
    </my-top>
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      v-if="list.floor1"
    >
      <better-scroll v-if="list.floor1" class="wrapper">
        <!-- 商品轮播 -->
        <GoodsShuffling :swipelist="list.slides" class="swipe"></GoodsShuffling>
        <!-- 新鲜水果，中外名酒 -->
        <Recommend :recommend="list.category" class="swipe"></Recommend>
        <!-- 广告  内测期间 仅对公司内部配送 -->
        <div class="delivery">
          <img :src="picture" alt />
        </div>
        <!-- 商品推荐 -->
        <GoodsRecommend :goodsrecommend="list.recommend" class="swipe"></GoodsRecommend>
        <!-- 1F休闲食品 -->
        <FloorGoods :goods="list.floor1" :floorName="floorname.floor1" indx="1F" class="swipe"></FloorGoods>
        <!-- 2F新鲜水果 -->
        <FloorGoods :goods="list.floor2" :floorName="floorname.floor2" indx="2F" class="swipe"></FloorGoods>
        <!-- 3F营养奶品 -->
        <FloorGoods :goods="list.floor3" :floorName="floorname.floor3" indx="3F" class="swipe"></FloorGoods>
        <!-- 热销商品 -->
        <HotProduct :hotproduct="list.hotGoods" class="swipe"></HotProduct>
        <!-- <div class="perch"></div> -->
      </better-scroll>
    </van-pull-refresh>
    <!-- 加载 -->
    <van-loading size="24px" vertical v-else>加载中...</van-loading>

    <van-popup v-model="show" position="bottom" :style="{ height: '92.2%' }" :overlay="false">
      <div v-if="this.$store.state.search.length !==0" class="search-history">
        <div class="history">
          <div
            v-for="item in search"
            :key="item.id"
            class="history-item"
            @click="history(item)"
          >{{item}}</div>
        </div>
        <div class="empty" @click="empty">清除</div>
      </div>
      <div v-for="item in searchlist" :key="item.id" @click="details(item.id)">
        <div class="itemname">{{item.name}}</div>
        <van-divider />
      </div>
    </van-popup>
  </div>
</template>

<script>
import GoodsShuffling from "../../src/components/home/GoodsShuffling";
import Recommend from "../../src/components/home/Recommend";
import GoodsRecommend from "../../src/components/home/GoodsRecommend";
import FloorGoods from "../../src/components/home/FloorGoods";
import HotProduct from "../../src/components/home/HotProduct";
export default {
  data() {
    return {
      searchValue: "",
      list: [],
      isLoading: false,
      picture: "",
      floorname: "",
      show: false,
      searchlist: []
    };
  },
  components: {
    GoodsShuffling,
    Recommend,
    GoodsRecommend,
    FloorGoods,
    HotProduct
  },
  methods: {
    //首页数据获取
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.list = res.data;
          this.picture = res.data.advertesPicture.PICTURE_ADDRESS;
          this.floorname = res.data.floorName;
          this.$store.state.category = res.data.category;
          // console.log(floorname);
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
    },
    //选择城市
    changecity(val) {
      if (val === "") {
        this.$toast("定位中~请稍后。。。");
      } else this.$router.push({ name: "city", params: { city: val } });
    },
    //关闭搜索
    closeSearch() {
      // if (this.$store.state.search) {}
      if (!this.$store.state.search.some(item => item === this.searchValue)) {
        this.$store.state.search.push(this.searchValue);
      }
      this.searchValue = "";
    },
    //清空搜索记录
    empty() {
      this.$store.state.search = [];
    },
    //点击历史纪录用于搜索
    history(val) {
      this.searchValue = val;
    },
    //跳转详情
    details(id) {
      this.$router.push({ name: "commoditydetails", params: { goodsId: id } });
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
      _this.$store.state.city = data.addressComponent.city;
      // console.log(data);
      // console.log(11);
    }
    //解析定位错误信息
    function onError(data) {}
    this.recommend();
  },
  watch: {
    //搜索赋值
    searchValue(val) {
      if (val !== "") {
        this.show = true;
        this.$api
          .search({ value: val, page: 1 })
          .then(res => {
            this.searchlist = res.data.list;
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.show = false;
      }
    }
  },
  computed: {
    city() {
      return this.$store.state.city;
    },
    search() {
      return this.$store.state.search;
    }
  },
  filters: {
    // coloring(val) {
    //   return JSON.stringify(this.searchlist).includes(val);
    // }
  }
};
</script>

<style scoped lang='scss'>
.top {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #ececec;
}

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
  width: 218px;
}
.closeSearch {
  padding: 0 9px;
  font-size: 16px;
}
.swipe {
  margin: 10px 0;
}
.delivery {
  width: 100vw;
  margin-bottom: 10px;
  height: 33.4px;
  img {
    width: 100%;
  }
}
.home {
  padding-bottom: 13.333vw;
}

.wrapper {
  height: 83vh;
  overflow: hidden;
}
.itemname {
  font-size: 16px;
  padding: 10px;
}
//搜索历史
.search-history {
  display: flex;
  .history {
    width: 80%;
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    .history-item {
      height: 15px;
      line-height: 15px;
      text-align: center;
      padding: 5px;
      border: 1px solid black;
      border-radius: 5px;
      margin: 10px;
    }
  }
  .empty {
    font-size: 16px;
    height: 20px;
    border: 1px solid black;
    border-radius: 5px;
    line-height: 20px;
    text-align: center;
    padding: 5px;
    margin-top: 10px;
  }
}
</style>