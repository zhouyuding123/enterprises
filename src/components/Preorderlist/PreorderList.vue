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
        <el-menu-item index="1" @click="EventListShow">预购中</el-menu-item>
        <el-menu-item index="2" @click="OngoingEvents">预购成功</el-menu-item>
        <el-menu-item index="3" @click="yugsb">预购失败</el-menu-item>
        <el-menu-item index="4" @click="hsz">回收站</el-menu-item>
      </el-menu>
    </div>
    <div v-if="this.flag == 1">
      <hava-in-hand />
    </div>
    <div v-if="this.flag == 2">
      <success />
    </div>
    <div v-if="this.flag == 3">
      <fail />
    </div>
    <div v-if="this.flag == 4">
      <recovery />
    </div>
  </div>
</template>

<script>
import havaInHand from "./Navigationfour/haveInHand.vue";
import success from "./Navigationfour/success.vue";
import fail from "./Navigationfour/fail.vue"
import recovery from "./Navigationfour/recovery.vue"
export default {
    components:{havaInHand,success,fail,recovery},
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
    yugsb() {
      this.flag = 3;
    },
    hsz() {
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