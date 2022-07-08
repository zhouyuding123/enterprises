<template>
  <div>
    <div class="crumbsStyle">
      <crumbs></crumbs>
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
</style>