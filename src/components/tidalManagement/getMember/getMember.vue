<template>
  <div>
    <div class="line1body">
      <div class="seatch">
        <el-input v-model="page1.keyword" placeholder="请输入内容"></el-input>
        <div class="Isseatch" @click="QueryResults">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
        <div class="MemberEvents">
          <div class="invitationValue" @click="zxc">
            <span>邀请成员</span>
          </div>
          <div class="delValue" @click="zxcs">
            <span>移除成员</span>
          </div>
        </div>
      </div>
      <div class="MembeList">
        <div class="MembeListValue">
          <div class="AllValue"><span>所有成员</span></div>
          <div class="AllList">
            <div
              v-for="item in GetMemberValue"
              :key="item.id"
              class="AllListItem"
            >
              <div class="AllListDiv">
                <el-image :src="imgValue + item.headimg"></el-image>
                <div>{{ item.nickname }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paging">
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
</template>

<script>
import { postD } from "../../../api/index.js";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import { CircleGetMemberApi } from "./getMemberUrl.js";
export default {
  data() {
    return {
      imgValue: "",
      paramsId: {
        circle_id: "",
      },
      Seatchinput: "",
      GetMemberValue: [],
      page1: {
        keyword:"",
        circle_id: "",
        offset: 1,
        limit: 10,
        totalResult:0
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
        this.page1.totalResult = res.count
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.page1.circle_id = this.paramsId.circle_id;
      postD(CircleGetMemberApi(),this.page1).then(res=> {
        this.GetMemberValue = res.list;
        this.page1.totalResult = res.count;
      })
    },
    QueryResults() {
      this.page1.circle_id = this.paramsId.circle_id;
      postD(CircleGetMemberApi(),this.page1).then(res=> {
        this.GetMemberValue = res.list;
        this.page1.totalResult = res.count;
      })
    },
    zxc() {
      this.$router.push("/Circles/invitation" + this.paramsId.circle_id);
    },
    zxcs() {
      this.$router.push("/Circles/del" + this.paramsId.circle_id);
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
      .delValue {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background: #ffffff;
        border-radius: 3px 3px 3px 3px;
        border: 1px solid #0c032e;
        margin-left: 20px;
        span {
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
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
</style>