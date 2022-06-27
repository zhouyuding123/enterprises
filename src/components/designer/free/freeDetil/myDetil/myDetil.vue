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
          <div class="button_Shop">
            <img src="@/assets/myimger/关注.png" alt="" /><span>关注</span>
          </div>
          <div class="button_to"><span>沟通</span></div>
        </div>
        <div class="gxqm">
          <span>个性签名:{{ myRes.description }}</span>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="公开作品" name="first">
            <div class="worksvalue">
              <div v-for="item in myListValue" :key="item.id" class="workbody">
                <div class="imgdiv" @click="goDesigner(item.id)">
                  <img :src="imagesValue + item.thumb" alt="" />
                </div>
                <div class="information">
                  <div class="informationBody">
                    <div
                      class="informationBodyTitle"
                      @click="goDesigner(item.id)"
                    >
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="informationBodyLabel">
                      <div
                        v-for="items in item.label.split(',')"
                        :key="items"
                        class="informationBodyLabelValue"
                      >
                        <span> #{{ items }}</span>
                      </div>
                    </div>
                    <div class="options">
                      <div class="ax">
                        <img src="@/assets/strollimg/爱心.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/评论.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/收藏.png" alt="" /><span
                          >123</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding:20px">
              <vxe-pager
                :current-page="myUsername.offset"
                :page-size="myUsername.limit"
                :total="myUsername.totalResult"
                :layouts="[
                  'PrevPage',
                  'JumpNumber',
                  'NextPage',
                  'FullJump',
                  'Sizes',
                  'Total',
                ]"
                @page-change="handlePageChangeActivity"
                align="center"
              ></vxe-pager>
            </div>
          </el-tab-pane>
          <el-tab-pane label="付费作品" name="second">2</el-tab-pane>
          <el-tab-pane label="私密作品" name="third">3</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { designerMyCenterApi, designerGetListApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  props: ["ListValue", "seatcher"],
  data() {
    return {
      myUsername: {
        username: "",
        category: "2",
        offset:1,
        limit:4,
        totalResult:0
      },
      myUsernametwo: {
        username: "",
        category: "3",
      },
      myRes: [],
      imagesValue: "",
      myListValue: [],
      myListValuetwo: [],
      seatchL: {
        product_type_id: "",
        username: "",
      },
      seatch: {
        keyword: "",
        username: "",
      },
      activeName: "first",
      imagesValue: "",
    };
  },
  watch: {
    ListValue: {
      handler: function (value) {
        this.seatchL.product_type_id = value;
        this.seatchL.username = this.$route.params.name;
        postD(designerGetListApi(), this.seatchL).then((res) => {
          this.myListValue = res.list;
        });
      },
    },
    seatcher: {
      handler: function (value) {
        this.seatch.keyword = value;
        this.seatch.username = this.$route.params.name;
        postD(designerGetListApi(), this.seatch).then((res) => {
          this.myListValue = res.list;
        });
      },
    },
  },
  created() {
    this.myValue();
    this.imagesValue = imgUrl();
    this.myworkList();
    // this.myworkListtwo();
  },
  methods: {
    myValue() {
      this.myUsername.username = this.$route.params.name;
      postD(designerMyCenterApi(), this.myUsername).then((res) => {
        this.myRes = res.data;
      });
    },
    myworkList() {
      this.myUsername.username = this.$route.params.name;
      postD(designerGetListApi(), this.myUsername).then((res) => {
        console.log(res);
        this.myListValue = res.list;
        this.myUsername.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.myUsername.offset = currentPage;
      this.myUsername.limit = pageSize;
      postD(designerGetListApi(), this.myUsername).then((res) => {
        this.myListValue = res.list;
        this.myUsername.totalResult = res.count;
      });
    },
    goDesigner(value) {
      this.$router.replace("/designer_works/getListMF/freeDetil" + value);
    },
    // myworkListtwo() {
    //   this.myUsernametwo.username = this.$route.params.name;
    //   postD(designerGetListApi(), this.myUsernametwo).then((res) => {
    //     console.log(res);
    //     this.myListValuetwo = res.list;
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
@import url("./myDetil.less");
</style>