 <template>
  <!-- 最近浏览 我的收藏  公用 -->
  <div>
    <div class="card">
      <div>
        <slot name="left"></slot>
      </div>
      <div>
        <slot name="centre"></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
.card {
  width: 100vw;
  height: 112px;
  background-color: #fff;
  display: flex;
  margin: 3px 0;
  justify-content: space-between;
}
</style>