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
      <div class="jjbodyDiv">
        <div style="width: 100px"><strong>圈子公告:</strong>&nbsp;&nbsp;</div>
        <vue-seamless-scroll class="seamless-warp" :data="NoticeValue">
          <ul class="item">
            <li v-for="item in NoticeValue" :key="item.id">
              <span
                class="title"
                v-text="item.description"
                @click="thisTitle(item.id)"
              >
              </span>
            </li>
          </ul>
        </vue-seamless-scroll>
        <div class="moreValue" @click="moreValue">更多</div>
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
    <div class="choice">
      <el-tabs v-model="activeName">
        <el-tab-pane label="圈子帖子" name="first">
          <div class="listValue">
            <div class="listFelt">
              <p style="height: 50px">
                <vxe-radio-group v-model="selectTab">
                  <vxe-radio-button
                    label="tab1"
                    content="全部"
                  ></vxe-radio-button>
                  <div class="listRight">
                    <el-button @click="SetAsTopS">设为置顶</el-button>
                    <el-button @click="SetAsEssence">设为精华</el-button>
                    <el-button @click="cancelSetAsTopS">取消置顶</el-button>
                    <el-button @click="cancelSetAsEssence">取消精华</el-button>
                    <el-button @click="canDels">删除帖子</el-button>
                  </div>
                </vxe-radio-group>
              </p>

              <div v-show="selectTab === 'tab1'">
                <vxe-table
                  :sync-resize="selectTab"
                  :data="tableData"
                  @checkbox-change="checkboxChangeEvent"
                  @checkbox-all="checkboxChangeEvent"
                >
                  <vxe-column
                    align="center"
                    type="checkbox"
                    width="50"
                  ></vxe-column>
                  <vxe-column field="title">
                    <template v-slot="scoped">
                      <div>
                        <div class="topStyle">
                          <div>
                            <span
                              v-if="scoped.row.is_top == 1"
                              class="ToppingSpan"
                              >置顶</span
                            >
                          </div>
                          <div>
                            <span
                              class="EssenceSpan"
                              v-if="scoped.row.is_ess == 1"
                              >精华</span
                            >
                          </div>
                          <div>
                            <span
                              @click="detailsValue(scoped.row.id)"
                              class="details"
                              >{{ scoped.row.title }}</span
                            >
                          </div>
                          <div class="postiongs">
                            <div
                              class="Topping"
                              @click="SetAsTop(scoped.row)"
                              v-if="scoped.row.is_top != 1"
                            >
                              <span>置顶</span>
                            </div>
                            <div
                              class="Topping"
                              @click="SetAsTop(scoped.row)"
                              v-if="scoped.row.is_top != 0"
                            >
                              <span>取消置顶</span>
                            </div>
                            <div
                              class="Topping"
                              @click="SetAsEssencer(scoped.row)"
                              v-if="scoped.row.is_ess != 1"
                            >
                              <span>精华</span>
                            </div>
                            <div
                              class="Topping"
                              @click="SetAsEssencer(scoped.row)"
                              v-if="scoped.row.is_ess != 0"
                            >
                              <span>取消精华</span>
                            </div>
                            <div
                              class="Topping"
                              @click="DeletePost(scoped.row)"
                            >
                              <span>删除帖子</span>
                            </div>
                          </div>
                        </div>
                        <div class="Postdescription">
                          {{ scoped.row.description }}
                        </div>
                        <div
                          class="tablineValue3"
                          v-if="
                            scoped.row.theme !== '' && scoped.row.theme !== null
                          "
                        >
                          <span>#{{ scoped.row.theme }}</span>
                        </div>
                        <div v-if="scoped.row.thumb" class="tablineValue4">
                          <div
                            v-for="items in scoped.row.thumb
                              .split(',')
                              .slice(0, 3)"
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
                      </div>
                      <div class="tablineValuestablineO">
                        <div>
                          <img
                            :src="imagesValue + scoped.row.headimage"
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
                          <span>{{ scoped.row.username }}</span>
                        </div>
                        <div class="tablineTime">
                          <span>{{ funTime(scoped.row.create_time) }}</span>
                        </div>
                        <div class="tablineoptions">
                          <div class="tablineoptionsValue">
                            <div class="tablineoptionsimg">
                              <div>
                                <img
                                  src="../../../assets/strollimg/爱心.png"
                                  alt=""
                                />
                              </div>
                              <div class="ImgSpan"><span>123</span></div>
                            </div>
                            <div class="tablineoptionsimg">
                              <div>
                                <img
                                  src="../../../assets/strollimg/评论.png"
                                  alt=""
                                />
                              </div>
                              <div class="ImgSpan"><span>123</span></div>
                            </div>
                            <div class="tablineoptionsimg">
                              <div>
                                <img
                                  src="../../../assets/strollimg/收藏.png"
                                  alt=""
                                />
                              </div>
                              <div class="ImgSpan"><span>123</span></div>
                            </div>
                            <div class="tablineoptionsimg">
                              <div>
                                <img
                                  src="../../../assets/strollimg/转发.png"
                                  alt=""
                                />
                              </div>
                              <div class="ImgSpan"><span>123</span></div>
                            </div>
                          </div>
                        </div>
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
        </el-tab-pane>
        <el-tab-pane label="我的帖子" name="second" >
          <!-- <my-post /> -->
          <div class="listRights">
      <el-button @click="SetAsTopS">设为置顶</el-button>
      <el-button @click="SetAsEssence">设为精华</el-button>
      <el-button @click="cancelSetAsTopS">取消置顶</el-button>
      <el-button @click="cancelSetAsEssence">取消精华</el-button>
      <el-button @click="canDels">删除帖子</el-button>
    </div>
    <div>
      <vxe-table
        :data="tableData"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column align="center" type="checkbox" width="50"></vxe-column>
        <vxe-column field="title">
          <template v-slot="scoped">
            <div>
              <div class="topStyle">
                <div>
                  <span v-if="scoped.row.is_top == 1" class="ToppingSpan"
                    >置顶</span
                  >
                </div>
                <div>
                  <span class="EssenceSpan" v-if="scoped.row.is_ess == 1"
                    >精华</span
                  >
                </div>
                <div>
                  <span @click="detailsValue(scoped.row.id)" class="details">{{
                    scoped.row.title
                  }}</span>
                </div>
                <div class="postiongs">
                  <div
                    class="Topping"
                    @click="SetAsTop(scoped.row)"
                    v-if="scoped.row.is_top != 1"
                  >
                    <span>置顶</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsTop(scoped.row)"
                    v-if="scoped.row.is_top != 0"
                  >
                    <span>取消置顶</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsEssencer(scoped.row)"
                    v-if="scoped.row.is_ess != 1"
                  >
                    <span>精华</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsEssencer(scoped.row)"
                    v-if="scoped.row.is_ess != 0"
                  >
                    <span>取消精华</span>
                  </div>
                  <div class="Topping" @click="DeletePost(scoped.row)">
                    <span>删除帖子</span>
                  </div>
                </div>
              </div>
              <div class="Postdescription">
                {{ scoped.row.description }}
              </div>
              <div
                class="tablineValue3"
                v-if="scoped.row.theme !== '' && scoped.row.theme !== null"
              >
                <span>#{{ scoped.row.theme }}</span>
              </div>
              <div v-if="scoped.row.thumb" class="tablineValue4">
                <div
                  v-for="items in scoped.row.thumb.split(',').slice(0, 3)"
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
            </div>
            <div class="tablineValuestablineO">
              <div>
                <img
                  :src="imagesValue + scoped.row.headimage"
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
                <span>{{ scoped.row.username }}</span>
              </div>
              <div class="tablineTime">
                <span>{{ funTime(scoped.row.create_time) }}</span>
              </div>
              <div class="tablineoptions">
                <div class="tablineoptionsValue">
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="../../../assets/strollimg/爱心.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="../../../assets/strollimg/评论.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="../../../assets/strollimg/收藏.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="../../../assets/strollimg/转发.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="公告详情" :visible.sync="detilsShow" width="30%">
      <div class="detilsBody">
        <div>
          <el-image :src="imagesValue + detilsValue.headimg" class="userImg">
          </el-image>
        </div>
        <div class="notTitle">
          <span>{{ detilsValue.username }}</span>
        </div>
        <div class="detilsTime">
          <span>{{ ruleFormdetils.create_time }}</span>
        </div>
      </div>
      <div class="detilsValues">
        <div class="detilsValuesTitle">{{ ruleFormdetils.title }}</div>
        <div class="detilsValuesContent">{{ ruleFormdetils.content }}</div>
      </div>
      <div style="padding-top: 45px">
        <span>
          <el-button @click="detilsShow = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { postD } from "../../../api/index.js";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import {
  CircleGetCircleShowApi,
  CircleGetCircleForumApi,
  ForumDelForumApi,
  ForumSetTopApi,
  ForumSetEssApi,
  circle_noticeGetListApi,
  circle_noticeGetShowApi,
} from "./TheCircleICreated.js";
import circleList from "./CircleList/circleList.vue";
import LatestCircleList from "./CircleList/LatestCircleList.vue";
import EssenceCircleList from "./CircleList/EssenceCircleList.vue";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  components: {
    circleList,
    LatestCircleList,
    EssenceCircleList,
    vueSeamlessScroll,
  },
  data() {
    return {
      step: 500000000,
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
      Deletes: [],
      DeleteValue: [],
      delids: {
        id: "",
      },
      //置顶
      Topids: [],
      TopidsL: {
        forum_id: "",
        is_top: "1",
      },
      TopidsL1: {
        forum_id: "",
        is_top: "0",
      },
      //选中时将对象保存到arrs中
      Toparrs: [],
      ToparrsValue: [],
      Top: {
        forum_id: "",
        is_top: "1",
      },
      Topone: {
        forum_id: "",
        is_top: "0",
      },
      //精华
      Essids: [],
      EssidsL: {
        forum_id: "",
        is_ess: "1",
      },
      EssidsL1: {
        forum_id: "",
        is_ess: "0",
      },
      //选中时将对象保存到arrs中
      EssarrsValue: [],
      Ess: {
        forum_id: "",
        is_ess: "1",
      },
      EssOne: {
        forum_id: "",
        is_ess: "0",
      },
      // gonggao
      notId: {
        circle_id: "",
      },
      NoticeValue: [],
      // 公告详情
      detilsIdQ: {
        id: "",
      },
      detilsId: {
        circle_id: "",
        notice_id: "",
      },
      detilsShow: false,
      detilsValue: [],
      ruleFormdetils: [],
      activeName: "first",
      value: "",
      options: {},
      myRequest: {
        circle_id: "",
        own: "1",
      },
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
    moreValue() {},
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
            this.$message.success("删除成功");
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
    // 获取批量
    checkboxChangeEvent(data) {
      this.ToparrsValue = data.records;
      this.EssarrsValue = data.records;
      this.DeleteValue = data.records;
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
        if (data.is_top !== 1) {
          this.Top.forum_id = data.id.toString();
          postD(ForumSetTopApi(), this.Top).then((res) => {
            if (res.code == "200") {
              this.$message.success("置顶成功");
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
        } else {
          this.Topone.forum_id = data.id.toString();
          postD(ForumSetTopApi(), this.Topone).then((res) => {
            if (res.code == "200") {
              this.$message.success("取消成功");
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
      }
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
            this.releaseValue();
            this.TopidsL.forum_id = "";
            this.Topids = [];
            this.ToparrsValue = [];
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
    // 批量取消置顶
    async cancelSetAsTopS() {
      const cancelSetAsTopSValue = await this.$confirm(
        "此操作将批量取消置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (cancelSetAsTopSValue !== "confirm") {
        return this.$message.info("取消操作");
      }
      if (cancelSetAsTopSValue === "confirm") {
        this.ToparrsValue.forEach((v) => {
          this.Topids.push(v.id);
        });
        this.TopidsL1.forum_id = this.Topids.toString();
        postD(ForumSetTopApi(), this.TopidsL1).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
            this.TopidsL1.forum_id = "";
            this.Topids = [];
            this.ToparrsValue = [];
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
        if (data.is_ess !== 1) {
          this.Ess.forum_id = data.id.toString();
          postD(ForumSetEssApi(), this.Ess).then((res) => {
            if (res.code == "200") {
              this.$message.success("设置精华成功");
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
        }else {
          this.EssOne.forum_id = data.id.toString();
          postD(ForumSetEssApi(), this.EssOne).then((res) => {
            if (res.code == "200") {
              this.$message.success("取消精华成功");
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
            this.releaseValue();
            this.EssidsL1.forum_id = "";
            this.Essids = [];
            this.EssarrsValue = [];
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
    // 批量取消精华
    async cancelSetAsEssence() {
      const cancelSetAsEssenceValue = await this.$confirm(
        "此操作将选中内容批量取消精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (cancelSetAsEssenceValue !== "confirm") {
        return this.$message.info("取消精华");
      }
      if (cancelSetAsEssenceValue === "confirm") {
        this.EssarrsValue.forEach((v) => {
          this.Essids.push(v.id);
        });
        this.EssidsL1.forum_id = this.Essids.toString();
        postD(ForumSetEssApi(), this.EssidsL1).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.releaseValue();
            this.EssidsL1.forum_id = "";
            this.Essids = [];
            this.EssarrsValue = [];
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
    // 批量删除
    async canDels() {
      const canDelsValue = await this.$confirm(
        "此操作将选中内容批量删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (canDelsValue !== "confirm") {
        return this.$message.info("取消批量删除");
      }
      if (canDelsValue === "confirm") {
        this.DeleteValue.forEach((v) => {
          this.Deletes.push(v.id);
        });
        this.delids.id = this.Deletes.toString();
        postD(ForumDelForumApi(), this.delids).then((res) => {
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

    // 公告
    thisTitle(val) {
      this.detilsShow = true;
      this.detilsId.circle_id = this.$route.params.id;
      this.detilsId.notice_id = val;
      this.detilsIdQ.id = this.$route.params.id;
      postD(CircleGetCircleShowApi(), this.detilsIdQ).then((res) => {
        this.detilsValue = res.data.circle;
        this.imagesValue = imgUrl();
      });
      postD(circle_noticeGetShowApi(), this.detilsId).then((res) => {
        if (res.code == "200") {
          this.ruleFormdetils = res.data;
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
    },
    funTime(val) {
      return timestampToTime(val);
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
    moreValue() {
      this.$router.push("/circle_notice/getList" + this.paramsId.id);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./TheCircleICreated.less");
</style>