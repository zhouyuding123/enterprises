<template>
  <div class="detialBody">
    <div class="detialImg">
      <img :src="imagesValue + detialValueList.poster" alt="" />
      <div class="sxgj" @click="ManuscriptScreening">
        <span>筛选稿件</span>
      </div>
    </div>
    <div class="eventbackground">
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
    </div>
  </div>
</template>

<script>
import { matchShowMatchApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      detialId: {
        id: "",
      },
      detialValueList: [],
      imagesValue: "",
      ScreeningId: {
        id: "",
      },
    };
  },
  created() {
    this.detialValue();
  },
  methods: {
    detialValue() {
      this.detialId.id = this.$route.params.id;
      postD(matchShowMatchApi(), this.detialId).then((res) => {
        this.detialValueList = res.data;
        this.imagesValue = imgUrl();
        console.log(res);
      });
    },
    fullTimes(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val);
      return newDate[0];
    },
    eveTheme: function (e) {
      document.getElementById(e).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
    },
    ManuscriptScreening() {
      this.ScreeningId.id = this.$route.params.id;
      this.$router.push("/Match/works" + this.ScreeningId.id);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./detial.less");
</style>