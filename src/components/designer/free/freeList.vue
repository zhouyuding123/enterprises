<template>
  <div style="width: 1600px; margin: 20px auto">
    <div>
      <div class="Opens">
        <div v-for="(item,index) in freeListValue" :key="index">
          <div class="freeValue">
            <div @click="goDesigner(item.id)">
              <img
                :src="imagesValue + item.thumb"
                alt=""
                style="
                  width: 300px;
                  height: 215px;
                  background: #e8e8e8;
                  border-radius: 6px 6px 0px 0px;
                "
              />
            </div>
            <div class="information">
              <div class="informationBody">
                <div class="informationBodyTitle">
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
                  <div class="ax dzup" @click="dzup">
                    <img
                      src="@/assets/strollimg/爱心.png"
                      alt=""
                      v-if="dzshow === false"
                    />
                    <img
                      src="@/assets/imgers/红色点赞.png"
                      alt=""
                      v-if="dzshow === true"
                    /><span>123</span>
                  </div>
                  <div class="ax">
                    <img src="@/assets/strollimg/评论.png" alt="" /><span
                      >123</span
                    >
                  </div>
                  <div class="ax scup" @click="scup">
                    <img
                      src="@/assets/strollimg/收藏.png"
                      alt=""
                      v-if="scshow == false"
                    /><img
                      src="@/assets/imgers/黄色收藏.png"
                      alt=""
                      v-if="scshow == true"
                    /><span>123</span>
                  </div>
                </div>
              </div>
              <div class="informationImg">
                <img
                  :src="imagesValue + item.headimage"
                  alt=""
                  style="
                    width: 46px;
                    height: 46px;
                    background: #e3e8ef;
                    border-radius: 50%;
                  "
                />
              </div>
              <div class="informationImgJ gzup" @click="gzup(index)">
                <img src="@/assets/strollimg/加.png" class="informationImgJimg"   alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagers" v-if="page1.totalResult > 10">
      <vxe-pager
        :current-page="page1.offset"
        :page-size="page1.limit"
        :total="page1.totalResult"
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
  </div>
</template>

<script>
import { designer_worksGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  props: ["ListValue", "seatcher"],
  data() {
    return {
      freeId: {
        category: "2",
      },
      imagesValue: "",
      freeListValue: [],
      seatchL: {
        category: "2",
        product_type_id: "",
      },
      seatch: {
        category: "2",
        keyword: "",
      },
      page1: {
        category: "2",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      dzshow: false,
      scshow: false,
    };
  },
  watch: {
    ListValue: {
      handler: function (value) {
        this.seatchL.product_type_id = value;
        postD(designer_worksGetListApi(), this.seatchL).then((res) => {
          this.freeListValue = res.list;
        });
      },
    },
    seatcher: {
      handler: function (value) {
        this.seatch.keyword = value;
        postD(designer_worksGetListApi(), this.seatch).then((res) => {
          this.freeListValue = res.list;
        });
      },
    },
  },
  created() {
    this.freeList();
  },
  methods: {
    gzup(val) {
      console.log(val);
      const informationImgJ = document.getElementsByClassName("informationImgJimg");
      let rotateTimes=1
        informationImgJ[val].style.transform = 'rotateY('+360*rotateTimes+'deg)';
      let times = 1;
      let time = setInterval(() => {
        if (times == 1) {
           informationImgJ[val].style.transform = 'rotateY('+360*rotateTimes+'deg)';
          times--;
          rotateTimes++
        }
        if (times == 0) {
          informationImgJ[val].style.display = "none";
          clearInterval(time);
        }
      }, 2500);
    },
    scup() {
      const scup = document.querySelector(".scup");
      console.log(scup);
      scup.style.transform = "scale(1.1)";
      let times = 1;
      let time = setInterval(() => {
        if (times == 1) {
          scup.style.transform = "scale(1.1)";
          this.scshow = true;
          times--;
        }
        if (times == 0) {
          scup.style.transform = "scale(1)";
          clearInterval(time);
        }
      }, 100);
    },
    dzup() {
      const dzup = document.querySelector(".dzup");
      dzup.style.transform = "scale(1.1)";
      let times = 1;
      let time = setInterval(() => {
        if (times == 1) {
          dzup.style.transform = "scale(1.1)";
          this.dzshow = true;
          times--;
        }
        if (times == 0) {
          dzup.style.transform = "scale(1)";
          clearInterval(time);
        }
      }, 100);
    },
    freeList() {
      postD(designer_worksGetListApi(), this.freeId).then((res) => {
        this.imagesValue = imgUrl();
        this.freeListValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    goDesigner(value) {
      this.$router.replace("/designer_works/getListMF/freeDetil" + value);
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(designer_worksGetListApi(), this.page1).then((res) => {
        this.freeListValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./freeList.less");
</style>