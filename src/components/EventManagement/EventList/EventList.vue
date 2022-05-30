<template>
  <div>
    <div class="Release" @click="LaunchEvents">
      <p>发布赛事</p>
    </div>
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
          <el-menu-item index="2" @click="OngoingEvents"
            >进行中的赛事</el-menu-item
          >
          <el-menu-item index="3" @click="HistoricalRelease"
            >历史发布</el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <div v-if="this.flag == 1">
      <flag-1 />
    </div>
    <div v-if="this.flag == 2">2</div>
    <div v-if="this.flag == 3">3</div>
  </div>
</template>

<script>
import Flag1 from "./listFlag/Flag1.vue";
export default {
  components: { Flag1 },
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
    LaunchEvents() {
      this.$router.push("/match/release")
    }
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  border: 1px solid #d9d9d9;
}
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
</style>