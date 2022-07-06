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
            </div>
            <div class="line1two">
              <span>{{ previewValueList.title }}</span>
            </div>
            <div class="line1treen">
              <div><img src="@/assets/myimger/拇指.png" alt=""></div>
              <div><span>最近有39人收藏过此服务</span></div>
              <div><span>1547条评论 ></span></div>
            </div>
            <div class="line1four">
              <div class="line1fourValue">
                <div>
                  <span>
                    服务
                  </span>
                </div>
                <div>
                 <span
                    >免配送费丨损坏包赔</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="borderline2"></div>
        <div class="lein3">
          <div class="details"><span>服务内容</span></div>
          <div class="detailss">改衣件数<span>2件</span></div>
          <div class="detailss">衣物种类<span>支持所有衣服裤子类型</span></div>
          <div class="detailss">衣物材质<span>全材料可改衣</span></div>
          <div class="detailss">改衣时效<span>5-8天</span></div>
          <div class="detailss">补价说明<span>奢侈品/羊绒类/真丝类改衣需额外沟通</span></div>
          <div class="detailss">更多说明<span>由于疫情原因快递运输可能会有延期</span></div>
        </div>
        <div class="borderline2"></div>
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
        <div class="borderline2"></div>
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
import { company_productShowProductApi } from "../../../commodityUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["previewValue"],
  inject: ["commodityValue"],
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
  },
  methods: {
    thisPreview() {
      this.dialogVisible = true;
      this.PreviewId.id = this.previewValue.id;
      postD(company_productShowProductApi(), this.PreviewId).then((res) => {
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
@import url("./Preview.less");
</style>
