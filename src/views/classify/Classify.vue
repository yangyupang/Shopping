<template>
  <!-- 分类 父路由 -->
  <div>
    <my-top class="classify-top">
      <div slot="centre" class="classify-title">商品分类</div>
    </my-top>
    <div class="classify-content">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item,index) in categorylist"
          :key="index"
        />
      </van-sidebar>
      <div v-if="this.num === 0" class="classify-details">
        <div v-for="(item,index) in categorylist" :key="index">
          <van-tabs v-if="item.mallCategoryId === '1'" @click="onClick" title-active-color="red" :ellipsis="false">
            <better-scroll>
              <van-tab
                v-for="item0 in item.bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div class="classification" v-for="item1 in classificationlist" :key="item1.id">
                  <div class="goods-img">
                    <img :src="item1.image" alt />
                  </div>
                  <div class="goods-describe">
                    <div class="goods-name">{{item1.name}}</div>
                    <div class="goods-price">
                      <div>￥{{item1.present_price}}</div>
                      <div>￥{{item1.orl_price}}</div>
                    </div>
                  </div>
                </div>
                <!-- {{item0.mallSubId}} -->
              </van-tab>
            </better-scroll>
          </van-tabs>
        </div>
      </div>
      <div v-if="this.num === 1" class="classify-details">
        <div v-for="(item,index) in categorylist" :key="index">
          <van-tabs v-if="item.mallCategoryId === '2'" @click="onClick" title-active-color="red" :ellipsis="false">
            <better-scroll>
              <van-tab
                v-for="item0 in item.bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div class="classification" v-for="item1 in classificationlist" :key="item1.id">
                  <div class="goods-img">
                    <img :src="item1.image" alt />
                  </div>
                  <div class="goods-describe">
                    <div class="goods-name">{{item1.name}}</div>
                    <div class="goods-price">
                      <div>￥{{item1.present_price}}</div>
                      <div>￥{{item1.orl_price}}</div>
                    </div>
                  </div>
                </div>
                <!-- {{item0.mallSubId}} -->
              </van-tab>
            </better-scroll>
          </van-tabs>
        </div>
      </div>
      <div v-if="this.num === 2" class="classify-details">
        <div v-for="(item,index) in categorylist" :key="index">
          <van-tabs v-if="item.mallCategoryId === '3'" @click="onClick" title-active-color="red" :ellipsis="false">
            <better-scroll>
              <van-tab
                v-for="item0 in item.bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div class="classification" v-for="item1 in classificationlist" :key="item1.id">
                  <div class="goods-img">
                    <img :src="item1.image" alt />
                  </div>
                  <div class="goods-describe">
                    <div class="goods-name">{{item1.name}}</div>
                    <div class="goods-price">
                      <div>￥{{item1.present_price}}</div>
                      <div>￥{{item1.orl_price}}</div>
                    </div>
                  </div>
                </div>
                <!-- {{item0.mallSubId}} -->
              </van-tab>
            </better-scroll>
          </van-tabs>
        </div>
      </div>
      <div v-if="this.num === 3" class="classify-details">
        <div v-for="(item,index) in categorylist" :key="index">
          <van-tabs v-if="item.mallCategoryId === '4'" @click="onClick" title-active-color="red" :ellipsis="false">
            <better-scroll>
              <van-tab
                v-for="item0 in item.bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div class="classification" v-for="item1 in classificationlist" :key="item1.id">
                  <div class="goods-img">
                    <img :src="item1.image" alt />
                  </div>
                  <div class="goods-describe">
                    <div class="goods-name">{{item1.name}}</div>
                    <div class="goods-price">
                      <div>￥{{item1.present_price}}</div>
                      <div>￥{{item1.orl_price}}</div>
                    </div>
                  </div>
                </div>
                <!-- {{item0.mallSubId}} -->
              </van-tab>
            </better-scroll>
          </van-tabs>
        </div>
      </div>
      <div v-if="this.num === 4" class="classify-details">
        <div v-for="(item,index) in categorylist" :key="index">
          <van-tabs v-if="item.mallCategoryId === '5'" @click="onClick" title-active-color="red" :ellipsis="false">
            <better-scroll>
              <van-tab
                v-for="item0 in item.bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div class="classification" v-for="item1 in classificationlist" :key="item1.id">
                  <div class="goods-img">
                    <img :src="item1.image" alt />
                  </div>
                  <div class="goods-describe">
                    <div class="goods-name">{{item1.name}}</div>
                    <div class="goods-price">
                      <div>￥{{item1.present_price}}</div>
                      <div>￥{{item1.orl_price}}</div>
                    </div>
                  </div>
                </div>
                <!-- {{item0.mallSubId}} -->
              </van-tab>
            </better-scroll>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      categorylist: [],
      num: 0,
      classificationlist: []
    };
  },
  components: {},
  methods: {
    onChange(index) {
      // this.$toast(index);
      this.num = index;
      if (index === 0) {
        //默认新鲜水果的热带水果项
        this.$api
          .category("2c9f6c946016ea9b016016f79c8e0000")
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (index === 1) {
        //默认中外名酒的白酒项
        this.$api
          .category("2c9f6c9460337d540160337fefd60000")
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (index === 2) {
        //默认营养奶品的鲜奶选项
        this.$api
          .category("402880e86016d1b5016016e135440011")
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (index === 3) {
        //默认食品饮料的饼干糕点选项
        this.$api
          .category("2c9f6c94609a62be0160a02d1dc20021")
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (index === 4) {
        //默认个人护理的进口护理选项
        this.$api
          .category("2c9f6c94621970a801626a35cb4d0175")
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onClick(name, title) {
      // this.$toast(title);//title是标题名字
      // this.$toast(name); //name我绑定的是水果的mallSubId
      this.$api
        .category(name)
        .then(res => {
          // console.log(res);
          this.classificationlist = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 侧边栏数据
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.categorylist = res.data.category;
          // console.log(floorname);
        })
        .catch(err => {
          console.log(err);
          get;
        });
    },
    //初始化数据 默认新鲜水果的热带水果选项
    getClassification() {
      this.$api
        .category("2c9f6c946016ea9b016016f79c8e0000")
        .then(res => {
          // console.log(res);
          this.classificationlist = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.recommend();
    this.getClassification();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.classify-top {
  background: #fff;
  font-size: 16px;
  margin-bottom: 5px;
  .classify-title {
    padding: 10px;
  }
}
.classify-content {
  display: flex;
}
/deep/ .van-sidebar {
  background-color: #fff;
  width: 85px;
}
.classify-details {
  width: 292px;
  .classification {
    display: flex;
    background-color: #fff;
    .goods-img {
      width: 134px;
      padding: 10px;
      img {
        width: 134px;
      }
    }
    .goods-describe {
      padding: 10px;
      .goods-name {
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
      .goods-price {
        display: flex;
        margin-top: 78px;
        div {
          &:nth-child(1) {
            font-size: 14px;
            color: red;
            font-weight: 700;
          }
          &:nth-child(2) {
            font-size: 12px;
            text-decoration: line-through;
            margin: 2px 5px;
          }
        }
      }
    }
  }
}
</style>