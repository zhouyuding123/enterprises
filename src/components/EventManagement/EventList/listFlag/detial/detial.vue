<template>
  <div class="detialBody">
    <div class="titleValue">
      <span>{{ detialValueList.title }}</span>
    </div>
    <div class="detialImg">
      <img
        :src="imagesValue + detialValueList.poster"
        alt=""
        @click="judgmentb"
      />
      <div
        class="sxgj"
        @click="accessClick"
        v-if="
          detialValueList.is_platform == '1' &&
          Judgment == true &&
          detialValueList.access == false
        "
      >
        <span>申请冠名商资格</span>
      </div>
      <div
        class="sxgj"
        @click="ManuscriptScreening"
        v-if="detialValueList.is_platform == '2'"
      >
        <span>筛选稿件</span>
      </div>
    </div>
    <div
      class="eventbackground"
      v-if="Nowtimes > signstarttime && Nowtimes < signendtime"
    >
      <div class="eventline1">
        <div class="eventline1_div1" @click="eveTheme('aa' + 1)">
          <div><span>赛事主题</span></div>
        </div>
        <div class="eventline1_div2" @click="eveTheme('aa' + 2)">
          <div><span>赛事介绍</span></div>
        </div>
        <div class="eventline1_div2" @click="eveTheme('aa' + 3)">
          <div><span>赛事详情</span></div>
        </div>
      </div>
      <div class="eventline2" :id="'aa' + 1">
        <div class="sssssss"><span>赛事主题</span></div>
        <div class="eventline2kuai">
          <img src="@/assets/imgers/块1.png" alt="" />
        </div>
      </div>
      <div class="eventline3">
        <div class="eventline3Border">
          <div class="eventline3Body">
            <span>
              {{ detialValueList.title }}
            </span>
          </div>
        </div>
      </div>
      <div class="eventline4" :id="'aa' + 2">
        <div class="eventline4U">
          <span> 赛事介绍 </span>
        </div>
        <div class="eventline4kuai">
          <img src="@/assets/imgers/块2.png" alt="" />
        </div>
      </div>
      <div class="eventline3">
        <div class="eventline3Border">
          <div class="eventline3Body">
            <span>
              {{ detialValueList.description }}
            </span>
          </div>
        </div>
      </div>
      <div class="eventline4" :id="'aa' + 3">
        <div class="eventline4U">
          <span> 赛事详情 </span>
        </div>
        <div class="eventline5kuai">
          <img src="@/assets/imgers/块3.png" alt="" />
        </div>
      </div>
      <div class="eventline5">
        <div class="eventline5Value">
          <div class="bonus">
            <div class="bonusImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>奖金设置</span>
            </div>
            <div class="bonusValue">
              <div
                class="bonusValues"
                v-for="(item, index) in detialValueList.prize"
                :key="index"
              >
                <div class="bonusValuess">
                  <span>{{ item.name }}{{ item.item }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bonus2">
            <div class="bonusImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>赛事进程</span>
            </div>
            <div class="bonusValue">
              <div class="process">
                <ul>
                  <li><span>征集期</span></li>
                  <li><span>评选期</span></li>
                  <li><span>公示期</span></li>
                </ul>
                <div class="eveTime">
                  <div class="eveTimes">
                    <div
                      class="eveTime1"
                      v-if="detialValueList.sign_start_time"
                    >
                      {{ fullTimes(detialValueList.sign_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.sign_end_time">
                      {{ fullTimes(detialValueList.sign_end_time) }}
                    </div>
                  </div>
                  <div class="eveTimes">
                    <div
                      class="eveTime1"
                      v-if="detialValueList.voto_start_time"
                    >
                      {{ fullTimes(detialValueList.voto_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.voto_end_time">
                      {{ fullTimes(detialValueList.voto_end_time) }}
                    </div>
                  </div>
                  <div class="eveTimes">
                    <div class="eveTime1" v-if="detialValueList.exh_start_time">
                      {{ fullTimes(detialValueList.exh_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.exh_end_time">
                      {{ fullTimes(detialValueList.exh_end_time) }}
                    </div>
                  </div>
                </div>
                <div class="everule">
                  <span>{{ detialValueList.rule }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="explain">
            <div class="explainImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>赛事进程</span>
            </div>
            <div class="explainValue">
              <span>
                {{ detialValueList.explain }}
              </span>
            </div>
          </div>
          <div class="standard">
            <div class="standardImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>赛事进程</span>
            </div>
            <div class="standardValue">
              <div class="standardValueIn">
                <div
                  class="standardValueInDiv"
                  v-for="(item, index) in detialValueList.standard"
                  :key="index"
                >
                  <div class="standardValueInDiv1">{{ item.title }}</div>
                  <div class="standardValueInDiv2">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="Instructions">
            <div class="InstructionsImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>参赛须知</span>
            </div>
            <div class="InstructionsValue">
              <span>{{ detialValueList.entry_info }}</span>
            </div>
          </div>
          <div class="notice">
            <div class="noticeImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>获奖通知</span>
            </div>
            <div class="noticeValue">
              <div class="noticeValueDiv">
                <span>{{ detialValueList.notice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Sponsor">
        <div class="SponsorDiv">
          <span>{{ detialValueList.nickname }}</span>
        </div>
      </div>
      <div class="Sponsor" v-if="detialValueList.access !== false">
        <div class="SponsorDiv">
          <span>{{ detialValueList.access.nickname }}</span>
        </div>
      </div>
    </div>
    <div class="" v-if="Nowtimes > votostarttime && Nowtimes < exhstarttime">
      <div class="titleline1">
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.accept_count }}</span>
          </div>
          <div class="numbervalue2"><span>参与选手</span></div>
        </div>
        <div class="vertical"></div>
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.voto_count }}</span>
          </div>
          <div class="numbervalue2"><span>积累投票</span></div>
        </div>
        <div class="vertical"></div>
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.browse }}</span>
          </div>
          <div class="numbervalue2"><span>访问量</span></div>
        </div>
      </div>
      <div class="titleline2">
        <div class="listPadding">
          <div class="seatch_list">
            <i
              class="el-icon-search"
              style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
            ></i>
            <el-input
              v-model="seatch.keyword"
              placeholder="请输入内容"
            ></el-input>
            <div class="buttom_seatch">
              <span> 搜索 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="titleline3">
        <div
          class="titlevoto"
          v-for="items in workvalue"
          :key="items.accept_id"
        >
          <div class="titleimg">
            <span>{{ items.accept_id }}</span>
            <img :src="imagesValue + items.thumb" alt="" @click="goWorkShow(items)" />
          </div>
          <div class="titleTitle">
            <div class="titleValues">
              <span>{{ items.title }}</span>
            </div>
            <div class="hsadimg">
              <div class="imghead">
                <el-image
                  :src="imagesValue + items.headimage"
                  style="border-radius: 50%"
                ></el-image>
              </div>
              <div class="imgname">
                <span>{{ items.nickname }}</span>
              </div>
            </div>
            <div
              class="votonum"
              id="votonumvo"
              v-if="items.is_voto === 1"
              @click="votonums(items)"
            >
              <span>投TA一票</span>
            </div>
            <div class="votonumser" v-if="items.is_voto === 2">
              <span>您已投票</span>
            </div>
          </div>
        </div>
        <div class="pagers">
          <vxe-pager
            :current-page="detialId.offset"
            :page-size="detialId.limit"
            :total="detialId.totalResult"
            :layouts="[
              'PrevPage',
              'JumpNumber',
              'NextPage',
              'FullJump',
              'Sizes',
              'Total',
            ]"
            align="center"
            @page-change="handlePageChangeActivity"
          ></vxe-pager>
        </div>
      </div>
    </div>
    <div v-if="detialValueList.access !== false && Nowtimes > exhstarttime">
      <div class="titleline1">
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.accept_count }}</span>
          </div>
          <div class="numbervalue2"><span>参与选手</span></div>
        </div>
        <div class="vertical"></div>
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.voto_count }}</span>
          </div>
          <div class="numbervalue2"><span>积累投票</span></div>
        </div>
        <div class="vertical"></div>
        <div class="countSstyle">
          <div class="numbervalue">
            <span>{{ workvalues.browse }}</span>
          </div>
          <div class="numbervalue2"><span>访问量</span></div>
        </div>
      </div>
      <div class="titleline2">
        <div class="listPadding">
          <div class="seatch_list">
            <i
              class="el-icon-search"
              style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
            ></i>
            <el-input
              v-model="seatchs.keyword"
              placeholder="请输入内容"
            ></el-input>
            <div class="buttom_seatch">
              <span> 搜索 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="ext">
        <div class="extList" v-for="(item, index) in pricelist" :key="index">
          <div class="RankStyle" v-if="countValuenums[0] == index + 1">
            {{ countValues[0] }}
          </div>
          <div
            class="RankStyle"
            v-else-if="countValuenums[1] >= index + 1 - countValuenums[0]"
          >
            {{ countValues[1] }}
          </div>
          <div
            class="RankStyle"
            v-else-if="countValuenums[2] >= index + 1 - countValuenums[2]"
          >
            {{ countValues[2] }}
          </div>
          <div
            class="RankStyle"
            v-else-if="countValuenums[3] >= index + 1 - countValuenums[3]"
          >
            {{ countValues[3] }}
          </div>
          <div
            class="RankStyle"
            v-else-if="countValuenums[4] >= index + 1 - countValuenums[4]"
          >
            {{ countValues[4] }}
          </div>
          <div class="pubimg">
            <img :src="imagesValue + item.thumb" alt="" />
          </div>
          <div class="pubtitle">
            <div class="pubtitle1">
              <div>{{ item.title }}</div>
              <div class="pubtitle1line1">
                <div class="pubtitle1line1img">
                  <img :src="imagesValue + item.headimage" alt="" />
                </div>
                <div class="pubtitle1line1name">
                  <span>{{ item.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="pubtitle2">
              <div class="piao">
                <span>{{ item.voto_count }}票</span>
              </div>
              <div class="order" @click="addOrder(item)">
                <span>发起预购</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="extList" v-for="item in nabertwo" :key="item.works_id">
          <div class="RankStyle">第二名</div>
          <div class="pubimg">
            <img :src="imagesValue + item.thumb" alt="" />
          </div>
          <div class="pubtitle">
            <div class="pubtitle1">
              <div>{{ item.title }}</div>
              <div class="pubtitle1line1">
                <div class="pubtitle1line1img">
                  <img :src="imagesValue + item.headimage" alt="" />
                </div>
                <div class="pubtitle1line1name">
                  <span>{{ item.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="pubtitle2">
              <div>
                <span>{{ item.voto_count }}票</span>
              </div>
            </div>
          </div>
        </div>
        <div class="extList" v-for="item in naberthree" :key="item.works_id">
          <div class="RankStyle">第三名</div>
          <div class="pubimg">
            <img :src="imagesValue + item.thumb" alt="" />
          </div>
          <div class="pubtitle">
            <div class="pubtitle1">
              <div>{{ item.title }}</div>
              <div class="pubtitle1line1">
                <div class="pubtitle1line1img">
                  <img :src="imagesValue + item.headimage" alt="" />
                </div>
                <div class="pubtitle1line1name">
                  <span>{{ item.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="pubtitle2">
              <div>
                <span>{{ item.voto_count }}票</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div></div>
    </div>
    <el-dialog title="申请冠名商资格" :visible.sync="dialogVisible" width="30%">
      <div class="textLine"></div>
      <el-form
        :model="addruleForm"
        :rules="addrules"
        ref="addruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="联系人" prop="name">
          <el-input v-model="addruleForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="addruleForm.tel" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="请输入报价金额" prop="price">
          <el-input v-model="addruleForm.price" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div class="jt">具体详情官方平台会电话联络沟通</div>
      <div style="padding-top: 60px">
        <span>
          <el-button type="primary" @click="addAccess">提交申请</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="votoShow" width="30%">
      <div class="votoOK">
        <div><img src="@/assets/myimger/投票.png" alt="" /></div>
        <div class="okvoto">
          <span
            >当前赛事可投票{{ votocountvalue }}次，且每个作品只可投票一次</span
          >
        </div>
        <div style="padding-top: 20px">
          <span>您确定要对该作品进行投票吗？</span>
        </div>
        <div style="padding-top: 48px">
          <el-button type="primary" @click="vote">确 定</el-button>
        </div>
        <div class="jxyl" @click="votoShow = false">
          <span>继续浏览</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  matchShowMatchApi,
  matchAddAccessApi,
  MatchWorksApi,
  MatchSetVotoApi,
  MatchWorksListApi,
  MatchVotoCountApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      // 搜索
      seatchs: {
        keyword: "",
      },
      seatch: {
        keyword: "",
      },
      detialId: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      detialValueList: [],
      imagesValue: "",
      ScreeningId: {
        id: "",
      },
      Nowtimes: "",
      signstarttime: "",
      signendtime: "",
      votoEndtime: "",
      exhendtime: "",
      exhstarttime: "",
      votostarttime: "",
      Judgment: true,
      dialogVisible: false,
      addruleForm: {
        price: "",
        match_id: "",
        name: "",
        tel: "",
      },
      addrules: {
        name: [
          {
            required: true,
            message: "请输入联系人",
            tirgger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入金额",
            tirgger: "blur",
          },
          { min: 3, message: "长度在 3 位数以上 ", trigger: "blur" },
        ],
        tel: [
          {
            required: true,
            message: "请输入联系电话",
            tirgger: "blur",
          },
          { min: 11, max: 11, message: "长度在 11 位数 ", trigger: "blur" },
        ],
      },
      // 作品
      workvalue: [],
      seatch: {
        keyword: "",
      },
      workvalues: [],
      votoid: {
        accept_id: "",
      },
      votocount: {
        match_id: "",
      },
      publicityValueList: [],
      naberone: [],
      nabertwo: [],
      naberthree: [],
      prices: [],
      pricelist: [],
      countValuenums: [],
      countValues: [],
      votoShow: false,
      votocountvalue: "",
      worksId: {
        works_id:"",

      }
    };
  },
  watch: {
    prices(newval) {
      var mapva = [];
      newval.forEach((item, i) => {
        mapva.push(...this.publicityValueList.splice(0, item.amount));
      });
      this.pricelist = mapva;
    },
  },
  created() {
    this.detialValue();
    this.worksValue();
    this.publicityValue();
  },
  methods: {
    judgmentb() {
      this.Nowtimes = new Date().valueOf();
      this.votoEndtime =
        Date.parse(this.detialValueList.voto_end_time) ;
      if (
        this.detialValueList.access !== false &&
        this.votoEndtime <= this.Nowtimes
      ) {
        this.Judgment = true;
      }
    },
    detialValue() {
      this.detialId.id = this.$route.params.id;
      postD(matchShowMatchApi(), this.detialId).then((res) => {
        this.prices = res.data.prize;

        var countValue = [];
        var countValuenum = [];
        res.data.prize.forEach((v) => {
          countValuenum.push(v.amount);
          countValue.push(v.name);
        });
        this.countValuenums = countValuenum;
        this.countValues = countValue;
        this.detialValueList = res.data;
        this.imagesValue = imgUrl();
        this.Nowtimes = new Date().valueOf();
        this.signendtime =
          Date.parse(this.detialValueList.sign_end_time) ;
        this.signstarttime =
          Date.parse(this.detialValueList.sign_start_time) ;
        this.votoEndtime =
          Date.parse(this.detialValueList.voto_end_time) ;
        this.exhendtime =
          Date.parse(this.detialValueList.exh_end_time) ;
        this.exhstarttime =
          Date.parse(this.detialValueList.exh_start_time) ;
        this.votostarttime =
          Date.parse(this.detialValueList.voto_start_time) ;
      });
    },
    worksValue() {
      postD(MatchWorksApi(), this.detialId).then((res) => {
        console.log(res);
        this.workvalues = res;
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.detialId.offset = currentPage;
      this.detialId.limit = pageSize;
      postD(MatchWorksApi(), this.detialId).then((res) => {
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    fullTimes(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val);
      return newDate[0];
    },
    accessClick() {
      this.dialogVisible = true;
    },
    eveTheme: function (e) {
      document.getElementById(e).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
    },
    addAccess() {
      this.$refs.addruleForm.validate((v) => {
        if (!v) return;
        this.addruleForm.match_id = this.detialId.id;
        postD(matchAddAccessApi(), this.addruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("冠名成功");
            this.dialogVisible = false;
            this.detialValue();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，已存在");
          }
        });
      });
    },
    // 投票
    votonums(val) {
      this.votoid.accept_id = val.accept_id;
      this.votocount.match_id = val.match_id;
      this.votoShow = true;
      postD(MatchVotoCountApi(), this.votocount).then((res) => {
        this.votocountvalue = res.count;
      });
    },
    vote() {
      postD(MatchSetVotoApi(), this.votoid).then((res) => {
        if (res.code == "200") {
          this.$message.success("投票成功");
          this.worksValue();
          this.votoShow = false;
        } else if (res.code == "-200") {
          this.$message.error("投票失败或无次数");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    // 公示
    publicityValue() {
      postD(MatchWorksListApi(), this.detialId).then((res) => {
        this.publicityValueList = res.list;
      });
    },
    ManuscriptScreening() {
      this.ScreeningId.id = this.$route.params.id;
      this.$router.push("/Match/works" + this.ScreeningId.id);
    },
    addOrder(val) {
      console.log(val);
      var ordermatch_id = this.$route.params.id;
      var orderaccept_id = val.accept_id;
      var orderworks_id = val.works_id;
      this.$router.push({
        name: "oder",
        params: {
          match_id: ordermatch_id,
          accept_id: orderaccept_id,
          works_id: orderworks_id,
        },
      });
    },
    goWorkShow(val) {
      this.$router.push({
        name: "worksShow",
        params: {
          works_id: val.works_id,
          id: val.accept_id,
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./detial.less");
</style>