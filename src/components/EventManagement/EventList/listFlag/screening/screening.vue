<template>
  <div>
    <div class="workBody">
      <ul v-for="item in worksListValue" :key="item.id">
        <li>
          <div class="xxValue" @click="WorkDetails(item)">
            <el-image
              :src="imagesValue + item.thumb"
              alt=""
              class="thumbStyle"
            />

            <div class="titleser">
              <span>{{ item.title }}</span>
            </div>
            <div class="uservalue">
              <el-image
                :src="imagesValue + item.headimage"
                alt=""
                :preview-src-list="[imagesValue + item.headimage]"
                class="headimageStyle"
              />
              <span>{{ item.nickname }}</span>
            </div>
          </div>
          <div class="votosome" v-if="item.is_open === 0">
            <div class="appropriate" @click="yesVoto(item.accept_id)" style="cursor: pointer;">
              <span>合适</span>
            </div>
            <div class="appropriate" @click="noVoto(item.accept_id)" style="cursor: pointer;">
              <span>不合适</span>
            </div>
          </div>
          <div class="votosome" v-if="item.is_open === 1">
            <div class="appropriate1"><img src="@/assets/imgers/对.png" alt=""></div>
            <div class="appropriate"><span>不合适</span></div>
          </div>
          <div class="votosome" v-if="item.is_open === 2">
            <div class="appropriate"><span>合适</span></div>
            <div class="appropriate"><img src="@/assets/imgers/错.png" alt=""></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pager1">
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
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "../../../../../api";
import { MatchWorksListApi, MatchScreenApi } from "@/urls/wsUrl.js";
export default {
  provide() {
    return {
      WorkDetails: this.WorkDetails,
    };
  },
  data() {
    return {
      workId: {
        id: "",
      },
      imagesValue: "",
      worksListValue: "",
      paramsId: {
        works_id: "",
        id: "",
      },
      valser: {
        paramsId: "",
      },
      votoId: {
        accept_id: "",
        is_open: "1",
      },
      novotoId: {
        accept_id: "",
        is_open: "2",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.worksList();
  },
  methods: {
    worksList() {
      this.workId.id = this.$route.params.id;
      postD(MatchWorksListApi(), this.workId).then((res) => {
        this.worksListValue = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    WorkDetails(val) {
      this.valser.paramsId = this.$route.params.id;
      this.paramsId.works_id = val.works_id;
      this.$router.push({
        name: "worksShow",
        params: {
          works_id: this.paramsId.works_id,
          id: this.valser.paramsId,
        },
      });
    },
    yesVoto(val) {
      this.votoId.accept_id = val;
      postD(MatchScreenApi(), this.votoId).then((res) => {
        if (res.code == "200") {
          this.$message.success("筛选成功");
          this.worksList();
        } else {
          this.$message.error("筛选失败");
        }
      });
    },
    noVoto(val) {
      this.novotoId.accept_id = val;
      postD(MatchScreenApi(), this.novotoId).then((res) => {
        if (res.code == "200") {
          this.$message.success("筛选成功");
          this.worksList();
        } else {
          this.$message.error("筛选失败");
        }
      });
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(MatchScreenApi(), this.page1).then((res) => {
        this.worksListValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./screening.less");
</style>