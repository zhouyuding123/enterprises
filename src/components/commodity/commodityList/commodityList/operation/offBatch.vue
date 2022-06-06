<template>
  <div>
    <div class="spanstyle" @click="offValue"><span>下架</span></div>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import { company_productSetStatusApi } from "../../../commodityUrl.js";
export default {
  props: ["offBatcj"],
  inject: ["commodityValue"],
  data() {
    return {
      offId: {
        id: "",
        status: "0",
      },
    };
  },
  methods: {
    async offValue() {
      const offValues = await this.$confirm(
        "此操作将下架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (offValues !== "confirm") {
        return this.$message.info("取消下架");
      }
      if (offValues === "confirm") {
        this.offId.id = this.offBatcj.id;
        postD(company_productSetStatusApi(), this.offId).then((res) => {
          if (res.code == "200") {
            this.$message.success("下架成功");
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