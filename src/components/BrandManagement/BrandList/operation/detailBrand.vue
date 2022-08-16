<template>
  <div>
    <div class="operationdel" @click="BrandDetails">
      <p>详情</p>
    </div>
    <el-dialog title="品牌详情" :visible.sync="dialogVisible" width="70%">
      <!-- <el-descriptions direction="vertical" :column="3" border>
        <el-descriptions-item label="品牌名称" align="center">{{
          BrandDetailsValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="品牌介绍" align="center">{{
          BrandDetailsValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="LOGO" align="center">
          <el-image
            :src="imagesValue + BrandDetailsValue.thumb"
            :preview-src-list="[imagesValue + BrandDetailsValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="品牌类型" align="center">{{
          BrandDetailsValue.style
        }}</el-descriptions-item>
        <el-descriptions-item label="品牌描述" align="center">{{
          BrandDetailsValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="相关资料" align="center">
          <el-image
            :src="imagesValue + BrandDetailsValue.qualification"
            :preview-src-list="[imagesValue + BrandDetailsValue.qualification]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          filterTime(BrandDetailsValue.create_time)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          filterTime(BrandDetailsValue.update_time)
        }}</el-descriptions-item>
      </el-descriptions> -->
      <div>
        <div class="line1">
          <div class="line1Img">
            <el-image
              style="
                width: 100px;
                height: 100px;
                border-radius: 6px 6px 6px 6px;
              "
              :src="imagesValue + BrandDetailsValue.thumb"
              :preview-src-list="[imagesValue + BrandDetailsValue.thumb]"
            ></el-image>
          </div>
          <div class="line1Title">
            <div class="line1TitleTitle">
              <span>{{ BrandDetailsValue.title }}</span>
            </div>
            <div class="line1TitleStyle">
              <span>品牌类型:{{ BrandDetailsValue.style }}</span>
            </div>
          </div>
        </div>
        <div class="line2">
          <div class="lineSm"><span>品牌说明</span></div>
          <div class="line2cont">
            <span>
              {{ BrandDetailsValue.content }}
            </span>
          </div>
        </div>
        <div class="line3">
          <div class="line3tiel"><span>相关资料</span></div>
          <div class="line3Img">
            <div>
              <el-image
                style="width: 280px; height: 200px; border: 1px solid #cccccc"
                :src="imagesValue + BrandDetailsValue.qualification"
                :preview-src-list="[
                  imagesValue + BrandDetailsValue.qualification,
                ]"
              ></el-image>
            </div>
            <div>
              <el-image
                style="width: 280px; height: 200px; border: 1px solid #cccccc"
                :src="imagesValue + BrandDetailsValue.thumb"
                :preview-src-list="[
                  imagesValue + BrandDetailsValue.thumb,
                ]"
              ></el-image>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { timestampToTime } from "@/assets/js/time.js";
import { postD } from "@/api/index.js";
import { brandShowApi } from "./addUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["OperationDetail"],
  data() {
    return {
      imagesValue: "",
      dialogVisible: false,
      DetailId: {
        id: "",
      },
      BrandDetailsValue: [],
    };
  },
  methods: {
    BrandDetails() {
      this.dialogVisible = true;
      this.DetailId.id = this.OperationDetail.id;
      postD(brandShowApi(), this.DetailId).then((res) => {
        this.BrandDetailsValue = res.data;
        this.imagesValue = imgUrl();
      });
    },
    filterTime(val) {
      return timestampToTime(val);
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./detil.less");
</style>