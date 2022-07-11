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
        <div class="backurls">
          <div class="backurlsz">
            <div class="backurlszdj">
              定金￥<span>{{
                Math.ceil((previewspec.price * configValue.deposit_prop) / 100)
              }}</span>
            </div>
            <div class="backurlszqk">
              全款￥<span>{{ previewspec.price }}</span>
            </div>
          </div>
          <div class="backurlsy">
            <div class="backurlsysw"><span>售完为止</span></div>
            <div class="backurlsysl">
              <span
                >{{ configValue.max_count - configValue.count }}/{{
                  configValue.max_count
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="linetitle">
          <div class="linetitleys">
            <div class="linetitleystitle">
              <span>[预售]{{ previewValueList.title }}</span>
            </div>
            <div class="linetitleysfw">
              <div class="linetitleysfwval"><span>7天无理由</span></div>
              <div class="linetitleysfwval"><span>免运费</span></div>
            </div>
          </div>
          <div class="linetitlesc">
            <img
              src="@/assets/myimger/预售爱心.png"
              style="width: 36px; height: 36px"
              alt=""
            />
            <div>1.8万人收藏</div>
          </div>
        </div>
        <div class="borderline2"></div>
        <div class="brands">
          <div class="brandsimg">
            <img :src="imagesValue + previewValueList.brand_log" alt="" />
          </div>
          <div class="brandstitle">
            <div class="brandstitlebrand">
              <span>{{ previewValueList.brand }}</span>
            </div>
            <div class="brandstitlepeo">11.5万人关注</div>
          </div>
          <div class="brandsmore">
            <img src="@/assets/myimger/more.png" alt="" />
          </div>
        </div>
        <div class="borderline2"></div>
        <div class="brands" @click="gowork(previewValueList)">
          <div class="brandsimg">
            <img :src="imagesValue + previewValueList.works_thumb" alt="" />
          </div>
          <div class="brandstitle">
            <div class="brandstitlebrand">
              <span>{{ previewValueList.works_title }}</span>
            </div>
            <div class="brandstitlepeos">
              <div class="brandsimg">
                <img
                  :src="imagesValue + previewValueList.designer_headimage"
                  alt=""
                />
              </div>
              <div class="brandsname">
                {{ previewValueList.designer_nickname }}
              </div>
              <div class="brandsdj"><span>一星设计师</span></div>
            </div>
          </div>
          <div class="brandsmore">
            <img src="@/assets/myimger/more.png" alt="" />
          </div>
        </div>
        <div class="borderline2"></div>
        <div>
          <div class="detils">
            <div class="detilsz">选择</div>
            <div class="detilsy">请选择型号</div>
            <div></div>
          </div>
          <div class="detils">
            <div class="detilsz">配送</div>
            <div class="detilsy">鄞州区奥克斯大厦</div>
          </div>
          <div class="detils">
            <div class="detilsz">定位</div>
            <div class="detilsy">中国浙江省宁波市鄞州区南部商务区...</div>
          </div>
          <div class="detils">
            <div class="detilsz" style="padding-top: 10px">商家服务</div>
            <div class="detilss">七天无理由</div>
          </div>
        </div>
        <div class="asd">
          <div class="yslc">预售 流程</div>
          <div class="Timeline">
            <div class="timeaxis">
              <div v-for="(item, i) in list" :key="i">
                <div class="timeaxis-box">
                  <div
                    class="timeaxis-topText"
                    :class="{ 'bd-empty': i == list.length - 1 }"
                  >
                    <div class="text">{{ item.warnname }}</div>
                  </div>
                  <div class="circular"></div>
                  <div class="timeaxis-bootomText">
                    <div class="text">{{ item.standard }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="borderline2"></div>

        <div class="line2">
          <div class="details"><span>商品详情</span></div>
          <div class="htmlValue">
            <div>
              <p style="padding-bottom: 50px">{{ contentsText }}</p>
              <p v-for="item in contentsImgs" :key="item">
                <video
                  style="width: 550px; height: 300px"
                  controls
                  v-if="item.split('/')[0] == 'moves'"
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
  data() {
    return {
      imagesValue: "",
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
      configValue: "",
      jpgvalue: "",
      reverse: true,
      list: [
        {
          warnname: "预售开始",
          standard: "2022.02.18",
        },
        {
          warnname: "制作完成",
          standard: "2022.02.18",
        },
        {
          warnname: "到仓补款",
          standard: "2022.02.18",
        },
      ],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    thisPreview() {
      this.dialogVisible = true;
      this.PreviewId.id = this.preview.id;
      postD(match_productShowProductApi(), this.PreviewId).then((res) => {
        this.previewValueList = res.data;
        this.thumbs = JSON.parse(res.data.thumb).thumbList.split(",");
        this.jpgvalue = this.thumbs.splice(1);
        this.previewspec = res.data.spec.shift();
        var textimg = JSON.parse(res.data.content);
        this.contentsText = textimg.text;
        this.contentsImgs = textimg.imgs.split(",");
        this.contentsImgs = this.contentsImgs.filter((val) => val);
        console.log(this.contentsImgs[0].split("/")[0]);
        this.configValue = res.data.config;
      });
    },
    gowork(val) {
      console.log(val);
     this.$router.push({
        name: "worksShow",
        params: {
          works_id: val.works_id,
          id: val.accept_id,
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Preview.less");
</style>