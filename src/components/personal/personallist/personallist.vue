<template>
  <div class="perpdding">
    <div class="line1">
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="first"> </el-tab-pane>
        <el-tab-pane label="账号与安全" name="second"> </el-tab-pane>
        <el-tab-pane label="隐私" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="lineone" v-if="activeName == 'first'">
      <div class="lineongpadding">
        <el-form
          :model="personalruleForm"
          :rules="personalrules"
          ref="personalruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像">
            <el-upload
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :show-file-list="false"
              :data="{ fileType: this.fileType }"
              multiple
              :on-success="handleAvatarSuccesser"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="valueData.headimage"
                :src="imagesValue + valueData.headimage"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="valueData.nickname"></el-input>
          </el-form-item>
          <el-form-item label="企业电话">
            <el-input v-model="valueData.tel"></el-input>
          </el-form-item>
          <div class="asdasdsa">
            <el-form-item label="企业地址" v-if="selectedOptionsshow == 1">
            <el-input v-model="selectedOptionss" ></el-input><div class="xg" @click="asd">修改 </div>
          </el-form-item>
          </div>
          <el-form-item label="企业地址" prop="address" v-if="selectedOptionsshow == 2">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"

            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="valueData.detail"></el-input>
          </el-form-item>
          <div class="typetext">
            <el-form-item label="企业简介">
              <el-input
                v-model="valueData.description.introduce"
                type="textarea"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="微信账号">
            <div class="vx">
              <div class="vxgr">
                <img src="@/assets/myimger/微信个人.png" alt="" />
              </div>
              <div class="ljbd">立即绑定</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="activeName == 'first'" class="bc">
      <div @click="preservation">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoApi, editInfoApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      imagesValue: "",
      activeName: "first",
      personalruleForm: {},
      personalrules: {},
      fileType: "images",
      pass: {
        username: "",
      },
      valueData: {
        headimage: "",
        nickname: "",
        tel: "",
        province: "",
        city: "",
        area: "",
        detail: "",
        description: {
          introduce: "",
          photo: "",
          qualifications: "",
          video: "",
        },
      },
        options: regionData,
        selectedOptions: [],
        selectedOptionss: "",
        address: "",
        selectedOptionsshow:"1"
    };
  },
  created() {
    this.myUser();
    this.imagesValue = imgUrl();
  },
  methods: {
    myUser() {
      this.pass.username = localStorage.use;
      postD(getInfoApi(), this.pass).then((res) => {
        this.valueData.headimage = res.data.headimage;
        this.valueData.nickname = res.data.nickname;
        this.valueData.tel = res.data.tel;
        this.valueData.province = res.data.province;
        this.valueData.city = res.data.city;
        this.valueData.area = res.data.area;
        this.valueData.detail = res.data.detail;
        this.valueData.description = JSON.parse(res.data.description);
        this.selectedOptionss =
          this.valueData.province +
          "/" +
          this.valueData.city +
          "/" +
          this.valueData.area;
      });
    },
    handleAvatarSuccesser(res, file) {
      this.valueData.headimage = res.url;
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
    preservation() {
      this.$refs.personalruleForm.validate((v) => {
        if (!v) return;
        this.personalruleForm = this.valueData;
        this.personalruleForm.description = JSON.stringify(
          this.personalruleForm.description
        );
        this.personalruleForm.province = this.address.split("/")[0];
        this.personalruleForm.city = this.address.split("/")[1];
        this.personalruleForm.area = this.address.split("/")[2];
        postD(editInfoApi(), this.personalruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("保存成功");
            this.selectedOptionsshow =1
            this.myUser();
          } else {
            this.$message.error("保存时出现问题");
          }
        });
      });
    },
    //省市区三级联动事件
    handleChange(value) {
      if (value[1] != null && value[2] != null) {
        var dz =
          CodeToText[value[0]] +
          "/" +
          CodeToText[value[1]] +
          "/" +
          CodeToText[value[2]];
        this.addressid = value[2];
      } else {
        if (value[1] != null) {
          dz = CodeToText[value[0]] + "/" + CodeToText[value[1]];
          this.addressid = value[1];
        } else {
          dz = CodeToText[value[0]];
          this.addressid = value[0];
        }
      }
      this.address = dz;
    },
    asd() {
      this.selectedOptionsshow =2
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./personallist.less");
</style>