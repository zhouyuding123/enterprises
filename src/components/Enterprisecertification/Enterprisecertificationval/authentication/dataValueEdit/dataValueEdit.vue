<template>
  <div class="editpdding">
    <el-form
      :model="editruleForm"
      :rules="editruleFormrules"
      ref="editruleFormruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="editline1">
        <el-form-item label="企业名称" prop="nickname">
          <el-input v-model="editruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="detail">
          <el-input v-model="editruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="editruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="主营项目" prop="company_main">
          <el-input v-model="editruleForm.company_main"></el-input>
        </el-form-item>
      </div>
      <div class="editline2">
        <el-form-item label="企业照片">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="editline3">
        <el-form-item label="企业介绍">
          <el-input v-model="description.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="视频介绍">
          <ele-upload-video
            :data="{
              fileType: this.fileTypes,
            }"
            :file-size="20"
            :response-fn="handleResponse"
            @error="handleUploadError"
            style="margin: 50px"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            v-model="video"
          ></ele-upload-video>
        </el-form-item>
      </div>
      <div class="editline3">
        <el-form-item label="企业资质">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccesstwo"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img v-if="imageUrls" :src="imageUrls" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <div class="addedit">
      <div class="preservation" @click="preservation"><span>保存</span></div>
      <div class="cancel" @click="cancel"><span>取消</span></div>
    </div>
  </div>
</template>

<script>
import EleUploadVideo from "vue-ele-upload-video";
import { editInfoApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  components: {
    EleUploadVideo,
  },
  inject: ["reload"],
  data() {
    return {
      editruleForm: {
        nickname: "",
        tel: "",
        company_main: "",
        detail: "",
        description: "",
      },
      description: {
        photo: "",
        introduce: "",
        video: "",
        qualifications: "",
      },
      video: "",
      fileType: "images",
      fileTypes: "moves",
      imageUrl: "",
      imageUrls: "",
      editruleFormrules: {
        nickname: [
          {
            required: true,
            message: "请输入企业名称",
            tirgger: "blur",
          },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
        detail: [
          {
            required: true,
            message: "请输入公司地址",
            tirgger: "blur",
          },
        ],
        company_main: [
          {
            required: true,
            message: "请输入主营项目",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.description.photo = res.url;
    },
    handleAvatarSuccesstwo(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.description.qualifications = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/x-pn" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("这是一条消息提示");
      }
      return isJPG && isLt2M;
    },
    handleResponse(res, file) {
      this.description.video = res.url;
      return URL.createObjectURL(file.raw);
    },
    // 视频介绍
    handleUploadError(error) {
      this.$notify.error({
        title: "上传提示",
        message: "测试环境无法上传文件",
      });
      console.log("error", error);
    },
    cancel() {
      this.reload();
    },
    preservation() {
      this.editruleForm.description = JSON.stringify(this.description);
      console.log(this.description);
      postD(editInfoApi(), this.editruleForm).then((res) => {
        if (res.code == "200") {
            this.$message.success("编辑基本信息成功");
            this.reload();
          } else {
            this.$message.error("编辑基本信息失败");
          }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./dataValueEdit.less");
</style>