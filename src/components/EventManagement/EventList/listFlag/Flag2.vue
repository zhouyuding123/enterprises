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
    <div class="paddingTable">
      <vxe-table
        :data="tableData"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
      >
        <vxe-column width="100%">
          <template v-slot="scoped">
            <div class="All_list">
              <div>
                <el-image
                  :src="imagesValue + scoped.row.thumb"
                  alt=""
                  :preview-src-list="[imagesValue + scoped.row.thumb]"
                  class="thumbStyle"
                />
              </div>
              <div class="written">
                <div class="writtenLine1">
                  <div class="listTitle">
                    <span>{{ scoped.row.title }}</span>
                  </div>
                  <div
                    class="have-in-hand"
                    v-if="
                      scoped.row.status == 1 &&
                       CurrentTime < new Date(scoped.row.exh_start_time)/1
                    "
                  >
                    <span>进行中</span>
                  </div>

                </div>
                <div class="introduce">
                  <div class="introduceline">
                    <span>{{ scoped.row.description }}</span>
                  </div>
                </div>
              </div>
              <div class="screenBody">
                <div
                  class="screenDiv"
                  v-if="
                    scoped.row.status == 1 &&
                    CurrentTime < new Date(scoped.row.voto_end_time)/1
                  "
                  @click="ManuscriptScreening(scoped.row)"
                >
                  <span>稿件筛选</span>
                </div>
                <div
                  class="rejectDiv"
                  v-if="scoped.row.status == 2"
                  @click="reasonValue(scoped.row)"
                >
                  <span>查看驳回理由</span>
                </div>
                <div
                  class="overtDiv"
                  v-if="
                    scoped.row.status == 1 &&
                    CurrentTime > new Date(scoped.row.voto_end_time)/1
                  "
                >
                  <span>筛选结束</span>
                </div>
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
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
    <el-dialog
      title="驳回原因"
      :visible.sync="reasonValueShow"
      width="30%"
    >
      <span>{{reasonValueList}}</span>
      <div style="padding-top:15px">
        <span>
        <el-button @click="reasonValueShow = false">返回</el-button>
      </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { matchListMacthMFApi, matchShowMatchApi } from "./matchUrl.js";
import { timestampToTime } from "@/assets/js/time";
export default {
  data() {
    return {
      imagesValue: "",
      sign_time: "",
      exh_time: "",
      seatch: {
        keyword: "",
      },
      tableData: [],
      CurrentTime: "",
      // 分页
      page1: {
        offset: 1,
        limit: 10,
      },
      reasonValueShow:false,
      reasonValueId: {
        id:""
      },
      reasonValueList:"",
      ScreeningId: {
        id:""
      }
    };
  },
  created() {
    this.matchValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    LaunchEvents() {
      this.$router.push("/match/release");
    },
    matchValue() {
      postD(matchListMacthMFApi()).then((res) => {
        this.imagesValue = imgUrl();
        this.CurrentTime = new Date() / 1
        let aser = res.list.filter((item)=> this.CurrentTime< new Date(item.exh_start_time)/1)
        let asers = aser.filter((item)=> item.status == 1)
        this.tableData =asers;
        this.page1.totalResult = aser.length;
      });
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(matchListMacthMFApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 驳回
    reasonValue(data) {
      this.reasonValueId.id = data.id
      this.reasonValueShow = true
      postD(matchShowMatchApi(),this.reasonValueId).then(res=> {
        this.reasonValueList = res.data.reason
      })
    },
    seatchValue() {
      postD(matchListMacthMFApi(),this.seatch).then(res=> {
        this.tableData = res.list;
        this.CurrentTime = timestampToTime(new Date() / 1000);
        let aser = res.list.filter((item)=> this.CurrentTime< item.exh_end_time && this.CurrentTime> item.sign_start_time)
        this.tableData =aser;
        this.page1.totalResult = aser.length;
      })
    },
    Refresh(){
      this.matchValue()
    },
    ManuscriptScreening(data) {
      this.ScreeningId.id = data.id
      this.$router.push("/Match/works" + this.ScreeningId.id)
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Flag2.less");
</style>