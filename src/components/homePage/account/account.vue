<template>
  <div style="margin-left: 40px">
    <div class="cust">
      <div class="khs">账户明细</div>
      <div class="khs_z">账户余额</div>
      <div class="khs_z_num">273,579</div>
      <div class="khs_today dis">
        <div>总收入</div>
        <el-progress :percentage="100" style="margin-top: -35px"></el-progress>
        <span style="color: #3acbe9; margin-left: 20px">26,080,547</span>
      </div>
      <div class="khs_today dis">
        <div>总支出</div>
        <el-progress
          :percentage="100"
          status="exception"
          style="margin-top: -35px"
        ></el-progress>
        <span style="color: #ff6b6b; margin-left: 20px">25,806,968</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            zye:273579,
            zsr:26080547,
            zzc:25806968
        }
    }
}
</script>

<style>
.el-progress-bar__outer {
  border-radius: 0px !important;
}
</style>
<style lang="less" scoped>
/deep/.el-progress-bar__outer {
  border-radius: none;
  width: 100px;
  margin-top: 37px;
  margin-left: 20px;
}
/deep/.el-progress__text {
  display: none;
}
/deep/.el-icon-warning {
  display: none;
}
.dis {
  display: flex;
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
  width: 100%;
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