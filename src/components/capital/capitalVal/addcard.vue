<template>
  <div class="addcardbody">
    <div class="addinput" @click="addCard">
      <div class="addinputimg">
        <img src="@/assets/myimger/加.png" alt="" />
      </div>
      <div class="addinputadd">添加银行卡</div>
    </div>
    <div class="card_list">
      <div
        class="cardStyle"
        v-for="item in Backlist"
        :key="item.id"
        @click="delcard(item.id)"
      >
        <div class="bank">
          <div class="bankimg">
            <img
              :src="imagesValue + 'resource/back_icon/' + item.icon + '.png'"
              alt=""
            />
          </div>
          <div class="banktitle">
            <span> {{ item.bank }}储蓄卡 </span>
          </div>
        </div>
        <div class="bank_num">
          <div class="bank_numx">
            ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****
          </div>
          <div class="bank_numfour">
            &nbsp;&nbsp;&nbsp;{{ item.bank_num.substr(-4) }}
          </div>
        </div>
      </div>
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
            :hide-required-asterisk="true"
          >
            <el-form-item label="持卡人" prop="name">
              <el-input v-model="addCards.name"></el-input>
            </el-form-item>
            <el-form-item label="卡号" prop="bank_num">
              <el-input v-model="addCards.bank_num" @change="zxcs"></el-input>
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
        <div v-if="models == 2">
          <div
            style="
              text-align: center;
              font-size: 20px;
              font-family: PingFang SC-Bold, PingFang SC;
              font-weight: bold;
              color: #333333;
            "
          >
            <span>验证银行预留手机号</span>
          </div>
          <el-form
            :model="addCardsyzm"
            :rules="addCardsyzmrules"
            ref="addCardsyzmruleForm"
            style="margin-top: 20px"
          >
            <div class="footers" style="padding-top: 20px">
              <el-button @click="addcardValue"><span>下一步</span></el-button>
            </div>
          </el-form>
        </div>
        <div v-if="models == 3">
          <div class="okstyle">
            <img src="@/assets/myimger/添加成功.png" alt="" />
          </div>
          <div class="tjok">添加成功</div>
          <div class="footers" style="padding-top: 20px">
            <el-button @click="addcardclose"><span>关闭</span></el-button>
          </div>
        </div>
        <div v-if="models == 4">
          <div class="okstyle">
            <img src="@/assets/myimger/添加失败.png" alt="" />
          </div>
          <div class="tjok">添加失败</div>
          <div class="footers" style="padding-top: 20px">
            <el-button @click="addcardclose"><span>关闭</span></el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="卡管理" :visible.sync="delcardlist" width="30%">
      <div
        style="justify-content: center;
    display: flex;
}"
      >
        <div class="cardStyles">
          <div class="bank">
            <div class="bankimg">
              <img
                :src="
                  imagesValue + 'resource/back_icon/' + delValue.icon + '.png'
                "
                alt=""
              />
            </div>
            <div class="banktitle">
              <span> {{ delValue.bank }}储蓄卡 </span>
            </div>
          </div>
          <div class="bank_nums">
            <div class="bank_numxs">
              ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****
            </div>
            <div class="bank_numfours">&nbsp;&nbsp;&nbsp;{{ delnum }}</div>
          </div>
        </div>
      </div>
      <div class="footers" style="padding-top: 20px">
        <el-button @click="Unbind(delValue.id)"
          ><span>解除绑定</span></el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="解除绑定" :visible.sync="UnbindShow" width="30%">
      <div style="padding-top: 50px">
        <span>亲，确定要解绑此张银行卡吗？</span>
      </div>
      <div style="padding-top: 78px">
        <span slot="footer" class="dialog-footer">
          <el-button @click="edlUnbind">仍要解绑</el-button>
          <el-button type="primary" @click="UnbindShow = false"
            >保持绑定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bin from "bankcardinfo";
import { addBankApi, listBankApi, showBankApi,delBankApi  } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  components: { Bin },
  data() {
    return {
      imagesValue: "",
      dialogVisible: false,
      addCards: {
        name: "",
        bank_num: "",
        tel: "",
        bank: "",
        icon: "",
      },
      addCardsrules: {
        name: [
          {
            required: true,
            message: "请输入持卡人名字",
            tirgger: "blur",
          },
        ],
        bank_num: [
          {
            required: true,
            message: "请输入卡号",
            tirgger: "blur",
          },
          {
            min: 15,
            max: 19,
            message: "银行卡位数必须是15到19位",
            trigger: "blur",
          },
        ],
        bank: [
          {
            required: true,
            message: "请输入卡类型",
            tirgger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            tirgger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "手机号卡位数必须是11位",
            trigger: "blur",
          },
        ],
      },
      models: "1",
      addCardsyzm: {},
      addCardsyzmrules: {},
      Backlist: [],
      delId: {
        id: "",
      },
      delcardlist: false,
      delValue: "",
      delnum: "",
      UnbindShow: false,
      edlUnbindId: {
        id: "",
      },
    };
  },
  created() {
    this.listBankList();
    this.imagesValue = imgUrl();
  },
  methods: {
    addCard() {
      this.dialogVisible = true;
    },
    nextStep() {
      this.$refs.addCardsruleForm.validate((v) => {
        if (!v) return;
        this.models = 2;
      });
    },
    zxcs() {
      Bin.getBankBin(this.addCards.bank_num)
        .then((res) => {
          this.addCards.bank = res.bankName;
          this.addCards.icon = res.bankCode;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addcardclose() {
      this.dialogVisible = false;
      this.addCards.name = "";
      this.addCards.bank_num = "";
      this.addCards.bank = "";
      this.addCards.tel = "";
      this.addCards.icon = "";
    },
    addcardValue() {
      this.$refs.addCardsyzmruleForm.validate((v) => {
        if (!v) return;
        postD(addBankApi(), this.addCards).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.models = 3;
            this.listBankList();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
            this.models = 4;
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
            this.models = 4;
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
            this.models = 4;
          } else {
            this.$message.error("注册失败，已存在");
            this.models = 4;
          }
        });
      });
    },
    listBankList() {
      postD(listBankApi()).then((res) => {
        this.Backlist = res.list;
      });
    },
    delcard(val) {
      this.delcardlist = true;
      this.delId.id = val;
      postD(showBankApi(), this.delId).then((res) => {
        this.delValue = res.data;
        this.delnum = this.delValue.bank_num.substr(-4);
      });
    },
    Unbind(val) {
      this.edlUnbindId.id = val;
      this.delcardlist = false;
      this.UnbindShow = true;
    },
    edlUnbind() {
      postD(delBankApi(), this.edlUnbindId).then((res) => {
        if (res.code == "200") {
          this.$message.success("银行卡解绑成功");
          this.UnbindShow = false;
          this.listBankList();
        } else {
          this.$message.error("银行卡解绑失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addcard.less");
</style>