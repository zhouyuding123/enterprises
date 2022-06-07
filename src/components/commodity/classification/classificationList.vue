<template>
  <div class="FlagBody">
    <div class="operationBody">
      <div class="imputButton">
        <el-input placeholder="请输入内容"></el-input>
        <div class="imputButtonAnNiu">
          <span>搜索</span>
        </div>
      </div>
      <div class="plsj">
        <span>批量删除</span>
      </div>
      <div class="plsj">
        <span>批量解散</span>
      </div>
      <div class="plsj">
        <span>添加分类</span>
      </div>
      <div class="Res">
        <span>刷新</span>
      </div>
    </div>
    <div class="table_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange" 
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column label="分类名称" align="center" prop="title">
        </el-table-column>
        <el-table-column label="商品数量" align="center"> </el-table-column>
        <el-table-column label="操作" align="center"> </el-table-column>
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
import { custypeGetListApi } from "../classificationUrl.js";
export default {
  data() {
    return {
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      imagesValue: "",
      allAlign: null,
      tableData: [],
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      DelsValues: {
        id: "",
      },
    };
  },
  created() {
    this.custypeList();
  },
  methods: {
    custypeList() {
      postD(custypeGetListApi()).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(custypeGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./classificationList.less");
</style>