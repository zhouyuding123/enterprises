<template>
  <div>
    <div class="line1body">
      <div class="seatch">
        <el-input placeholder="请输入内容"></el-input>
        <div class="Isseatch">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
        <div class="MemberEvents">
          <div class="invitationValue" @click="dleValue">
            <span>确认移除</span>
          </div>
        </div>
      </div>
      <div class="MembeList">
        <div class="MembeListValue">
          <div class="AllValue"><span>圈子内的成员</span></div>
          <div class="AllList">
            <el-checkbox-group
              v-model="checkedCities"
              class="AllListItem"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in GetMemberValue"
                :label="item.id"
                :key="item.id"
                class="AllListDiv"
              >
                <el-image :src="imgValue + item.headimg"></el-image>
                <div>{{ item.nickname }}</div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../../../api/index.js";
import { imgUrl } from "../../../../../assets/js/modifyStyle.js";
import { CircleGetMemberApi } from "../../../getMember/getMemberUrl.js";
export default {
  data() {
    return {
      imgValue: "",
      paramsId: {
        circle_id: "",
      },
      GetMemberValue: [],
      checkedCities: [],
      arr: [],
      arrs: [],
      checkedId: {
        id: "",
        voto_id: "",
      },
    };
  },
  created() {
    this.paramsId.circle_id = this.$route.params.id;
    this.getMemberList();
  },
  methods: {
    getMemberList() {
      postD(CircleGetMemberApi(), this.paramsId).then((res) => {
        this.GetMemberValue = res.list;
        this.imgValue = imgUrl();
      });
    },
    handleCheckedCitiesChange(val) {
      this.arr = val;
    },
    dleValue() {
      this.arr.forEach((v) => {
        this.arrs.push(v);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.line1body {
  padding: 20px 180px;
  .seatch {
    height: 40px;
    display: flex;
    .el-input {
      width: 400px;
    }
    .Isseatch {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #dfdfdf;
      border-radius: 4px 4px 4px 4px;
      i {
        font-size: 14px;
        line-height: 40px;
        color: white;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        margin-left: 5px;
      }
    }
    .MemberEvents {
      margin-left: auto;
      display: flex;
      .invitationValue {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background: #ff2659;
        border-radius: 4px 4px 4px 4px;
        span {
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
  }
  .MembeList {
    padding-top: 20px;
    .MembeListValue {
      background-color: white;
      height: auto;
      .AllValue {
        padding: 30px 40px;
        text-align: left;
        span {
          font-size: 24px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 0px;
        }
      }
      .AllList {
        padding: 20px 60px;
        margin-bottom: 20px;
        display: flex;
        .AllListItem {
          height: 112px;
          .AllListDiv {
            height: 112px;
            width: 80px;
            margin-left: 40px;
            .el-image {
              width: 80px;
              height: 80px;
              background: #e3e8ef;
              border-radius: 50%;
            }
            .el-checkbox {
              bottom: 0;
            }
            span {
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #3d444d;
              line-height: 0px;
            }
          }
        }
      }
    }
  }
}
.paging {
  padding: 20px 180px;
  .vxe-pager {
    background: #f9f9f9;
  }
}
/deep/.el-checkbox__inner {
  position: absolute;
  margin-left: 50px;
  margin-top: 10px;
}
</style>