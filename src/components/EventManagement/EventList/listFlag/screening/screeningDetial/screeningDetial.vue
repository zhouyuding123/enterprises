<template>
  <div>
    <div class="go-"><span>返回上一级</span></div>
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto">
          <el-image
            :src="imagesValue + WorksShowData.headimage"
            alt=""
            class="headStyle"
          />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname">
            <span class="nickname_span">{{ WorksShowData.nickname }}</span
            ><span class="top">一级设计师</span>
          </div>
          <div class="fans_num">
            <span>粉丝数 123</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button_Shop"><span>购买版权</span></div>
          <div class="button_to"><span>发起众筹</span></div>
          <div class="button_follow"><span>关注</span></div>
        </div>
      </div>
      <div class="worksDiv2">
        <div class="worksDiv2line1">
          <div class="line1_value">
            <p>{{ WorksShowData.title }}</p>
            <span>{{ fullTime(WorksShowData.create_time) }}</span>
          </div>
          <div class="line1_Collection">
              <div><img src="../../../../../../assets/imgers/爱心.png" alt=""></div>
              <div><img src="../../../../../../assets/imgers/爱心.png" alt=""></div>
              <div><img src="../../../../../../assets/imgers/爱心.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { MatchWorksShowApi } from "../../matchUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import {timestampToTime} from "@/assets/js/time"
export default {
  data() {
    return {
      routeId: "",
      WorksShowData: [],
      imagesValue: "",
    };
  },
  created() {
    this.WorkDetailsList();
  },
  methods: {
    WorkDetailsList() {
      this.routeId = this.$route.params;
      postD(MatchWorksShowApi(), this.routeId).then((res) => {
        console.log(res.data);
        this.WorksShowData = res.data;
        this.imagesValue = imgUrl();
      });
    },
    fullTime(val){
        return timestampToTime(val)
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./screeningDetial.less");
</style>