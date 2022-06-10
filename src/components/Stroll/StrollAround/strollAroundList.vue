<template>
  <div class="strollStyle">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">逛逛帖子</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">我的帖子</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
        handleClick(event) {
            console.log(event);
        }
    }
  };
</script>

<style lang="less" scoped>
@import url("./stroll.less");
</style>