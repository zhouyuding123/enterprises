<template>
  <div>
    <div class="Release" @click="addValue">
      <p>添加直营门店</p>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormrules"
        ref="ruleFormRef"
        label-width="100px"
        hide-required-asterisk
        class="demo-ruleForm"
      >
        <el-form-item label="直营店账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="直营店密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="直营店负责人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 20px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStore">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from '@/api';
import {BusinessAddBusinessApi} from "./addBusinessUrl.js"
export default {
  inject:["BusinessListValue"],
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        name: "",
        tel: "",
      },
      ruleFormrules: {
        username: [
          {
            required: true,
            message: "请输入直营店账号",
            tirgger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入直营店密码",
            tirgger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入直营店负责人名字",
            tirgger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入直营店负责人电话",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addValue() {
      this.dialogVisible = true;
    },
    addStore() {
      this.$refs.ruleFormRef.validate((v)=> {
        if (!v) return;
        postD(BusinessAddBusinessApi(),this.ruleForm).then(res=> {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.dialogVisible = false;
            this.BusinessListValue();
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
      })
    },
  },
};
</script>


<style lang="less" scoped>
.Release {
  cursor: pointer;
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p:nth-child(1) {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
</style>