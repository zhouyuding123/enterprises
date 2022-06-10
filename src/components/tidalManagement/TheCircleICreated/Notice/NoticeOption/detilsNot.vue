<template>
  <div>
    <div class="notEdit" @click="detilsShow"><span>公告详情</span></div>
    <el-dialog title="公告详情" :visible.sync="dialogVisible" width="30%">
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
          <div class="detilsValuesTitle">{{ruleFormdetils.title}}</div>
          <div class="detilsValuesContent">{{ruleFormdetils.content}}</div>
      </div>
      <div style="padding-top: 45px">
        <span>
          <el-button @click="dialogVisible = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { postD } from "@/api";
import {
  circle_noticeGetShowApi,
  CircleGetCircleShowApi,
} from "../../TheCircleICreated.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["detilsId"],
  data() {
    return {
      dialogVisible: false,
      detilsIds: {
        circle_id: "",
        notice_id: "",
      },
      detilsIdQ: {
        id: "",
      },
      ruleFormdetils: [],
      imagesValue: "",
      detilsValue: [],
    };
  },
  methods: {
    detilsShow() {
      this.dialogVisible = true;
      this.detilsIds.circle_id = this.$route.params.id;
      this.detilsIdQ.id = this.$route.params.id;
      this.detilsIds.notice_id = this.detilsId;

      postD(CircleGetCircleShowApi(), this.detilsIdQ).then((res) => {
        this.detilsValue = res.data.circle;
        this.imagesValue = imgUrl();
      });
      postD(circle_noticeGetShowApi(), this.detilsIds).then((res) => {
        if (res.code == "200") {
          this.ruleFormdetils = res.data;
          console.log(this.ruleFormdetils);
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
  },
};
</script> 

<style lang="less" scoped>
@import url("./addNot.less");
</style>