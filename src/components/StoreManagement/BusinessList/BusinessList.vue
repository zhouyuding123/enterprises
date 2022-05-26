<template>
  <div>
    <add-busubess class="Release" />
    <div class="storeBody">
      <business-list-seatch />
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
        <vxe-column
          field="username"
          title="用户名"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="昵称"
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column field="tel" title="电话" align="center"></vxe-column>
        <vxe-column title="操作" align="center">
          <business-list-del />
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api";
import BusinessListSeatch from "./BusinessListSeatch/BusinessListSeatch.vue";
import { BusinessListBusinessApi } from "./Businessurl.js";
import { styleModify, styleModifytwo } from "@/assets/js/modifyStyle.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import BusinessListDel from "./BusinessListSeatch/BusinessListDel.vue";
import AddBusubess from "./BusinessListSeatch/addBusubess.vue";
export default {
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
        this.imagesValue = imgUrl();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Release {
  top: 0;
}
.storeBody {
  padding: 20px 30px;
}
.storeListBody {
  padding: 20px 30px;
}
</style>