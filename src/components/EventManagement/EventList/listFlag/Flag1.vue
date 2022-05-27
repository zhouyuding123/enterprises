<template>
  <div>
    <div class="matchBody">
      <div class="matchframe">
        <div cclass="matchcontent">
          <el-row :gutter="20">
            <el-col :span="1"
              ><div>
                <div class="divText">时间范围:</div>
              </div></el-col
            >
            <el-col :span="6"
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
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sign_time: "",
      exh_time: "",
    };
  },
};
</script>

<style lang="less" scoped>
.matchBody {
  padding: 10px 30px;
  .matchframe {
    height: 160px;
    background: #ffffff;
    .matchcontent {
    }
  }
}
</style>