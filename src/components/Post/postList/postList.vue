<template>
  <div>
    <div class="postBody">
      <div>
        <el-input v-model="seatch.keyword" placeholder="请输入内容"></el-input>
      </div>
      <div class="seatchDiv" @click="seatchValue"><span>搜索</span></div>
      <div class="dels" @click="canDels"><span>批量删除</span></div>
      <div class="rsh" @click="refh"><span>刷新</span></div>
    </div>
    <div class="postBodys">
      <vxe-table
        :data="tableData"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column align="center" type="checkbox" width="50"> </vxe-column>
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
  </div>
</template>
 
<script>
import { CircleGetForumApi, ForumDelForumApi } from "@/urls/wsUrl.js";
import { timestampToTime } from "@/assets/js/time.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      Myid: {
        own: "1",
      },
      seatch: {
        keyword: "",
      },
      tableData: [],
      imagesValue: "",
      Deletes: [],
      DeleteValue: [],
      delids: {
        id: "",
      },
      // 删除
      DeletePostValue: {
        id: "",
      },
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
        own: "1",
      },
    };
  },
  created() {
    this.myList();
  },
  methods: {
    myList() {
      postD(CircleGetForumApi(), this.Myid).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    funTime(val) {
      return timestampToTime(val);
    },
    detailsValue(data) {
      this.$router.push("/Forum/showForum" + data);
    },
    refh() {
      this.myList();
    },
    checkboxChangeEvent(data) {
      this.DeleteValue = data.records;
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
            this.myList();
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
            this.$message.success("删除成功");
            this.myList();
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
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(CircleGetForumApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    seatchValue() {
      postD(CircleGetForumApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./postList.less");
</style>