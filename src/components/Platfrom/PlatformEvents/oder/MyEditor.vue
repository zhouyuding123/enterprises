<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item prop="content" class="content">
        <div id="editor" ref="editor" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  props: ["server"],
  data() {
    return {
      baseUrl: "http://weisou.chengduziyi.com/admin/Uploads/uploadFile",
      editorContent: "",
      form: {
        content: "",
      },
      imageser: "",
      moveser: "",
    };
  },
  created() {},
  mounted() {
    this.wangeditor();
  },
  methods: {
    // 富文本配置
    wangeditor() {
      this.form.content = this.server;
      const editor = new E(this.$refs.editor);
      // 删除上传视频功能
      // editor.config.menus.splice(18, 1);
      // 删除添加表情功能
      // editor.config.menus.splice(16, 1);
      // 隐藏全屏
      editor.config.showFullScreen = false;
      // 上传图片
      editor.config.uploadImgShowBase64 = true; //如果为true，则不用配置下面的
      //-----
      editor.config.uploadImgServer = this.baseUrl; // 这是服务器端上传图片的接口路径
      // 配置 server 接口地址
      editor.config.uploadVideoServer = this.baseUrl;

      editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      editor.config.uploadImgParams = {
        fileType: "images",
      };
      editor.config.uploadVideoName = "file";
      editor.config.uploadVideoParams = {
        fileType: "moves",
      };

      editor.config.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          this.imageser =
            "https://weisoutc.oss-cn-shanghai.aliyuncs.com/" + result.url; //当前result.data.filePath为后端返回的半截路径，如果为全路径 则不用拼\
          insertImg(this.imageser);
        },
      };
      editor.config.uploadVideoHooks = {
        customInsert: function (insertVideo, result, editor) {
          this.moveser =
            "https://weisoutc.oss-cn-shanghai.aliyuncs.com/" + result.url;
          insertVideo(this.moveser);
        },
      };
      //------
      // 上传图片大小 5M文件类型  value=images||moves||3DModels
      editor.config.uploadImgMaxSize = 5 * 1024 * 1024;
      // // 隐藏插入网络图片的功能
      editor.config.showLinkImg = false;
      // // 改变内容触发回调函数
      editor.config.onchange = this.editorCallBack;
      // // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500; // 修改为 500ms
      editor.create();
      // 回显已有内容
      if (this.form.content !== "") {
        this.editorContent = this.form.content;
        editor.txt.html(this.editorContent);
      } else {
        editor.txt.html(this.editorContent);
      }
    },
    // wangeditor回调函数
    editorCallBack(newHtml) {
      this.form.content = newHtml;
      this.$emit("fwbHtml", this.form.content);
    },
  },
};
</script>

