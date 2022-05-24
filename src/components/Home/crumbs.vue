<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.path"
        :to="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$route.matched;
    },
  },
};
</script>

<style lang="less" scoped>
.crumbs {
  padding: 30px;
}
</style>
