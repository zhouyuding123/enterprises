<template>
  <div style="width:1700px;margin:0px auto">
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto">
          <el-image :src="imagesValue + myRes.thumb" alt="" class="headStyle" />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname">
            <span class="nickname_span">{{ myRes.nickname }}</span>
            <div class="top">
              <img src="@/assets/imgers/设计师等级.png" alt="" />
              <span>一级设计师</span>
            </div>
            <div class="myid">id: {{ myRes.in_code }}</div>
          </div>
          <div class="fans_num">
            <div>720 <span>关注</span></div>
            <div>720 <span>粉丝</span></div>
            <div>720 <span>获赞</span></div>
          </div>
        </div>
        <div class="buttons">
          <div class="button_Shop">
            <img src="@/assets/myimger/关注.png" alt="" /><span>关注</span>
          </div>
          <div class="button_to"><span>沟通</span></div>
        </div>
        <div class="gxqm">
          <span>个性签名:{{ myRes.description }}</span>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="myListValuetwos()">
          <el-tab-pane label="公开作品" name="first">
            <div class="worksvalue">
              <div v-for="item in myListValue" :key="item.id" class="workbody">
                <div class="imgdiv" @click="goDesigner(item.id)">
                  <img :src="imagesValue + item.thumb" alt="" />
                </div>
                <div class="information">
                  <div class="informationBody">
                    <div
                      class="informationBodyTitle"
                      @click="goDesigner(item.id)"
                    >
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="informationBodyLabel">
                      <div
                        v-for="items in item.label.split(',')"
                        :key="items"
                        class="informationBodyLabelValue"
                      >
                        <span> #{{ items }}</span>
                      </div>
                    </div>
                    <div class="options">
                      <div class="ax">
                        <img src="@/assets/strollimg/爱心.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/评论.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/收藏.png" alt="" /><span
                          >123</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 20px">
              <vxe-pager
                :current-page="myUsername.offset"
                :page-size="myUsername.limit"
                :total="myUsername.totalResult"
                :layouts="[
                  'PrevPage',
                  'JumpNumber',
                  'NextPage',
                  'FullJump',
                  'Sizes',
                  'Total',
                ]"
                @page-change="handlePageChangeActivity"
                align="center"
              ></vxe-pager>
            </div>
          </el-tab-pane>
          <el-tab-pane label="付费作品" name="second">
            <div class="worksvalue">
              <div
                v-for="item in myListValuetwo"
                :key="item.id"
                class="workbody"
              >
                <div
                  class="imgdiv"
                  v-if="item.is_pay != 0"
                  @click="gopaydetil(item)"
                >
                  <img :src="imagesValue + item.thumb" alt="" />
                </div>
                <div class="imgdiv" v-if="item.is_pay != 1">
                  <div class="payimglist" @click="gopay(item)">
                    <img
                      src="@/assets/myimger/锁.png"
                      alt=""
                      class="img1"
                      style="width: 40px; height: 40px"
                    />
                    <div class="payimg">
                      <img :src="imagesValue + item.thumb" alt="" />
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="informationBody">
                    <div class="informationBodyTitle">
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="informationBodyLabel">
                      <div
                        v-for="items in item.label.split(',')"
                        :key="items"
                        class="informationBodyLabelValue"
                      >
                        <span> #{{ items }}</span>
                      </div>
                    </div>
                    <div class="options">
                      <div class="ax">
                        <img src="@/assets/strollimg/爱心.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/评论.png" alt="" /><span
                          >123</span
                        >
                      </div>
                      <div class="ax">
                        <img src="@/assets/strollimg/收藏.png" alt="" /><span
                          >123</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 20px">
              <vxe-pager
                :current-page="myUsernametwos.offset"
                :page-size="myUsernametwos.limit"
                :total="myUsernametwos.totalResult"
                :layouts="[
                  'PrevPage',
                  'JumpNumber',
                  'NextPage',
                  'FullJump',
                  'Sizes',
                  'Total',
                ]"
                @page-change="handlePageChangeActivitys"
                align="center"
              ></vxe-pager>
            </div>
          </el-tab-pane>
          <el-tab-pane label="私密作品" name="third">3</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog :visible.sync="payshow" width="600px">
      <div v-if="payshows == 1">
        <div class="paywork">
          <div class="payworkline1">
            <div class="payworkline1img">
              <img :src="imagesValue + payshowvalue.thumb" alt="" />
            </div>
            <div class="payworkline1title">
              <div class="payworkline1title1">{{ payshowvalue.title }}</div>
              <div class="payworkline1titlename">
                {{ payshowvalue.nickname }}
              </div>
            </div>
          </div>
          <div class="payworkline2">
            <div><img src="@/assets/myimger/感叹号.png" alt="" /></div>
            <div class="payworkline2tit">
              因该作品为私密作品，付费后可永久查看
            </div>
          </div>
          <div class="payworkline3">
            <div class="payworkline3zf">支付金额：</div>
            <div class="payworkline3zfmo">￥{{ payshowvalue.money }}</div>
          </div>
          <div class="payworkline4">
            <div class="payworkline4bor"></div>
            <div class="payworkline4ye">
              <el-radio v-model="paymodel" label="1">余额</el-radio>
            </div>
            <div class="payworkline4bor"></div>
            <div class="payworkline4dsf">
              <el-radio v-model="paymodel" label="2">第三方支付</el-radio>
            </div>
            <div class="payworkline4bor"></div>
          </div>
        </div>

        <div style="padding-top: 30px">
          <el-button type="primary" @click="addpay"
            ><span>立即购买</span></el-button
          >
        </div>
      </div>
      <div v-if="payshows == 2">
        <div class="smalls">
          <img src="@/assets/myimger/small微信.png" alt="" />
          <div>使用微信扫一扫支付</div>
        </div>
        <img :src="imagesValues + code" alt="" style="margin-top: 42px" />
        <div style="margin-top: 42px; font-size: 24px">
          给你{{ times }}秒时间支付
        </div>
        <div style="padding-top: 30px">
          <span slot="footer" class="dialog-footer">
            <el-button @click="payshow = false">取 消</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import {
  designerMyCenterApi,
  designerGetListApi,
  addWorksApi,
  pay,
  ordersGetOrderStatApi,
} from "@/urls/wsUrl.js";
import { imgUrl, imgUrls } from "@/assets/js/modifyStyle";
export default {
  props: ["ListValue", "seatcher"],
  data() {
    return {
      myUsername: {
        username: "",
        category: "2",
        offset: 1,
        limit: 4,
        totalResult: 0,
      },
      myUsernametwos: {
        username: "",
        category: "3",
        offset: 1,
        limit: 4,
        totalResult: 0,
      },
      myUsernametwo: {
        username: "",
        category: "3",
      },
      myRes: [],
      imagesValue: "",
      myListValue: [],
      myListValuetwo: [],
      seatchL: {
        product_type_id: "",
        username: "",
      },
      seatch: {
        keyword: "",
        username: "",
      },
      activeName: "first",
      imagesValue: "",
      // 付费
      payshowvalue: "",
      payshow: false,
      payworkid: {
        works_id: "",
      },
      paymodel: "2",
      payshows: "1",
      //   获取二维码
      payorder_no: {
        order_no: "",
      },
      code: "",
      payOver: {
        order_no: "",
        type: "4",
      },
      times: 60,
      paymore: "",
    };
  },
  watch: {
    ListValue: {
      handler: function (value) {
        this.seatchL.product_type_id = value;
        this.seatchL.username = this.$route.params.name;
        postD(designerGetListApi(), this.seatchL).then((res) => {
          this.myListValue = res.list;
        });
      },
    },
    seatcher: {
      handler: function (value) {
        this.seatch.keyword = value;
        this.seatch.username = this.$route.params.name;
        postD(designerGetListApi(), this.seatch).then((res) => {
          this.myListValue = res.list;
        });
      },
    },
  },
  created() {
    this.myValue();
    this.imagesValue = imgUrl();
    this.myworkList();
    this.imagesValues = imgUrls();
  },
  methods: {
    myValue() {
      this.myUsername.username = this.$route.params.name;
      postD(designerMyCenterApi(), this.myUsername).then((res) => {
        this.myRes = res.data;
      });
    },
    myworkList() {
      this.myUsername.username = this.$route.params.name;
      postD(designerGetListApi(), this.myUsername).then((res) => {
        this.myListValue = res.list;
        this.myUsername.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.myUsernametwo.username = this.$route.params.name;
      this.myUsername.offset = currentPage;
      this.myUsername.limit = pageSize;
      postD(designerGetListApi(), this.myUsername).then((res) => {
        this.myListValue = res.list;
        this.myUsername.totalResult = res.count;
      });
    },
    goDesigner(value) {
      this.$router.replace("/designer_works/getListMF/freeDetil" + value);
    },
    myListValuetwos() {
      if (this.activeName == "second") {
        this.myUsernametwo.username = this.$route.params.name;
        postD(designerGetListApi(), this.myUsernametwo).then((res) => {
          this.myListValuetwo = res.list;
          this.myUsernametwos.totalResult = res.count;
        });
      }
    },
    handlePageChangeActivitys({ currentPage, pageSize }) {
      this.myUsernametwos.username = this.$route.params.name;
      this.myUsernametwos.offset = currentPage;
      this.myUsernametwos.limit = pageSize;
      postD(designerGetListApi(), this.myUsernametwos).then((res) => {
        this.myListValuetwo = res.list;
        this.myUsernametwos.totalResult = res.count;
      });
    },
    gopay(id) {
      this.payshowvalue = id;
      this.payworkid.works_id = id.id;
      this.payshow = true;
    },
    addpay() {
      postD(addWorksApi(), this.payworkid).then((res) => {
        this.payshows = 2;
        this.payorder_no.order_no = res.data.order_no;
        this.payOver.order_no = res.data.order_no;
        postD(pay(), this.payorder_no).then((res) => {
          this.code = res.data.substring(10);
          if (this.payOver.order_no != "") {
            this.timer = setInterval(() => {
              this.times--;
              this.OneSecond();
              if (this.times == 0) {
                clearInterval(this.timer);
                this.payshow = false;
                this.$message.info("支付超时");
                this.payorder_no.order_no = "";
                this.payOver.order_no = "";
                this.code = "";
                this.times = 60;
                this.payshows = 1;
              } else if (this.time < 0) {
                clearInterval(this.timer);
                this.payshow = false;
                this.$message.info("支付超时");
                this.payorder_no.order_no = "";
                this.payOver.order_no = "";
                this.times = 60;
                this.code = "";
                this.payshows = 1;
              }
              if (this.payshow == false) {
                clearInterval(this.timer);
                this.$message.info("支付失败");
                this.payorder_no.order_no = "";
                this.payOver.order_no = "";
                this.times = 60;
                this.code = "";
                this.payshows = 1;
              }
              if (this.paymore == 1) {
                clearInterval(this.timer);
                this.$message.success("恭喜付费成功");
                this.$router.push(
                  "/designer_works/getListMF/payDetil" + this.payworkid.works_id
                );
              }
            }, 1000);
          }
        });
      });
    },
    gopaydetil(id) {
      this.payworkid.works_id = id.id;
      this.$router.push(
        "/designer_works/getListMF/payDetil" + this.payworkid.works_id
      );
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
@import url("./myDetil.less");
</style>