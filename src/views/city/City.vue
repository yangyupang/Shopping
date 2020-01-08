<template>
  <div>
    <van-sticky>
      <my-top class="city-top">
        <div slot="left" class="back" @click="back">
          <van-icon name="arrow-left" />
        </div>
        <div slot="centre" class="citylist">城市列表</div>
      </my-top>
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </van-sticky>
    <div v-if="value === ''">
      <div class="nowcity">当前城市</div>
      <div class="cityname">
        <div class="city">{{this.$route.params.city}}</div>
      </div>
      <div class="hotcity">热门城市</div>
      <div class="hotname">
        <div
          class="city"
          v-for="item in citys.data.hotCities"
          :key="item.id"
          @click="change(item.name)"
        >{{item.name}}</div>
      </div>
      <van-index-bar :sticky-offset-top="105">
        <div v-for="(item,index) in citys.data.cities" :key="index">
          <van-index-anchor :index="index" />
          <van-cell
            :title="item0.name"
            v-for="item0 in item"
            :key="item0.id"
            @click="change(item0.name)"
          />
        </div>
      </van-index-bar>
    </div>

    <div class="search" v-else>
      <!-- {{DataList}} -->
      <div
        v-for="item in DataList"
        :key="item.id"
        class="search-item"
        @click="change(item.name)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import city from "../../assets/js/city";
export default {
  data() {
    return {
      value: "",
      citys: city,
      citiesname: []
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    change(val) {
      this.$store.state.city = val;
      this.$router.go(-1);
    },
    getList() {
      Object.keys(this.citys.data.cities).map(item => {
        this.citiesname.push(...this.citys.data.cities[item]);
      });
    }
  },
  mounted() {
    this.getList();
  },
  watch: {},
  computed: {
    DataList() {
      return this.citiesname.filter(item =>
        JSON.stringify(item).includes(this.value)
      );
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.city-top {
  background-color: #fff;
  .back {
    font-size: 18px;
    margin-left: 10px;
  }
  .citylist {
    font-size: 16px;
  }
}
.nowcity {
  padding: 0 10px;
  font-size: 16px;
}
.cityname {
  height: 50px;
  padding: 0 10px;
  background: #fff;
  margin: 10px 0;
  font-size: 16px;
  overflow: hidden;
  .city {
    width: 100px;
    height: 25px;
    border-radius: 5px;
    border: 1px black solid;
    margin-top: 12.5px;
    line-height: 25px;
    padding: 0 25px;
    text-align: center;
  }
}
.hotcity {
  padding: 0 10px;
  font-size: 16px;
}
.hotname {
  height: 100px;
  padding: 0 10px;
  background: #fff;
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .city {
    width: 50px;
    height: 25px;
    border-radius: 5px;
    border: 1px black solid;
    margin-top: 12.5px;
    line-height: 25px;
    padding: 0 25px;
    text-align: center;
  }
}
.wrapper {
  overflow: hidden;
}
.search {
  .search-item {
    background: #fff;
    font-size: 16px;
    padding: 10px;
  }
}
</style>
