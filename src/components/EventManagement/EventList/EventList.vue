<template>
  <div>
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
          <el-menu-item index="1" @click="EventListShow">赛事列表</el-menu-item>
          <el-menu-item index="2" @click="OngoingEvents">进行赛事</el-menu-item>
          <el-menu-item index="3" @click="HistoricalRelease"
            >历届赛事</el-menu-item
          ><el-menu-item index="4" @click="fourR">冠名赛事</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div v-if="this.flag == 1">
      <flag-1 />
    </div>
    <div v-if="this.flag == 2">
      <flag-2 />
    </div>
    <div v-if="this.flag == 3">
      <flag-3 />
    </div>
    <div v-if="this.flag == 4">
      <flag-4 />
    </div>
  </div>
</template>

<script>
import Flag1 from "./listFlag/Flag1.vue";
import Flag2 from "./listFlag/Flag2.vue";
import Flag3 from "./listFlag/Flag3.vue";
import Flag4 from "./listFlag/Flag4.vue";
export default {
  components: { Flag1, Flag2, Flag3, Flag4 },
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
    HistoricalRelease() {
      this.flag = 3;
    },
    fourR() {
      this.flag = 4;
    },
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  border: 1px solid #d9d9d9;
}
</style>