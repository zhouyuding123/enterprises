<template>
  <div>
    <div style="padding: 20px 180px">
      <div class="releaseBody">
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRulesRef"
          class="demo-ruleForm"
        >
          <div class="line1">
            <img src="../../../../assets/imgers/发布.png" alt="" />
            <el-select
              v-model="value"
              placeholder="请选择"
              clearable
              filterable
              @blur="selectBlur"
              @clear="selectClear"
              @change="selectChange"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.title"
              />
            </el-select>
          </div>
          <div class="line2">
            <el-form-item class="line2Top" prop="title">
              <el-input
                v-model="addForm.title"
                placeholder="请输入你的标题"
              ></el-input>
            </el-form-item>
          </div>
          <div class="line3">
            <div class="line3Top">
              <span>正文内容</span>
              <div class="lineRight">
                <i class="el-icon-picture-outline" @click="addPhoto"></i>
                <i class="el-icon-video-camera" @click="addVideo"></i>
                <i class="el-icon-s-data" @click="addVoto"></i>
              </div>
            </div>
          </div>
          <div class="line4">
            <el-form-item class="line4Top" prop="description">
              <el-input
                type="textarea"
                placeholder="发表内容…"
                v-model="addForm.description"
              >
              </el-input>
              <div class="line4vote" v-if="addForm.is_voto == 1">
                <div class="line4body">
                  <div class="VotingIcon"><i class="el-icon-s-data"></i></div>
                  <div class="VotingTitle">
                    <span>选哪个</span>
                  </div>
                  <div class="VotingErr" @click="errorIcon">
                    <i class="el-icon-error"></i>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>

        <div class="footer">
          <div class="PostAPost" @click="PostAPostUp">
            <span>发表帖子</span>
          </div>
          <div class="Unpublish" @click="Unpublishup">
            <span>取消发布</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="插入图片" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="avatar-uploader"
        action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="{ fileType: this.fileType }"
        multiple
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传视频" :visible.sync="UploadVideoShow" width="30%">
      <ele-upload-video
        :data="{
          token: this.token,
          fileType: this.fileTypes,
        }"
        :file-size="20"
        :response-fn="handleResponse"
        @error="handleUploadError"
        style="margin: 50px"
        action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
        v-model="video"
      ></ele-upload-video>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UploadVideoShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="投票" :visible.sync="UploadVotoShow" width="40%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="是否投票活动:" prop="is_voto">
          <el-radio-group v-model="addForm.is_voto">
            <el-radio label="1">投票</el-radio>
            <el-radio label="0">不投票</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="addForm.is_voto == 1">
          <el-form-item label="选择项:" prop="is_img" class="is_imgStyle">
            <el-radio-group v-model="is_img">
              <el-radio label="0" @change="yesIsimgwz" class="wz"
                >文字</el-radio
              >
              <el-radio label="1" @change="yesIsimgtp" class="tp"
                >图片</el-radio
              >
            </el-radio-group>
            <div v-if="is_img != ''">
              <div v-for="(item, index) in addForm.item" :key="index">
                <div v-if="is_img == 0" class="yesNoItem">
                  <p :v-model="(item.is_img = '0')"></p>
                  <el-input v-model="item.item"></el-input>
                  <p class="addInput" @click="addvoto(index)" v-if="index == 0">
                    <span>添加</span>
                  </p>
                  <p class="addInput" v-else @click="delvoto(index)">
                    <span>删除</span>
                  </p>
                </div>
                <div v-if="is_img == 1" class="yesIsimg">
                  <div>
                    <p :v-model="(item.is_img = '1')"></p>
                    <el-upload
                      class="avatar-uploader"
                      action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccessvoto"
                      :before-upload="beforeAvatarUpload"
                      :data="{ fileType: fileType }"
                    >
                      <img
                        v-if="item.item"
                        :src="imagesValue + item.item"
                        class="avatar"
                        :v-model="item.item"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p class="addInput" @click="addvoto" v-if="index == 0">
                      <span>添加</span>
                    </p>
                    <p class="addInput" v-else @click="delvoto(index)">
                      <span>删除</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="选择方式" class="methodStyle">
            <el-select v-model="addForm.method" placeholder="请选项">
              <el-option
                v-for="item in methodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投票时间" class="methodStyle">
            <el-date-picker
              v-model="voto_start_time"
              type="datetime"
              placeholder="选择开始时间"
              @change="gatTime"
            >
            </el-date-picker>
            <el-date-picker
              v-model="voto_end_time"
              type="datetime"
              placeholder="选择结束时间"
              @change="gutTime"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UploadVotoShowser">取 消</el-button>
        <el-button type="primary" @click="UploadVotoShowyes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { beforeAvatar } from "../../../../assets/js/modifyStyle.js";
