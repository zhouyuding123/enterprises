<template>
  <div>
    <div class="spanstyle" @click="oneReduction()"><span>还原</span></div>
  </div>
</template>

<script>
import { postD } from '@/api';
import { company_productSetDelApi } from "../../../commodityUrl.js";
export default {
  props: ["reductionOne"],
  inject: ["recycleBinValue"],
  data() {
    return {
      reductionId: {
        id: "",
        is_del: "0",
      },
    };
  },
  methods: {
    async oneReduction() {
        this.reductionId.id = this.reductionOne.id
      const reductionIdOne = await this.$confirm(
        "此操作将放商品将移出回收站至产品列表, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(err=> err);
      if (reductionIdOne !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (reductionIdOne === "confirm") {
        postD(company_productSetDelApi(),this.reductionId).then(res=> {
            if (res.code == "200") {
            this.$message.success("成功移出");
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
        })
      }

    },
  },
};
</script>