<template>
  <div style="width:1600px;margin:20px auto">
    <div class="Opens">
      <div v-for="item in freeListValue" :key="item.id">
        <div class="freeValue" v-if="item.is_pay != 0">
          <div @click="goDesigner(item.id)">
            <img
              :src="imagesValue + item.thumb"
              alt=""
              style="
                width: 300px;
                height: 215px;
                background: #e8e8e8;
                border-radius: 6px 6px 0px 0px;
              "
            />
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
            <div class="informationImg">
              <img
                :src="imagesValue + item.headimage"
                alt=""
                style="
                  width: 46px;
                  height: 46px;
                  background: #e3e8ef;
                  border-radius: 50%;
                "
              />
            </div>
            <div class="informationImgJ">
              <img src="@/assets/strollimg/加.png" alt="" />
            </div>
          </div>
        </div>
        <div class="freeValue" v-if="item.is_pay == 0">
          <div class="payimglist" @click="payto(item)">
            <div class="payimg">
              <img
                :src="imagesValue + item.thumb"
                alt=""
                style="width: 300px; height: 210px; background: #e8e8e8"
              />
            </div>
            <img src="@/assets/myimger/锁.png" alt="" class="img1" />
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
            <div class="informationImg">
              <img
                :src="imagesValue + item.headimage"
                alt=""
                style="
                  width: 46px;
                  height: 46px;
                  background: #e3e8ef;
                  border-radius: 50%;
                "
              />
            </div>
            <div class="informationImgJ">
              <img src="@/assets/strollimg/加.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="pagers" v-if="page1.totalResult > 10">
        <vxe-pager
          :current-page="page1.offset"
          :page-size="page1.limit"
          :total="page1.totalResult"
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
import {
  designer_worksGetListApi,
  addWorksApi,
  pay,
  ordersGetOrderStatApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrls, imgUrl } from "@/assets/js/modifyStyle";
export default {
  props: ["ListValue", "seatcher"],
  data() {
    return {
      freeId: {
        category: "3",
      },
      imagesValue: "",
      imagesValueS: "",
      freeListValue: [],
      seatchL: {
        category: "3",
        product_type_id: "",
      },
      seatch: {
        category: "3",
        keyword: "",
      },
      page1: {
        category: "3",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      payshow: false,
      payshowvalue: "",
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
        postD(designer_worksGetListApi(), this.seatchL).then((res) => {
          this.freeListValue = res.list;
        });
      },
    },
    seatcher: {
      handler: function (value) {
        this.seatch.keyword = value;
        postD(designer_worksGetListApi(), this.seatch).then((res) => {
          this.freeListValue = res.list;
        });
      },
    },
  },
  created() {
    this.imagesValue = imgUrl();
    this.imagesValues = imgUrls();
    this.freeList();
  },
  methods: {
    freeList() {
      postD(designer_worksGetListApi(), this.freeId).then((res) => {
        this.freeListValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    goDesigner(value) {
      this.$router.replace("/designer_works/getListMF/payDetil" + value);
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(designer_worksGetListApi(), this.page1).then((res) => {
        this.freeListValue = res.list;
        this.page1.totalResult = res.count;
      });
    },
    payto(id) {
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
                 this.code=""
                this.times = 60;
                this.payshows = 1;
              } else if (this.time < 0) {
                clearInterval(this.timer);
                this.payshow = false;
                this.$message.info("支付超时");
                this.payorder_no.order_no = "";
                this.payOver.order_no = "";
                this.times = 60; this.code=""
                this.payshows = 1;
              }
              if (this.payshow == false) {
                clearInterval(this.timer);
                this.$message.info("支付失败");
                this.payorder_no.order_no = "";
                this.payOver.order_no = "";
                this.times = 60; this.code=""
                this.payshows = 1;
              }
              if (this.paymore == 1) {
                clearInterval(this.timer);
                this.$message.success("恭喜付费成功");
                this.$router.push("/designer_works/getListMF/payDetil" + this.payworkid.works_id)
              }
            }, 1000);
          }
        });
      });
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
@import url("./payList.less");
</style>