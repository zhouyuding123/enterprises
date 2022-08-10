<template>
  <div>
    <div class="crumbsStyle">
      <crumbs></crumbs>
      <div class="Release">
        <p @click="goAddcreate" class="activities">创建圈子</p>
        <p class="activities" @click="goActivities">发布活动</p>
      </div>
    </div>
    <router-view to="'/'+value.name" />
  </div>
</template>
<script>
import crumbs from "../Home/crumbs.vue";
export default {
  components: {
    crumbs,
  },
  data() {
    return {};
  },
  methods: {
    goAddcreate() {
      this.$router.push("/Circle/createCircle");
    },
    goActivities(){
      this.$router.push("/Activity/release");
    }
  },
};
</script>

<style lang="less" scoped>
.crumbsStyle {
  width: 100%;
  height: 80px;
  margin: 0;
  padding: 0;
  background-color: white;
  position: relative;
}
.Release {
  position: absolute;
  top: 0px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p:nth-child(1) {
    width: 200px;
    height: 40px;
    background: #ffffff;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
    margin-right: 20px;
    border: 1px solid #0c032e;
  }
  p:nth-child(2) {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
</style>