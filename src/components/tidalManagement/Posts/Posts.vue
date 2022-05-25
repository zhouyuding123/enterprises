<template>
  <div>
    <div>
      <div class="borderStyle"></div>
      <div class="borderBody">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="Circled">圈子内的帖子</el-menu-item>
          <el-menu-item index="2" @click="myPost">我发布的帖子</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="bodyText" v-if="this.flag == 1">
      <div class="bodyTextline">
        <div class="bodyTextlineValue">
          <el-input
            placeholder="请输入内容"
            v-model="seatch.keyword"
          ></el-input>
          <div class="IsSeatch" @click="seatchInput">
            <i class="el-icon-search"></i>
            <span>搜索</span>
          </div>
          <div class="Refresh" @click="Refreshs">
            <i class="el-icon-refresh-right"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
      <div class="vxeList">
        <p>
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
            
            :data="tableData"
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
            align="center"
          ></vxe-pager>
        </div>

        <div v-show="selectTab === 'tab2'">
          <hot-list />
        </div>
        <div v-show="selectTab === 'tab3'">
          <newest-list />
        </div>
        <div v-show="selectTab === 'tab4'">
          <essence-list />
        </div>
      </div>
    </div>
    <div class="bodyText" v-if="this.flag == 2">
      <div class="bodyTextline">
        <div class="bodyTextlineValue">
          <el-input placeholder="请输入内容"
          v-model="seatch2.keyword"
          ></el-input>
          <div class="IsSeatch" @click="seatchInput2">
            <i class="el-icon-search"></i>
            <span>搜索</span>
          </div>
          <div class="Refresh" @click="Refresh2">
            <i class="el-icon-refresh-right"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
      <div class="vxeList">
        <div class="listRight">
          <el-button @click="SetAsTopS">设为置顶</el-button>
          <el-button @click="SetAsEssence">设为精华</el-button>
          <el-button>删除帖子</el-button>
        </div>
        <vxe-table
          :data="tableData1"
          height="500"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent"
          style="margin-top: 40px"
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
                <span class="details">{{ scoped.row.title }}</span>
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
                <el-button @click="DeletePost(scoped.row)">删除帖子</el-button>
              </div>
            </template>
          </vxe-column>
        </vxe-table>
        <vxe-pager
            :current-page="page2.offset"
            :page-size="page2.limit"
            :total="page2.totalResult"
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
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api";
import { imgUrl } from "../../../assets/js/modifyStyle";
import {
  CircleGetCircleForumApi,
  ForumDelForumApi,
  ForumSetTopApi,
  ForumSetEssApi,
} from "../TheCircleICreated/TheCircleICreated.js";
import { timestampToTime } from "../../../assets/js/time.js";
import HotList from "./postsList/HotList.vue";
import NewestList from "./postsList/newestList.vue";
import EssenceList from "./postsList/EssenceList.vue";
import { CircleGetForumApi } from "./getForumUrl.js";
export default {
  components: { HotList, NewestList, EssenceList },
  data() {
    return {
      imagesValue: "",
      paramsId: {
        circle_id: "",
      },
      activeIndex: "1",
      flag: true,
      selectTab: "tab1",
      tableData: [],
      page1: {
        circle_id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      page2: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 搜索
      seatch: {
        circle_id: "",
        keyword: "",
      },
      seatch2: {
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
      // 我创建的圈子
      tableData1: [],
    };
  },
  created() {
    this.paramsId.circle_id = this.$route.params.id;
    this.releaseValue();
    this.getForumValue();
  },
  methods: {
    handleSelect() {
      console.log();
    },
    Circled() {
      this.flag = 1;
    },
    myPost() {
      this.flag = 2;
    },
    releaseValue() {
      postD(CircleGetCircleForumApi(), this.paramsId).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    timeer(val) {
      return timestampToTime(val);
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
            this.getForumValue();
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
            this.getForumValue();
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
            this.getForumValue();
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
            this.getForumValue();
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
            this.getForumValue();
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
    Refreshs() {
      this.releaseValue();
    },
    // 搜索
    seatchInput() {
      this.seatch.circle_id = this.paramsId.circle_id;
      postD(CircleGetCircleForumApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.page1.circle_id = this.paramsId.circle_id;
      postD(CircleGetCircleForumApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 我创建的圈子
    getForumValue() {
      postD(CircleGetForumApi()).then((res) => {
        console.log(res);
        this.tableData1 = res.list;
        this.page2.totalResult = res.count;
      });
    },
    Refresh2() {
      this.getForumValue();
    },
    seatchInput2() {
      postD(CircleGetForumApi(),this.seatch2).then(res=> {
        this.tableData1 = res.list;
        this.page2.totalResult = res.count;
      })
    },
    handlePageChangeActivitys({ currentPage, pageSize }) {
      this.page2.offset = currentPage;
      this.page2.limit = pageSize;
      postD(CircleGetForumApi(), this.page2).then((res) => {
        this.tableData1 = res.list;
        this.page2.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  border: 1px solid #dddddd;
}

.bodyText {
  padding: 10px 180px;
  .bodyTextline {
    .bodyTextlineValue {
      display: flex;
      .el-input {
        width: 400px;
      }
      .IsSeatch {
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
      .Refresh {
        cursor: pointer;
        margin-left: auto;
        width: 80px;
        height: 40px;
        background: #00b567;
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
        }
      }
    }
  }
}
.listRight {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 180px;
  margin-top: 285px;
}
.vxeList {
  text-align: left;
  padding-top: 20px;
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
.imgStyle {
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 90%;
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
</style>