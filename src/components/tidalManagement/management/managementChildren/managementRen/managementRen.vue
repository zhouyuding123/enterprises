<template>
  <div>
    <div class="line1body">
      <div class="seatch">
        <el-input
          placeholder="请输入内容"
          v-model="paramsId.username"
        ></el-input>

        <div class="MemberEvents">
          <div class="delValue" @click="addInvitation">
            <span>确认邀请</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../../../api";
import {CircleInvitationApi} from "./invitationUrl.js"
export default {
  data() {
    return {
      paramsId: {
        circle_id: "",
        username: "",
      },
    };
  },
  created() {
      this.paramsId.circle_id = this.$route.params.id;
  },
  methods: {
    async addInvitation() {
      const addInvitations = await this.$confirm(
        "此操作将邀请该成员, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (addInvitations !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (addInvitations === "confirm") {
        
        postD(CircleInvitationApi(),this.paramsId).then(res=>{
            if (res.code == "200") {
            this.$message.success("邀请成功");
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

<style lang="less" scoped>
.line1body {
  padding: 20px 180px;
  .seatch {
    height: 40px;
    display: flex;
    .el-input {
      width: 400px;
    }
    .Isseatch {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #dfdfdf;
      border-radius: 4px 4px 4px 4px;
      i {
        font-size: 14px;
        line-height: 40px;
        color: white;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        margin-left: 5px;
      }
    }
    .MemberEvents {
      margin-left: auto;
      display: flex;
      .delValue {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
        border-radius: 3px 3px 3px 3px;
        margin-left: 20px;
        span {
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
  }
}
</style>