<template>
  <div>
    <div class="listPadding">
      <div class="seatch_list">
        <i
          class="el-icon-search"
          style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
        ></i>
        <el-input v-model="seatch.keyword" placeholder="请输入内容"></el-input>
        <div class="buttom_seatch" @click="seatchValue">
          <span> 搜索 </span>
        </div>
      </div>
    </div>
    <div class="list_list">
      <div
        class="eve_List"
        v-for="item in platformValue"
        :key="item.id"
        @click="JumpDetails(item)"
      >
        <div class="list_img">
          <img :src="imagesValue + item.thumb" alt="" />
        </div>
        <div style="text-align: left">
          <div class="evetime">
            <span>{{ item.title }}</span>
          </div>
          <div class="evetimse">
            <div>
              <span>投稿截止至{{ fullTime(item.sign_end_time) }}</span>
            </div>
            <div class="peopo">
              <span>{{ item.part_num }}人已参与</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pager">
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
        align="center"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
  </div>
</template>

<script>
import { matchListMacthApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      platformId: {
        is_platform: "1",
      },
      //   搜索
      seatch: {
        keyword: "",
        is_platform: "1",
      },
      platformValue: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
        is_platform: "1",
      },
    };
  },
  created() {
    this.platformList();
    this.imagesValue = imgUrl();
  },
  methods: {
    platformList() {
      postD(matchListMacthApi(), this.platformId).then((res) => {
        this.platformValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    fullTime(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val);
      return newDate[0];
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(matchListMacthApi(), this.page1).then((res) => {
        this.platformValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 搜索
    seatchValue() {
      postD(matchListMacthApi(), this.seatch).then((res) => {
        this.platformValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    JumpDetails(val) {
      this.$router.push("/match/detial" + val.id); 
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./platform.less");
</style>