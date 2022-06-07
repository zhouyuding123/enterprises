<template>
  <div>
    <div class="borderStyle"></div>
    <div class="borderBody">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="EventListShow"
          >产品列表</el-menu-item
        >
        <el-menu-item index="2" @click="OngoingEvents"
          >回收站</el-menu-item
        >
      </el-menu>
    </div>
    <div v-if="this.flag == 1">
        <flag-1 />
    </div>
    <div v-if="this.flag == 2">
      <flag-2 />
    </div>
  </div>
</template>
<script>
import Flag1 from "./commodityList/Flag1.vue"
import Flag2 from "./commodityList/Flag2.vue"
export default {
    components: { Flag1, Flag2 },
  data() {
    return {
      activeIndex: "1",
      flag: true,
    };
  },
  methods: {
    handleSelect() {
      console.log();
    },
    EventListShow() {
      this.flag = 1;
    },
    OngoingEvents() {
      this.flag = 2;
    },
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  border: 1px solid #d9d9d9;
}
</style>