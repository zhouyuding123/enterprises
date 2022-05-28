<template>
  <div>
    <div class="brandBody">
      <div class="brandadd" @click="addBrand">
        <span>添加</span>
      </div>
      <div class="brandRf" @click="brandRerresh">
        <span><i class="el-icon-refresh-right"></i>刷新</span>
      </div>
    </div>
    <div class="brandTable">
      <vxe-table
        round
        border="true"
        ref="xTable1"
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column width="150" align="center" title="品牌LOGO">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.thumb"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.thumb]"
              style="width: 100px; height: 100px"
              class=""
            />
          </template>
        </vxe-column>
        <vxe-column field="title" title="名牌名称" align="center"></vxe-column>
        <vxe-column
          field="category"
          title="审核状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div
              :class="{
                green: scoped.row.status === 1,
                yellow: scoped.row.status == 3,
                blue: scoped.row.status === 2,
              }"
            >
              {{ filterStatus(scoped.row.status) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="operation">
              <detail-brand class="operationDetail" :OperationDetail="scoped.row" />
              <del-op :OperationDel="scoped.row" />
              <edit-op :OperationEdit="scoped.row" />
            </div>
          </template>
        </vxe-column>
      </vxe-table>
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
import { styleModify, styleModifytwo, imgUrl } from "@/assets/js/modifyStyle";
import { brandGetListApi } from "./brandUrl.js";
import delOp from "./operation/delOp.vue";
import DetailBrand from './operation/detailBrand.vue';
import EditOp from './operation/editOp.vue';
export default {
  components: { delOp, DetailBrand, EditOp },
  provide() {
    return {
      brandListValue: this.brandListValue,
    };
  },
  data() {
    return {
      tableData: [],
      allAlign: null,
      imagesValue: "",
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.brandListValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    // 品牌列表
    brandListValue() {
      postD(brandGetListApi()).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    brandRerresh() {
      this.brandListValue();
    },
    filterStatus(val) {
      if (val == 0) {
        return "待审核";
      } else if (val == 1) {
        return "审核通过";
      } else if (val == 2) {
        return "驳回";
      }
    },
    addBrand() {
      this.$router.push("/brand/addOp");
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(brandGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.brandBody {
  padding: 20px 30px;
  display: flex;
  .brandadd {
    cursor: pointer;
    width: 80px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    opacity: 1;
    border: 1px solid #0c032e;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
  .brandRf {
    cursor: pointer;
    margin-left: auto;
    width: 80px;
    height: 40px;
    background: #00b567;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
  }
}
.brandTable {
  padding: 0px 30px;
}

/deep/.vxe-cell {
  display: inline-block;
  vertical-align: middle;
}
.operation {
  display: flex;
  line-height: 10px;
 
}
.operationDetail {
  margin-right: 50px;
}
</style>