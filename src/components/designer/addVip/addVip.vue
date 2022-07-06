<template>
  <div class="addpadding">
    <div class="addline1">
      <div class="xzadd">套餐选择</div>
      <div class="addxx">
        <div class="addxx1" @click="whole()" ref="wholes">
          <div class="addk" ref="wholes">月卡会员</div>
          <div class="addq" ref="wholess">￥<span>888</span>/ 250 次</div>
          <div class="addqyq">￥10000000000</div>
          <div class="addcs">仅需3.5元/次</div>
        </div>
        <div class="addxx1" @click="onTheShelf()" ref="PutOn">
          <div class="addk" ref="PutOn">季卡会员</div>
          <div class="addq" ref="PutOns">￥<span>888</span>/ 250 次</div>
          <div class="addqyq">￥10000000000000</div>
          <div class="addcs">仅需3.5元/次</div>
        </div>
        <div class="addxx1" @click="underShelfx()" ref="Offtheshelf">
          <div class="addk" ref="Offtheshelf">年卡会员</div>
          <div class="addq" ref="Offtheshelfs">￥<span>888</span>/ 250 次</div>
          <div class="addqyq">￥100000000000000</div>
          <div class="addcs">仅需3.5元/次</div>
        </div>
      </div>
    </div>
    <div class="addline2">
      <div class="addline2yj">
        <div class="addline2yj1">原价</div>
        <div class="addline2yj2">￥1000/250次</div>
      </div>
      <div class="addborder"></div>
      <div class="addline2yj" style="margin-top: 20px">
        <div class="addline2yj1">限时特惠</div>
        <div class="addred">￥1000/250次</div>
      </div>
    </div>
    <div class="addline3">
      <div class="xzadd">支付方式</div>
      <div class="addfzxx">
        <div>
          <el-radio v-model="radio1" label="1" border>
            <img src="@/assets/myimger/支付宝.png" alt="" class="addimg" />
            <div class="zffs">支付宝支付</div>
          </el-radio>
          <el-radio v-model="radio1" label="2" border>
            <img src="@/assets/myimger/微信.png" alt="" class="addimg" />
            <div class="zffs">微信支付</div>
          </el-radio>
          <el-radio v-model="radio1" label="3" border>
            <img src="@/assets/myimger/银行卡.png" alt="" class="addimg" />
            <div class="zffs">银行卡支付</div>
          </el-radio>
        </div>
      </div>
    </div>
    <div class="addline3">
      <div class="xzadd">权益说明</div>
      <div class="line3text">
        <div>
          服装设计师的想象力迅速冲破意识形态的禁锢，以千姿百态的形式释放出来。新奇的、诡谲的、抽象的视觉形象，极端的色彩出现在令人诧异的对比中，于是不得不开始调整我们的眼睛以适应新的风景。服装艺术显示出来的形式越来越多。
        </div>
        <div>
          服装设计师的想象力迅速冲破意识形态的禁锢，以千姿百态的形式释放出来。新奇的、诡谲的、抽象的视觉形象，极端的色彩出现在令人诧异的对比中，于是不得不开始调整我们的眼睛以适应新的风景。服装艺术显示出来的形式越来越多。
        </div>
        <div>
          服装设计师的想象力迅速冲破意识形态的禁锢，以千姿百态的形式释放出来。新奇的、诡谲的、抽象的视觉形象，极端的色彩出现在令人诧异的对比中，于是不得不开始调整我们的眼睛以适应新的风景。服装艺术显示出来的形式越来越多。
        </div>
      </div>
    </div>
    <div class="xf">
      <el-checkbox v-model="checked" @change="zxc"
        >到期后自动续费（可随时取消）</el-checkbox
      >
    </div>
    <div class="addok">
      <div @click="goPayment">
        <span>立即开通</span>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <img :src="imagesValue + code" alt="" />
      <div>给你{{ times }}时间支付</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ordersAddVipApi, pay, ordersGetOrderStatApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrls } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      radio1: "",
      checked: false,
      vip: {
        style_vip: "",
      },
      vipvalue: {
        order_no: "",
      },
      dialogVisible: false,
      code: "",
      payOver: {
        order_no: "",
        type: "2",
      },
      times: 60,
      paymore:""
    };
  },
  created() {
    this.imagesValue = imgUrls();
  },
  methods: {
    zxc() {
      if (this.checked == true) {
        this.vip.style_vip = 4;
      }
    },
    whole() {
      this.$refs.wholes.style.backgroundColor = "#F0D3A9";
      this.$refs.wholes.style.color = "#905F12";
      this.$refs.wholess.style.color = "#905F12";
      this.$refs.PutOn.style.backgroundColor = "";
      this.$refs.PutOn.style.color = "";
      this.$refs.PutOns.style.color = "";
      this.$refs.Offtheshelf.style.backgroundColor = "";
      this.$refs.Offtheshelf.style.color = "";
      this.$refs.Offtheshelfs.style.color = "";
      this.vip.style_vip = 1;
    },
    onTheShelf() {
      this.$refs.wholes.style.backgroundColor = "";
      this.$refs.wholes.style.color = "";
      this.$refs.wholess.style.color = "";
      this.$refs.PutOn.style.backgroundColor = "#F0D3A9";
      this.$refs.PutOn.style.color = "#905F12";
      this.$refs.PutOns.style.color = "#905F12";
      this.$refs.Offtheshelf.style.backgroundColor = "";
      this.$refs.Offtheshelf.style.color = "";
      this.$refs.Offtheshelfs.style.color = "";
      this.vip.style_vip = 2;
    },
    underShelfx() {
      this.$refs.wholes.style.backgroundColor = "";
      this.$refs.wholes.style.color = "";
      this.$refs.wholess.style.color = "";
      this.$refs.PutOn.style.backgroundColor = "";
      this.$refs.PutOn.style.color = "";
      this.$refs.PutOns.style.color = "";
      this.$refs.Offtheshelf.style.backgroundColor = "#F0D3A9";
      this.$refs.Offtheshelf.style.color = "#905F12";
      this.$refs.Offtheshelfs.style.color = "#905F12";
      this.vip.style_vip = 3;
    },
    goPayment() {
      if (this.vip.style_vip != "") {
        this.dialogVisible = true;
        postD(ordersAddVipApi(), this.vip).then((res) => {
          this.vipvalue.order_no = res.data.order_no;
          this.payOver.order_no = res.data.order_no;
          postD(pay(), this.vipvalue).then((res) => {
            this.code = res.data.substring(10);
            if (this.payOver.order_no != "") {
              this.timer = setInterval(() => {
                this.times--;
                this.OneSecond();
                if (this.times == 0) {
                  clearInterval(this.timer);
                  this.dialogVisible = false;
                  this.$message.info("支付超时");
                }
                if (this.paymore == 1|| this.paymore == 3) {
                  clearInterval(this.timer);
                  this.dialogVisible = false;
                  this.$message.success("恭喜你成为尊贵的会员");
                }
              }, 1000);
            }
          });
        });
      }
    },
    OneSecond() {
      postD(ordersGetOrderStatApi(), this.payOver).then((res) => {
        this.paymore = res.data.is_pay;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addVip.less");
</style>