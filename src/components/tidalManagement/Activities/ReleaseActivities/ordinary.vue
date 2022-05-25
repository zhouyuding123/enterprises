<template>
  <div>
    <div class="General-activities" @click="ordinaryClick">
      <div class="GeneralImg">
        <img src="../../../../assets/imgers/活动.png" alt="" />
      </div>
      <div>
        <ul>
          <li>普通活动</li>
          <li>线下活动、优惠折扣等</li>
          <li><span>发布活动</span></li>
        </ul>
      </div>
    </div>
    <el-dialog title="普通活动" :visible.sync="ordinaryShow" width="80%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="110px"
        hide-required-asterisk
      >
        <div class="line2">
          <el-form-item label="活动标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="start_time">
                <el-date-picker
                  type="datetime"
                  placeholder="选择报名时间"
                  v-model="start_time"
                  style="width: 100%"
                  @change="getTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end_time">
                <el-date-picker
                  type="datetime"
                  placeholder="选择结束时间"
                  v-model="end_time"
                  style="width: 100%"
                  @change="gitTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="发布对象" prop="style">
            <el-select v-model="ruleForm.style" placeholder="请选择">
              <el-option
                v-for="item in styleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择圈子">
            <el-select
              v-model="ruleForm.circle_id"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in listCircleOptions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="line2" style="margin-top: 20px">
          <el-form-item label="活动内容" prop="content">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="活动规则" prop="rule">
            <el-input v-model="ruleForm.rule"></el-input>
          </el-form-item>
        </div>
        <div class="line2" style="margin-top: 20px">
          <el-form-item label="活动奖品:" style="width: 100%">
            <div v-for="(item, index) in ruleForm.prize" :key="index">
              <div class="prizesS">
                <el-input
                  v-model="item.name"
                  style="width: 350px"
                  placeholder="名次"
                ></el-input>

                <el-input
                  v-model="item.amount"
                  style="width: 350px"
                  placeholder="数量"
                ></el-input>

                <el-input
                  v-model="item.item"
                  style="width: 350px"
                  placeholder="奖励"
                ></el-input>

                <div
                  class="addInput"
                  @click="addInputHandle"
                  v-if="index === 0"
                >
                  <span>添加</span>
                </div>
                <div class="delInput" v-else @click="delInputHandle(index)">
                  <span>删除</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="line2Value" style="margin-top: 20px">
          <div>
            <el-form-item label="活动封面" prop="thumb">
              <el-upload
                class="avatar-uploader"
                action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="{ fileType: this.fileType }"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>1:1的jpg图片</span>
            </el-form-item>
          </div>
          <div class="posterRight">
            <el-form-item label="活动海报" prop="poster">
              <el-upload
                class="avatar-uploader"
                action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccessline2"
                :before-upload="beforeAvatarUploadline2"
                :data="{ fileType: this.fileType }"
              >
                <img v-if="imageUrls" :src="imageUrls" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icons"></i>
              </el-upload>
              <span>16:9的jpg图片</span>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span>
        <el-button @click="ordinaryShow = false">取 消</el-button>
        <el-button type="primary" @click="addOrdinary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { timestampToTime } from "@/assets/js/time.js";
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { CircleListCircleApi } from "@/components/tidalManagement/tidalList/circleUrl.js";
import { postD } from "@/api";
import { ActivityReleaseApi } from "./ReleaseActivitiesUrl.js";
export default {
  inject: ["listActivityMFValue"],
  data() {
    return {
      ordinaryShow: false,
      ruleForm: {
        category: "1",
        title: "",
        start_time: "",
        end_time: "",
        style: "",
        content: "",
        rule: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        poster: "",
        thumb: "",
        circle_id: "",
      },
      start_time: "",
      end_time: "",
      styleOptions: [
        {
          value: "1",
          label: "同城可见",
        },
        {
          value: "2",
          label: "全国可见",
        },
      ],
      fileType: "images",
      imageUrl: "",
      imageUrls: "",
      listCircleOptions: [],
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        start_time: [
          {
            required: true,
            message: "请输入开始时间",
            tirgger: "blur",
          },
        ],
        end_time: [
          {
            required: true,
            message: "请输入结束时间",
            tirgger: "blur",
          },
        ],
        rule: [
          {
            required: true,
            message: "请输入活动规则",
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
        poster: [
          {
            required: true,
            message: "请输入海报",
            tirgger: "blur",
          },
        ],
        style: [
          {
            required: true,
            message: "请输入发布对象",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.CircleListId();
  },
  methods: {
    CircleListId() {
      postD(CircleListCircleApi()).then((res) => {
        this.listCircleOptions = res.list;
      });
    },
    ordinaryClick() {
      this.ordinaryShow = true;
    },
    getTime(date) {
      this.start_time = date;
      this.ruleForm.start_time = timestampToTime(this.start_time / 1000);
    },
    gitTime(date) {
      this.end_time = date;
      this.ruleForm.end_time = timestampToTime(this.end_time / 1000);
    },
    // 奖励
    addInputHandle() {
      let b = [];
      for (var a in this.ruleForm.prize) {
        b.push(this.ruleForm.prize[a]);
      }

      if (
        this.ruleForm.prize[a].name !== "" &&
        a < 4 &&
        this.ruleForm.prize[a].amount !== "" &&
        a < 4 &&
        this.ruleForm.prize[a].item !== "" &&
        a < 4
      ) {
        this.ruleForm.prize.push({ name: "", amount: "", item: "" });
      }
    },
    delInputHandle(index) {
      this.ruleForm.prize.splice(index, 1);
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.thumb = res.url;
    },
    handleAvatarSuccessline2(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.ruleForm.poster = res.url;
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    beforeAvatarUploadline2(file) {
      return beforeAvatar(file);
    },
    addOrdinary() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        if (this.ruleForm.circle_id == "") {
          this.$delete(this.ruleForm, "circle_id");
        }
        postD(ActivityReleaseApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("活动创建成功");
            this.listActivityMFValue();
            this.ordinaryShow = false;
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
      });
    },
  },
};
</script>


<style lang="less" scoped>
.General-activities {
  cursor: pointer;
  width: 460px;
  height: 180px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  display: flex;
  .GeneralImg {
    width: 100px;
    height: 100px;
    background: linear-gradient(180deg, #0c032e 0%, #5b5471 100%);
    border-radius: 50%;
    line-height: 125px;
    margin: 40px;
  }
  ul {
    padding: 40px;
    text-align: left;
    li:nth-child(1) {
      font-size: 28px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    li:nth-child(2) {
      width: 120px;
      height: 17px;
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-top: 5px;
    }
    li:nth-child(3) {
      width: 80px;
      height: 24px;
      background: #ffdc00;
      border-radius: 15px 15px 15px 15px;
      text-align: center;
      margin-top: 10px;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }
}
/deep/.el-dialog {
  background-color: #f5f5f5;
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-select {
  width: 100%;
}
.line2 {
  padding: 20px;
  background-color: white;
  border-radius: 6px 6px 6px 6px;
}
.line2Value {
  padding: 20px;
  background-color: white;
  border-radius: 6px 6px 6px 6px;
  display: flex;
}
.prizesS {
  display: flex;
  div {
    margin-left: 27px;
  }
}
.addInput {
  cursor: pointer;
  width: 80px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 3px 3px 3px 3px;
  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 0px;
  }
}
.delInput {
  cursor: pointer;
  width: 80px;
  height: 40px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #0c032e;
  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0px;
  }
}
.posterRight {
  margin-left: auto;
}
.avatar-uploader-icon {
  width: 280px;
  height: 280px;
  background: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
  line-height: 280px;
}
.avatar-uploader-icons {
  width: 594px;
  height: 280px;
  background: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
  line-height: 280px;
}
</style>