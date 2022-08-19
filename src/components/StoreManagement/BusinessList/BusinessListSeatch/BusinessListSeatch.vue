<template>
  <div class="storeBlock">
    <div class="storeBlockPadding">
      <el-row :gutter="20">
        <el-col :span="2"
          ><div>
            <div class="divText">关键词搜索:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div style="text-align: left">
            <el-input v-model="seatch.keyword"></el-input></div
        ></el-col>

        <div class="sx" @click="clickSeatch">
          <div class="seatchValue">
            <span>搜索</span>
          </div>
          <div class="refresh" @click="clickRefresh">
            <span><i class="el-icon-refresh-right"></i> 刷新</span>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import { BusinessListBusinessApi } from "../Businessurl.js";
export default {
  inject: ["BusinessListValue"],
  data() {
    return {
      seatch: {
        keyword: "",
      },
      tableDatas: [],
    };
  },
  methods:{
    clickRefresh() {
    this.clickRefresh();
  },
  clickSeatch() {
    postD(BusinessListBusinessApi(), this.seatch).then((res) => {
      this.tableDatas = res.list;
      this.$emit("BusinseeSeatch", this.tableDatas);
    });
  },
  }
};
</script>
<style lang="less" scoped>
.storeBlock {
  width: 100%;
  background-color: white;
  .storeBlockPadding {
    padding: 20px;
  }
}
/deep/.el-input__inner {
  margin-left: 10px;
  margin-top: 5px;
  width: 360px;
  background: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
}
.sx {
  cursor: pointer;
  float: right;
  margin-right: 35px;
  display: flex;
  .refresh {
    width: 80px;
    height: 40px;
    background: #00b567;
    border-radius: 4px 4px 4px 4px;
    line-height: 40px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 19px;
    }
  }
}
.seatchValue {
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
</style>