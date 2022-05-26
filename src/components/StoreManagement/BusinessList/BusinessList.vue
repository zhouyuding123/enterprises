<template>
  <div>
    <div class="Release">
      <p>添加直营门店</p>
    </div>
    <div class="storeBody">
        <business-list-seatch />
    </div>
  </div>
</template>

<script>
import BusinessListSeatch from "./BusinessListSeatch/BusinessListSeatch.vue";
export default {
  components: { BusinessListSeatch },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.Release {
  cursor: pointer;
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p:nth-child(1) {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
.storeBody {
  padding: 20px 30px;
}
</style>