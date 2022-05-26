<template>
  <div class="storeBlock">
    <div class="storeBlockPadding">
      <!-- <el-row :gutter="20">
        <el-col :span="1"
          ><div>
            <div class="divText">门店类型:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div style="text-align: left">
            <el-input></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">门店类型:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div >
            <el-input></el-input></div
        ></el-col>
      </el-row> -->
      <el-row :gutter="20">
        <el-col :span="8" class="clert"
          ><div>门店类型</div>
          <el-input></el-input
        ></el-col>
        <el-col :span="8" class="clert"
          ><div>门店名称</div>
          <el-input></el-input
        ></el-col>
        <el-col :span="8" class="clert"
          ><div>省份</div>
          <el-input></el-input
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.storeBlock {
  margin: 10px;
  height: 200px;
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
.clert {
  display: flex;
  div {
    width: 60px;
    height: 20px;
    font-size: 14px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 42px;
  }
}
</style>