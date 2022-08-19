<template>
  <div>
    <div class="operationEdit" @click="EditShow">
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
          <el-select v-model="ruleForm.style" multiple placeholder="请选择">
            <el-option
              v-for="item in companymain"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="LOGO" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="ruleForm.qualification"
              :src="imagesValue + ruleForm.qualification"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="相关资料" prop="qualification">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccessqualification"
            :before-upload="beforeAvatarUploadqualification"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="ruleForm.thumb"
              :src="imagesValue + ruleForm.thumb"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { beforeAvatar, imgUrl } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { brandShowApi, brandEditApi } from "./addUrl.js";
export default {
  props: ["OperationEdit"],
  inject: ["brandListValue"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      imagesValue: "",
      EditId: {
        id: "",
      },
      ruleForm: {
        id: "",
        title: "",
        content: "",
        thumb: "",
        qualification: "",
        style: [],
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
        style: [{ validator: validatePass, trigger: "blur" }],
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
      companymain: [],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    EditShow() {
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        this.companymain = res.list;
        this.dialogVisible = true;
        this.EditId.id = this.OperationEdit.id;
        if (this.ruleForm.style == "") {
          postD(brandShowApi(), this.EditId).then((res) => {
            this.ruleForm.id = res.data.id;
            this.ruleForm.title = res.data.title;
            this.ruleForm.content = res.data.content;
            this.ruleForm.qualification = res.data.qualification;
            this.ruleForm.thumb = res.data.thumb;
            if (res.data.style == null || res.data.style == "") {
              this.ruleForm.style = "";
            } else if (res.data.style.split(",").length >= 1) {
              this.companymain.forEach((item, i) => {
                res.data.style.split(",").forEach((items, is) => {
                  if (items == item.title) {
                    this.ruleForm.style.push(item.id);
                  }
                });
              });
            } else {
              res.data.style.forEach((items, is) => {
                if (items == item.title) {
                  this.ruleForm.style.push(item.id);
                }
              });
            }
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.thumb = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    handleAvatarSuccessqualification(res, file) {
      this.ruleForm.qualification = res.url;
    },
    beforeAvatarUploadqualification(file) {
      beforeAvatar(file);
    },
    addEdit() {
      this.dialogVisible = false;
      this.ruleForm.style = this.ruleForm.style.toString();
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(brandEditApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.brandListValue();
            var style = [];
            this.companymain.forEach((item, i) => {
              this.ruleForm.style.split(",").forEach((items, is) => {
                if (items == item.title) {
                  style.push(item.title);
                }
              });
            });
            this.ruleForm.style = style;
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
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
    color: #0177d5;
    line-height: 19px;
  }
}
.el-select {
  width: 100%;
}
</style>