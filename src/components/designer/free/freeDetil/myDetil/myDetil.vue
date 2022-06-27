<template>
  <div>
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto">
          <el-image :src="imagesValue + myRes.thumb" alt="" class="headStyle" />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname">
            <span class="nickname_span">{{ myRes.nickname }}</span>
            <div class="top">
              <img src="@/assets/imgers/设计师等级.png" alt="" />
              <span>一级设计师</span>
            </div>
            <div class="myid">id: {{ myRes.in_code }}</div>
          </div>
          <div class="fans_num">
            <div>720 <span>关注</span></div>
            <div>720 <span>粉丝</span></div>
            <div>720 <span>获赞</span></div>
          </div>
        </div>
        <div class="buttons">
          <div class="button_Shop"><img src="@/assets/myimger/关注.png" alt=""><span>关注</span></div>
          <div class="button_to"><span>沟通</span></div>
        </div>
        <div class="gxqm">
            <span>个性签名:{{myRes.description}}</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { designerMyCenterApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      myUsername: {
        username: "",
      },
      myRes: [],
      imagesValue: "",
    };
  },
  created() {
    this.myValue();
    this.imagesValue = imgUrl();
  },
  methods: {
    myValue() {
      this.myUsername.username = this.$route.params.name;
      postD(designerMyCenterApi(), this.myUsername).then((res) => {
        console.log(res);
        this.myRes = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./myDetil.less");
</style>