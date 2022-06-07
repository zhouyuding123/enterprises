<template>
  <div>
    <div class="spanstyle" @click="thisPreview"><span>预览</span></div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="750px">
      <div class="PreviewBody">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in thumbs" :key="item">
            <el-image
              :src="imagesValue + item"
              alt=""
              :preview-src-list="[imagesValue + item]"
              style="width: 750px; height: 300px"
            />
          </el-carousel-item>
        </el-carousel>
        <div class="line1">
          <div class="line1Value">
            <div
              v-for="item in this.previewValueList.spec"
              :key="item.id"
              class="line1one"
            >
              <div class="priceValue">¥{{ item.price }}</div>
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
                <div><img src="@/assets/imgers/七天.png" alt="" /><span>7天无理由退换</span></div>
                <div><img src="@/assets/imgers/正品.png" alt="" /><span>包邮</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="line2">
          <div class="details"><span>商品详情</span></div>
          <div class="htmlValue">
            <div v-html="previewValueList.content" ></div>
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
import { company_productShowProductApi } from "../../../commodityUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["previewValue"],
  data() {
    return {
      dialogVisible: false,
      PreviewId: {
        id: "",
      },
      previewValueList: [],
      thumbs: [],
    };
  },
  methods: {
    thisPreview() {
      this.dialogVisible = true;
      this.PreviewId.id = this.previewValue.id;
      postD(company_productShowProductApi(), this.PreviewId).then((res) => {
        this.previewValueList = res.data;
        this.thumbs = res.data.thumb.split(',')
        this.imagesValue = imgUrl();
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./previewTwo.less");
</style>
