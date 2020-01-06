<template>
  <!-- 分类  -->
  <div>
    <my-top class="classify-top">
      <div slot="centre" class="classify-title">商品分类</div>
    </my-top>
    <div class="classify-content">
      <!-- 侧边栏 -->
      <van-sidebar v-model="CategoryId" @change="onChange">
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item,index) in categorylist"
          :key="index"
        />
      </van-sidebar>
      <!-- 商品数据 -->
      <div class="classify-details">
        <div>
          <van-tabs
            v-if="categorylist[CategoryId]"
            @click="onClick"
            title-active-color="red"
            :ellipsis="false"
            v-model="active"
          >
            <better-scroll class="wrapper" v-if="categorylist[CategoryId]">
              <van-tab
                v-for="item0 in categorylist[CategoryId].bxMallSubDto"
                :key="item0.id"
                :title="item0.mallSubName"
                :name="item0.mallSubId"
              >
                <div
                  class="classification"
                  v-for="item1 in classificationlist"
                  :key="item1.id"
                  @click="details(item1.id)"
                >
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
            <!-- 加载 -->
            <van-loading size="24px" vertical v-else>加载中...</van-loading>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name:'classify',
  data() {
    return {
      CategoryId: 0,
      // categorylist: [],
      classificationlist: [],
      active: 0,
      default: 0
    };
  },
  components: {},
  methods: {
    // 点击侧边栏切换商品显示的默认值
    onChange(index) {
      this.active = 0;
      if (index !== "") {
        // 点击侧边栏切换商品显示的默认值
        this.$api
          .category(this.categorylist[index].bxMallSubDto[0].mallSubId)
          .then(res => {
            // console.log(res.dataList);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //点击请求商品对应详情
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
    //初始化数据 默认新鲜水果的热带水果选项（直接点击分类时看见的数据）
    getClassification() {
      this.default = this.categorylist[0].bxMallSubDto[0].mallSubId;
      this.$api
        .category(this.default)
        .then(res => {
          // console.log(res);
          this.classificationlist = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击对应跳转到分类时高亮的显示 没点击时初始化数据 默认新鲜水果的热带水果选项
    getid() {
      //点击对应跳转到分类时高亮的显示 并展示第一类商品内容
      if (this.$route.params.CategoryId) {
        this.CategoryId = Number(this.$route.params.CategoryId) - 1;
        // console.log(this.categorylist);
        this.$api
          .category(
            this.categorylist[this.CategoryId].bxMallSubDto[0].mallSubId
          )
          .then(res => {
            // console.log(res);
            this.classificationlist = res.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 调用   初始化数据 默认新鲜水果的热带水果选项（直接点击分类时看见的数据）
        this.getClassification();
      }
    },
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    }
  },
  mounted() {
    this.getid();
  },
  watch: {},
  computed: {
    categorylist() {
      return this.$store.state.category;
    }
  },
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
    border-bottom: 1px solid #dfdede;
    .goods-img {
      width: 134px;
      padding: 10px;
      img {
        width: 134px;
        border: 1px solid #c7c4c4;
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
.wrapper {
  height: 75vh;
  overflow: hidden;
}
</style>