<template>
  <!-- 收藏页面 -->
  <div>
    <van-sticky>
      <my-top class="collection-top">
        <div slot="left" class="back" @click="back">
          <van-icon name="arrow-left" />
        </div>
        <div slot="centre" class="collection">我的收藏</div>
      </my-top>
    </van-sticky>
    <better-scroll class="wrapper">
      <goods-card v-for="item in Collectionlist" :key="item.id" class="collectioncard">
        <div slot="left" class="goods-img" @click="details(item.cid)">
          <div class="imgs">
            <img :src="item.image_path" alt />
          </div>
        </div>
        <div slot="centre" class="goods" @click="details(item.cid)">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-price">￥{{item.present_price}}</div>
        </div>
        <div slot="right" class="cancel" @click="cancel(item.cid)">
          <van-icon name="close" />
        </div>
      </goods-card>
    </better-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Collectionlist: {}
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //取消收藏
    cancel(val) {
      this.$dialog
        .confirm({
          title: "删除我的收藏",
          message: "您确定要删除吗？"
        })
        .then(() => {
          this.$api
            .cancelCollection({ id: val })
            .then(res => {
              this.$toast(res.msg);
              // console.log(res);
              this.getCollection();
            })
            .catch(err => {
              console.log(err);
            });
          // on confirm
        })
        .catch(() => {
          this.$toast("您取消了删除操作");
          // on cancel
        });
    },
    //获取收藏数据
    getCollection() {
      this.$api
        .getCollection()
        .then(res => {
          this.Collectionlist = res.data.list;
          // console.log(res);
          // console.log(this.Collectionlist);
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(id) {
      this.$router.push({ name: "commoditydetails", query: { goodsId: id } });
    }
  },
  mounted() {
    this.getCollection();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.collection-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .collection {
    font-size: 16px;
  }
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
    padding: 2.667vw 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
  }
  .goods-price {
    color: red;
    margin-top: 43px;
  }
}
.cancel {
  height: 4.267vw;
  margin-top: 12vh;
  font-size: 4.267vw;
  width: 50px;
  text-align: center;
}
.wrapper {
  height: 92vh;
  overflow: hidden;
}
.collectioncard {
  height: 113px;
}
</style>