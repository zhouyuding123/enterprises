<template>
  <div>
    <div class="line1Div">
      <div class="line1Value">
        <div class="textEdit"><span>圈子头像</span></div>
        <div class="imageDiv">
          <el-image :src="imageValue + listValue.headimg"></el-image>
        </div>
      </div>
    </div>
    <div class="line2Div">
      <div class="line2Value">
        <div class="linedetails1">
          <div class="mc"><span>圈子名称</span></div>
          <div class="lineBorder">
            <span>{{ listValue.title }}</span>
          </div>
        </div>
        <div class="linedetails2">
          <div class="mc"><span>圈子公告</span></div>
          <div class="lineBorder" @click="Announcement">
            <span>编辑公告</span>
          </div>
        </div>
        <div class="linedetails3">
          <div class="mc"><span>圈子标签</span></div>
          <div class="lineBorder">
            <span>{{ listValue.label }}</span>
          </div>
        </div>
        <div class="linedetails4">
          <div class="mc"><span>圈子规则</span></div>
          <div class="lineBorder"><span></span></div>
        </div>
        <div class="linedetails5">
          <div class="mc"><span>圈子简介</span></div>
          <div class="lineBorder">
            <span>{{ listValue.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="line3Div">
      <div class="line3Value">
        <div class="CircleMembers"><span>圈子成员</span></div>
        <div class="goMember" @click="zxc">
          <span>共{{ memberNum }}个成员</span
          ><i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <div class="line4Div">
      <div class="qx" @click="cancel"><span>返回</span></div>
    </div>
    <el-dialog title="提示" :visible.sync="AnnouncementShow" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简单的描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="详细内容" prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="AnnouncementShow = false">取 消</el-button>
        <el-button type="primary" @click="addRuleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "../../../api";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import { CircleGetCircleShowApi, circle_noticeAddApi } from "./myCircleUrl.js";

export default {
  data() {
    return {
      paramsId: {
        id: "",
      },
      imageValue: "",
      listValue: [],
      // 成员
      memberNum: "",
      AnnouncementShow: false,
      ruleForm: {
        circle_id: "",
        description: "",
        title: "",
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入公告标题",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入公告描述",
            tirgger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入公告详细内容",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.paramsId.id = this.$route.params.id;
    this.listCircleValue();
  },
  methods: {
    listCircleValue() {
      postD(CircleGetCircleShowApi(), this.paramsId).then((res) => {
        this.listValue = res.data.circle;
        this.imageValue = imgUrl();
        this.memberNum = res.data.member_count;
      });
    },
    Announcement() {
      this.AnnouncementShow = true;
    },
    addRuleForm() {
      this.ruleForm.circle_id = this.paramsId.id;
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        postD(circle_noticeAddApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("发布公告成功");
            this.listCircleValue();
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
      });
    },
    zxc() {
      this.$router.push("/getMember" + this.paramsId.id);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.line1Div {
  padding: 20px 180px;
  .line1Value {
    background-color: white;
    height: 100px;
    display: flex;
    .textEdit {
      margin: 46px 60px;
      span {
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .imageDiv {
      margin-left: auto;
      position: relative;
      .el-image {
        cursor: pointer;
        width: 100px;
        height: 100px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        margin-right: 100px;
      }
      i {
        cursor: pointer;
        position: absolute;
        margin-top: 45px;
        right: 0;
        margin-right: 40px;
      }
    }
  }
}
.line2Div {
  padding-left: 180px;
  padding-right: 180px;
  .line2Value {
    background-color: white;
    height: 340px;
    text-align: left;
    .linedetails1 {
      padding: 30px 60px 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          cursor: pointer;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails2 {
      cursor: pointer;
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails3 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails4 {
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails5 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
  }
}
.line3Div {
  padding-left: 180px;
  padding-top: 20px;
  padding-right: 180px;
  .line3Value {
    padding: 30px 40px;
    background-color: white;
    display: flex;
    .CircleMembers {
      span {
        font-size: 24px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .goMember {
      cursor: pointer;
      margin-left: auto;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
}
.line4Div {
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bc {
    cursor: pointer;
    width: 120px;
    height: 40px;
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 3px 3px 3px 3px;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
  }
  .qx {
    cursor: pointer;
    margin-left: 20px;
    width: 120px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #0c032e;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
}
</style>