<template>
  <div class="FlagBody">
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
      <div class="plsj">
        <span>批量上架</span>
      </div>
      <div class="plsj">
        <span>批量下架</span>
      </div>
      <div class="selectStyle">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="buttonxz">
        <div><span>全部</span></div>
        <div><span>上架</span></div>
        <div><span>下架</span></div>
      </div>
      <div class="Res">
        <span>刷新</span>
      </div>
    </div>
    <div class="table_list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="货号" width="120" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="250">
          <template v-slot="">
            <div class="marginOp">
              <el-image
                :src="imagesValue + thumbS"
                alt=""
                :preview-src-list="[imagesValue + thumbS]"
                style="
                  width: 100px;
                  height: 100px;
                  background: #ffffff;
                  border-radius: 6px 6px 6px 6px;
                "
                class="thumbSStyle"
              />
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
          <div>
            <div class="spanstyle"><span>编辑</span></div>
            <div class="spanstyle"><span>预览</span></div>
            <div class="spanstyle"><span>上架</span></div>
            <div class="spanstyle"><span>下架</span></div>
            <div class="spanstyle"><span>删除</span></div>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { company_productGetListApi } from "../../commodityUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import add from "./operation/add.vue";
export default {
  provide() {
    return {
      commodityValue: this.commodityValue,
    };
  },
  components: { add },
  data() {
    return {
      imagesValue: "",
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
      thumbS: [],
      colors: [],
    };
  },
  created() {
    this.commodityValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    commodityValue() {
      postD(company_productGetListApi()).then((res) => {
        this.tableData = res.list;
        res.list.forEach((v) => {
          let aser = JSON.parse(v.thumb);
          this.thumbS = aser.shift();
        });
        this.imagesValue = imgUrl();
      });
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
.marginOp {
  width: 400px;
  height: 140px;
  background: #f5f5f5;
  border-radius: 3px 3px 3px 3px;
  .thumbSStyle {
    margin-top: 5%;
    margin-left: 5%;
  }
}
.colorStyle {
  display: flex;
  justify-content: center;
  padding: -20px;
  margin: -20px;
}
/deep/.cell {
  padding: 0;
}
/deep/.el-table__cell {
  padding: 0;
}
.colorDiv {
  text-align: center;
  width: 100%;
  border: 1px solid #dfdfdf;
  span {
    line-height: 70px;
  }
}
/deep/.el-table th.el-table__cell > .cell {
  padding: 12px 0;
}
.spanstyle {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #0177d5;
  margin-top: 10px;
}
.plsj {
  cursor: pointer;
  margin-left: 10px;
  width: 80px;
  height: 40px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #0c032e;
  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }
}
.selectStyle {
  margin-left: 100px;
}
.buttonxz {
  display: flex;
  margin-left: 10px;
  div:nth-child(1) {
    cursor: pointer;
    width: 90px;
    height: 40px;
    background: #ff2659;
    border-radius: 4px 0px 0px 4px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
  }
  div:nth-child(2) {
    cursor: pointer;
    width: 90px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
  div:nth-child(3) {
    cursor: pointer;
    width: 90px;
    height: 40px;
    background: #ffffff;
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #dfdfdf;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
}
</style>