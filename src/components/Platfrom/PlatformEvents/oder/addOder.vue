<template>
  <div class="bodys">
    <el-form
      :model="ruleForm"
      :rules="ruleFormRules"
      ref="ruleFormRef"
      label-width="140px"
      hide-required-asterisk
    >
      <div class="line1">
        <el-form-item label="产品标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="标题示例：夏季新款 韩版碎花连衣裙"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品主图" prop="thumb">
          <ele-upload-video
            :data="{
              token: this.token,
              fileType: this.fileTypes,
            }"
            :file-size="20"
            :response-fn="handleResponses"
            @error="handleUploadError"
            style="margin: 50px"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            v-model="videoone"
          ></ele-upload-video>
          <div style="margin-top: 10px">
            <span>(最多9张图)</span>
            <el-upload
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              list-type="picture-card"
              :data="{ fileType: this.fileType }"
              :limit="9"
              multiple
              :on-success="handleAvatarSuccesser"
              :before-upload="beforeAvatarUpload"
            >
              <i slot="default" class="el-icon-plus"></i>
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            </el-upload>
          </div>
        </el-form-item>
      </div>
      <div class="line2">
        <el-form-item label="颜色" prop="color" style="padding-top: 20px">
          <div class="colors">
            <el-checkbox-group v-model="color">
              <el-checkbox
                v-for="(item, index) in colorList"
                :key="index"
                :label="item"
                @change="colorss(item)"
                border
                >{{ item }}
              </el-checkbox>
              <el-input
                placeholder="请输入"
                v-model="colorinput"
                @blur="losecolor"
                clearable
              >
              </el-input>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <div class="sizes">
            <el-checkbox-group v-model="size">
              <el-checkbox
                v-for="(item, index) in sizeList"
                :key="index"
                :label="item"
                @change="sizess(item)"
                border
              >
                <div>
                  {{ item }}
                </div>
              </el-checkbox>
              <el-input
                placeholder="请输入"
                v-model="sizeinpuit"
                @blur="losesize"
                clearable
              >
              </el-input>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <div class="addValues">
          <div @click="addInputHandle">
            <span>新增规格</span>
          </div>
        </div>
        <div style="padding: 40px">
          <div class="list3">
            <div><span>颜色</span></div>
            <div><span>尺寸</span></div>
            <div><span>零售价</span></div>
          </div>
          <div class="list3list" v-for="(item, index) in spec" :key="index">
            <div>
              <p class="delspec" @click="delspec(index)">x</p>
              <span>{{ item.color }}</span>
            </div>
            <div>
              <span>{{ item.spec }}</span>
            </div>
            <div>
              <el-input v-model="item.price" placeholder="库存-必填"></el-input>
            </div>
          </div>
        </div>
        <div class="listphoto">
          <div class="titlevalue">图片列表</div>
          <div class="titlevalueline2">
            <div
              v-for="(item, index) in speccolior"
              :key="index"
              class="titlevalueline2com"
            >
              <div class="colort">{{ item.color }}</div>
              <el-upload
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :data="{ fileType: fileType }"
                :on-success="handleAvatarSuccessers"
                :before-upload="beforeAvatarUploads"
                :show-file-list="false"
                class="avatar-uploader"
              >
                <img
                  v-if="imageUrls != ''"
                  :src="imageValue + imageUrls[index]"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="line3">
        <el-form-item label="预购数量" prop="title">
          <el-input v-model="config.max_count"></el-input>
        </el-form-item>
        <el-form-item label="最低预购数量" prop="title">
          <el-input v-model="config.min_count"></el-input>
        </el-form-item>
        <div class="djbl">
          <el-form-item label="定金比例" prop="title">
            <el-input v-model="config.deposit_prop"></el-input>
            <div class="bling">%</div>
          </el-form-item>
        </div>
        <el-form-item label="交货日期" prop="title">
          <!-- <el-input v-model="config.delivery_time"></el-input> -->
          <el-date-picker
            v-model="timeser"
            type="datetime"
            placeholder="选择报名结束时间"
            @change="gitTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品牌选择" prop="title">
          <el-select v-model="ruleForm.brand_id" placeholder="请选择">
            <el-option
              v-for="item in brand_idoptions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺中分类" prop="title">
          <el-select v-model="ruleForm.custom_type" placeholder="请选择">
            <el-option
              v-for="item in custom_typeoptions"
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
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            v-model="video"
          ></ele-upload-video>
        </el-form-item>
        <el-form-item label="新品推荐" prop="title">
          <div class="is_new">
            <el-select v-model="ruleForm.is_new" placeholder="请选择">
              <el-option
                v-for="item in is_newoptions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="商品介绍" prop="title">
          <el-input
            v-model="content2"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加图片" prop="title">
          <el-upload
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            list-type="picture-card"
            :data="{ fileType: this.fileType }"
            :limit="9"
            :on-success="contentPhoto"
            :before-upload="beforeAvatarUpload"
            multiple
          >
            <i slot="default" class="el-icon-plus"></i>
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <div class="addygs">
      <div class="addyg" @click="ygAdd"><span>发起预购</span></div>
    </div>
  </div>
</template>

