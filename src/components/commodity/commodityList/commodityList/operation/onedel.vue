<template>
  <div>
    <div class="spanstyle" @click="oneDle()"><span>回收</span></div>
  </div>
</template>

<script>
import { company_productSetDelApi } from "../../../commodityUrl.js";
import { postD } from "@/api";
export default {
  props: ["deloneDle"],
  inject: ["commodityValue"],
  data() {
    return {
      comDelId: {
        id: "",
        is_del:"1"
      },
    };
  },
  methods: {
    async oneDle() {
      this.comDelId.id = this.deloneDle.id;
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
        postD(company_productSetDelApi(), this.comDelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("成功放入回收站");
            this.commodityValue();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        });
      }
    },
  },
};
</script>