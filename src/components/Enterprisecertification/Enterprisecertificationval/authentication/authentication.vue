<template>
  <div>
    <el-form
      :model="authruleForm"
      :rules="authruleFormrules"
      ref="authruleFormruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <div class="authpadding">
        <div>
          <el-form-item label="法人姓名" prop="name">
            <el-input v-model="authruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="card_no">
            <el-input v-model="authruleForm.card_no"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="authruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="company_name">
            <el-input v-model="authruleForm.company_name"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="authpaddings">
        <div class="authyyzz">
          <el-form-item label="营业执照">
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
      </div>
      <div class="authpaddings">
        <div class="authyyzzs">
          <div class="sfzxx">身份证信息</div>
          <el-form-item>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccessz"
                :data="{ fileType: this.fileType }"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlz" :src="imageUrlz" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div>上传身份证正面图</div>
              </el-upload>
            </div>
            <div style="margin-left: 5.5%">
              <el-upload
                class="avatar-uploader"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccessf"
                :before-upload="beforeAvatarUpload"
                :data="{ fileType: this.fileType }"
              >
                <img v-if="imageUrlf" :src="imageUrlf" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div>上传身份证背面图</div>
              </el-upload>
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="authpaddings">
        <div class="authyyzzss">
          <div class="sfzxx">企业照片</div>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccessShop"
              :before-upload="beforeAvatarUpload"
              :data="{ fileType: this.fileType }"
            >
              <img v-if="imageUrls" :src="imageUrls" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="addvalue">
      <div class="addauthentication" @click="addAuthentication">
        <span>提交认证</span>
      </div>
    </div>
  </div>
</template>

<script>
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { setAuthApi } from "@/urls/wsUrl.js";
export default {
  data() {
    return {
      authruleForm: {
        name: "",
        tel: "",
        license: "",
        card_z: "",
        card_f: "",
        shop_img: "",
        company_name: "",
        card_no: "",
      },
      authruleFormrules: {
        name: [{ required: true, message: "请输入法人姓名", trigger: "blur" }],
        company_name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
        card_no: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern:
              /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: "请输入正确的身份证号",
            trigger: "blur",
          },
        ],
      },
      fileType: "images",
      imageUrl: "",
      imageUrlz: "",
      imageUrlf: "",
      imageUrls: "",
    };
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.authruleForm.license = res.url;
    },
    handleAvatarSuccessz(res, file) {
      this.imageUrlz = URL.createObjectURL(file.raw);
      this.authruleForm.card_z = res.url;
    },
    handleAvatarSuccessf(res, file) {
      this.imageUrlf = URL.createObjectURL(file.raw);
      this.authruleForm.card_f = res.url;
    },
    handleAvatarSuccessShop(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.authruleForm.shop_img = res.url;
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    addAuthentication() {
      this.$refs.authruleFormruleForm.validate((v) => {
        if (!v) return;
        postD(setAuthApi(), this.authruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success(res.msg);
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
@import url("./authentication.less");
</style>