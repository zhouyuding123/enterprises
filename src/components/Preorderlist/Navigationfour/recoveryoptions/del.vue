<template>
  <div>
    <div @click="oneDle()"><span>删除</span></div>
  </div>
</template>

<script>
import { match_productSelectDelApi } from "@/urls/wsUrl.js";
import { postD } from '@/api';
export default {
    props: ["haveDel"],
  inject: ["recycleBin"],
  data() {
    return {
        delId: {
            id:""
        }
    };
  },
  methods: {
    async oneDle() {
      this.delId.id = this.haveDel.id;
      const onecomDelList = await this.$confirm(
        "此操作将放商品入回收站, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (onecomDelList !== "confirm") {
        return this.$message.info("取消放入回收站");
      }
      if (onecomDelList === "confirm") {
        postD(match_productSelectDelApi(), this.delId).then((res) => {
          if (res.code == "200") {
            this.$message.success("成功删除");
            this.recycleBin();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("操作失败");
          }
        });
      }
    },
  }
};
</script>