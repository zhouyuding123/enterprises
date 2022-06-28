<template>
  <div>
    <div class="Release">
      <p>发布活动</p>
    </div>
    <el-form
      :model="ruleForm"
      :rules="ruleFormRules"
      ref="ruleFormRef"
      label-width="100px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <div class="TextInput">
        <div style="padding: 30px 60px">
          <el-form-item label="圈子名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="圈子简介" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="圈子标签" prop="label">
            <el-input v-model="ruleForm.label"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="photoInput">
        <div class="paddingInput">
          <el-form-item label="圈子头像" prop="headimg">
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
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
          <el-form-item
            label="背景图片"
            prop="thumb"
            style="padding-left: 350px"
          >
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccessthumb"
              :before-upload="beforeAvatarUploadthumb"
              :data="{ fileType: this.fileType }"
              style="width: 594px; height: 280px"
            >
              <img
                class="avatar"
                v-if="imageUrlthumb"
                :src="imageUrlthumb"
                :v-model="imageUrlthumb"
                style="width: 594px; height: 280px"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="width: 594px; height: 280px"
              ></i>
            </el-upload>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="addvalue">
      <p @click="addCircle">立即创建</p>
    </div>
  </div>
</template>


<script>
import { beforeAvatar } from "../../../assets/js/modifyStyle.js";
import crumbs from "../../Home/crumbs.vue";
import {CircleCreateCircleApi} from "./createCircleUrl.js"
import {postD} from "../../../api/index.js"
export default {
  components: {
    crumbs,
  },
  data() {
    return {
      ruleForm: {
        CircleName: "",
        description: "",
        CircleLabel: "",
        headimg: "",
        thumb: "",
      },
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入圈子标题",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入圈子简介",
            tirgger: "blur",
          },
        ],
        label: [
          {
            required: true,
            message: "请输入圈子标签",
            tirgger: "blur",
          },
        ],
        headimg: [
          {
            required: true,
            message: "请输入圈子头像,不超50KB的jpg图",
            tirgger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请输入背景图片,不超50KB的jpg图",
            tirgger: "blur",
          },
        ],

      },
      //   图片
      imageUrl: "",
      imageUrlthumb: "",
      fileType: "images",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.headimg = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    handleAvatarSuccessthumb(res, file) {
      this.imageUrlthumb = URL.createObjectURL(file.raw);
      this.ruleForm.thumb = res.url;
    },
    beforeAvatarUploadthumb(file) {
      beforeAvatar(file);
    },
    addCircle() {
       this.$refs.ruleFormRef.validate((v) => {
           if (!v) return;
        postD(CircleCreateCircleApi(),this.ruleForm)
        .then(res =>　{
            if (res.code == "200") {
            this.$message.success("状态修改成功");
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
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
.el-form {
  .TextInput {
    height: 220px;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    margin: 30px;
    .el-form-item {
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 19px;
    }
  }
}
/deep/.el-input__inner {
  background: #f5f5f5;
}
.photoInput {
  height: 370px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  margin: 30px;
  .paddingInput {
    padding: 30px 60px 0px 60px;
    display: flex;
    .el-form-item {
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 19px;
    }
  }
}
.avatar-uploader {
  width: 280px;
  height: 280px;
  display: block;
  .avatar {
    width: 280px;
    height: 280px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 280px;
  height: 280px;
  line-height: 280px;
  text-align: center;
}
.addvalue {
  width: 300px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 20px 20px 20px 20px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  left: 50%;
  cursor: pointer;
  p {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
// 创建圈子
</style>