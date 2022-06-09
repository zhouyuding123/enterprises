<template>
  <div class="notStyle">
    <div class="line1">
      <div class="addNotStyle"><span>创建公告</span></div>
      <div class="RefreshStyle"><span>刷新</span></div>
    </div>
    <div class="notValueStyle" v-for="item in NoticeValue" :key="item.id">
      <div class="notValueStyleValue">
        <div class="notValueStyleValuePadding">
          <span>{{ item.description }}</span>
        </div>
      </div>
      <div class="notBorder"></div>
      <div class="notOptions">
        <div class="notTitle">
          <span>{{ item.title }}</span>
        </div>
        <div class="notTime">
          <span>{{ item.create_time }}</span>
        </div>
        <div class="botoptions">
          <template>
            <div class="notEdit"><span>编辑</span></div>
            <div class="botDel" @click="addDel(item.id)"><span>删除</span></div>
          </template>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="ssss">
        <span>确认删除本条圈子公告吗？</span>
      </div>
      <div class="dialog-footer">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delNot">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import {
  circle_noticeGetListApi,
  circle_noticeDelApi,
} from "../TheCircleICreated.js";
export default {
  data() {
    return {
      notId: {
        circle_id: "",
      },
      NoticeValue: [],
      dialogVisible: false,
      DelNotID: {
        id: "",
      },
    };
  },
  created() {
    this.notValue();
  },
  methods: {
    notValue() {
      this.notId.circle_id = this.$route.params.id;
      postD(circle_noticeGetListApi(), this.notId).then((res) => {
        console.log(res);
        this.NoticeValue = res.list;
      });
    },
    addDel(val) {
      this.dialogVisible = true;
      this.DelNotID.id = val;
    },
    delNot() {
      postD(circle_noticeDelApi(), this.DelNotID).then((res) => {
        if (res.code == "200") {
          this.$message.success("公告删除成功");
          this.notValue();
          this.dialogVisible = false;
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
@import url("./NoticeList.less");
</style>