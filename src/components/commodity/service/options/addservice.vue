<template>
  <div>
    <span class="addValue" @click="addShow">添加</span>
    <el-dialog title="服务分类" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        hide-required-asterisk
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="ruleForm.content"
            placeholder="比如：放心购"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            v-model="ruleForm.description"
            placeholder="随便描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <span>
          <el-button @click="Reset">重 置</el-button>
          <el-button type="primary" @click="addClassification">保 存</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { users_serviceAddServiceApi } from "../../serviceUrl.js";
export default {
  inject: ["serviceList"],
  data() {
    return {
      dialogVisible: false,
      ruleForm: { content: "" },
      ruleFormRules: {
        content: [
          {
            required: true,
            message: "请输入分类名称",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入分类描述",
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
    Reset() {
      this.ruleForm.content = "";
      this.ruleForm.description = "";
    },
    addClassification() {
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(users_serviceAddServiceApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.serviceList();
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
@import url("./addservice.less");
</style>