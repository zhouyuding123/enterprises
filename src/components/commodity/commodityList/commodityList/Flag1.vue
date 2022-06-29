<template>
  <div>
    <div class="FlagBody">
      <div class="filterValue">
        <div class="filterValueline1">
          <div class="cpfl">产品分类</div>
          <el-radio-group
            v-model="checkboxGroup1.custom_type"
            fill="#5C5673"
            @change="checkoxId"
          >
            <el-radio-button border> 不限 </el-radio-button>
            <el-radio-button border :label="0"> 未分类 </el-radio-button>
            <el-radio-button
              border
              v-for="item in cusOptions"
              :label="item.id"
              :key="item.id"
              >{{ item.title }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <!-- <div class="filterValueline2">
          <div class="ptfl">平台分类</div>
          <el-radio-group
            v-model="PTcheckboxGroup1.type"
            fill="#5C5673"
            @change="PTcheckoxId"
          >
            <el-radio-button border> 不限 </el-radio-button>
            <el-radio-button
              border
              v-for="item in typeOptions"
              :label="item.id"
              :key="item.id"
              >{{ item.title }}</el-radio-button
            >
          </el-radio-group>
        </div> -->
        <div class="filterValueline3">
          <div class="ppfl">品牌分类</div>
          <el-radio-group
            v-model="OptionsValue.brand_id"
            fill="#5C5673"
            @change="selectOptions"
          >
            <el-radio-button border> 不限 </el-radio-button>
            <el-radio-button
              border
              v-for="item in options"
              :label="item.id"
              :key="item.id"
              >{{ item.title }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
      <div class="operationBody">
        <div class="imputButton">
          <el-input
            placeholder="请输入内容"
            v-model="seatch.keyword"
          ></el-input>
          <div class="imputButtonAnNiu" @click="keywordValue">
            <span>搜索</span>
          </div>
        </div>
        <add />
        <div class="selectDel" @click="delsValue">
          <span>批量回收</span>
        </div>
        <div class="plsj" @click="BatchLaunchValue">
          <span>批量上架</span>
        </div>
        <div class="plsj" @click="offBatchValue">
          <span>批量下架</span>
        </div>
        <div class="buttonxz">
          <div @click="whole()" ref="wholes">
            <span ref="allWholes">全部</span>
          </div>
          <div @click="onTheShelf()" ref="PutOn">
            <span ref="allPutOn">上架</span>
          </div>
          <div @click="underShelfx()" ref="Offtheshelf">
            <span ref="allOfftheshelf">下架</span>
          </div>
        </div>
        <div class="Res" @click="Refresh">
          <span>刷新</span>
        </div>
      </div>
      <div class="table_list">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="450"
        >
          <el-table-column type="selection" width="75" align="center">
          </el-table-column>
          <el-table-column prop="id" label="货号" width="120" align="center">
          </el-table-column>

          <el-table-column prop="thumbS" label="商品" width="480">
            <template v-slot="scoped">
              <div class="marginOp">
                <el-image
                  :src="imagesValue + fulthumb(scoped.row.thumb)"
                  alt=""
                  :preview-src-list="[imagesValue + fulthumb(scoped.row.thumb)]"
                  style="
                    width: 100px;
                    height: 100px;
                    background: #ffffff;
                    border-radius: 6px 6px 6px 6px;
                  "
                  class="thumbSStyle"
                />
                <div class="valueTitle">
                  <span>{{ scoped.row.title }}</span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="brand" label="品牌" align="center">
          </el-table-column>
          <el-table-column prop="custom_type" label="分类" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template v-slot="scoped">
              <div>{{ fullStatus(scoped.row.status) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="颜色"
            class="colorStyle"
            align="center"
          >
            <template v-slot="scoped">
              <div
                v-for="item in scoped.row.spec"
                :key="item.id"
                class="colorDiv"
              >
                <span>{{ item.color }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="尺寸"
            class="colorStyle"
            align="center"
          >
            <template v-slot="scoped">
              <div
                v-for="item in scoped.row.spec"
                :key="item.id"
                class="colorDiv"
              >
                <span>{{ item.spec }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            class="colorStyle"
            align="center"
          >
            <template v-slot="scoped">
              <div
                v-for="item in scoped.row.spec"
                :key="item.id"
                class="colorDiv"
              >
                <span>{{ item.price }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="count"
            label="库存"
            class="colorStyle"
            align="center"
          >
            <template v-slot="scoped">
              <div
                v-for="item in scoped.row.spec"
                :key="item.id"
                class="colorDiv"
              >
                <span>{{ item.count }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scoped">
              <div>
                <edit :editIdValue="scoped.row" class="spanstyle" />
                <preview :previewValue="scoped.row" class="spanstyle" />
                <put-batch :putBatch="scoped.row" class="spanstyle" />
                <off-batch :offBatcj="scoped.row" class="spanstyle" />
                <onedel :deloneDle="scoped.row" class="spanstyle" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <vxe-pager
          :current-page="page1.offset"
          :page-size="page1.limit"
          :total="page1.totalResult"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChangeActivity"
          align="center"
        ></vxe-pager>
      </div>
    </div>
  </div>
</template>

<script>
import {
  company_productGetListApi,
  company_productSelectSetDelApi,
  company_productSetStatusApi,
  brandGetListApi,
} from "../../commodityUrl.js";
import { custypeGetListApi } from "../../classificationUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import add from "./operation/add.vue";
import Onedel from "./operation/onedel.vue";
import PutBatch from "./operation/putBatch.vue";
import OffBatch from "./operation/offBatch.vue";
import Preview from "./operation/preview.vue";
import Edit from "./operation/Edit.vue";
export default {
  provide() {
    return {
      commodityValue: this.commodityValue,
    };
  },
  components: { add, Onedel, PutBatch, OffBatch, Preview, Edit },
  data() {
    return {
      imagesValue: "",
      allAlign: null,
      tableData: [],
      commodityList: {
        status: "",
        custom_type: "",
      },
      isRecycleBin: {
        is_del: "0",
      },
      ruleForm: {
        title: "",
        description: "",
      },
      ruleFormRules: {
        title: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入开始时间",
            tirgger: "blur",
          },
        ],
      },
      // 上架中
      onTheShelfValue: {
        status: "1",
        is_del: "0",
      },
      // 下架中
      underShelf: {
        status: "0",
        is_del: "0",
      },
      colors: [],
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      comDelsValues: {
        id: "",
        is_del: "1",
      },
      // 批量上架
      Put: {
        id: "",
        status: "1",
      },
      // 批量下架
      Off: {
        id: "",
        status: "0",
      },
      thumbS: [],
      thumbs: [],
      thumbValue: "",
      seatch: {
        keyword: "",
        is_del: "0",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
        is_del: "0",
      },
      // 产品分类
      cusOptions: [],
      checkboxGroup1: {
        custom_type: "",
        is_del: "0",
      },
      checkboxGroup2: {
        is_del: "0",
      },
      // 平台
      typeOptions: [],
      PTcheckboxGroup1: {
        type:"",
        is_del: "0",
      },
      PTcheckboxGroup2: {
        is_del: "0",
      },
      // 品牌
      options: "",
      OptionsValue: {
        brand_id: "",
        is_del: "0",
      },
      OptionsValue2:{
        is_del: "0",
      }
    };
  },
  created() {
    this.commodityValue();
    this.custypeGetListValue();
    this.product_typeListValue();
  },
  methods: {
    // 平台分类
    product_typeListValue() {
      postD("https://weisou.chengduziyi.com/designer/product_type/getList").then(
        (res) => {
          this.typeOptions = res.list;
        }
      );
    },
    // 产品分类
    custypeGetListValue() {
      postD(custypeGetListApi()).then((res) => {
        this.cusOptions = res.list;
      });
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    commodityValue() {
      postD(company_productGetListApi(), this.isRecycleBin).then((res) => {
        console.log(res.list[0].thumb.split(',').slice(1));
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
      postD(brandGetListApi()).then((res) => {
        this.options = res.list;
        this.page1.totalResult = res.count;
      });
    },
    keywordValue() {
      postD(company_productGetListApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 全部
    whole() {
      postD(company_productGetListApi(), this.isRecycleBin).then((res) => {
        if (res.code == "200") {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
          this.$refs.wholes.style.backgroundColor = "#FF2659";
          this.$refs.allWholes.style.color = "#ffffff";
          this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
          this.$refs.allPutOn.style.color = "#999999";
          this.$refs.Offtheshelf.style.backgroundColor = "#FFFFFF";
          this.$refs.allOfftheshelf.style.color = "#999999";
        }
      });
    },
    // 上架中
    onTheShelf() {
      postD(company_productGetListApi(), this.onTheShelfValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.$refs.PutOn.style.backgroundColor = "#FF2659";
        this.$refs.allPutOn.style.color = "#ffffff";
        this.$refs.wholes.style.backgroundColor = "#FFFFFF";
        this.$refs.allWholes.style.color = "#999999";
        this.$refs.Offtheshelf.style.backgroundColor = "#FFFFFF";
        this.$refs.allOfftheshelf.style.color = "#999999";
      });
    },
    // 下架中
    underShelfx() {
      postD(company_productGetListApi(), this.underShelf).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.$refs.Offtheshelf.style.backgroundColor = "#FF2659";
        this.$refs.allOfftheshelf.style.color = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
        this.$refs.allPutOn.style.color = "#999999";
        this.$refs.wholes.style.backgroundColor = "#FFFFFF";
        this.$refs.allWholes.style.color = "#999999";
      });
    },
    fulthumb(val) {
      return val.split(",").slice(1)[0];
    },
    searchOne(data) {
      this.custom_type = data.title;
    },
    fullStatus(val) {
      if (val === 0) {
        return "下架";
      } else if (val === 1) {
        return "上架";
      }
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
    // 批量删除
    async delsValue() {
      const delsValues = await this.$confirm(
        "此操作将放入回收站, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (delsValues !== "confirm") {
        return this.$message.info("取消操作");
      }
      if (delsValues === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.comDelsValues.id = this.ids.toString();
        postD(company_productSelectSetDelApi(), this.comDelsValues).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("已成功放入回收站");
              this.commodityValue();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          }
        );
      }
    },
    // 刷新
    Refresh() {
      this.commodityValue();
    },
    // 批量上架
    async BatchLaunchValue() {
      const BatchList = await this.$confirm(
        "此操作将批量上架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (BatchList !== "confirm") {
        return this.$message.info("取消上架");
      }
      if (BatchList === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.Put.id = this.ids.toString();
        postD(company_productSetStatusApi(), this.Put).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功上架");
            this.commodityValue();
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
      }
    },
    // 批量下架
    async offBatchValue() {
      const offBatchValueList = await this.$confirm(
        "此操作将批量下架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (offBatchValueList !== "confirm") {
        return this.$message.info("取消下架");
      }
      if (offBatchValueList === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.Off.id = this.ids.toString();
        postD(company_productSetStatusApi(), this.Off).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功下架");
            this.commodityValue();
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
      }
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(company_productGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    checkoxId(val) {
      if (val == undefined) {
        postD(company_productGetListApi(), this.checkboxGroup2).then((res) => {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
        });
      } else {
        postD(company_productGetListApi(), this.checkboxGroup1).then((res) => {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
        });
      }
    },
    // PTcheckoxId(val) {
    //   if (val == undefined) {
    //     postD(company_productGetListApi(), this.PTcheckboxGroup2).then(
    //       (res) => {
    //         this.tableData = res.list;
    //         this.page1.totalResult = res.count;
    //       }
    //     );
    //   } else {
    //     postD(company_productGetListApi(), this.PTcheckboxGroup1).then(
    //       (res) => {
    //         this.tableData = res.list;
    //         this.page1.totalResult = res.count;
    //       }
    //     );
    //   }
    // },
    selectOptions() {
      postD(company_productGetListApi(), this.OptionsValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Flag1.less");
</style>