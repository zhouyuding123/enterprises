<template>
  <div>
    <div class="authpadding" v-if="edits == 1">
      <div class="Authline1">
        <div class="line1title">
          <div class="line1title_value">
            <div class="line1title_nickname">{{ infoValue.nickname }}</div>
            <div class="line1title_img" v-if="infoValue.auth == 2">
              <img src="@/assets/myimger/认证.png" alt="" />
            </div>
          </div>
          <div class="rate_s">
            <el-rate v-model="value1"></el-rate>
            <div class="rate_sFs">粉丝数：1000000000</div>
          </div>
          <div class="line3zy">主营:{{ infoValue.company_main }}</div>
          <div class="line4">
            {{ infoValue.detail }}
          </div>
        </div>
        <div class="tels">
          <div class="tels_Navigation">
            <div><img src="@/assets/myimger/导航.png" alt="" /></div>
            <div class="tels_Navigation_title">导航</div>
          </div>
          <div class="tels_Navigation">
            <div><img src="@/assets/myimger/电话.png" alt="" /></div>
            <div class="tels_Navigation_title">电话</div>
          </div>
          <div class="tels_Navigation">
            <div><img src="@/assets/myimger/沟通.png" alt="" /></div>
            <div class="tels_Navigation_title">沟通</div>
          </div>
        </div>
      </div>
      <div class="Authline2">
        <div class="Authline2title">企业照片</div>
        <div class="Authline2title_Img dis" v-if="desphoto !== ''">
          <div v-for="(item, index) in desphoto.slice(0, 4)" :key="index">
            <el-image
              style="width: 280px; height: 200px"
              :src="imagesValue + item"
              :preview-src-list="desphotos"
            >
            </el-image>
          </div>
        </div>
        <div class="Authline2title_Img dis" v-else>
          <div class="Authline2title_Imgwu">
            <img src="@/assets/imgers/等待上传.png" alt="">
          </div>
        </div>
      </div>
      <div class="Authline3">
        <div class="Authline3title">品牌展示</div>
        <div class="Authline3title_Img" v-if="brandGetBrandlist">
          <div v-for="item in brandGetBrandlist" :key="item.id" class="pp">
            <div class="pp_img">
              <el-image
                style="width: 100%; height: 100%"
                :src="imagesValue + item.thumb"
                :preview-src-list="[imagesValue + item.thumb]"
              />
            </div>
            <div class="pp_title">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="Authline3title_Img" v-else>
          <div class="Authline2title_Imgwu">
            <img src="@/assets/imgers/等待上传.png" alt="">
          </div>
        </div>
      </div>
      <div class="Authline4">
        <div class="Authline4title">企业介绍</div>
        <div class="Authline4des" v-if="des.introduce != ''">
          {{ des.introduce }}
        </div>
        <div class="Authline4des" v-else>
          企业暂未上传简介
        </div>
        <div
          style="padding-left: 50px; padding-top: 20px"
          v-if="des.video != ''"
        >
          <video
            style="width: 100%; height: 300px"
            controls
            :src="imagesValue + des.video"
          ></video>
        </div>
      </div>
      <div class="Authline5">
        <div class="Authline5title">企业资质</div>
        <div class="pps" v-if="qualifications != ''">
          <div class="pp_imgs">
            <div class="Authline3title_Img">
              <el-image
                :src="imagesValue + qualifications"
                :preview-src-list="[imagesValue + qualifications]"
              />
            </div>
          </div>
        </div>
        <div class="pps" v-else>
     
          
              <img src="@/assets/imgers/等待上传.png" alt="">
        
        
        </div>
      </div>
      <div class="Authline6">
        <div @click="goEdit">
          <span>编辑</span>
        </div>
      </div>
    </div>
    <div v-if="edits == 2">
      <data-value-edit />
    </div>
  </div>
</template>

<script>
import { getAuthApi, getInfoApi, brandGetBrandApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import dataValueEdit from "./dataValueEdit/dataValueEdit.vue";
export default {
  components: { dataValueEdit },
  data() {
    return {
      getAuthValues: [],
      infoValue: [],
      brandGetBrandlist: [],
      info: {
        username: "",
      },
      value1: null,
      imagesValue: "",
      edits: "1",
      des: "",
      desphoto: "",
      desphotos: [],
      qualifications: [],
    };
  },
  created() {
    this.getAuthValue();
    this.getInfoValue();
    this.brandGetBrand();
    this.imagesValue = imgUrl();
  },
  methods: {
    getInfoValue() {
      this.info.username = localStorage.use;
      postD(getInfoApi(), this.info).then((res) => {
        console.log(res);
        this.infoValue = res.data;
        var des = res.data.description;
        var desjs = JSON.parse(des);
        console.log(desjs);
        this.des = desjs;
        if (desjs.photo == "" || desjs.photo == null) {
          this.desphoto = "";
        } else if (desjs.photo.length >= 1) {
          this.desphoto = desjs.photo.split(',');
          this.desphoto.forEach((v) => {
            this.desphotos.push(this.imagesValue + v);
          });
        } else if (desjs.photo.length < 1) {
          this.desphoto = desjs.photo;
        }
        if (desjs.qualifications == "" || desjs.qualifications == null) {
          this.qualifications = "";
        } else {
          this.qualifications = desjs.qualifications;
        }
      });
    },
    getAuthValue() {
      postD(getAuthApi()).then((res) => {
        this.getAuthValues = res.data;
      });
    },
    brandGetBrand() {
      postD(brandGetBrandApi(), this.info).then((res) => {
        console.log(res);
        this.brandGetBrandlist = res.list;
      });
    },
    goEdit() {
      this.edits = 2;
    },
  },
};
</script>
  
<style lang="less" scoped>
@import url("./dataValue.less");
</style>