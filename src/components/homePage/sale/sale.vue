<template>
  <div style="margin-left: 40px">
    <div class="cust">
      <div class="khs">销售额</div>
      <div class="khs_z">总销售额</div>
      <div class="khs_z_num">24,080,547</div>
      <div class="khs_today">今日新增销售额 <span>85,025</span></div>
      <div>
        <el-progress
          :percentage="zkhss / todaynums / 100"
          status="warning"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zkhss: 24080547,
      todaynums: 85025,
    };
  },
  created() {
      console.log(100 - this.zkhss / this.todaynums / 100);
  }
};
</script>

<style>
.el-progress-bar__outer {
  border-radius: 0px !important;
}
</style>
<style lang="less" scoped>
/deep/.el-progress-bar__outer {
  border-radius: none;
  width: 240px;
  margin-top: 37px;
  margin-left: 20px;
}
/deep/.el-icon-warning {
  display: none;
}
.cust {
  width: 320px;
  height: 250px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
}
.khs {
  text-align: left;
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
  padding: 18px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}
.khs_z {
  padding: 20px 40px 10px 40px;
  text-align: left;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #999999;
}
.khs_z_num {
  font-size: 32px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  padding-left: 40px;
}
.khs_today {
  font-size: 14px;
  font-weight: bold;
  padding-left: 40px;
  padding-top: 20px;
  text-align: left;
  color: #999999;
  span {
    color: #ffbf3e;
  }
}
</style>