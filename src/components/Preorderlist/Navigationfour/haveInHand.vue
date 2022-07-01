<template>
  <div>
    <div class="FlagBody">
      <div class="filterValue">
        <div class="filterValueline1">
          <div class="cpfl">店铺分类</div>
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
          <el-input
            placeholder="请输入内容"
            v-model="seatch.keyword"
          ></el-input>
          <div class="imputButtonAnNiu" @click="keywordValue">
            <span>搜索</span>
          </div>
        </div>
        <div class="selectDel">
          <span>批量回收</span>
        </div>
        <div class="plsj">
          <span>批量上架</span>
        </div>
        <div class="plsj">
          <span>批量下架</span>
        </div>
        <div class="buttonxz">
          <div ref="wholes">
            <span ref="allWholes">全部</span>
          </div>
          <div ref="PutOn">
            <span ref="allPutOn">上架</span>
          </div>
          <div ref="Offtheshelf">
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
        >
          <el-table-column type="selection" width="60" align="center">
          </el-table-column>
          <el-table-column prop="id" label="货号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="thumbS" label="商品" width="480" align="center">
            <template v-slot="scoped">
              <div class="marginOp">
                <el-image
                  :src="imagesValue + fulthumb(scoped.row.thumb)"
                  :preview-src-list="[imagesValue + fulthumb(scoped.row.thumb)]"
                  alt=""
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
          <el-table-column label="零售价" width="60" align="center">
              <template v-slot="scoped">
                  <div>
                      {{fullSpec(scoped.row.spec)}}
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
  custypeGetListApi,
  match_productGetListMyApi,
  brandGetListApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from '@/assets/js/modifyStyle';
export default {
  data() {
    return {
      tableData: [],
      // 产品分类
      cusOptions: [],
      checkboxGroup1: {
        custom_type: "",
        condition: "0",
      },
      checkboxGroup2: {
        condition: "0",
      },
      // 品牌
      options: [],
      OptionsValue: {
        brand_id: "",
        condition: "0",
      },
      OptionsValue2: {
        condition: "0",
      },
      // 平台
      typeOptions: [],
      PTcheckboxGroup1: {
        type: "",
        condition: "0",
      },
      PTcheckboxGroup2: {
        condition: "0",
      },
      seatch: {
        keyword: "",
        condition: "0",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
        condition: "0",
      },
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      comDelsValues: {
        id: "",
        condition: "1",
      },
    };
  },
  created() {
    this.custypeGetListValue();
    this.product_typeListValue();
    this.product_typeListValues();
    this.PreOrder();
    this.imagesValue = imgUrl()
  },
  methods: {
    PreOrder() {
      postD(match_productGetListMyApi()).then((res) => {
        this.tableData = res.list;
      });
    },
    // 产品分类
    custypeGetListValue() {
      postD(custypeGetListApi()).then((res) => {
        this.cusOptions = res.list;
      });
    },
    // 平台分类
    product_typeListValues() {
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        this.typeOptions = res.list;
      });
    },
    // 分类
    product_typeListValue() {
      postD(brandGetListApi()).then((res) => {
        this.options = res.list;
        this.page1.totalResult = res.count;
      });
    },
    checkoxId(val) {
      if (val == undefined) {
        postD(match_productGetListMyApi(), this.checkboxGroup2).then((res) => {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
        });
      } else {
        postD(match_productGetListMyApi(), this.checkboxGroup1).then((res) => {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
        });
      }
    },
    PTcheckoxId(val) {
      if (val == undefined) {
        postD(match_productGetListMyApi(), this.PTcheckboxGroup2).then(
          (res) => {
            this.tableData = res.list;
            this.page1.totalResult = res.count;
          }
        );
      } else {
        postD(match_productGetListMyApi(), this.PTcheckboxGroup1).then(
          (res) => {
            this.tableData = res.list;
            this.page1.totalResult = res.count;
          }
        );
      }
    },
    selectOptions() {
      postD(match_productGetListMyApi(), this.OptionsValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 刷新
    Refresh() {
      this.commodityValue();
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(match_productGetListMyApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    fulthumb(val) {
      return val.split(",").slice(1)[0];
    },
    fullSpec(val) {
        let arrs = [];
        val.forEach(v=> {
            arrs.push(v)
        })
        return arrs[0].price
    },
    keywordValue() {
      postD(match_productGetListMyApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../PreorderList.less");
</style>
