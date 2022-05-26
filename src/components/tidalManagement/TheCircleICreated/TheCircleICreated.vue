<template>
  <div>
    <div class="Release" @click="goactivities">
      <p>发布活动</p>
    </div>
    <div class="thumbBody">
      <div class="thumbbool">
        <el-image :src="imagesValue + CircleShowValue.thumb"> </el-image>
        <div class="headimgBody">
          <el-image :src="imagesValue + CircleShowValue.headimg"> </el-image>
        </div>
        <div class="titleValue">
          <div class="LabelValue">
            <span>{{ CircleShowValue.title }}</span>
            <div class="thisLabelStyle">
              <span>{{ thisLabel }}</span>
            </div>
          </div>
        </div>
        <div class="Statistics">
          <div @click="goPosts">
            <span>{{ countValue.forum_count }}&nbsp;&nbsp;</span>
            <span>篇帖子</span>
            <span class="iconfont icon-dayuhao"></span>
          </div>
          <div class="qzgl" @click="goManagement">
            <span class="qzglSpan">圈子管理</span>
            <span class="iconfont icon-dayuhao qzglSpans"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="jjbody">
      <div>
        <span
          ><strong>圈子公告:</strong>&nbsp;&nbsp;
          <span v-for="item in NoticeValue" :key="item.id">
            {{ item.description }}
          </span>
        </span>
      </div>
    </div>
    <div class="seatchStyle">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div>
            <el-input
              placeholder="请输入内容"
              v-model="seatch.keyword"
            ></el-input>
            <el-button
              icon="el-icon-search"
              @click="seatchInput"
              style="background: #dfdfdf"
            ></el-button></div
        ></el-col>
        <el-col :span="3">
          <div class="fbtz">
            <span @click="addrelease">发布帖子</span>
          </div>
        </el-col>
        <el-col :span="5"><div></div></el-col>
        <div class="sx" @click="Refresh">
          <div>
            <span><i class="el-icon-refresh-right"></i> 刷新</span>
          </div>
        </div>
      </el-row>
    </div>
    <div class="listValue">
      <div class="listFelt">
        <p style="height: 50px">
          <vxe-radio-group v-model="selectTab">
            <vxe-radio-button label="tab1" content="全部"></vxe-radio-button>
            <vxe-radio-button label="tab2" content="热门"></vxe-radio-button>
            <vxe-radio-button label="tab3" content="最新"></vxe-radio-button>
            <vxe-radio-button label="tab4" content="精华"></vxe-radio-button>
            <div class="listRight">
              <el-button @click="SetAsTopS">设为置顶</el-button>
              <el-button @click="SetAsEssence">设为精华</el-button>
              <el-button>删除帖子</el-button>
            </div>
          </vxe-radio-group>
        </p>

        <div v-show="selectTab === 'tab1'">
          <vxe-table
            :sync-resize="selectTab"
            :data="tableData"
            height="300"
            @checkbox-change="checkboxChangeEvent"
            @checkbox-all="checkboxChangeEvent"
          >
            <vxe-column align="center" type="checkbox" width="50"></vxe-column>
            <vxe-column field="title">
              <template v-slot="scoped">
                <div class="topStyle">
                  <span v-if="scoped.row.is_top == 1" class="ToppingSpan"
                    >置顶</span
                  >
                  <span class="EssenceSpan" v-if="scoped.row.is_ess == 1"
                    >精华</span
                  >
                  <span @click="detailsValue(scoped.row.id)" class="details">{{
                    scoped.row.title
                  }}</span>
                </div>
              </template>
            </vxe-column>
            <vxe-column>
              <template v-slot="scoped">
                <el-image
                  :src="imagesValue + scoped.row.thumb"
                  style="width: 32px; height: 32px"
                  class="imgStyle"
                >
                </el-image>
              </template>
            </vxe-column>
            <vxe-column field="nickname" align="left" width="140"></vxe-column>
            <vxe-column field="create_time" width="150">
              <template v-slot="scoped">
                <div>{{ timeer(scoped.row.create_time) }}</div>
              </template>
            </vxe-column>
            <vxe-column align="center" class="xz">
              <template v-slot="scoped">
                <div class="swdz">
                  <el-button @click="SetAsTop(scoped.row)">设为置顶</el-button>
                </div>
                <div class="swdz">
                  <el-button @click="SetAsEssencer(scoped.row)"
                    >设为精华</el-button
                  >
                </div>
                <div class="swdz">
                  <el-button @click="DeletePost(scoped.row)"
                    >删除帖子</el-button
                  >
                </div>
              </template>
            </vxe-column>
          </vxe-table>
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
          ></vxe-pager>
        </div>

        <div v-show="selectTab === 'tab2'">
          <circle-list />
        </div>
        <div v-show="selectTab === 'tab3'">
          <latest-circle-list />
        </div>
        <div v-show="selectTab === 'tab4'">
          <essence-circle-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api/index.js";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import {
  CircleGetCircleShowApi,
  CircleGetCircleForumApi,
  ForumDelForumApi,
  ForumSetTopApi,
  ForumSetEssApi,
  circle_noticeGetListApi,
} from "./TheCircleICreated.js";
import { timestampToTime } from "../../../assets/js/time.js";
import circleList from "./CircleList/circleList.vue";
import LatestCircleList from "./CircleList/LatestCircleList.vue";
import EssenceCircleList from "./CircleList/EssenceCircleList.vue";
export default {
  components: { circleList, LatestCircleList, EssenceCircleList },
  data() {
    return {
      paramsId: {
        id: "",
      },
      circle: {
        circle_id: "",
      },
      CircleShowValue: [],
      imagesValue: "",
      thisLabel: "",
      countValue: "",
      selectTab: "tab1",
      tableData: [],
      page1: {
        circle_id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 搜索
      seatch: {
        circle_id: "",
        keyword: "",
      },
      // 删除
      DeletePostValue: {
        id: "",
      },
      //置顶
      Topids: [],
      TopidsL: {
        forum_id: "",
        is_top: "1",
      },
      //选中时将对象保存到arrs中
      Toparrs: [],
      ToparrsValue: [],
      Top: {
        forum_id: "",
        is_top: "1",
      },
      //精华
      Essids: [],
      EssidsL: {
        forum_id: "",
        is_ess: "1",
      },
      //选中时将对象保存到arrs中
      EssarrsValue: [],
      Ess: {
        forum_id: "",
        is_ess: "1",
      },
      // gonggao
      notId: {
        circle_id: "",
      },
      NoticeValue: [],
    };
  },
  created() {
    this.paramsId.id = this.$route.params.id;
    this.circle.circle_id = this.$route.params.id;
    this.CircleShow();
    this.releaseValue();
    this.notValue();
  },
  methods: {
    // gonggao
    notValue() {
      this.notId.circle_id = this.paramsId.id;
      postD(circle_noticeGetListApi(), this.notId).then((res) => {
        this.NoticeValue = res.list;
      });
    },
    // 页面数据
    CircleShow() {
      postD(CircleGetCircleShowApi(), this.paramsId).then((res) => {
        this.CircleShowValue = res.data.circle;
        this.countValue = res.data;
        this.imagesValue = imgUrl();
        let repuit = this.CircleShowValue.label;
        this.thisLabel = repuit.replace(/,/g, "|");
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.page1.circle_id = this.circle.circle_id;
      postD(CircleGetCircleForumApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 列表
    releaseValue() {
      postD(CircleGetCircleForumApi(), this.circle).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    timeer(val) {
      return timestampToTime(val);
    },
    Refresh() {
      this.releaseValue();
    },
    // 搜索
    seatchInput() {
      this.seatch.circle_id = this.circle.circle_id;
      postD(CircleGetCircleForumApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 删除
    async DeletePost(data) {
      const DeletePosts = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (DeletePosts !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (DeletePosts === "confirm") {
        this.DeletePostValue.id = data.id;
        postD(ForumDelForumApi(), this.DeletePostValue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
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
      }
    },
    // 置顶
    checkboxChangeEvent(data) {
      this.ToparrsValue = data.records;
      this.EssarrsValue = data.records;
    },
    async SetAsTop(data) {
      const SetAsTopValue = await this.$confirm(
        "此操作将此条内容设为置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsTopValue !== "confirm") {
        return this.$message.info("取消置顶");
      }
      if (SetAsTopValue === "confirm") {
        this.Top.forum_id = data.id.toString();
        postD(ForumSetTopApi(), this.Top).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
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
      }
    },
    async SetAsTopS() {
      const SetAsTopSValue = await this.$confirm(
        "此操作将批量置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsTopSValue !== "confirm") {
        return this.$message.info("取消置顶");
      }
      if (SetAsTopSValue === "confirm") {
        this.ToparrsValue.forEach((v) => {
          this.Topids.push(v.id);
        });
        this.TopidsL.forum_id = this.Topids.toString();
        postD(ForumSetTopApi(), this.TopidsL).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
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
      }
    },
    // 单精华
    async SetAsEssencer(data) {
      const SetAsEssenceOne = await this.$confirm(
        "此操作将选中内容设为精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsEssenceOne !== "confirm") {
        return this.$message.info("取消精华");
      }
      if (SetAsEssenceOne === "confirm") {
        this.Ess.forum_id = data.id.toString();
        postD(ForumSetEssApi(), this.Ess).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
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
      }
    },
    async SetAsEssence() {
      const SetAsEssenceValue = await this.$confirm(
        "此操作将选中内容设为精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsEssenceValue !== "confirm") {
        return this.$message.info("取消精华");
      }
      if (SetAsEssenceValue === "confirm") {
        this.EssarrsValue.forEach((v) => {
          this.Essids.push(v.id);
        });
        this.EssidsL.forum_id = this.Essids.toString();
        postD(ForumSetEssApi(), this.EssidsL).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
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
      }
    },
    // 详情
    detailsValue(data) {
      this.$router.push("/Forum/showForum" + data);
    },
    addrelease() {
      this.$router.push("/Forum/release" + this.paramsId.id);
    },
    goManagement() {
      this.$router.push("/Circle/myCircle" + this.paramsId.id);
    },
    goPosts() {
      this.$router.push("/Circle/getCircleForum" + this.paramsId.id);
    },
    goactivities() {
      this.$router.push("/Activity/release");
    },
  },
};
</script>

<style lang="less" scoped>
.Release {
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
.thumbBody {
  padding: 20px 180px;
  .thumbbool {
    position: relative;
    .el-image {
      width: 100%;
      height: 200px;
      background: #0b022d;
    }
    .headimgBody {
      width: 160px;
      height: 120px;
      background: #0c032e;
      border-radius: 6px 6px 6px 6px;
      opacity: 1;
      position: absolute;
      top: 0;
      margin: 40px 10px 40px 50px;
      .el-image {
        width: 100%;
        height: 100%;
        background: #0b022d;
      }
    }
    .titleValue {
      position: absolute;
      top: 60px;
      left: 240px;
      .LabelValue {
        font-size: 28px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 0px;
        .thisLabelStyle {
          margin-top: 60px;
          text-align: left;
          span {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }
}
.Statistics {
  position: absolute;
  top: 30px;
  right: 40px;
  div {
    cursor: pointer;
    width: 160px;
    height: 40px;
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #ffffff;
    margin-top: 20px;
    line-height: 30px;
    position: relative;
    span:nth-child(1) {
      font-size: 16px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      top: 10%;
      left: 25px;
    }
    span:nth-child(2) {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      top: 9%;
      left: 40%;
    }
    span:nth-child(3) {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      right: 0;
      top: 13%;
      padding-right: 20px;
    }
  }
  .qzgl {
    cursor: pointer;
    width: 160px;
    height: 40px;
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #ffffff;
    margin-top: 20px;
    line-height: 30px;
    position: relative;
    .qzglSpan {
      position: absolute;
      top: 9%;
      left: 30%;
    }
    .qzglSpans {
      position: absolute;
      top: 9%;
      left: 80%;
    }
  }
}
.jjbody {
  padding: 0px 180px;
  text-align: left;
  div {
    height: 30px;
    background: #ffffff;
    line-height: 5px;
    padding: 20px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}
.seatchStyle {
  padding: 20px 155px;
  div {
    .el-input {
      width: 75%;
      height: 40px;
    }
  }
}
.fbtz {
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
.plgl {
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
.sx {
  cursor: pointer;
  float: right;
  margin-right: 35px;
  div {
    width: 80px;
    height: 40px;
    background: #00b567;
    border-radius: 4px 4px 4px 4px;
    line-height: 40px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 19px;
    }
  }
}
.listValue {
  position: relative;
  padding: 0px 180px;
  .listFelt {
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    text-align: left;
  }
}
.imgStyle {
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 90%;
}
.el-dropdown-link {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #0177d5;
  line-height: 19px;
}
.vxe-radio-group {
  line-height: 50px;
}
.listRight {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 180px;
  padding-top: 5px;
}
.el-button {
  background: #ffffff;
  color: #999999;
}
.xz {
  display: table;
  width: 100%;
}
.swdz {
  display: table-cell;
  padding-left: 5px;
  .el-button {
    font-size: 1px;
  }
}
.topStyle {
  .ToppingSpan {
    width: 40px;
    height: 20px;
    background: #ffdc00;
    border-radius: 4px 4px 4px 4px;
    margin-right: 5px;
    font-size: 1px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .EssenceSpan {
    width: 40px;
    height: 20px;
    background: #ff2659;
    border-radius: 4px 4px 4px 4px;
    margin-right: 5px;
    font-size: 1px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
.details {
  cursor: pointer;
}
.details:hover {
  font-size: 16px;
}
// 查看圈子
</style>