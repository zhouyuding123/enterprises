<template>
  <div>
    <div class="crumbsStyle">
      <crumbs></crumbs>
      <div class="sjs">
        
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
    
  },
};
</script>

<style lang="less" scoped>
.crumbsStyle {
  height: 80px;
  margin: 0;
  padding: 0;
  background-color: white;
  display: flex;
  .sjs {
    margin-left: auto;
    padding-right: 30px;
    padding-top: 28px;
  }
}
</style>