<template>
  <div>
    <div class="operationEdit" @click="EditShow">
      <img src="../../../../assets/imgers/编辑.png" alt="" />
      <p>编辑</p>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
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
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEdit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { brandShowApi,brandEditApi } from "./addUrl.js";
export default {
  props: ["OperationEdit"],
  inject:["brandListValue"],
  data() {
    return {
      EditId: {
        id: "",
      },
      ruleForm: {
        title: "",
        content: "",
        thumb: "",
        qualification: "",
      },
      dialogVisible: false,
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
    EditShow() {
      this.dialogVisible = true;
      this.EditId.id = this.OperationEdit.id;
      postD(brandShowApi(), this.EditId).then((res) => {
        this.ruleForm = res.data;
      });
    },
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
    addEdit() {
      this.dialogVisible = false;
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(brandEditApi(),this.ruleForm).then(res=> {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.brandListValue();
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
    }
  },
};
</script>

<style lang="less" scoped>
.operationEdit {
  cursor: pointer;
  position: relative;
  img {
    position: absolute;
  }
  p {
    margin-left: 80px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #00b567;
    line-height: 19px;
  }
}
</style>