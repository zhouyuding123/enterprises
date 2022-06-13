<template>
  <div class="strollStyle">
    <div class="fb">
      <div class="tz" @click="addrelease"><span>发表帖子</span></div>
      <div class="hd" @click="goactivities"><span>发布活动</span></div>
    </div>
    <div class="strollDiv">
      <el-tabs v-model="activeName">
        <el-tab-pane label="逛逛帖子" name="first">
          <div class="tabline" v-for="item in strollList" :key="item.id" @click="strollDetial(item.id)">
            <div class="tablineValue">
              <div class="tabline1" v-if="item.is_top == 1">
                <span>置顶</span>
              </div>
              <div class="tabline2" v-if="item.is_ess == 1">
                <span>精华</span>
              </div>
              <div class="tabline3">
                <span>{{ item.title }}</span>
              </div>
              <div class="tabline4">
                <img src="../../../assets/strollimg/转发.png" alt="" />
              </div>
            </div>
            <div class="tablineValue2">{{ item.description }}</div>
            <div
              class="tablineValue3"
              v-if="item.theme !== '' && item.theme !== null"
            >
              <span>#{{ item.theme }}</span>
            </div>
            <div v-if="item.thumb" class="tablineValue4">
              <div
                v-for="items in item.thumb.split(',')"
                :key="items"
                class="imgadde"
              >
                <img
                  :src="imagesValue + items"
                  alt=""
                  style="width: 106px; height: 106px"
                />
              </div>
            </div>
            <div class="tablineValue5">
              <div>
                <img
                  :src="imagesValue + item.headimage"
                  alt=""
                  style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-top: 20px;
                  "
                />
              </div>
              <div class="strollName">
                <span>{{ item.username }}</span>
              </div>
              <div class="strollTime">
                <span>{{ funTime(item.create_time) }}</span>
              </div>
              <div class="strollOption">
                <div class="strollOptionUp">
                  <div class="strollOptionUpImg">
                    <img src="../../../assets/strollimg/爱心.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
                <div class="strollOptionUp">
                  <div>
                    <img src="../../../assets/strollimg/评论.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
                <div class="strollOptionUp">
                  <div>
                    <img src="../../../assets/strollimg/收藏.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            style="margin-top: 20px"
          ></vxe-pager>
        </el-tab-pane>
        <el-tab-pane label="我的帖子" name="second">
          <div class="MYstr">
            <div>
              <el-input
                v-model="seatch.keyword"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="mySeatch" @click="SeatchValue"><span>搜索</span></div>
            <div class="refresh" @click="Refresh"><span>刷新</span></div>
          </div>
          <div>
            <div class="SetAs">
              <div class="Topping" @click="SetAsTopS">
                <span>设为置顶</span>
              </div>
              <div class="Topping" @click="SetAsEssence">
                <span>设为精华</span>
              </div>
              <div class="Topping"><span>删除帖子</span></div>
            </div>
            <div class="Mylist">
              <vxe-table
                round
                border="true"
                ref="xTable1"
                :align="allAlign"
                :row-config="{ isHover: true }"
                :data="tableData"
                row-id="id"
                :row-style="tableRowStyle"
                :header-row-style="tableStyle"
                @checkbox-change="checkboxChangeEvent"
                @checkbox-all="checkboxChangeEvent"
              >
                <vxe-column
                  align="center"
                  type="checkbox"
                  width="50"
                ></vxe-column>
                <vxe-column field="title" align="center">
                  <template v-slot="scoped">
                    <div class="tablineValue" @click="strollDetial(scoped.row.id)">
                      <div class="tabline1" v-if="scoped.row.is_top == 1">
                        <span>置顶</span>
                      </div>
                      <div class="tabline2" v-if="scoped.row.is_ess == 1">
                        <span>精华</span>
                      </div>
                      <div class="hoverTitle">{{ scoped.row.title }}</div>
                    </div>
                  </template>
                </vxe-column>
                <vxe-column align="center" width="50px">
                  <template v-slot="scoped">
                    <div class="MyImg">
                      <img
                        :src="imagesValue + scoped.row.headimage"
                        alt=""
                        style="width: 32px; height: 32px; border-radius: 50%"
                      />
                    </div>
                  </template>
                </vxe-column>
                <vxe-column field="username" align="left"></vxe-column>
                <vxe-column align="center">
                  <template v-slot="scoped">
                    {{ funTime(scoped.row.create_time) }}
                  </template>
                </vxe-column>
                <vxe-column align="center">
                  <template v-slot="scoped">
                    <div class="setOneAs">
                      <div class="sz" @click="SetAsTop(scoped.row)">
                        <span>设为置顶</span>
                      </div>
                      <div class="sz" @click="SetAsEssencer(scoped.row)">
                        <span>设为精华</span>
                      </div>
                      <div class="sz" @click="DeletePost(scoped.row)">
                        <span>删除帖子</span>
                      </div>
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
                @page-change="handlePageChangeActivityTwo"
                style="margin-top: 20px"
              ></vxe-pager>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import {
  ForumListForumApi,
  CircleGetForumApi,
  ForumSetTopApi,
  ForumSetEssApi,
  ForumDelForumApi,
} from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import { timestampToTime } from "@/assets/js/time.js";
import { styleModify, styleModifytwo } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      activeName: "first",
      strollList: [],
      imagesValue: "",
      strollListImg: [],
      styleId:{
        style:"1"
      },
      page1: {
        style:"1",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatch: {
        keyword: "",
      },
      allAlign: null,
      tableData: [],
      page2: {
        style:"1",
        offset: 1,
        limit: 10,
        totalResult: 0,
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
      // 删除
      DeletePostValue: {
        id: "",
      },
    };
  },
  created() {
    this.strollValue();
    this.Mystroll();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    strollValue() {
      postD(ForumListForumApi(),this.styleId).then((res) => {
        this.strollList = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(ForumListForumApi(), this.page1).then((res) => {
        this.strollList = res.list;
        this.page1.totalResult = res.count;
      });
    },
    funTime(val) {
      return timestampToTime(val);
    },
    Mystroll() {
      postD(CircleGetForumApi(),this.styleId).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    handlePageChangeActivityTwo({ currentPage, pageSize }) {
      this.page2.offset = currentPage;
      this.page2.limit = pageSize;
      postD(CircleGetForumApi(), this.page2).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    SeatchValue() {
      postD(CircleGetForumApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    Refresh() {
      this.Mystroll();
    },
    // 批量获取
    checkboxChangeEvent(data) {
      this.ToparrsValue = data.records;
      this.EssarrsValue = data.records;
    },
    // 批量置顶
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
            this.Mystroll();
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
    // 批量精华
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
            this.Mystroll();
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
    // 单个置顶
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
            this.Mystroll();
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
    // 单个精华
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
            this.Mystroll();
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
            this.Mystroll();
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
    goactivities() {
      this.$router.push("/Activity/release");
    },  
    addrelease() {
      this.$router.push("/Local/release");
    },
    strollDetial(val) {
      this.$router.push("/Forum/showForum" + val);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Local.less");
</style>