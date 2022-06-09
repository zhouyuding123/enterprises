<template>
  <div>
    <span class="addValue" @click="editClassificationShow">编辑</span>
    <el-dialog title="编辑分类" :visible.sync="dialogVisibles" width="30%">
      <el-form
        :model="ruleForms"
        :rules="ruleFormsRules"
        ref="ruleFormsRef"
        hide-required-asterisk
      >
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="ruleForms.title" placeholder="热门"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input
            type="textarea"
            v-model="ruleForms.description"
            placeholder="随便描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <span>
          <el-button @click="Reset">重 置</el-button>
          <el-button type="primary" @click="editClassification"
            >保 存</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { custypeShowApi,custypeEditApi } from "../../classificationUrl.js";
export default {
  inject: ["custypeList"],
  props:["editThis"],
  data() {
    return {
      dialogVisibles: false,
      showId:{
          id:""
      },
      ruleForms: { title: "", description: "", id:""},
      ruleFormsRules: {
        title: [
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
    editClassificationShow() {
      this.dialogVisibles = true;
      this.showId.id = this.editThis.id
      postD(custypeShowApi(),this.showId).then(res=> {
          this.ruleForms.title = res.data.title
          this.ruleForms.description = res.data.description
          this.ruleForms.id = res.data.id
      })
    },
    Reset() {
      this.ruleForms.title = "";
      this.ruleForms.description = "";
    },
    editClassification() {
      this.$refs.ruleFormsRef.validate((v) => {
        if (!v) return;
      postD(custypeEditApi(),this.ruleForms).then(res=> {
           if (res.code == "200") {
            this.$message.success("编辑成功");
            this.dialogVisibles = false;
            this.custypeList();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，已存在");
          }
      })
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addbranch.less");
</style>