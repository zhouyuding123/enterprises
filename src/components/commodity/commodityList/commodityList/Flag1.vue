<template>
  <div class="FlagBody">
    <div class="line">
      <div>
        <div class="categoryer">类别</div>
        <div class="lineValues">
          <div v-for="(item, index) in custypeListValue" :key="index">
            <span @click="searchOne(item)">{{ item.title }}&nbsp;|</span>
          </div>
        </div>
      </div>
      <div class="Category" @click="category">
        <span>类目管理</span>
      </div>
    </div>
    <div class="operationBody">
      <div class="imputButton">
        <el-input placeholder="请输入内容"></el-input>
        <div class="imputButtonAnNiu">
          <span>搜索</span>
        </div>
      </div>
      <add />
      <div class="selectDel">
        <span>批量删除</span>
      </div>
      <div class="Res">
        <span>刷新</span>
      </div>
    </div>
    <div class="table_list">
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
      </vxe-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="ruleForm"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="110px"
        hide-required-asterisk
      >
        <el-form-item label="自定义类型" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="custypeAdd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  company_productGetListApi,
  custypeAddApi,
  custypeGetListApi,
} from "../../commodityUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import add from "./operation/add.vue";
export default {
  components: { add },
  data() {
    return {
      imagesValue: "",
      dialogVisible: false,
      allAlign: null,
      tableData: [],
      commodityList: {
        status: "",
        custom_type: "",
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
      custypeListValue: [],
    };
  },
  created() {
    this.commodityValue();
    this.custypeList();
  },
  methods: {
    category() {
      this.dialogVisible = true;
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    commodityValue() {
      this.commodityList.status = "1";
      postD(company_productGetListApi(), this.commodityList).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
      });
    },
    custypeList() {
      postD(custypeGetListApi()).then((res) => {
        this.custypeListValue = res.list;
      });
    },
    custypeAdd() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        postD(custypeAddApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("类别添加成功");
            this.dialogVisible = false;
            this.custypeList();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("已存在");
          }
        });
      });
    },
    searchOne(data) {
      this.custom_type = data.title;
    },
  },
};
</script>

<style lang="less" scoped>
.FlagBody {
  padding: 20px 30px;
  .line {
    height: 180px;
    background: #ffffff;
    position: relative;
    .Category {
      cursor: pointer;
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 40px;
      background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
      border-radius: 3px 3px 3px 3px;
      span {
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
}
.table_list {
  padding-top: 15px;
}
.operationBody {
  padding-top: 15px;
  display: flex;
  .imputButton {
    display: flex;
    margin-left: -5px;
    /deep/.el-input__inner {
      width: 400px;
    }
    .imputButtonAnNiu {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #dfdfdf;
      border-radius: 4px 4px 4px 4px;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
}

.selectDel {
  cursor: pointer;
  margin-left: 10px;
  width: 80px;
  height: 40px;
  background: #ff2659;
  border-radius: 4px 4px 4px 4px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
.Res {
  margin-left: auto;
  cursor: pointer;
  width: 80px;
  height: 40px;
  background: #00b567;
  border-radius: 4px 4px 4px 4px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
.lineValues {
  margin: 20px;
  display: flex;
  div {
    margin-left: 10px;
    span {
      font-size: 20px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 19px;
    }
  }
}
.categoryer {
  font-size: 20px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 19px;
}
</style>