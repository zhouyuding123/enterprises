<template>
  <div class="addBody">
    <div class="addsurface">
      <el-form
        :model="ruleForm"
        :rules="ruleFormrules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="品牌名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍" prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="品牌类型" prop="style">
          <el-input v-model="ruleForm.style"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              :v-model="imageUrl"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="相关资料" prop="qualification">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccessqualification"
            :before-upload="beforeAvatarUploadqualification"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrlqualification"
              :src="imageUrlqualification"
              class="avatar"
              :v-model="imageUrlqualification"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <button @click="zxc">123</button>
    </div>
  </div>
</template>

<script>
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { postD } from '@/api';
import {brandAddApi }from "./addUrl"
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
        thumb: "",
        qualification: "",
      },
      //   图片
      imageUrl: "",
      imageUrlqualification: "",
      fileType: "images",
      ruleFormrules: {
        title: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        style: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        qualification: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.thumb = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    handleAvatarSuccessqualification(res, file) {
      this.imageUrlqualification = URL.createObjectURL(file.raw);
      this.ruleForm.qualification = res.url;
    },
    beforeAvatarUploadqualification(file) {
      beforeAvatar(file);
    },
    zxc() {
      this.$refs.ruleFormRef.validate(v=> {
        if (!v) return;
        postD(brandAddApi(),this.ruleForm).then(res=> {
            if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.$router.push("/brand/getList");
            this.activityListValue();
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
.addBody {
  padding: 20px 30px;
  .addsurface {
    background-color: white;
  }
}
</style>