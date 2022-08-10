<template>
  <div>
    <div class="midbox">
      <el-tabs v-model="Circles.category">
        <el-tab-pane label="设计师榜" name="1"></el-tab-pane>
        <el-tab-pane label="作品榜" name="2"></el-tab-pane>
        <el-tab-pane label="团体榜" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="Circles.category ==1">
        <ransjs />
    </div>
    <div v-if="Circles.category ==2">
    <works-list />
    </div>
    <div v-if="Circles.category ==3">
    <team />
    </div>
  </div>
</template>

<script>
import team from "./team/team.vue"
import ransjs from './ransjs/ransjs.vue';
import WorksList from './worksList/worksList.vue';
export default {
  components: { ransjs, WorksList,team },
  data() {
    return {
      Circles: {
        category: "1",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.midbox {
  height: 40px;
  border-top: 1px solid #dddddd;
  margin: 0px auto;
  padding-left: 30px;
  background-color: #fff;

  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 1;
    background-color: white;
  }

  /deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 7px;
    width: 29px !important;
    height: 2px;
    background-color: #ffdc00;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
    width: 6px;
    height: 4px;
    border-radius: 2px 2px 2px 2px;
  }

  /deep/.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }

  /deep/.is-active {
    color: #0c032e;
    font-weight: bold;
  }
}
</style>