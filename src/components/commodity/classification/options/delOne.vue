<template>
  <div>
    <span class="addValue" @click="delClassificationShow">删除</span>
  </div>
</template>

<script>
import { postD } from "@/api";
import { custypeDelApi } from "../../classificationUrl.js";
export default {
  inject: ["custypeList"],
  props: ["delThis"],
  data() {
    return {
      delId: {
        id: "",
      },
    };
  },
  methods: {
    async delClassificationShow() {
      const delValue = await this.$confirm(
        "此操作将批量删除分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (delValue !== "confirm") {
        return this.$message.info("取消操作");
      }
      if (delValue === "confirm") {
        this.delId.id = this.delThis.id;
        postD(custypeDelApi(), this.delId).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功删除");
            this.custypeList();
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

<style lang="less" scoped>
.addValue {
  line-height: 40px;
}
</style>