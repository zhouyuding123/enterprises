<template>
  <div>
    <div class="matchBody">
      <div class="matchframe">
        <div cclass="matchcontent">
          <el-row :gutter="20">
            <el-col :span="5"
              ><div>
                <el-input
                  placeholder="关键字搜索"
                  v-model="seatch.keyword"
                ></el-input></div
            ></el-col>

            <div class="seatcher">
              <div class="seatchT" @click="seatchValue"><span>查询</span></div>
              <div class="Release" @click="LaunchEvents">
                <p>发布赛事</p>
              </div>
              <div class="seatchRE" @click="Refresh">
                <span><i class="el-icon-refresh-right"></i>刷新</span>
              </div>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <div class="list_list">
      <div
        class="eve_List"
        v-for="item in tableData"
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
import { matchAccessListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from '@/assets/js/modifyStyle';
export default {
  data() {
    return {
        imagesValue:"",
      seatch: {
        keyword: "",
      },
      tableData: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.accessList();
    this.imagesValue = imgUrl();
  },
  methods: {
    accessList() {
      postD(matchAccessListApi()).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    seatchValue() {
      postD(matchAccessListApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    Refresh() {
      this.accessList();
    },
    LaunchEvents() {
      this.$router.push("/match/release");
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(matchAccessListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    fullTime(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val);
      return newDate[0];
    },
    JumpDetails(val) {
      this.$router.push("/match/detial" + val.id); 
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Flag2.less");
@import url("./Flag4.less");
</style>