<template>
  <div >
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
          <div class="line3zy">主营：女装 休闲服饰</div>
          <div class="line4">
            {{ infoValue.province }}{{ infoValue.city }}{{ infoValue.area
            }}{{ infoValue.detail }}
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
        <div class="Authline2title_Img">
          <el-image
            style="width: 280px; height: 200px"
            :src="imagesValue + getAuthValues.shop_img"
            :preview-src-list="[imagesValue + getAuthValues.shop_img]"
          >
          </el-image>
        </div>
      </div>
      <div class="Authline3">
        <div class="Authline3title">品牌展示</div>
        <div class="Authline3title_Img">
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
      </div>
      <div class="Authline4">
        <div class="Authline4title">企业介绍</div>
        <div class="Authline4des">
          {{ infoValue.description }}
          安踏集团是一家专门从事设计、生产、销售运动鞋服、配饰等运动装备的综合性、多品牌的体育用品集团。公司创立于1991年，2007年在香港上市。2018年安踏集团销售流水超过400亿人民币，同比增长超过44.4%。2019年上半年，安踏实现营收148亿，同比增长40%。经过近30年的发展，安踏集团已经从一家传统的民营企业转型成为具有现代化治理结构和国际竞争能力的公众公司。从2015年起，安踏集团一直是中国最大的体育用品集团，市值在2019年8月超过了1700亿港币，位列全球体育用品行业第三位。2021年，《财富》中国500强排行榜排名289。
        </div>
      </div>
      <div class="Authline5">
        <div class="Authline5title">企业资质</div>
        <div class="pps">
          <div class="pp_imgs">
            <div class="Authline3title_Img">
              <el-image
                :src="imagesValue + getAuthValues.license"
                :preview-src-list="[imagesValue + getAuthValues.license]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="Authline6">
        <div @click="goEdit">
          <span>编辑</span>
        </div>
      </div>
    </div>
    <div v-if="edits == 2">
        <data-value-edit/>
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
      edits:"2"
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
        this.infoValue = res.data;
      });
    },
    getAuthValue() {
      postD(getAuthApi()).then((res) => {
        this.getAuthValues = res.data;
      });
    },
    brandGetBrand() {
      postD(brandGetBrandApi(), this.info).then((res) => {
        this.brandGetBrandlist = res.list;
      });
    },
    goEdit() {
    this.edits =2 
    },
  },
};
</script>
  
<style lang="less" scoped>
@import url("./dataValue.less");
</style>