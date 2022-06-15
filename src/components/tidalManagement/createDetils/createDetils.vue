<template>
  <div>
    <div class="detilBody">
      <div class="detilnr">
        <div class="firstLine">
          <el-image :src="imagesValue + detilsValues.headimage"></el-image>
          <span>{{ detilsValues.nickname }}</span>
          <div class="times">
            <span>{{ detilsValues.update_time }}</span>
          </div>
        </div>
        <div class="SecondLine">
          <span>{{ detilsValues.title }}</span>
        </div>
        <div
          class="ThirdLine"
          v-if="detilsValues.theme !== '' && detilsValues.theme !== null"
        >
          <div>
            <span> #{{ detilsValues.theme }} </span>
          </div>
        </div>
        <div class="FourthLine">
          <div>
            <span>{{ detilsValues.description }}</span>
          </div>
        </div>
        <div
          class="fifthLine"
          v-if="detilsValues.thumb !== '' && detilsValues.thumb !== null && detilsValues.thumb"
        >
          <div v-for="item in detilsValues.thumb.split(',')" :key="item.id">
            <el-image :src="imagesValue + item"></el-image>
          </div>
        </div>
        <div class="fifthLine" v-if="detilsValues.is_voto == 1">
          <div class="isVoto">
            <div class="isVotoBody">
              <div class="isVotoline1"><span>选哪个</span></div>
              <div class="isVotoline2">
                <span>{{ votoCountnum }}人参与</span>
              </div>
              <div class="placeOrder" v-if="votoImages == 1">
                <div class="isVotoline3">
                  <el-checkbox-group
                    v-model="checkedCities"
                    :min="1"
                    :max="detilsValues.method"
                    @change="changelabel"
                  >
                    <el-checkbox
                      v-for="item in detilsValues.voto"
                      :label="item.id"
                      :key="item.id"
                      class="radioDiv"
                    >
                      <el-image :src="imagesValue + item.item"></el-image>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="textBody" v-if="votoImages == 0">
                <div class="textpadding">
                  <el-checkbox-group
                    v-model="checkedCities"
                    :min="1"
                    :max="detilsValues.method"
                    @change="changelabel"
                  >
                    <el-checkbox
                      v-for="item in detilsValues.voto"
                      :label="item"
                      :key="item.id"
                      class="checkboxText"
                    >
                      {{ item.item }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="votoTpLi">
                <div v-if="codeValue == 200">
                  <div class="votoTs" @click="voteCur">
                    <span>投票</span>
                  </div>
                </div>
                <div v-if="codeValue == -200">
                  <div class="votoTser" @click="voteCur">
                    <span>投票</span>
                  </div>
                </div>
                <div class="votoTspan">
                  <span>单选，投票后可查看结果</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Line6">
          <span>
            {{ detilsValues.content }}
          </span>
        </div>
        <div class="Line7">
          <div class="Line7Border">
            <span class="c_count"
              >共{{ detilsValues.comment_count }}条回复</span
            >
            <div class="dianzshouc">
              <img
                src="../../../assets/imgers/爱心.png"
                alt=""
                class="imglove"
              /><i>12</i>
              <img
                src="../../../assets/imgers/收藏.png"
                alt=""
                class="imgCollection"
              /><i>12</i>
              <div></div>
            </div>
          </div>
        </div>
        <div class="Line8">
          <div class="Line8Input">
            <el-input
              v-model="Line8InputValue"
              placeholder="留下你想说的话吧"
              type="textarea"
              resize="none"
            ></el-input>
          </div>
          <div class="Line8InputButton">
            <div class="Line8InputButtonValue">
              <p @click="CommentValue"><span>发表评论</span></p>
            </div>
          </div>
        </div>
        <div class="line9">
          <div
            v-for="(item, index) in contentValue"
            :key="item.id"
            v-show="index < num"
          >
            <div class="line9Value">
              <el-image :src="imagesValue + detilsValues.headimage"></el-image>
              <span>{{ detilsValues.nickname }}</span>
              <div class="pltimes">
                <span>{{ item.update_time }}</span>
              </div>
            </div>
            <div class="line9content">
              <span>{{ item.content }}</span>
            </div>
            <div class="line9Love">
              <img src="../../../assets/imgers/爱心.png" alt="" />
            </div>
          </div>
        </div>
        <div class="bottonStyle">
          <span @click="morecomment">{{ txt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api/index.js";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import {
  ForumShowForumApi,
  ForumCommentApi,
  ForumSeteVotoApi,
  ForumVotoApi,
} from "./detilsUrl.js";
export default {
  data() {
    return {
      detilsId: {
        id: "",
      },
      detilsValues: [],
      imagesValue: "",
      Line8InputValue: "",
      Comment: {
        forum_id: "",
        pid: "",
        content: "",
      },
      contentValue: [],
      num: 3,
      isShow: true,
      txt: "点击查看更多评论",
      // 是否投票
      votoValue: {
        id: "",
      },
      votoCount: [],
      votoCountnum: "",
      votoImages: [],
      checkedCities: [],
      arr: [],
      arrs: [],
      checkedId: {
        id: "",
        voto_id: "",
      },
      imagesShow: false,
      imagesShows: false,
      codeValue: "",
      imgList: [],
    };
  },
  created() {
    this.detilsId.id = this.$route.params.id;
    this.Comment.forum_id = this.$route.params.id;
    this.checkedId.id = this.$route.params.id;
    this.detilsValue();
    this.votoState();
  },
  methods: {
    detilsValue() {
      postD(ForumShowForumApi(), this.detilsId).then((res) => {
        this.detilsValues = res.data;
        this.imagesValue = imgUrl();
        this.contentValue = res.data.comment_list;
        // this.imgList = this.detilsValues.thumb.split(",");
        // 投票数据
        this.votoValue = res.data.voto;
        this.votoValue.forEach((v) => {
          this.votoCount.push(v.count);
          this.votoImages = v.is_img;
          this.votoCountnum = eval(Object.values(this.votoCount).join("+"));
        });
      });
    },
    votoState() {
      postD(ForumSeteVotoApi(), this.detilsId).then((res) => {
        this.codeValue = res.code;
      });
    },
    // 评论
    CommentValue() {
      this.Comment.content = this.Line8InputValue;
      postD(ForumCommentApi(), this.Comment).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.detilsValue();
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },
    // 更多
    morecomment() {
      this.isShow = !this.isShow;
      this.num = this.isShow ? 3 : this.contentValue.length;
      this.txt = this.isShow ? "点击查看更多评论" : "收起";
    },
    // 投票wenzzi
    voteCur() {
      this.arr.forEach((v) => {
        this.arrs.push(v.id);
      });
      this.checkedId.voto_id = this.arrs.toString();
      postD(ForumVotoApi(), this.checkedId).then((res) => {
        if (res.code == "200") {
          this.$message.success("投票成功");
        } else if (res.code == "-200") {
          this.$message.error("你已投票");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },
    voteCurs() {
      this.arr.forEach((v) => {
        this.arrs.push(v);
      });
      this.checkedId.voto_id = this.arrs.toString();
      postD(ForumVotoApi(), this.checkedId).then((res) => {
        if (res.code == "200") {
          this.$message.success("投票成功");
        } else if (res.code == "-200") {
          this.$message.error("你已投票");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },

    changelabel(val) {
      this.arr = val;
    },
  },
};
</script>

<style lang="less" scoped>
.detilBody {
  padding: 20px 180px;
  .detilnr {
    width: 100%;
    height: 100%;
    background-color: white;
  }
}
.firstLine {
  text-align: left;
  padding: 30px 30px 35px 30px;
  display: flex;
  .el-image {
    width: 60px;
    height: 60px;
    background: #e3e8ef;
    border-radius: 50%;
  }
  span {
    line-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .times {
    flex: 1;
    text-align: right;
    line-height: 60px;
    span {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 0px;
    }
  }
}
.SecondLine {
  text-align: left;
  padding: 0px 30px 30px 30px;
  span {
    font-size: 25px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 0px;
  }
}
.ThirdLine {
  text-align: left;
  padding: 0px 30px 30px 30px;
  div {
    width: 120px;
    height: 20px;
    background: #eeeeee;
    border-radius: 10px 10px 10px 10px;
    text-align: center;
    line-height: 20px;
    span {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #cccccc;
      line-height: 0px;
    }
  }
}
.FourthLine {
  text-align: left;
  padding: 0px 30px 30px 35px;
  div {
    span {
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
}
.fifthLine {
  padding: 0px 30px 30px 30px;
  .el-image {
    width: 600px;
    height: 900px;
  }
}
.Line6 {
  padding: 0px 30px 60px 30px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.Line7 {
  .Line7Border {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height: 80px;
    display: flex;
    position: relative;
    .c_count {
      padding-left: 37px;
      line-height: 80px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .dianzshouc {
      border-top: 1px solid white;
      padding-right: 40px;
      margin-top: 20px;
      position: absolute;
      top: 0;
      right: 0;
      .imglove {
        width: 32px;
        height: 32px;
      }
      i {
        font-style: normal;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin: 10px;
      }
      .imgCollection {
        margin-left: 80px;
        width: 32px;
        height: 32px;
      }
    }
  }
}
.Line8 {
  padding: 30px 40px;
  .Line8Input {
    background: #f5f5f5;
    border-radius: 6px 6px 6px 6px;
    /deep/.el-textarea {
      .el-textarea__inner {
        height: 160px;
      }
    }
  }
  .Line8InputButton {
    padding-top: 20px;
    display: flex;
    .Line8InputButtonValue {
      margin-left: auto;
      p {
        cursor: pointer;
        width: 160px;
        height: 40px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #0c032e;
        line-height: 40px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 0px;
        }
      }
    }
  }
}
.line9 {
  text-align: left;
  padding: 30px 30px 35px 30px;
  .line9Value {
    border-top: 1px solid #dddddd;
    display: flex;
    .el-image {
      margin-top: 20px;
      width: 60px;
      height: 60px;
      background: #e3e8ef;
      border-radius: 50%;
    }
    span {
      margin-top: 20px;
      line-height: 60px;
      padding-left: 20px;
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .pltimes {
      margin-top: 20px;
      flex: 1;
      text-align: right;
      line-height: 60px;
      span {
        font-size: 12px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
  .line9content {
    padding-left: 130px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 0px;
    }
  }
  .line9Love {
    img {
      width: 16px;
      height: 16px;
      margin: 20px 130px;
    }
  }
}
.bottonStyle {
  border-top: 1px solid #dddddd;
  height: 60px;
  span {
    cursor: pointer;
    font-size: 20px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 60px;
  }
}
.isVoto {
  padding: 30px 80px;
  .isVotoBody {
    background-color: #f5f5f5;
    width: 100%;
    height: 380px;
    .isVotoline1 {
      text-align: left;
      padding: 20px 40px 6px;
      span {
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .isVotoline2 {
      text-align: left;
      padding-left: 40px;
      padding-top: 6px;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
}
.placeOrder {
  justify-content: center;
  /deep/.el-radio.is-bordered.is-checked::before {
    content: "";
    width: 11px;
    height: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .radioDiv {
    margin-left: 15px;
    margin-top: 10px;
    width: 150px;
    height: 210px;
    background: #ffffff;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    box-shadow: 1px 1px 50px rgb(0 21 41 / 18%);
  }
  /deep/.el-radio.is-bordered {
    padding: 0 150px;
  }
  /deep/.el-radio__label {
    padding-left: 0;
  }
  /deep/.el-radio {
    margin-top: 10px;
    width: 140;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-image {
    width: 150px;
    height: 160px;
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
  }
}
.el-radio-group {
  display: flex;
  justify-content: center;
}
.diemPost {
  position: absolute;
  left: 38%;
  top: -30px;
  color: #eeeeee;
}
/deep/.el-checkbox__input {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 45%;
  margin-bottom: 10%;
  .el-checkbox__inner {
    border: 1px solid #00b567;
    border-radius: 50%;
    background-color: #00b567;
  }
}
.votoTpLi {
  position: relative;
  .votoTs {
    cursor: pointer;
    width: 315px;
    height: 40px;
    background: #ffdc00;
    border-radius: 6px 6px 6px 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 25px auto;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #0c032e;
      line-height: 40px;
    }
  }
  .votoTser {
    cursor: pointer;
    width: 315px;
    height: 40px;
    background: #999999;
    border-radius: 6px 6px 6px 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 25px auto;
    text-align: center;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #0c032e;
      line-height: 40px;
    }
  }
  .votoTspan {
    position: absolute;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 70px auto;
    span {
      font-size: 10px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 0px;
    }
  }
}
/deep/.el-checkbox__label {
  padding-left: 0;
}
.textBody {
  text-align: left;
  padding-top: 20px;
  padding-left: 40px;
  .el-checkbox {
    display: block;
    margin-right: 0;
  }
  .checkboxText {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
    /deep/.el-checkbox__input {
      position: absolute;
      margin-left: 0%;
      margin-bottom: 10px;
    }
    /deep/.el-checkbox__label {
      margin-left: 40px;
    }
  }
}
</style>
