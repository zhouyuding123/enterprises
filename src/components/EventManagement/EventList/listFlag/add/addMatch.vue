<template>
  <div class="addBody">
    <el-form
      :model="ruleForm"
      :rules="ruleFormRules"
      ref="ruleFormRef"
      label-width="110px"
      hide-required-asterisk
    >
      <div class="line1">
        <el-form-item label="赛事主题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="赛事介绍" prop="description">
          <div class="introduction">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="line2">
        <el-form-item label="奖金设置" required>
          <div v-for="(item, index) in ruleForm.prize" :key="index">
            <el-col :span="7" class="prizeBody">
              <el-form-item
                :prop="`prize.${index}.name`"
                :rules="ruleFormRules.name"
              >
                <el-input v-model="item.name" style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="prizeBody">
              <el-form-item
                :prop="`prize.${index}.amount`"
                :rules="ruleFormRules.amount"
              >
                <el-input v-model="item.amount" style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="prizeBody">
              <el-form-item
                :prop="`prize.${index}.item`"
                :rules="ruleFormRules.item"
              >
                <el-input v-model="item.item" style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="prizeBody">
              <div class="add_Prize" @click="addInputHandle" v-if="index === 0">
                <span>添加</span>
              </div>
              <div class="del_Prize" v-else @click="delInputHandle(index)">
                <span>删除</span>
              </div>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <div class="line3">
        <div class="processStyle"><span>赛事进程</span></div>
        <el-form-item label="征集期" required>
          <el-col :span="11">
            <el-form-item
              prop="sign_start_time"
              :rules="ruleFormRules.sign_start_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择报名开始时间"
                v-model="ruleForm.sign_start_time"
                style="width: 100%"
                @change="getTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item
              prop="sign_end_time"
              :rules="ruleFormRules.sign_end_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择报名结束时间"
                v-model="ruleForm.sign_end_time"
                style="width: 100%"
                @change="gitTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="评选期" required>
          <el-col :span="11">
            <el-form-item
              prop="voto_start_time"
              :rules="ruleFormRules.voto_start_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="评选开始时间"
                v-model="ruleForm.voto_start_time"
                style="width: 100%"
                @change="gatTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item
              prop="voto_end_time"
              :rules="ruleFormRules.voto_end_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="评选结束时间"
                v-model="ruleForm.voto_end_time"
                style="width: 100%"
                @change="gutTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="公示期" required>
          <el-col :span="11">
            <el-form-item
              prop="exh_start_time"
              :rules="ruleFormRules.exh_start_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择公示开始时间"
                v-model="ruleForm.exh_start_time"
                style="width: 100%"
                @change="gltTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item
              prop="exh_end_time"
              :rules="ruleFormRules.exh_end_time"
            >
              <el-date-picker
                type="datetime"
                placeholder="选择公示结束时间"
                v-model="ruleForm.exh_end_time"
                style="width: 100%"
                @change="gctTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="评选规则" prop="rule">
          <div class="introduction">
            <el-input v-model="ruleForm.rule" type="textarea"></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="设计说明" prop="explain">
          <div class="introduction">
            <el-input v-model="ruleForm.explain" type="textarea"></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="line5">
        <el-form-item label="奖金设置" required>
          <div v-for="(item, index) in ruleForm.standard" :key="index">
            <el-col :span="7" class="prizeBody">
              <el-form-item
                :prop="`standard.${index}.title`"
                :rules="ruleFormRules.title"
              >
                <el-input v-model="item.title" style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15" class="prizeBody">
              <el-form-item
                :prop="`standard.${index}.description`"
                :rules="ruleFormRules.description"
              >
                <el-input
                  v-model="item.description"
                  style="width: 95%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="prizeBody">
              <div class="add_Prize" @click="addStandard" v-if="index === 0">
                <span>添加</span>
              </div>
              <div class="del_Prize" v-else @click="delStandard(index)">
                <span>删除</span>
              </div>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="参赛须知" prop="entry_info">
          <div class="introduction">
            <el-input v-model="ruleForm.entry_info" type="textarea"></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="获奖通知" prop="notice">
          <div class="introduction">
            <el-input v-model="ruleForm.notice" type="textarea"></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="海报" prop="poster">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              :v-model="imageUrl"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="line4">
        <el-form-item label="封面图" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccessthumb"
            :before-upload="beforeAvatarUploadthumb"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrlthumb"
              :src="imageUrlthumb"
              class="avatar"
              :v-model="imageUrlthumb"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <div class="releaseButton">
      <div @click="addRelease" class="release"><span>发布赛事</span></div>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from "@/assets/js/time.js";
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import {matchReleaseApi} from "../matchUrl.js"
import { postD } from '@/api/index.js';
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        sign_start_time: "",
        sign_end_time: "",
        voto_start_time: "",
        voto_end_time: "",
        exh_start_time: "",
        exh_end_time: "",
        explain: "",
        rule: "",
        standard: [
          {
            title: "",
            description: "",
          },
        ],
        entry_info: "",
        notice: "",
        thumb: "",
        poster: "",
      },
      // 图片
      imageUrl: "",
      fileType: "images",
      // 封面图
      imageUrlthumb: "",
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入正确内容",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入正确内容",
            tirgger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入奖项名称",
            tirgger: "blur",
          },
        ],
        amount: [
          {
            required: true,
            message: "请输入数量",
            tirgger: "blur",
          },
        ],
        item: [
          {
            required: true,
            message: "请输入奖品",
            tirgger: "blur",
          },
        ],
        sign_start_time: [
          {
            required: true,
            message: "请输入报名开始时间",
            tirgger: "blur",
          },
        ],
        sign_end_time: [
          {
            required: true,
            message: "请输入报名结束时间",
            tirgger: "blur",
          },
        ],
        voto_start_time: [
          {
            required: true,
            message: "请输入评选开始时间",
            tirgger: "blur",
          },
        ],
        voto_end_time: [
          {
            required: true,
            message: "请输入评选结束时间",
            tirgger: "blur",
          },
        ],
        exh_start_time: [
          {
            required: true,
            message: "请输入公示开始时间",
            tirgger: "blur",
          },
        ],
        exh_end_time: [
          {
            required: true,
            message: "请输入公示结束时间",
            tirgger: "blur",
          },
        ],
        rule: [
          {
            required: true,
            message: "请输入评选规则",
            tirgger: "blur",
          },
        ],
        explain: [
          {
            required: true,
            message: "请输入设计说明",
            tirgger: "blur",
          },
        ],
        entry_info: [
          {
            required: true,
            message: "请输入参赛须知",
            tirgger: "blur",
          },
        ],
        notice: [
          {
            required: true,
            message: "请输入公示获奖通知",
            tirgger: "blur",
          },
        ],
        poster: [
          {
            required: true,
            message: "请输入海报",
            tirgger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请输入封面图",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addInputHandle() {
      this.ruleForm.prize.push({ name: "", amount: "", item: "" });
    },
    delInputHandle(index) {
      this.ruleForm.prize.splice(index, 1);
    },
    addStandard() {
      this.ruleForm.standard.push({ title: "", description: "" });
    },
    delStandard(index) {
      this.ruleForm.standard.splice(index, 1);
    },
    getTime(date) {
      this.ruleForm.sign_start_time = timestampToTime(date / 1000);
    },
    gitTime(date) {
      this.ruleForm.sign_end_time = timestampToTime(date / 1000);
    },
    gatTime(date) {
      this.ruleForm.voto_start_time = timestampToTime(date / 1000);
    },
    gutTime(date) {
      this.ruleForm.voto_end_time = timestampToTime(date / 1000);
    },
    gltTime(date) {
      this.ruleForm.exh_start_time = timestampToTime(date / 1000);
    },
    gctTime(date) {
      this.ruleForm.exh_end_time = timestampToTime(date / 1000);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.poster = res.url;
    },
    handleAvatarSuccessthumb(res, file) {
      this.imageUrlthumb = URL.createObjectURL(file.raw);
      this.ruleForm.thumb = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    beforeAvatarUploadthumb(file) {
      beforeAvatar(file);
    },
    addRelease() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        postD(matchReleaseApi(),this.ruleForm).then(res=> {
          if (res.code == "200") {
              this.$message.success("发布赛事成功");
              this.$router.push("/match/listMacthMF")
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
        })
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./add.less");
</style>