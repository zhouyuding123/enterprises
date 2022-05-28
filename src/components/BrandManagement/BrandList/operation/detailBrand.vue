<template>
  <div>
    <div class="operationdel" @click="BrandDetails">
      <img src="../../../../assets/imgers/删除.png" alt="" />
      <p>详情</p>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-descriptions direction="vertical" :column="3" border>
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
      </el-descriptions>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
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
        console.log(res.data);
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
.operationdel {
  cursor: pointer;
  display: flex;
  position: relative;
  img {
    position: absolute;
  }
  p {
    margin-left: 30px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff2659;
    line-height: 19px;
  }
}
</style>