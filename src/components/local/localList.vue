<template>
  <div>
    <div class="crumbsStyle">
      <crumbs></crumbs>
      <div class="fb">
        <div class="tz" @click="addrelease"><span>发表帖子</span></div>
        <div class="hd" @click="goactivities"><span>发布活动</span></div>
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
    goactivities() {
      this.$router.push("/Activity/release");
    },
    addrelease() {
      this.$router.push("/Local/release");
    },
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
.fb {
    display: flex;
    justify-content: right;
    margin-top: -50px;
    margin-right: 30px;
}

.tz {
    width: 200px;
    height: 40px;
    background: linear-gradient(180deg, #0C032E 0%, #5C5673 100%);
    border-radius: 20px 20px 20px 20px;
    margin-right: 10px;

    span {
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
    }
}

.hd {
    width: 200px;
    height: 40px;
    background: #FFDC00;
    border-radius: 20px 20px 20px 20px;

    span {
        font-size: 16px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 40px;
    }
}

</style>