<script>
import EleUploadVideo from "vue-ele-upload-video";
import { imgUrl, beforeAvatar } from "@/assets/js/modifyStyle.js";
import {
  brandGetListApi,
  match_productAddProductApi,
  custypeGetListApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
const colors = ["黑色", "白色", "红色", "黄色", "蓝色", "绿色"];
const sizes = ["XXS", "XS ", "S", "M", "L", "XL "];
import {timestampToTime}from "@/assets/js/time.js"
export default {
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      ruleForm: {
        match_id: "",
        accept_id: "",
        title: "",
        thumb: "",
        spec: "",
        config: "",
        brand_id: "",
        is_new: "",
        content: "",
        works_id: "",
      },
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入产品标题",
            tirgger: "blur",
          },
        ],
      },
      fileType: "images",
      fileTypes: "images",
      imageUrl: "",
      imageUrls: [],
      thumbs: [],
      thumbsVideo: "",
      thumbs2: [],
      thumbs3: [],
      imageValue: "",
      //   颜色
      color: [],
      colorList: colors,
      colorinput: "",
      specColor: [],
      //   尺寸
      size: [],
      sizeList: sizes,
      sizeinpuit: "",
      specSize: [],
      //   添加
      spec: [],
      speccolior: [],
      // 商品配置
      config: {
        max_count: "",
        min_count: "",
        deposit_prop: "",
        delivery_time: "",
      },
      // 品牌选择
      brand_idoptions: [],
      // 店铺分类
      custom_typeoptions: [],
      // 视频
      token: "",
      video: "",
      videoone: "",
      fileTypes: "moves",
      // 新品
      is_newoptions: [
        {
          id: "0",
          title: "非新品推荐 ",
        },
        {
          id: "1",
          title: "新品推荐 ",
        },
      ],
      // 视频 商品介绍 添加图片
      content1: "",
      content2: "",
      // 时间
      timeser:""
    };
  },
  created() {
    this.imageValue = imgUrl();
    this.brandList();
    this.custom_typeList();
    this.token = localStorage.getItem("token", this.token);
  },
  methods: {
    handleAvatarSuccesser(res, file) {
      this.thumbs.push(res.url);
    },
    handleAvatarSuccessers(res) {
      this.imageUrls.push(res.url);
      this.thumbs2.push(res.url);
    },
    contentPhoto(res, file) {
      this.thumbs3.push(res.url);
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    beforeAvatarUploads(file) {
      return beforeAvatar(file);
    },
    // 颜色
    colorss(val) {
      this.specColor.push(val);
    },
    delitem(index) {
      this.colorList.splice(index, 1);
    },
    losecolor() {
      if (this.colorinput !== "") {
        this.colorList.push(this.colorinput);
      }
      this.colorinput = "";
    },
    // 尺寸
    sizess(val) {
      this.specSize.push(val);
    },
    losesize() {
      if (this.sizeinpuit !== "") {
        if (this.sizeList.indexOf(this.sizeinpuit) != -1) {
          this.sizeinpuit = null;
        }
        this.sizeList.push(this.sizeinpuit);
      }
      this.sizeinpuit = "";
    },
    delsize(index) {
      this.sizeList.splice(index, 1);
    },
    // 添加
    addInputHandle() {
      for (let i = 0; i < this.specColor.length; i++) {
        for (let j = 0; j < this.specSize.length; j++) {
          this.spec.push({
            color: this.specColor[i],
            spec: this.specSize[j],
            price: "",
          });
        }
      }
      this.color = [];
      this.size = [];
      this.specColor = [];
      this.specSize = [];
      let some = [];
      this.spec.forEach((v) => {
        if (!some.some((val) => val.color == v.color)) {
          some.push(v);
        }
      });
      this.speccolior = some;
    },
    delspec(index) {
      this.spec.splice(index, 1);
      this.speccolior.splice(index, 1);
    },
    // 品牌选择
    brandList() {
      postD(brandGetListApi()).then((res) => {
        this.brand_idoptions = res.list.filter((i) => i.status == "1");
      });
    },
    // 店铺分类
    custom_typeList() {
      postD(custypeGetListApi()).then((res) => {
        this.custom_typeoptions = res.list;
      });
    },
    // 视频介绍
    handleUploadError(error) {
      this.$notify.error({
        title: "上传提示",
        message: "测试环境无法上传文件",
      });
      console.log("error", error);
    },
    handleResponse(res, file) {
      this.content1 = res.url;
      return URL.createObjectURL(file.raw);
    },
    handleResponses(res, file) {
      this.thumbsVideo = res.url;
      return URL.createObjectURL(file.raw);
    },
    gitTime(date) {
      let newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(timestampToTime(date/1000))
      this.config.delivery_time =newDate[0]
    },
    ygAdd() {
      var colorser = [];
      for (let index = 0; index < this.speccolior.length; index++) {
        let json = {};
        json.url = this.thumbs2[index];
        json.color = this.speccolior[index].color;
        colorser.push(json);
      }
      this.ruleForm.thumb = {
        thumbList: this.thumbsVideo + "," + this.thumbs,
        colorList: colorser,
        videoList: this.thumbsVideo
      };
      this.ruleForm.content = {
        text: this.content2,
        images: this.content1 + "," + this.thumbs3,
      };
      this.ruleForm.accept_id = this.$route.params.accept_id;
      this.ruleForm.match_id = this.$route.params.match_id;
      this.ruleForm.works_id = this.$route.params.works_id;
      this.ruleForm.thumb = JSON.stringify(this.ruleForm.thumb).toString();
      this.ruleForm.spec = JSON.stringify(this.spec);
      this.ruleForm.config = JSON.stringify(this.config).toString();
      this.ruleForm.content = JSON.stringify(this.ruleForm.content).toString();
      console.log(this.ruleForm.config);
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(match_productAddProductApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("预购商品成功");
            this.$router.push("/match/detial" + this.ruleForm.match_id);
          } else {
            this.$message.error("预购商品失败");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./oder.less");
</style>