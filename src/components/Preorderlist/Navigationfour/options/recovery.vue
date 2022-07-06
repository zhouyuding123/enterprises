<template>
  <div class="hs" @click="oneDle()">回收</div>
</template>

<script>
import { match_productSelectSetDelApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";

export default {
  props: ["havehs"],
  inject: ["PreOrder"],
  data() {
    return {
      comDelId: {
        id: "",
        is_del: "1",
      },
    };
  },
  methods: {
    async oneDle() {
      this.comDelId.id = this.havehs.id;
      const onecomDelList = await this.$confirm(
        "此操作将放商品入回收站, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (onecomDelList === "confirm" && this.havehs.status == "1") {
        return this.$message.info("上架中的产品不能回收");
      }
      if (onecomDelList !== "confirm") {
        return this.$message.info("取消放入回收站");
      }
      if (onecomDelList === "confirm" && this.havehs.status == "0") {
        postD(match_productSelectSetDelApi(), this.comDelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("成功放入回收站");
            this.PreOrder();
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
  },
};
</script>

<style lang="less" scoped>
.hs {
  cursor: pointer;
}
</style>