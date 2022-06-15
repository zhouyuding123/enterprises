<template>
  <div>
      <div class="Opens">
          <div>1</div>
      </div>
  </div>
</template>

<script>
import { designer_worksGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from '@/assets/js/modifyStyle';
export default {
  data() {
    return {
      freeId: {
        category: "2",
      },
      imagesValue: "",
      freeListValue:[]
    };
  },
  created() {
    this.freeList();
  },
  methods: {
    freeList() {
      postD(designer_worksGetListApi(), this.freeId).then((res) => {
        console.log(res);
        this.imagesValue = imgUrl()
        this.freeListValue = res.list
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./freeList.less");
</style>