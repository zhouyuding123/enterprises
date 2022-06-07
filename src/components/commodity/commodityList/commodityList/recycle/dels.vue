<template>
  <div>
    <div class="spanstyle" @click="oneDle()"><span>删除</span></div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { company_productDelProductApi } from "../../../commodityUrl.js";
export default {
  props: ["delValueOne"],
  inject: ["recycleBinValue"],
  data() {
    return {
      removeId: {
        id: "",
      },
    };
  },
  methods: {
    async oneDle() {
      this.removeId.id = this.delValueOne.id;
      const removeOne = await this.$confirm(
        "此操作将放商品将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (removeOne !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (removeOne === "confirm") {
        postD(company_productDelProductApi(), this.removeId).then((res) => {
          if (res.code == "200") {
            this.$message.success("成功删除");
            this.recycleBinValue();
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
