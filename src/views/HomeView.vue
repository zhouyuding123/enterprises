<template>
  <div class="home">
    <left-navigation />
  </div>
</template>

<script>
import leftNavigation from "../components/Home/leftNavigation.vue"
export default {
  components: { leftNavigation },
  mounted: function () {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
};
</script>
