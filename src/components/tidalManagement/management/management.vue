<template>
  <div>
    <div class="line1Div">
      <div class="line1Value">
        <div class="textEdit"><span>圈子头像</span></div>
        <div class="imageDiv">
          <el-image :src="imageValue + listValue.headimg"></el-image>
        </div>
      </div>
    </div>
    <div class="line2Div">
      <div class="line2Value">
        <div class="linedetails1">
          <div class="mc"><span>圈子名称</span></div>
          <div class="lineBorder">
            <span>{{ listValue.title }}</span>
          </div>
        </div>
        <div class="linedetails3">
          <div class="mc"><span>圈子标签</span></div>
          <div class="lineBorder">
            <span>{{ listValue.label }}</span>
          </div>
        </div>
        <div class="linedetails5">
          <div class="mc"><span>圈子简介</span></div>
          <div class="lineBorder">
            <span>{{ listValue.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="line3Div">
      <div class="line3Value">
        <div class="CircleMembers"><span>圈子成员</span></div>
        <div class="goMember" @click="zxc">
          <span>共{{ memberNum }}个成员</span
          ><i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <div class="line4Div">
      <div class="qx" @click="cancel"><span>返回</span></div>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import { CircleGetCircleShowApi } from "./myCircleUrl.js";

export default {
  data() {
    return {
      paramsId: {
        id: "",
      },
      imageValue: "",
      listValue: [],
      // 成员
      memberNum: "",
    };
  },
  created() {
    this.paramsId.id = this.$route.params.id;
    this.listCircleValue();
  },
  methods: {
    listCircleValue() {
      postD(CircleGetCircleShowApi(), this.paramsId).then((res) => {
        this.listValue = res.data.circle;
        this.imageValue = imgUrl();
        this.memberNum = res.data.member_count;
      });
    },
    zxc() {
      this.$router.push("/getMember" + this.paramsId.id);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.line1Div {
  padding: 20px 180px;
  .line1Value {
    background-color: white;
    height: 100px;
    display: flex;
    .textEdit {
      margin: 46px 60px;
      span {
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .imageDiv {
      margin-left: auto;
      position: relative;
      .el-image {
        cursor: pointer;
        width: 100px;
        height: 100px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        margin-right: 100px;
      }
      i {
        cursor: pointer;
        position: absolute;
        margin-top: 45px;
        right: 0;
        margin-right: 40px;
      }
    }
  }
}
.line2Div {
  padding-left: 180px;
  padding-right: 180px;
  .line2Value {
    background-color: white;
    height: 270px;
    text-align: left;
    .linedetails1 {
      padding: 30px 60px 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          cursor: pointer;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails2 {
      cursor: pointer;
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails3 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails4 {
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails5 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
  }
}
.line3Div {
  padding-left: 180px;
  padding-top: 20px;
  padding-right: 180px;
  .line3Value {
    padding: 30px 40px;
    background-color: white;
    display: flex;
    .CircleMembers {
      span {
        font-size: 24px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .goMember {
      cursor: pointer;
      margin-left: auto;
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
.line4Div {
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bc {
    cursor: pointer;
    width: 120px;
    height: 40px;
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 3px 3px 3px 3px;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
  }
  .qx {
    cursor: pointer;
    margin-left: 20px;
    width: 120px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #0c032e;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
}
</style>