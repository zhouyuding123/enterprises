<template>
  <div>
    <div class="notEdit" @click="editAdd"><span>编辑</span></div>
    <el-dialog title="修改公告     " :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForms"
        :rules="ruleFormsRules"
        ref="ruleFormsRef"
        hide-required-asterisk
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForms.title"></el-input>
        </el-form-item>
        <el-form-item label="简单的内容" prop="description">
          <el-input v-model="ruleForms.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="ruleForms.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 45px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="notedit">修 改</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import {
  circle_noticeGetShowApi,
  circle_noticeEditApi,
} from "../../TheCircleICreated.js";
export default {
  props: ["editId"],
  inject: ["notValue"],
  data() {
    return {
      dialogVisible: false,
      notIds: {
        circle_id: "",
        notice_id: "",
      },
      ruleForms: {
        circle_id: "",
        notice_id: "",
        title: "",
        description: "",
        content: "",
      },
      ruleFormsRules: {
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
    editAdd() {
      this.dialogVisible = true;
      this.notIds.circle_id = this.$route.params.id;
      this.notIds.notice_id = this.editId;
      postD(circle_noticeGetShowApi(), this.notIds).then((res) => {
        this.ruleForms.circle_id = res.data.circle_id;
        this.ruleForms.notice_id = res.data.id;
        this.ruleForms.title = res.data.title;
        this.ruleForms.description = res.data.description;
        this.ruleForms.content = res.data.content;
      });
    },
    notedit() {
      this.$refs.ruleFormsRef.validate((v) => {
        if (!v) return;
        postD(circle_noticeEditApi(), this.ruleForms).then((res) => {
          if (res.code == "200") {
            this.$message.success("修改成功");
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