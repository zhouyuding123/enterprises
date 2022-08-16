<template>
  <div>
    <div class="operationdel" @click="oneCompany">
      <p>删除</p>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import {brandDelApi}from "./addUrl.js"
export default {
  props: ["OperationDel"],
  inject: ["brandListValue"],
  data() {
    return {
      brandDelId: {
        id: "",
      },
    };
  },
  methods: {
    async oneCompany() {
      this.brandDelId.id = this.OperationDel.id;
      const oneCompanyList = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {  
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (oneCompanyList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (oneCompanyList === "confirm") {
        postD(brandDelApi(), this.brandDelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.brandListValue();
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
.operationdel {
  cursor: pointer;
  display: flex;
  position: relative;
  img {
    position: absolute;
  }
  p {
    margin-left: 30px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #0177D5;
    line-height: 19px;
  }
}
</style>