import EleUploadVideo from "vue-ele-upload-video";
import { timestampToTime } from "../../../../assets/js/time.js";
import { imgUrl } from "../../../../assets/js/modifyStyle.js";
import { ForumReleaseApi, Forum_themeGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api/index.js";
export default {
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      line1input: "",
      paramsId: {
        id: "",
      },
      dialogVisible: false,
      //   图片
      imagesValue: "",
      imageUrl: "",
      fileType: "images",
      fileTypes: "moves",
      //   视频
      UploadVideoShow: false,
      thumbs: [],
      addForm: {
        style: "2",
        details: "",
        content: "",
        description: "",
        theme: "",
        title: "",
        thumb: "",
        voto_start_time: "",
        voto_end_time: "",
        method: "",
        is_voto: 0,
        lat: "",
        lng: "",
        city: "",
        item: [
          {
            item: "",
            is_img: "",
          },
        ],
      },
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入內容",
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
        category: [
          {
            required: true,
            message: "请输入活动类型",
            tirgger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入活动内容",
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
        is_voto: [
          {
            required: true,
            message: "请输入是否投票",
            tirgger: "blur",
          },
        ],
      },
      is_img: "",
      inputItem: "",
      voto_start_time: "",
      voto_end_time: "",
      imageUrlvoto: "",
      // 验证
      token: "",
      video: "",
      // 投票
      UploadVotoShow: false,
      methodOptions: [
        {
          value: "1",
          label: "单选",
        },
        {
          value: "2",
          label: "最多选两项",
        },
        {
          value: "3",
          label: "最多选三项",
        },
        {
          value: "4",
          label: "最多选四项",
        },
        {
          value: "5",
          label: "最多选五项",
        },
      ],
      // 输入选择框
      value: "",
      options: "",
      optionsId: {
        id: "",
      },
    };
  },
  created() {
    this.paramsId.id = this.$route.params.id;
    this.token = localStorage.getItem("token", this.token);
    this.imgUrltitle();
  },
  methods: {
    // 输入选择
    selectBlur(e) {
      // 意见类型
      if (e.target.value !== "") {
        this.value = e.target.value;
        this.$forceUpdate(); // 强制更新
      }
    },
    selectClear() {
      this.value = "";
      this.$forceUpdate();
    },
    selectChange(val) {
      this.value = val;
      this.$forceUpdate();
    },
    imgUrltitle() {
      this.imagesValue = imgUrl();
      postD(Forum_themeGetListApi()).then((res) => {
        this.options = res.list;
      });
    },
    Unpublishup() {
      this.$router.push("/Circles/Stroll");
    },
    PostAPostUp() {
      this.addForm.theme = this.value;
      this.$refs.addFormRulesRef.validate((valid) => {
        if (!valid) return;
        this.addForm.thumb = this.thumbs.toString();
        console.log(this.addForm);
        postD(ForumReleaseApi(), this.addForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.$router.push("/Circles/Stroll");
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
    // 上传图片
    addPhoto() {
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.thumbs.push(res.url);
      this.dialogVisible = false;
    },
    beforeAvatarUpload(file) {
      return beforeAvatar(file);
    },
    // 上传视频
    addVideo() {
      this.UploadVideoShow = true;
    },
    handleUploadError(error) {
      this.$notify.error({
        title: "上传提示",
        message: "测试环境无法上传文件",
      });
      console.log("error", error);
    },
    handleResponse(res, file) {
      this.addForm.video = res.url;
      return URL.createObjectURL(file.raw);
    },
    addVoto() {
      this.UploadVotoShow = true;
    },
    addvoto() {
      let b = [];
      for (var a in this.addForm.item) {
        b.push(this.addForm.item[a]);
      }
      if (this.addForm.item[a].item !== "" && a < 4) {
        this.addForm.item.push({ item: "", is_img: "" });
      }
    },
    delvoto(index) {
      this.addForm.item.splice(index, 1);
    },
    gatTime(date) {
      this.voto_start_time = date;
      this.addForm.voto_start_time = timestampToTime(
        this.voto_start_time / 1000
      );
    },
    gutTime(date) {
      this.voto_end_time = date;
      this.addForm.voto_end_time = timestampToTime(this.voto_end_time / 1000);
    },
    handleAvatarSuccessvoto(res, file) {
      this.imageUrlvoto = URL.createObjectURL(file.raw);
      let b = [];
      for (var a in this.addForm.item) {
        b.push(this.addForm.item[a]);
      }
      this.addForm.item[a].item = res.url;
    },
    yesIsimgwz() {
      var tp = document.querySelector(".tp");
      tp.style.display = "none";
    },
    yesIsimgtp() {
      var wz = document.querySelector(".wz");
      wz.style.display = "none";
    },
    UploadVotoShowser() {
      this.UploadVotoShow = false;
      this.addForm.is_voto = "";
      this.addForm.method = "";
      this.addForm.voto_start_time = "";
      this.addForm.voto_end_time = "";
      this.voto_end_time = "";
      this.voto_start_time = "";
      this.is_img = "";
      this.addForm.item = [{ item: "", is_img: "" }];
    },
    UploadVotoShowyes() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        this.UploadVotoShow = false;
      });
    },
    errorIcon() {
      this.addForm.is_voto = "";
    },
  },
};
</script>
<style lang="less" scoped>
.releaseBody {
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
}
.line1 {
  padding: 30px 60px 15px;
  text-align: left;
  display: flex;
  img {
    width: 20px;
    height: 20px;
    margin-top: 10px;
  }
  /deep/.el-input__inner {
    border: none;
  }
}
.line2 {
  padding: 0px 60px;
  .line2Top {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: solid 1px #d9d9d9;
    /deep/.el-input__inner {
      border: none;
      font-size: 20px;
    }
  }
}
.line3 {
  padding: 0px 60px;
  .line3Top {
    padding-top: 20px;
    border-top: solid 1px #d9d9d9;
    display: flex;
    span {
      padding-left: 15px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .lineRight {
      width: 238px;
      flex: 1;
      margin-left: auto;
      text-align: right;
      i {
        cursor: pointer;
        padding-right: 40px;
      }
    }
  }
}
.line4 {
  padding: 30px 60px 15px;
  .line4Top {
    padding-top: 20px;
    border-top: solid 1px #d9d9d9;
    /deep/.el-textarea__inner {
      border: none;
    }
  }
}
.footer {
  bottom: 0px;
  padding: 5px 0;
  border-top: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  .PostAPost {
    width: 120px;
    height: 40px;
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 3px 3px 3px 3px;
    margin-right: 20px;
    line-height: 40px;
    cursor: pointer;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 0px;
    }
  }
  .Unpublish {
    width: 120px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #0c032e;
    line-height: 40px;
    cursor: pointer;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 0px;
    }
  }
}
.is_imgStyle {
  text-align: left;
}
.it_votoStyle {
  width: 100%;
}
/deep/.el-form-item {
  width: 100%;
  .itemIsimg {
    width: 100%;
  }
}
.yesNoItem {
  display: flex;
}
.methodStyle {
  text-align: right;
  border-top: 1px solid #d9d9d9;
  padding-top: 20px;
}
.yesIsimg {
  float: left;
  margin-left: 5px;
  div {
    text-align: center;
  }
}
.line4vote {
  padding: 30px 40px;
  .line4body {
    height: 80px;
    background: #f5f5f5;
    border-radius: 6px 6px 6px 6px;
    display: flex;
    position: relative;
    .VotingIcon {
      margin: 32px 10px 29px 39px;
    }
    .VotingTitle {
      line-height: 80px;
    }
    .VotingErr {
      position: absolute;
      top: -5px;
      right: 0;
    }
  }
}
</style>