<template>
  <div>
    <div class="addNotStyle" @click="addShow"><span>创建公告</span></div>
    <el-dialog title="圈子公告" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        hide-required-asterisk
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简单的内容" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 45px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="notAdd">发 布</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { circle_noticeAddApi } from "../../TheCircleICreated.js";
export default {
  inject: ["notValue"],
  data() {
    return {
      dialogVisible: false,
      ruleForm: { circle_id: "", title: "", description: "", content: "" },
      ruleFormRules: {
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
            message: "请输入简单的内容",
            tirgger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入公告内容",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
    },
    notAdd() {
      this.ruleForm.circle_id = this.$route.params.id;
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(circle_noticeAddApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.notValue();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，已存在");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addNot.less");
</style>

    