<template>
  <div>
    <span class="addValue" @click="editShow">编辑</span>
    <el-dialog title="编辑分类" :visible.sync="dialogVisibles" width="30%">
      <el-form
        :model="ruleForms"
        :rules="ruleFormsRules"
        ref="ruleFormsRef"
        hide-required-asterisk
      >
        <el-form-item label="分类" prop="content">
          <el-input v-model="ruleForms.content" placeholder="热门"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
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
import { users_serviceEditServiceApi,users_serviceShowApi } from "../../serviceUrl.js";
export default {
  inject: ["serviceList"],
  props:["editThis"],
  data() {
    return {
      dialogVisibles: false,
      showId:{
          id:""
      },
      ruleForms: { content: "", description: "", id:""},
      ruleFormsRules: {
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
    editShow() {
      this.dialogVisibles = true;
      this.showId.id = this.editThis.id
      postD(users_serviceShowApi(),this.showId).then(res=> {
          console.log(res);
          this.ruleForms.content = res.data.content
          this.ruleForms.description = res.data.description
          this.ruleForms.id = res.data.id
      })
    },
    Reset() {
      this.ruleForms.content = "";
      this.ruleForms.description = "";
    },
    editClassification() {
      this.$refs.ruleFormsRef.validate((v) => {
        if (!v) return;
      postD(users_serviceEditServiceApi(),this.ruleForms).then(res=> {
           if (res.code == "200") {
            this.$message.success("编辑成功");
            this.dialogVisibles = false;
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
      })
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addservice.less");
</style>