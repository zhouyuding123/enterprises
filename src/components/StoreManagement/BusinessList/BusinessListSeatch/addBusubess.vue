<template>
  <div>
    <div class="Release" @click="addValue">
      <p>添加直营门店</p>
    </div>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
        dialogVisible:false
    };
  },
  methods: {
    addValue() {
        this.dialogVisible = true
    },
  },
};
</script>


<style lang="less" scoped>
.Release {
  cursor: pointer;
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p:nth-child(1) {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
</style>