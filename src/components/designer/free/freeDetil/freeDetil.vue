<template>
  <div>
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto">
          <el-image
            :src="imagesValue + WorksShowData.headimage"
            alt=""
            class="headStyle"
          />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname">
            <span class="nickname_span">{{ WorksShowData.nickname }}</span>
            <div class="top">
              <img src="@/assets/imgers/设计师等级.png" alt="" />
              <span>一级设计师</span>
            </div>
          </div>
          <div class="fans_num">
            <span>粉丝数 123</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button_Shop"><span>购买版权</span></div>
          <div class="button_to"><span>发起众筹</span></div>
          <div class="button_follow"><span>关注</span></div>
        </div>
      </div>
      <div class="worksDiv2">
        <div class="worksDiv2line1">
          <div class="line1_value">
            <p>{{ WorksShowData.title }}</p>
            <span>{{ WorksShowData.create_time }}</span>
          </div>
          <div class="line1_Collection">
            <div>
              <img src="@/assets/imgers/爱心.png" alt="" />
              <p>123</p>
            </div>
            <div>
              <img
                src="@/assets/imgers/ic_chat_bubble_outline_48px.png"
                alt=""
              />
              <p>123</p>
            </div>
            <div>
              <img src="@/assets/imgers/ic_star_border_24px.png" alt="" />
              <p>123</p>
            </div>
          </div>
        </div>
        <div class="worksDiv2line2">
          {{ WorksShowData.content }}
        </div>
        <div v-for="item in imgs" :key="item.item" class="imgs">
          <img :src="imagesValue + item" alt="" />
        </div>
      </div>
      <div class="worksDiv3">
        <div class="worksDiv3line1">
          <span>作品信息</span>
        </div>
        <div class="worksDiv3line2">
          <div>
            <span class="worksline1">原创作品</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div>
            <span class="worksline1">上传时间</span
            ><span class="worksline1Value">{{
              WorksShowData.create_time
            }}</span>
          </div>
          <div>
            <span class="worksline1">作品版权</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div class="lastDiv">
            <span class="worksline1">作品标签</span>
            <span class="worksline1Values"
              ><el-tag type="info" v-for="items in labels" :key="items.item"
                ><span>{{ items }}</span></el-tag
              >
            </span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="bottomValue">
          <div class="statement">
            声明：本站内用户发表的所有内容及言论仅代表其本人，并不反映本站意见及观点。
          </div>
          <div class="operation">
            <div class="complaint">
              <img src="@/assets/imgers/转发.png" alt="" />
            </div>
            <span>举报</span>
            <div class="fgx"></div>
            <div class="forward">
              <img src="@/assets/imgers/转发.png" alt="" />
            </div>
            <span>转发</span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="comment">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="commentValue.content"
          >
          </el-input>
          <div class="Comments">
            <div class="Comment" @click="CommentValues">
              <span>发表评论</span>
            </div>
          </div>
          <div
            class="CommentList"
            v-for="items in comment_list"
            :key="items.id"
          >
            <div>
              <img
                :src="imagesValue + items.headimage"
                alt=""
                style="
                  width: 60px;
                  height: 60px;
                  background: #e3e;
                  border-radius: 50%;
                "
              />
            </div>
            <div class="CommentListTitle">
              <div class="CommentListTitles">
                <div class="CommentListTitleNickname">
                  <span>{{ items.nickname }}</span>
                </div>
                <div class="CommentListTitletime">
                  <span>{{ fullTime(items.create_time) }}</span>
                </div>
              </div>
              <div class="CommentListTitleContent">
                <span>{{ items.content }}</span>
              </div>
              <div class="CommentListTitleax">
                <img src="@/assets/imgers/爱心.png" alt="" />
                <span>123</span>
                <p @click="comment(items)">回复</p>
              </div>
              <div v-if="showInput == items.id">
                <el-input
                  v-model="commentValueser.content"
                  :placeholder="'回复@' + items.nickname + ':'"
                ></el-input>
                <div style="width:100%"><div @click="zxc" class="commentStyle"><span>发表评论</span></div></div>
              </div>
              <div class="CommentListTitleComment" v-if="items.chridren === ''">
                <div v-for="(item, index) in items.chridren" :key="index">
                  <div>{{ item.nickname }}:{{ item.content }}</div>
                  <div @click="comment(item)" style="text-align: right">
                    回复
                  </div>
                </div>
              </div>
              <div class="CommentListTitleComment" v-if="items.chridren != ''">
                <div
                  v-for="(item, index) in items.chridren"
                  :key="index"
                  style="margin-top: 10px"
                >
                  <div>
                    {{ item.nickname }} {{ item.type }} {{ item.people }}:{{
                      item.content
                    }}
                  </div>
                  <div @click="comment(item)" style="text-align: right">
                    回复
                  </div>
                  <div v-if="showInput == item.id">
                    <el-input
                      v-model="commentValueser.content"
                      :placeholder="'回复@' + item.nickname + ':'"
                    ></el-input>
                    <div>
                      <div @click="zxc" class="commentStyle"><span>发表评论</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  designer_worksShowApi,
  designer_worksCommentApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  data() {
    return {
      WorksShowData: [],
      imagesValue: "",
      imgs: "",
      labels: "",
      comment_list: [],
      commentValue: {
        works_id: "",
        pid: "0",
        content: "",
        fid: "0",
        placehoder: "评论",
      },
      commentValueser: {
        works_id: "",
        pid: "",
        content: "",
        fid: "",
        placehoder: "评论",
      },
      showInput: 0,
    };
  },
  created() {
    this.WorkDetailsList();
  },
  methods: {
    WorkDetailsList() {
      postD(designer_worksShowApi(), this.$route.params).then((res) => {
        this.WorksShowData = res.data;
        this.imagesValue = imgUrl();
        var arr = this.WorksShowData.imgs.split(",");
        var arrs = this.WorksShowData.label.split(",");
        this.imgs = arr;
        this.labels = arrs;
        var tmp = [];
        res.data.comment_list.forEach((item, i) => {
          if (item.fid == 0) {
            tmp.push({
              content: item.content,
              create_time: item.create_time,
              fid: item.fid,
              headimage: item.headimage,
              id: item.id,
              nickname: item.nickname,
              pid: item.pid,
              username: item.username,
              chridren: [],
            });
          }
        });
        tmp.forEach((item, i) => {
          res.data.comment_list.forEach((list, j) => {
            if (item.id == list.fid) {
              item.chridren.push(list);
            }
          });
        });
        tmp.forEach((item, i) => {
          item.chridren.forEach((list, j) => {
            list.type = "";
            list.people = "";
            res.data.comment_list.forEach((jk, k) => {
              if (jk.pid != 0) {
                if (list.pid == jk.id) {
                  (list.type = "回复"), (list.people = jk.nickname);
                }
              }
            });
          });
        });
        this.comment_list = tmp;
      });
    },
    Superior() {
      this.$router.go(-1);
    },
    fullTime(val) {
      return timestampToTime(val);
    },
    CommentValues() {
      this.commentValue.works_id = this.$route.params.id;
      postD(designer_worksCommentApi(), this.commentValue).then((res) => {
        if (res.code == "200") {
          this.$message.success("已成功评论");
          this.WorkDetailsList();
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
    comment(e) {
      console.log(e);
      this.showInput = e.id;
      if (e.pid == 0) {
        this.commentValueser.works_id = this.$route.params.id;
        this.commentValueser.pid = e.id;
        this.commentValueser.content = "";
        this.commentValueser.fid = e.id;
        this.placehoder = "评论" + e.nickname;
      } else {
        this.commentValueser.pid = e.id;
        this.commentValueser.fid = e.fid;
        this.placehoder = "回复" + e.nickname;
      }
    },
    zxc() {
      console.log(this.commentValueser);
      postD(designer_worksCommentApi(), this.commentValueser).then((res) => {
        if (res.code == "200") {
          this.$message.success("已成功评论");
          this.WorkDetailsList();
          this.commentValueser.content = "";
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
  },
};
</script>

<style lang="less" scoped>
@import url("./freeDetil.less");
</style>

var tmp = []
     res.data.comment_list.forEach((item, i) => {
      if (item.fid == 0) {
       tmp.push({
        content: item.content,
        create_time: item.create_time,
        fid: item.fid,
        headimage: item.headimage,
        id: item.id,
        nickname: item.nickname,
        pid: item.pid,
        username: item.username,
        chridren: []
       })
      }
     })
     tmp.forEach((item, i) => {
      res.data.comment_list.forEach((list, j) => {
       if (item.id == list.fid) {
        item.chridren.push(list)
       }
      })
     })
     tmp.forEach((item, i) => {
      item.chridren.forEach((list, j) => {
       list.type = ''
       list.people = ''
       res.data.comment_list.forEach((jk, k) => {
        if (jk.pid != 0) {
         if (list.pid == jk.id) {
          list.type = '回复',
           list.people = jk.nickname
         }
        }
       })
      })
     })
     this.comment_list = tmp