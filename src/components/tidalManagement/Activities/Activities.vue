<template>
  <div>
    <div class="activityline1">
      <div class="activityline1Body">
        <ordinary />
        <selection />
        <luck />
      </div>
    </div>
    <div class="activityline2">
      <div class="activityline2Body">
        <div class="inputButton">
          <el-input
            placeholder="请输入内容"
            v-model="seatch.keyword"
          ></el-input>
          <div class="IsSeatch" @click="seatchInput">
            <i class="el-icon-search"></i>
            <span>搜索</span>
          </div>
          <div class="delRomove">
            <span>删除</span>
          </div>
          <div class="Refresh" @click="Refresh">
            <i class="el-icon-refresh-right"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activityline3">
      <p>
        <vxe-radio-group v-model="selectTab">
          <vxe-radio-button label="tab1" content="普通活动"></vxe-radio-button>
          <vxe-radio-button label="tab2" content="评选活动"></vxe-radio-button>
        </vxe-radio-group>
      </p>

      <div v-show="selectTab === 'tab1'">
        <vxe-table :data="tableData">
          <vxe-column align="center" type="checkbox" width="50"></vxe-column>
          <vxe-column width="80">
            <template v-slot="scoped">
              <el-image
                :src="imagesValue + scoped.row.poster"
                style="width: 32px; height: 32px"
                class="imgStyle"
              >
              </el-image>
            </template>
          </vxe-column>
          <vxe-column field="title" align="left"> </vxe-column>
          <vxe-column field="start_time" align="right" width="150">
          </vxe-column>
          <vxe-column width="50" align="center">至</vxe-column>
          <vxe-column field="end_time" align="left" width="200"> </vxe-column>
          <vxe-column width="200">
            <div class="operation">
              <div class="operationdel">
                <img src="../../../assets/imgers/删除.png" alt="" />
                <p>删除</p>
              </div>
              <div class="operationEdit">
                <img src="../../../assets/imgers/编辑.png" alt="" />
                <p>编辑</p>
              </div>
            </div>
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
          @page-change="handlePageChangeActivity"
          align="center"
        ></vxe-pager>
      </div>

      <div v-show="selectTab === 'tab2'">
        <vxe-table :data="tableData">
          <vxe-column type="radio" width="60"></vxe-column>
          <vxe-column field="role" title="Rolw"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="num" title="Num"></vxe-column>
          <vxe-column field="date12" title="Date"></vxe-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { ActivityListActivityMFApi } from "./Activities.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import ordinary from './ReleaseActivities/ordinary.vue';
import Selection from './ReleaseActivities/Selection.vue';
import Luck from './ReleaseActivities/luck.vue';
export default {
  provide() {
    return {
      listActivityMFValue: this.listActivityMFValue,
    }
  },
  components: { ordinary, Selection, Luck },
  data() {
    return {
      imagesValue: "",
      selectTab: "tab1",
      tableData: [],
      request: {
        category: "",
      },
      page1: {
        category: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatch: {
        category: "",
        keyword: "",
      },
    };
  },
  created() {
    this.listActivityMFValue();
  },
  methods: {
    listActivityMFValue() {
      this.request.category = "1";
      postD(ActivityListActivityMFApi(), this.request).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.page1.category = "1";
      postD(ActivityListActivityMFApi(), this.request).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 搜索
    seatchInput() {
      this.seatch.category = "1";
      postD(ActivityListActivityMFApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 刷新
    Refresh() {
      this.listActivityMFValue();
    },
  },
};
</script>

<style lang="less" scoped>
.activityline1 {
  padding: 8px 60px;
  .activityline1Body {
    width: 100%;
    display: flex;
  }
}
.activityline2 {
  padding: 10px 60px;
  .activityline2Body {
    width: 100%;
    height: 40px;
    .inputButton {
      display: flex;
      .el-input {
        width: 400px;
      }
      .IsSeatch {
        cursor: pointer;
        width: 80px;
        height: 40px;
        background: #dfdfdf;
        border-radius: 4px 4px 4px 4px;
        i {
          font-size: 14px;
          line-height: 40px;
          color: white;
        }
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 19px;
          margin-left: 5px;
        }
      }
      .Refresh {
        cursor: pointer;
        margin-left: auto;
        width: 80px;
        height: 40px;
        background: #00b567;
        border-radius: 4px 4px 4px 4px;
        i {
          font-size: 14px;
          line-height: 40px;
          color: white;
        }
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 19px;
        }
      }
      .delRomove {
        width: 80px;
        height: 40px;
        background: #ff2659;
        border-radius: 4px 4px 4px 4px;
        margin-left: 10px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
  }
}
.activityline3 {
  padding: 10px 60px;
  text-align: left;
}
.imgStyle {
  position: absolute;
  top: 25%;
  left: 25%;
  border-radius: 6px 6px 6px 6px;
}
.operation {
  display: flex;
  line-height: 10px;
  .operationdel {
    cursor: pointer;
    display: flex;
    position: relative;
    img {
      position: absolute;
    }
    p {
      margin-left: 30px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ff2659;
      line-height: 19px;
    }
  }
  .operationEdit {
    cursor: pointer;
    position: relative;
    margin-left: 40px;
    img {
      position: absolute;
    }
    p {
      margin-left: 30px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #00b567;
      line-height: 19px;
    }
  }
}
</style>