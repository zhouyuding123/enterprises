<template>
  <div>
    <div class="spanstyle" @click="putValue"><span>上架</span></div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { company_productSetStatusApi } from "../../../commodityUrl.js";
export default {
  props: ["putBatch"],
  inject: ["commodityValue"],
  data() {
    return {
      putId: {
        id: "",
        status: "1",
      },
    };
  },
  methods: {
    async putValue() {
      const putValues = await this.$confirm(
        "此操作将上架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (putValues !== "confirm") {
        return this.$message.info("取消上架");
      }
      if (putValues === "confirm") {
        this.putId.id = this.putBatch.id;
        postD(company_productSetStatusApi(), this.putId).then((res) => {
          if (res.code == "200") {
            this.$message.success("上架成功");
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