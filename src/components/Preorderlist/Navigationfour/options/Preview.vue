<template>
  <div>
    <div class="spanstyle" @click="thisPreview"><span>预览</span></div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="750px">
      <div class="PreviewBody">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in thumbs" :key="item">
            <div v-if="item.split('/')[0] == 'moves'">
              <video style="width: 750px; height: 300px" controls>
                <source :src="imagesValue + item" type="video/mp4" />
                <source :src="imagesValue + item" type="video/ogg" />
              </video>
            </div>
            <div v-if="item.split('/')[0] == 'images'">
              <el-image
                :src="imagesValue + item"
                alt=""
                :preview-src-list="[imagesValue + item]"
                style="width: 750px; height: 300px"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="line1">
          <div class="line1Value">
            <div class="line1one">
              <div class="priceValue">¥{{ previewspec.price }}</div>
              <div class="Sold">已售123</div>
            </div>
            <div class="line1two">
              <span>{{ previewValueList.title }}</span>
            </div>
            <div class="line1treen">
              <div><span>满400减50</span></div>
              <div><span>满200减20</span></div>
            </div>
            <div class="line1four">
              <div class="line1fourValue">
                <div>
                  <img src="@/assets/imgers/正品.png" alt="" /><span>
                    100%正品
                  </span>
                </div>
                <div>
                  <img src="@/assets/imgers/七天.png" alt="" /><span
                    >7天无理由退换</span
                  >
                </div>
                <div>
                  <img src="@/assets/imgers/包邮.png" alt="" /><span>包邮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line2">
          <div class="details"><span>商品详情</span></div>
          <div class="htmlValue">
            <div>
              <p style="padding-bottom:50px">{{ contentsText }}</p>
              <p v-for="item in contentsImgs" :key="item">
                <video
                  style="width: 550px; height: 300px"
                  controls
                  v-if="item.split('/')[0] == 'video'"
                >
                  <source :src="imagesValue + item" type="video/mp4" />
                  <source :src="imagesValue + item" type="video/ogg" />
                </video>
                <img
                  v-if="item.split('/')[0] == 'images'"
                  :src="imagesValue + item"
                  alt=""
                  :preview-src-list="[imagesValue + item]"
                  style="width: 550px; height: 300px"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { match_productShowProductApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["preview"],
  inject: ["PreOrder"],
  data() {
    return {
      dialogVisible: false,
      PreviewId: {
        id: "",
      },
      previewValueList: [],
      thumbs: [],
      videos: "",
      contentsText: "",
      contentsImgs: "",
      previewspec: [],
    };
  },
  created() {
    this.imagesValue = imgUrl();
    console.log(this.preview);
  },
  methods: {
    thisPreview() {
      this.dialogVisible = true;
      this.PreviewId.id = this.preview.id;
      postD(match_productShowProductApi(), this.PreviewId).then((res) => {
        this.previewValueList = res.data;
        this.thumbs = JSON.parse(res.data.thumb).thumbList.split(",");
        this.previewspec = res.data.spec[0];
        var textimg = JSON.parse(res.data.content);
        this.contentsText = textimg.text;
        this.contentsImgs = textimg.imgs.split(",");
        this.contentsImgs = this.contentsImgs.filter((val) => val);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("@/components/commodity/commodityList/commodityList/operation/Preview.less");
</style>