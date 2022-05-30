<template>
  <div>
    <div class="matchBody">
      <div class="matchframe">
        <div cclass="matchcontent">
          <el-row :gutter="20">
            <el-col :span="1"
              ><div>
                <div class="divText">报名时间范围:</div>
              </div></el-col
            >
            <el-col :span="3"
              ><div>
                <div>
                  <el-date-picker
                    v-model="sign_time"
                    type="datetime"
                    placeholder="选择时间"
                    @change="gatTime"
                  >
                  </el-date-picker>
                </div></div
            ></el-col>
            <el-col :span="1"
              ><div>
                <div class="divText">开始时间范围:</div>
              </div></el-col
            >
            <el-col :span="3"
              ><div>
                <div>
                  <el-date-picker
                    v-model="exh_time"
                    type="datetime"
                    placeholder="选择时间"
                    @change="gitTime"
                  >
                  </el-date-picker>
                </div></div
            ></el-col>
            <el-col :span="5"
              ><div>
                <el-input
                  placeholder="关键字搜索"
                  v-model="seatch.keyword"
                ></el-input></div
            ></el-col>

            <div class="seatcher">
              <div class="seatchT"><span>查询</span></div>
              <div class="seatchClear"><span>清空</span></div>
              <div class="seatchRE">
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
        <vxe-column align="center" type="checkbox" width="50"></vxe-column>
        <vxe-column>

        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from "@/assets/js/time.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from '@/api';
import {matchListMacthMFApi} from "./matchUrl.js"
export default {
  data() {
    return {
      sign_time: "",
      exh_time: "",
      seatch: {
        sign_time: "",
        exh_time: "",
        keyword: "",
      },
      tableData: [],
    };
  },
  created() {
    this.matchValue()
  },
  methods: {
    gatTime(date) {
      this.sign_time = date;
      this.seatch.sign_time = timestampToTime(this.sign_time / 1000);
    },
    gitTime(date) {
      this.exh_time = date;
      this.seatch.exh_time = timestampToTime(this.exh_time / 1000);
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    matchValue() {
      postD(matchListMacthMFApi()).then(res=> {
        this.tableData = res.list
      })
    }
  },
};
</script>

<style lang="less" scoped>
.matchBody {
  padding: 10px 30px;
  .matchframe {
    background: #ffffff;
    .matchcontent {
      margin: 20px;
    }
  }
}
.divText {
  width: 100px;
}
.el-col {
  margin: 20px;
}
.seatcher {
  display: flex;
  margin-top: 20px;
  justify-content: right;
  margin-right: 30px;
}
.seatchT {
  cursor: pointer;
  width: 120px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 3px 3px 3px 3px;
  margin-right: 20px;
  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
.seatchClear {
  cursor: pointer;
  width: 120px;
  height: 40px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #0c032e;
  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }
}
.seatchRE {
  cursor: pointer;
  width: 80px;
  height: 40px;
  background: #00b567;
  border-radius: 4px 4px 4px 4px;
  margin-left: 20px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
.paddingTable {
  padding: 10px 30px;
}
</style>