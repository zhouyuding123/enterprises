<template>
  <div class="bodys">
    <el-form
      :model="ruleForm"
      :rules="ruleFormRules"
      ref="ruleFormRef"
      label-width="110px"
      hide-required-asterisk
    >
      <div class="line1">
        <el-form-item label="产品标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="标题示例：夏季新款 韩版碎花连衣裙"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="thumb">
          <span>(最多9张图)</span>
          <el-upload
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            list-type="picture-card"
            :data="{ fileType: this.fileType }"
            :limit="9"
            :on-success="handleAvatarSuccesser"
            :before-upload="beforeAvatarUpload"
          >
            <i slot="default" class="el-icon-plus"></i>
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          </el-upload>
        </el-form-item>
      </div>
      <div class="line2">
        <el-form-item label="颜色" prop="color" style="padding-top: 20px">
          <el-checkbox-group v-model="color">
            <el-checkbox
              v-for="(item, index) in colorList"
              :key="index"
              :label="item"
              @change="colorss(item)"
              border
              >{{ item }}
              <div class="dels" @click="delitem(index)">x</div>
            </el-checkbox>
            <el-input
              placeholder="请输入"
              v-model="colorinput"
              @blur="losecolor"
              clearable
            >
            </el-input>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-checkbox-group v-model="size">
            <el-checkbox
              v-for="(item, index) in sizeList"
              :key="index"
              :label="item"
              @change="sizess(item)"
              border
            >
              {{ item }}
              <div class="dels" @click="delsize(index)">x</div>
            </el-checkbox>
            <el-input
              placeholder="请输入"
              v-model="sizeinpuit"
              @blur="losesize"
              clearable
            >
            </el-input>
          </el-checkbox-group>
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
                action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                list-type="picture-card"
                :data="{ fileType: fileType }"
                :limit="1"
                :on-success="handleAvatarSuccesser"
                :before-upload="beforeAvatarUpload"
              >
                <i slot="default" class="el-icon-plus"></i>
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { imgUrl, beforeAvatar } from "@/assets/js/modifyStyle.js";
const colors = ["黑色", "白色", "红色", "黄色", "蓝色", "绿色"];
const sizes = ["XXS", "XS ", "S", "M", "L", "XL "];
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        thumb: "",
        spec: [{ color: "" }, { spec: "" }, { price: "" }],
      },
      ruleFormRules: {},
      fileType: "images",
      fileTypes: "images",
      imageUrl: "",
      thumbs: [],
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
    };
  },
  created() {
    this.imageValue = imgUrl();
  },
  methods: {
    handleAvatarSuccesser(res, file) {
      this.thumbs.push(res.url);
    },
    beforeAvatarUpload(file) {
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
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./oder.less");
</style>