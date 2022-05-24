<template>
    <div>
        <router-view to="'/'+value.name" />
    </div>
</template>

<script>
export default {
  data() {
    return {
      paramsId: {
        id: "",
      },
    };
  },
  created() {
    this.paramsId.id = this.$route.params.id;
  },
  methods: {
  },
};
</script>