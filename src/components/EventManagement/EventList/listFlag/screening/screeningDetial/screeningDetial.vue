<template>
  <div>
    <div class="go-" @click="Superior"><span>返回上一级</span></div>
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
            <span class="nickname_span">{{ WorksShowData.nickname }}</span>
            <div class="top">
              <img
                src="../../../../../../assets/imgers/设计师等级.png"
                alt=""
              />
              <span>一级设计师</span>
            </div>
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
            <div>
              <img src="../../../../../../assets/imgers/爱心.png" alt="" />
              <p>123</p>
            </div>
            <div>
              <img
                src="../../../../../../assets/imgers/ic_chat_bubble_outline_48px.png"
                alt=""
              />
              <p>123</p>
            </div>
            <div>
              <img
                src="../../../../../../assets/imgers/ic_star_border_24px.png"
                alt=""
              />
              <p>123</p>
            </div>
          </div>
        </div>
        <div class="worksDiv2line2">
          {{ WorksShowData.content }}
        </div>
        <div v-for="item in imgs" :key="item.item" class="imgs">
          <img :src="imagesValue + item" alt="" />
        </div>
      </div>
      <div class="worksDiv3">
        <div class="worksDiv3line1">
          <span>作品信息</span>
        </div>
        <div class="worksDiv3line2">
          <div>
            <span class="worksline1">原创作品</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div>
            <span class="worksline1">上传时间</span
            ><span class="worksline1Value">{{
              fullTime(WorksShowData.create_time)
            }}</span>
          </div>
          <div>
            <span class="worksline1">作品版权</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div class="lastDiv">
            <span class="worksline1">作品标签</span>
            <span class="worksline1Values"
              ><el-tag type="info" v-for="items in labels" :key="items.item"
                ><span>{{ items }}</span></el-tag
              >
            </span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="bottomValue">
          <div class="statement">
            声明：本站内用户发表的所有内容及言论仅代表其本人，并不反映本站意见及观点。
          </div>
          <div class="operation">
            <div class="complaint" @click="zxc">
              <img src="../../../../../../assets/imgers/转发.png" alt="" />
            </div>
            <span @click="zxc">举报</span>
            <div class="fgx"></div>
            <div class="forward">
              <img src="../../../../../../assets/imgers/转发.png" alt="" />
            </div>
            <span>转发</span>
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
import { timestampToTime } from "@/assets/js/time";
export default {
  data() {
    return {
      routeId: "",
      WorksShowData: [],
      imagesValue: "",
      imgs: "",
      labels: "",
    };
  },
  created() {
    this.WorkDetailsList();
  },
  methods: {
    WorkDetailsList() {
      this.routeId = this.$route.params;
      console.log(this.$route.params);
      postD(MatchWorksShowApi(), this.routeId).then((res) => {
        console.log(res.data);
        this.WorksShowData = res.data;
        this.imagesValue = imgUrl();
        var arr = this.WorksShowData.imgs.split(",");
        var arrs = this.WorksShowData.label.split(",");
        this.imgs = arr;
        this.labels = arrs;
      });
    },
    fullTime(val) {
      return timestampToTime(val);
    },
    Superior() {
      this.$router.go(-1)
    },
    zxc() {
      console.log(123);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./screeningDetial.less");
</style>