<template>
  <div class="addcardbody">
    <div class="addinput" @click="addCard">
      <div class="addinputimg">
        <img src="@/assets/myimger/加.png" alt="" />
      </div>
      <div class="addinputadd">添加银行卡</div>
    </div>
    <el-dialog title="添加银行卡" :visible.sync="dialogVisible" width="35%">
      <div class="inputvalue">
        <div v-if="models == 1">
          <div class="textStyle">请绑定持卡人本人的银行卡</div>
          <el-form
            :model="addCards"
            :rules="addCardsrules"
            ref="addCardsruleForm"
            style="margin-top: 20px"
          >
            <el-form-item label="持卡人" prop="name">
              <el-input v-model="addCards.name"></el-input>
            </el-form-item>
            <el-form-item label="卡号" prop="bank_num">
              <el-input v-model="addCards.bank_num"></el-input>
            </el-form-item>
            <el-form-item label="卡类型(输入卡号后自动显示)" prop="bank">
              <el-input v-model="addCards.bank"></el-input>
            </el-form-item>
            <el-form-item label="手机号 " prop="tel">
              <el-input v-model="addCards.tel"></el-input>
            </el-form-item>
          </el-form>

          <div class="footers" style="padding-top: 20px">
            <el-button @click="nextStep"><span>下一步</span></el-button>
          </div>
        </div>
        <div v-if="models == 2">123</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bin from "bankcardinfo";
export default {
  components: { Bin },
  data() {
    return {
      dialogVisible: true,
      addCards: {
        name: "",
        bank_num: "",
        tel: "",
        bank: "",
      },
      addCardsrules: {},
      models: "1",
    };
  },
  methods: {
    addCard() {
      this.dialogVisible = true;
      this.$getBankcardinfo.getBankBin(银行账号, (err, data) => {
        if (!err) {
          console.log("///", data);
        }
      });
    },
    nextStep() {
      this.models = 2;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addcard.less");
</style>