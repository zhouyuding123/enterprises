<template>
  <div class="FlagBody">
    <div class="operationBody">
      <div class="imputButton">
        <el-input placeholder="请输入内容"></el-input>
        <div class="imputButtonAnNiu">
          <span>搜索</span>
        </div>
      </div>
      <div class="plsj" @click="alldelValue">
        <span>批量删除</span>
      </div>
      <div class="plsj">
        <addbranch />
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
        <el-table-column label="分类描述" align="center"  prop="description"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scoped">
            <div class="optionsStyle">
              <edit class="spanstyle" :editThis="scoped.row" />
              <del-one class="spanstyle" :delThis="scoped.row" />
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
</template>

<script>
import { postD } from "@/api";
import { custypeGetListApi,custypeSelectDelApi } from "../classificationUrl.js";
import edit from "./options/edit.vue";
import delOne from "./options/delOne.vue";
import Addbranch from './options/addbranch.vue';
export default {
  components:{edit,delOne, Addbranch},
  provide() {
    return {
      custypeList: this.custypeList,
    };
  },
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
      allDel:{
        id:""
      }
    };
  },
  created() {
    this.custypeList();
  },
  methods: {
    custypeList() {
      postD(custypeGetListApi()).then((res) => {
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
    async alldelValue() {
      const alldelValues = await this.$confirm(
        "此操作将批量删除分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(err => err);
      if (alldelValues !== "confirm") {
        return this.$message.info("取消操作");
      }
      if (alldelValues == "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.allDel.id = this.ids.toString()
        postD(custypeSelectDelApi(),this.allDel).then(res=> {
           if (res.code == "200") {
              this.$message.success("已成功删除");
              this.custypeList();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
        })
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./classificationList.less");
</style>