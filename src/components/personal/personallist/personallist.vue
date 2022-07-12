<template>
  <div class="perpdding">
    <div class="line1">
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="first"> </el-tab-pane>
        <el-tab-pane label="账号与安全" name="second"> </el-tab-pane>
        <el-tab-pane label="隐私" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="lineone" v-if="activeName == 'first'" >
    
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./personallist.less");
</style>