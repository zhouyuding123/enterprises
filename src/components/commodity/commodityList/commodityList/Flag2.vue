<template>
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
        <div class="filterValueline2">
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
        </div>
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
        <el-input placeholder="请输入内容" v-model="seatch.keyword"></el-input>
        <div class="imputButtonAnNiu" @click="keywordValue">
          <span>搜索</span>
        </div>
      </div>
      <div class="plsj" @click="reductionVAalue">
        <span>批量还原</span>
      </div>
      <div class="selectDel" @click="delsValue">
        <span>批量删除</span>
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
          <template v-slot="scoped"
            ><div>
              <preview-two class="spanstyle" :previewValue="scoped.row" />
              <reduction class="spanstyle" :reductionOne="scoped.row" />
              <dels class="spanstyle" :delValueOne="scoped.row" /></div
          ></template>
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
</template>
<script>
import { postD } from "@/api";
import {
  company_productGetListApi,
  brandGetListApi,
  company_productSelectSetDelApi,
  company_productSelectDelApi,
  custypeGetListApi 
} from "../../commodityUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import Reduction from "./recycle/reduction.vue";
import PreviewTwo from "./recycle/previewTwo.vue";
import dels from "./recycle/dels.vue";
export default {
   provide() {
    return {
      recycleBinValue: this.recycleBinValue,
    };
  },
  components: { Reduction, PreviewTwo, dels },
  data() {
    return {
      seatch: {
        keyword: "",
      },
      isRecycleBin: {
        is_del: "1",
      },
      OptionsValue: {
        brand_id: "",
      },
      options: "",
      imagesValue: "",
      allAlign: null,
      tableData: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      comDelsValues: {
        id: "",
      },
      // 批量还原
      reductionValue: {
        id: "",
        is_del: "0",
      },
      // 产品分类
      cusOptions: [],
      checkboxGroup1: {
        custom_type: "",
        is_del: "1",
      },
      checkboxGroup2: {
        is_del: "1",
      },
      // 平台
      typeOptions: [],
      PTcheckboxGroup1: {
        type:"",
        is_del: "1",
      },
      PTcheckboxGroup2: {
        is_del: "1",
      },
      // 品牌
      options: "",
      OptionsValue: {
        brand_id: "",
        is_del: "1",
      },
      OptionsValue2:{
        is_del: "1",
      }
    };
  },
  created() {
    this.recycleBinValue();
  },
  methods: {
    recycleBinValue() {
      postD(company_productGetListApi(), this.isRecycleBin).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
      postD(brandGetListApi()).then((res) => {
        this.options = res.list;
        this.page1.totalResult = res.count;
      });
      postD(custypeGetListApi()).then((res) => {
        this.cusOptions = res.list;
      });
       postD("http://weisou.chengduziyi.com/designer/product_type/getList").then(
        (res) => {
          this.typeOptions = res.list;
        }
      );
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
    selectOptions() {
      postD(company_productGetListApi(), this.OptionsValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 刷新
    Refresh() {
      this.recycleBinValue();
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(company_productGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    fulthumb(val) {
      return val.split(",")[0];
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
    fullStatus(val) {
      if (val === 0) {
        return "下架";
      } else if (val === 1) {
        return "上架";
      }
    },
    // 批量还原
    async reductionVAalue() {
      const reductionVAalues = await this.$confirm(
        "此操作将批量还原, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (reductionVAalues !== "confirm") {
        return this.$message.info("取消操作");
      }
      if (reductionVAalues === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.reductionValue.id = this.ids.toString();
        postD(company_productSelectSetDelApi(), this.reductionValue).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("已成功批量还原");
              this.recycleBinValue();
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
    async delsValue() {
      const delsValues = await this.$confirm(
        "此操作将批量删除, 是否继续?",
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
        postD(company_productSelectDelApi(), this.comDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功批量还原");
            this.recycleBinValue();
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
    PTcheckoxId(val) {
      if (val == undefined) {
        postD(company_productGetListApi(), this.PTcheckboxGroup2).then(
          (res) => {
            this.tableData = res.list;
            this.page1.totalResult = res.count;
          }
        );
      } else {
        postD(company_productGetListApi(), this.PTcheckboxGroup1).then(
          (res) => {
            this.tableData = res.list;
            this.page1.totalResult = res.count;
          }
        );
      }
    },
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
@import url("./Flag2.less");
</style>