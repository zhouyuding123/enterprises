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
        <el-menu-item index="1" @click="EventListShow">企业资料</el-menu-item>
        <el-menu-item index="2" @click="OngoingEvents">企业认证</el-menu-item>
      </el-menu>
    </div>
    <div v-if="this.flag == 1">
        <data-value />
    </div>
    <div v-if="this.flag == 2">
      <authentication />
    </div>
  </div>
</template>

<script>
import authentication from "./authentication/authentication.vue"
import DataValue from './authentication/dataValue.vue';
export default {
    components:{authentication, DataValue},
  data() {
    return {
      activeIndex: "1",
      flag: 1,
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