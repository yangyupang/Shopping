<template>
  <div class="home">
    <my-top class="top">
      <div slot="left" class="city" @click="changecity(city)">
        <span v-if="city !=='' ">{{city}}</span>
        <span v-else>定位中..</span>
        <img src="../../src/assets/img/city-icon.svg" alt />
      </div>
      <div slot="centre" class="search">
        <van-search placeholder="请输入搜索关键词" v-model="searchValue" @focus="focusing" />
      </div>
      <div slot="right" class="closeSearch" v-if="show" @click="closeSearch">取消</div>
    </my-top>
    <!-- <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      v-if="list.floor1"
    >    </van-pull-refresh>-->
    <bs-home v-if="list.floor1" class="wrapper" @func="recommend" :flag="flag">
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
    </bs-home>

    <!-- 加载 -->
    <van-loading size="24px" vertical v-else>加载中...</van-loading>
    <van-popup v-model="show" position="bottom" :style="{ height: '92.2%' }" :overlay="false">
      <div v-if="searchlist.length !==0">
        <div v-if="this.$store.state.search.length !==0" class="search-history">
          <div style="padding:10px 0 0 10px">历史记录</div>
          <div class="histor">
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
        </div>
        <!-- <div  @click="details(item.id)"></div><div class="itemname" v-html="item.name"></div> -->
        <goods-card v-for="(item,index) in searchlist" :key="index" class="sty">
          <div slot="left" class="goods-img" @click="details(item.id)">
            <div class="imgs">
              <img :src="item.image_path" alt />
            </div>
          </div>
          <div slot="centre" class="goods" @click="details(item.id)">
            <div class="goods-name" v-html="item.name"></div>
            <div class="goods-price">￥{{item.present_price}}</div>
          </div>
          <!-- <div slot="right" style="width: 50px;"></div> -->
          <!-- <van-divider /> -->
        </goods-card>
      </div>
      <div v-else>
        <div v-if="this.$store.state.search.length !==0" class="search-history">
          <div style="padding:10px 0 0 10px">历史记录</div>
          <div class="histor">
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
        </div>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import GoodsShuffling from "../../src/components/home/GoodsShuffling";
import Recommend from "../../src/components/home/Recommend";
import GoodsRecommend from "../../src/components/home/GoodsRecommend";
import FloorGoods from "../../src/components/home/FloorGoods";
import HotProduct from "../../src/components/home/HotProduct";
import util from "../../src/assets/js/util.js";
Vue.prototype.$util = util;

export default {
  name: "home",
  data() {
    return {
      searchValue: "",
      list: [],
      isLoading: false,
      picture: "",
      floorname: "",
      show: false,
      searchlist: [],
      flag: false,
      user: ""
    };
  },
  components: {
    GoodsShuffling,
    Recommend,
    GoodsRecommend,
    FloorGoods,
    HotProduct,
  },
  methods: {
    //首页数据获取
    recommend() {
      this.flag = false;
      this.$api
        .recommend()
        .then(res => {
          if (res.code === 200) {
            this.flag = true;
            this.list = res.data;
            this.picture = res.data.advertesPicture.PICTURE_ADDRESS;
            this.floorname = res.data.floorName;
            this.$store.state.category = res.data.category;
          }

          // console.log(floorname);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择城市
    changecity(val) {
      if (val === "") {
        this.$toast("定位中~请稍后。。。");
      } else this.$router.push({ name: "city", params: { city: val } });
    },
    //输入框聚焦时弹出
    focusing() {
      this.show = true;
    },
    //关闭搜索
    closeSearch() {
      this.searchValue = "";
      this.searchlist = [];
      this.show = false;
    },
    //清空搜索记录
    empty() {
      this.$dialog
        .confirm({
          title: "删除历史记录",
          message: "您确定要删除吗？"
        })
        .then(() => {
          this.$store.state.search = [];
          this.$toast("删除成功");
          // on confirm
        })
        .catch(() => {
          this.$toast("您取消了删除操作");
          // on cancel
        });
    },
    //点击历史纪录用于搜索
    history(val) {
      this.searchValue = val;
    },
    //跳转详情
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
      if (!this.$store.state.search.some(item => item === this.searchValue)) {
        this.$store.state.search.push(this.searchValue);
      }
    },
    //获取购物车数据
    getCard() {
      this.$api
        .getCard()
        .then(res => {
          this.cartlist = res.shopList;
          if (this.user) {
            if (res.shopList.length >= 0) {
              this.$store.state.shoppingcart = res.shopList;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // console.log(this.$util);
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
    this.getCard();
    if (localStorage.getItem("args") !== "") {
      this.user = localStorage.getItem("args");
    }
    //搜索监听
    this.$watch(
      "searchValue",
      this.$util.throttle(() => {
        if (this.searchValue === "") {
          this.searchlist = [];
        } else {
          this.$api
            .search({ value: this.searchValue.trim(), page: 1 })
            .then(res => {
              this.searchlist = res.data.list;
              this.searchlist.forEach(item => {
                item.name = this.$util.keyWord(
                  item.name,
                  this.searchValue.trim()
                );
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200)
    );
  },
  watch: {},
  computed: {
    city() {
      return this.$store.state.city;
    },
    search() {
      return this.$store.state.search;
    }
  },
  filters: {}
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
  height: 84.4vh;
  overflow: hidden;
  margin-top: -16px;
}
.itemname {
  font-size: 16px;
  padding: 10px;
}
//搜索历史
.search-history {
  font-size: 16px;
  //历史纪录展示
  .histor {
    display: flex;
    .history {
      width: 80%;
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
.no-data {
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
}
.goods-img {
  .imgs {
    width: 115px;
    padding: 5px;
  }
  img {
    width: 103px;
  }
}
.goods {
  font-size: 16px;
  .goods-name {
    padding: 10px 0;
  }
  .goods-price {
    color: red;
    margin-top: 40px;
  }
}
.sty {
  /deep/ .card {
    justify-content: flex-start !important;
  }
}
</style>