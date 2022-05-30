<template>
  <div class="addBody">
    <el-form
      :model="ruleForm"
      :rules="ruleFormRules"
      ref="ruleFormRef"
      label-width="110px"
      hide-required-asterisk
    >
      <div class="line1">
        <el-form-item label="赛事主题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
         <el-form-item label=" 征集类别" prop="category">
          <el-input v-model="ruleForm.category"></el-input>
        </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="start_time">
                <el-date-picker
                  type="datetime"
                  placeholder="选择报名时间"
                  v-model="start_time"
                  style="width: 100%"
                  @change="getTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end_time">
                <el-date-picker
                  type="datetime"
                  placeholder="选择结束时间"
                  v-model="end_time"
                  style="width: 100%"
                  @change="gitTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
          title:"",
          category:"",
      },
      ruleFormRules: {},
    };
  },
};
</script>

<style lang="less" scoped>
.addBody {
  padding: 20px;
}
.line1 {
  padding: 20px;
  background-color: white;
  border-radius: 6px 6px 6px 6px;
}
</style>