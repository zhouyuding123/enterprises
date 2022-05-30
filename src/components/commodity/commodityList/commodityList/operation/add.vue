<template>
  <div>
    <div class="addProduct" @click="addShow">
      <span>添加</span>
    </div>
    <el-dialog title="添加产品" :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="110px"
        hide-required-asterisk
      >
        <div class="line2">
          <el-form-item label="产品标题" prop="title">
            <el-input
              v-model="ruleForm.title"
              placeholder="标题示例：夏季新款 韩版碎花连衣裙"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品图片" prop="thumb">
            <span>(最多9张图)</span>
            <el-upload
              action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              list-type="picture-card"
              :auto-upload="false"
              :data="{ fileType: this.fileType }"
              :limit="9"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i slot="default" class="el-icon-plus"></i>
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="line2" style="margin-top: 15px">
          <el-form-item label="新增规格:" style="width: 100%">
            <div v-for="(item, index) in ruleForm.spec" :key="index">
              <div class="prizesS">
                <el-input
                  v-model="item.color"
                  style="width: 350px"
                  placeholder="颜色-必填"
                ></el-input>
                <el-input
                  v-model="item.spec"
                  style="width: 350px"
                  placeholder="尺寸-必填"
                ></el-input>
                <el-input
                  v-model="item.price"
                  style="width: 350px"
                  placeholder="价格-必填"
                ></el-input>
                <el-input
                  v-model="item.count"
                  style="width: 350px"
                  placeholder="价格-必填"
                ></el-input>
                <div
                  class="addInput"
                  @click="addInputHandle"
                  v-if="index === 0"
                >
                  <span>添加</span>
                </div>
                <div class="delInput" @click="delInputHandle(index)" v-else>
                  <span>删除</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="line2" style="margin-top: 15px">
          <el-form-item label="产品选择" prop="brand_id">
            <el-select v-model="ruleForm.brand_id" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台分类" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺分类" prop="custom_type">
            <el-select v-model="ruleForm.custom_type" placeholder="请选择">
              <el-option
                v-for="item in custom_typeOptions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频介绍" prop="title">
            <ele-upload-video
              :data="{
                token: this.token,
                fileType: this.fileTypes,
              }"
              :file-size="20"
              :response-fn="handleResponse"
              @error="handleUploadError"
              style="margin: 50px"
              action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              v-model="video"
            ></ele-upload-video>
          </el-form-item>
        </div>
        <div>
          <my-editor
            @fwbHtml="change"
          />
        </div>
      </el-form>

      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleAdd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyEditor from "./MyEditor.vue";
import EleUploadVideo from "vue-ele-upload-video";
import { brandGetListApi, custypeGetListApi } from "../../../commodityUrl.js";
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
export default {
  components: {
    EleUploadVideo,
    MyEditor,
  },
  data() {
    return {
      Content:"",
      isClear: false,
      dialogVisible: false,
      ruleForm: {
        thumb: "",
        title: "",
        spec: [
          {
            color: "",
            spec: "",
            price: "",
            count: "",
          },
        ],
        brand_id: "",
        type: "",
        custom_type: "",
        content: "",
      },
      ruleFormRules: {},
      disabled: false,
      fileType: "images",
      imageUrl: "",
      // 品牌id
      options: [],
      //选择平台设置的商品类别
      typeOptions: [],
      // 自定义
      custom_typeOptions: [],
      //   视频
      fileTypes: "video",
      // 验证
      token: "",
      video: "",
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
      postD(brandGetListApi()).then((res) => {
        this.options = res.list;
      });
      postD("http://weisou.chengduziyi.com/designer/product_type/getList").then(
        (res) => {
          this.typeOptions = res.list;
        }
      );
      postD(custypeGetListApi()).then((res) => {
        this.custom_typeOptions = res.list;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.thumb = res.url;
      console.log(file);
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    addInputHandle() {
      this.ruleForm.spec.push({ color: "", spec: "", price: "" });
    },
    delInputHandle(index) {
      this.ruleForm.spec.splice(index, 1);
    },
    handleUploadError(error) {
      this.$notify.error({
        title: "上传提示",
        message: "测试环境无法上传文件",
      });
      console.log("error", error);
    },
    handleResponse(res, file) {
      this.ruleForm.content = res.url;
      return URL.createObjectURL(file.raw);
    },
    dialogVisibleAdd() {
      console.log(this.ruleForm);
    },
    async change(val) {
      this.ruleForm.content = val
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.el-dialog {
  background-color: #f5f5f5;
}
.addProduct {
  cursor: pointer;
  margin-left: 10px;
  width: 80px;
  height: 40px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #0c032e;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }
}
.line2 {
  padding: 20px;
  background-color: white;
  border-radius: 6px 6px 6px 6px;
}
.el-select {
  text-align: left;
}
</style>