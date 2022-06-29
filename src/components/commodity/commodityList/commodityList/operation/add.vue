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
            <div>
              <span>(最多9张图)</span>
              <el-upload
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                list-type="picture-card"
                :data="{ fileType: this.fileType }"
                :limit="9"
                :on-success="handleAvatarSuccesser"
                :before-upload="beforeAvatarUpload"
              >
                <i slot="default" class="el-icon-plus"></i>
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              </el-upload>
            </div>
          </el-form-item>
        </div>
        <div class="line2" style="margin-top: 15px">
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
                <el-input
                  v-model="item.price"
                  placeholder="库存-必填"
                ></el-input>
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
          <el-form-item label="视频介绍">
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
const colors = ["黑色", "白色", "红色", "黄色", "蓝色", "绿色"];
const sizes = ["XXS", "XS ", "S", "M", "L", "XL "];
import EleUploadVideo from "vue-ele-upload-video";
import {
  brandGetListApi,
  custypeGetListApi,
  company_productAddProductApi,
} from "../../../commodityUrl.js";
import { beforeAvatar, imgUrl } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
export default {
  inject: ["commodityValue"],
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      imageValue: "",
      Content: "",
      isClear: false,
      dialogVisible: false,
      thumbs: [],
      ruleForm: {
        thumb: "",
        title: "",
        spec: "",
        brand_id: "",
        type: "",
        custom_type: "",
        content: "",
      },
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
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入产品标题",
            tirgger: "blur",
          },
        ],
      },
      disabled: false,
      fileType: "images",
      imageUrl: "",
      fileList: [],
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
      videoone: "",
      thumbsVideo:"",
      imageUrls: [],
      thumbs2:[],
      content1:"",
      content2: "",
      thumbs3: [],
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
      postD(brandGetListApi()).then((res) => {
        this.options = res.list;
        this.imageValue = imgUrl();
      });
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        this.typeOptions = res.list;
      });
      postD(custypeGetListApi()).then((res) => {
        this.custom_typeOptions = res.list;
      });
    },
    handleAvatarSuccesser(res, file) {
      this.thumbs.push(res.url);
    },
    handleAvatarSuccessers(res) {
      this.imageUrls.push(res.url);
      this.thumbs2.push(res.url);
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    beforeAvatarUploads(file) {
      return beforeAvatar(file);
    },
    delInputHandle(index) {
      this.specs.splice(index, 1);
    },
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
    contentPhoto(res,file) {
      this.thumbs3.push(res.url)
    },
    dialogVisibleAdd() {
      this.ruleForm.thumb = this.thumbsVideo+ ',' + this.thumbs+ ',' +this.thumbs2;
      this.ruleForm.content = this.content1 + this.content2+this.thumbs3;
      this.ruleForm.spec = JSON.stringify(this.spec);
      console.log(this.ruleForm);
      this.$refs.ruleFormRef.validate((v) => {
        if (!v) return;
        postD(company_productAddProductApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.commodityValue();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，已存在");
          }
        });
      });
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
    },
    handleResponses(res, file) {
     this.thumbsVideo = res.url;
      return URL.createObjectURL(file.raw);
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
/deep/.el-upload-dragger {
  width: 148px;
  height: 148px;
}
/deep/.el-form-item__content {
  display: flex;
}
.colors {
  .el-input {
        width: 95px;
        margin-left: 40px;
        margin-top: -2px;
    }
}
.sizes {
  .el-input {
        width: 95px;
        margin-left: 40px;
        margin-top: -2px;
    }
}
.addValues {
    display: flex;
    justify-content: center;

    div {
        cursor: pointer;
        width: 200px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 3px 3px 3px 3px;
        opacity: 1;
        border: 1px solid #0C032E;

        span {
            font-size: 16px;
            font-family: PingFang SC-Regular, PingFang SC;
            color: #333333;
            line-height: 40px;
        }
    }
}
.list3 {
    display: flex;
    border: 1px solid #DDDDDD;

    div {
        width: 500px;
        height: 80px;

        span {
            line-height: 80px;
        }
    }
}

.list3list {
    display: flex;
    position: relative;

    div:nth-child(1) {
        width: 500px;
        height: 80px;
        border-left: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;

        span {
            line-height: 80px;
        }
    }

    div:nth-child(2) {
        width: 500px;
        height: 80px;
        border-bottom: 1px solid #DDDDDD;

        span {
            line-height: 80px;
        }
    }

    div:nth-child(3) {
        width: 500px;
        height: 80px;
        border-right: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;
        position: relative;

        .el-input {
            border: none;
            width: auto;

            /deep/.el-input__inner {
                border: none;
                margin-top: 20px;
                background-color: #DDDDDD;
            }
        }
    }

}
.delspec {
    position: absolute;
    margin-top: 30px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background: #FF0000;
    border-radius: 50%;
    color: white;
    line-height: 20px;
    cursor: pointer;
}
.listphoto {
    text-align: left;
    padding: 0 30px;
}

.titlevalue {
    font-size: 20px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
}

.titlevalueline2 {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 30PX;

    .titlevalueline2com {
        width: 300px;
        margin-left: 10px;

        .colort {
            font-size: 16px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 19px;
        }
    }
}
.line4 {
    margin-top: 20px;
    background: white;
    padding: 20px;
    /deep/.el-textarea__inner {
        width: 100% !important;
        height: 120px !important;
        background: #F5F5F5;
    }
}
</style>