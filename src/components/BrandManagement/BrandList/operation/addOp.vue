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
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
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
    <div class="buttonAdd">
      <div class="addBrand" @click="zxc"><span>添加品牌</span></div>
    </div>
  </div>
</template>

<script>
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { brandAddApi } from "./addUrl";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      companymain: [],
      ruleForm: {
        title: "",
        content: "",
        thumb: "",
        qualification: "",
        style: [],
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
    };
  },
  created() {
    this.getListvalue();
  },
  methods: {
    getListvalue() {
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        this.companymain = res.list;
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
    zxc() {
      // this.companymain.forEach((v) => {
      //   this.ruleForm.style.forEach((vs) => {
      //     if ((vs = v.title)) {
      //       this.ruleForm.style_id.push(v.id);
      //     }
      //   });
      // });
      this.ruleForm.style = this.ruleForm.style.toString();
      // this.ruleForm.style_id = [...new Set(this.ruleForm.style_id)].toString();
      console.log(this.ruleForm);

      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(brandAddApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.$router.push("/brand/getList");
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.addBody {
  padding: 20px 30px;
  .addsurface {
    padding: 20px 30px;
    background-color: white;
  }
}
.buttonAdd {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.addBrand {
  width: 300px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 20px 20px 20px 20px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
/deep/.avatar-uploader {
  display: flex;
}
/deep/.avatar-uploader .el-upload {
  background: #f5f5f5;
}
/deep/.el-input__inner {
  background: #f5f5f5;
}
/deep/.el-select {
  width: 100%;
}
</style>