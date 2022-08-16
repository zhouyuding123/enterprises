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
        <el-form-item label="主营项目">
          <el-select v-model="editruleForm.company_main" placeholder="请选择">
            <el-option
              v-for="item in companymain"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="editline2">
        <el-form-item label="企业照片">
          <!-- <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img v-if="description.photo" :src="imagesValue+description.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :data="{ fileType: this.fileType }"
            multiple
            list-type="picture-card"
            :limit="100"
            :on-success="handleAvatarSuccess"
            :file-list="imageList2"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="fileRemove2"
          >
            <i
              class="el-icon-picture-outline"
              style="background-color: #f5f5f5"
            ></i>
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
            <img v-if="description.qualifications" :src="imagesValue+description.qualifications" class="avatar" />
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
import { editInfoApi, getInfoApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  components: {
    EleUploadVideo,
  },
  inject: ["reload"],
  data() {
    return {
      imagesValue: "",
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
      },
      companymain: [],
      imageList2: [],
      dialogImageUrl: "",
      dialogVisibles: false,
      videosrc1: "",
    };
  },
  created() {
    this.getInfo();
    this.getListvalue();
    this.imagesValue = imgUrl();
  },
  methods: {
    getInfo() {
      var name = {
        username: localStorage.getItem("use"),
      };
      postD(getInfoApi(), name).then((res) => {
        this.editruleForm.nickname = res.data.nickname || "";
        this.editruleForm.tel = res.data.tel || "";
        this.editruleForm.company_main = res.data.company_main || "";
        this.editruleForm.detail = res.data.detail || "";
        let info = JSON.parse(res.data.description);
        console.log(info);
        if (info.photo != "" && info.photo != null) {
          info.photo.forEach((item, i) => {
            if (info.photo.indexOf(",") > -1) {
              this.imageList2.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            } else {
              this.imageList2.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            }
          });
        }
        this.description.introduce = info.introduce;
        this.description.qualifications = info.qualifications;
        
        console.log(info);
        let video = info.video;
        if (video != "") {
          if (video.indexOf("moves") > -1) {
            this.video = this.imagesValue + video;
            this.videosrc1 = video;
          }
        }
      });
    },
    getListvalue() {
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        console.log(res);
        this.companymain = res.list;
      });
    },
    // 上传图片
    handleAvatarSuccess(res, file, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.description.photo = res.url;
      this.imageList2 = fileList;
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
    handleResponse(response, file) {
      this.video = response.url;
      this.videosrc1 = response.url;
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
      var imgslist = [];
      this.imageList2.forEach((item, i) => {
        imgslist.push(item.response.url);
        console.log(item.response.url);
      });
      console.log(imgslist);
      this.description.photo = imgslist;
      this.editruleForm.description = JSON.stringify(this.description);
      console.log(this.description);
      // postD(editInfoApi(), this.editruleForm).then((res) => {
      //   if (res.code == "200") {
      //     this.$message.success("编辑基本信息成功");
      //     this.reload();
      //   } else {
      //     this.$message.error("编辑基本信息失败");
      //   }
      // });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileRemove2(file, fileList) {
      this.imageList2 = fileList;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./dataValueEdit.less");
</style>