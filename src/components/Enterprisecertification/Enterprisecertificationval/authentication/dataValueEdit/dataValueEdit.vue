<template>
  <div class="editpdding">
    <el-form
      :model="editruleForm"
      :rules="editruleFormrules"
      ref="editruleFormruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="editline1">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editruleForm: {},
      editruleFormrules: {},
    };
  },
  created() {
    console.log(123);
  },
};
</script>

<style lang="less" scoped>
@import url("./dataValueEdit.less");
</style>