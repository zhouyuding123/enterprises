<template>
  <div style="width: 1700px; margin: 0 auto">
    <add-busubess class="Release" />
    <div class="storeBody">
      <business-list-seatch @BusinseeSeatch="costPlannedAmountChange" />
    </div>
    <div class="storeListBody">
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
        <vxe-column width="60" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.headimage"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.headimage]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column title="门店类型" align="center">
          <template v-slot="scoped">
            <div>
              {{ filterType(scoped.row.type) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="username"
          title="用户名"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column field="nickname" title="昵称" align="center"></vxe-column>
        <vxe-column field="tel" title="电话" align="center"></vxe-column>
        <vxe-column title="门店状态开关" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="statusChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column title="认证" align="center">
          <template v-slot="scoped">
            <div
              :class="{
                green: scoped.row.auth === 2,
                yellow: scoped.row.auth == 1,
                red: scoped.row.auth === 3,
                back: scoped.row.auth === 0,
              }"
            >
              {{ filterAuth(scoped.row.auth) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="province"
          title="省"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="city"
          title="市"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="detail"
          title="详细地址"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped"
            ><business-list-del :delValue="scoped.row"
          /></template>
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
import { postD } from "../../../api";
import BusinessListSeatch from "./BusinessListSeatch/BusinessListSeatch.vue";
import {
  BusinessListBusinessApi,
  BusinessEditBusinessApi,
} from "./Businessurl.js";
import { styleModify, styleModifytwo } from "@/assets/js/modifyStyle.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import BusinessListDel from "./BusinessListSeatch/BusinessListDel.vue";
import AddBusubess from "./BusinessListSeatch/addBusubess.vue";
export default {
  provide() {
    return {
      BusinessListValue: this.BusinessListValue,
    };
  },
  components: { BusinessListSeatch, BusinessListDel, AddBusubess },
  data() {
    return {
      imagesValue: "",
      tableData: [],
      allAlign: null,
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 状态
      companystatus: {
        id: "",
        status: "",
      },
    };
  },
  created() {
    this.BusinessListValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    BusinessListValue() {
      postD(BusinessListBusinessApi()).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    filterType(val) {
      if (val == 1) {
        return "直营店";
      } else if (val == 2) {
        return "加盟店";
      } else if (val == 3) {
        return "联营店";
      }
    },
    filterAuth(val) {
      if (val == 0) {
        return "待认证";
      } else if (val == 1) {
        return "已认证";
      } else if (val == 2) {
        return "审核通过";
      } else if (val === 3) {
        return "驳回";
      }
    },
    statusChaged(data) {
      this.companystatus.id = data.id;
      this.companystatus.status = data.status;
      postD(BusinessEditBusinessApi(), this.companystatus).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
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
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(BusinessListBusinessApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Release {
  top: -160px;
  position: relative;
}
.storeBody {
  padding: 20px 30px;
}
.storeListBody {
  padding: 20px 30px;
}
.back {
  color: black;
}
</style>