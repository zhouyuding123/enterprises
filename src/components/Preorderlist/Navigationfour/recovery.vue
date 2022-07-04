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
        <div class="selectDel" @click="delsValue">
          <span>批量还原</span>
        </div>
        <div class="plsj" @click="delsvalueser">
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
        >
          <el-table-column type="selection" width="60" align="center">
          </el-table-column>
          <el-table-column type="expand" label="更多">
            <template v-slot="scoped">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand"
                style="display: flex"
              >
                <el-form-item label="颜色">
                  <div
                    v-for="item in scoped.row.spec"
                    :key="item.id"
                    class="colorDiv"
                  >
                    <span>{{ item.color }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="尺寸">
                  <div
                    v-for="item in scoped.row.spec"
                    :key="item.id"
                    class="colorDiv"
                  >
                    <span>{{ item.spec }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="零售价">
                  <div
                    v-for="item in scoped.row.spec"
                    :key="item.id"
                    class="colorDiv"
                  >
                    <span>￥{{ item.price }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="定金金额">
                  <div
                    v-for="item in scoped.row.spec"
                    :key="item.id"
                    class="colorDiv"
                  >
                    <span
                      >￥{{
                        Math.ceil(
                          (item.price * scoped.row.config.deposit_prop) / 100
                        )
                      }}</span
                    >
                  </div>
                </el-form-item>
                <el-form-item label="尾款金额">
                  <div
                    v-for="item in scoped.row.spec"
                    :key="item.id"
                    class="colorDiv"
                  >
                    <span
                      >￥{{
                        Math.ceil(
                          item.price -
                            (item.price * scoped.row.config.deposit_prop) / 100
                        )
                      }}</span
                    >
                  </div>
                </el-form-item>
                <el-form-item label="店铺分类" style="width: 224px">
                  <div class="colorDivs">
                    <span>{{ scoped.row.custom_type }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="品牌" style="width: 143px">
                  <div class="colorDivs">
                    <span>{{ scoped.row.brand }}</span>
                  </div>
                </el-form-item>
                <el-form-item label="交易日期" style="width: 178px">
                  <div class="colorDivsrq">
                    <div>
                      <span>{{ scoped.row.config.delivery_time }}</span>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="货号" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="thumbS"
            label="商品"
            width="420"
            align="center"
          >
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
          <el-table-column label="定金比例" width="100" align="center">
            <template v-slot="scoped">
              <div>{{ scoped.row.config.deposit_prop }} %</div>
            </template>
          </el-table-column>
          <el-table-column
            label="最低预购量/预购数量"
            width="100"
            align="center"
          >
            <template v-slot="scoped">
              <div>
                {{ scoped.row.config.min_count }}/{{
                  scoped.row.config.max_count
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="已购数量" width="110" align="center">
            <template v-slot="scoped">
              <div>
                {{ scoped.row.config.max_count - scoped.row.config.count }}
              </div>
              <div class="clickcolor">查看客户详情</div>
            </template>
          </el-table-column>
          <el-table-column label="参与赛事" align="center">
            <template v-slot="scoped">
              <div>{{ scoped.row.match.title }}</div>
              <div class="clickcolor" @click="gomatchdetil(scoped.row)">
                点击赛事标题查看赛事详情
              </div>
            </template>
          </el-table-column>
          <el-table-column label="设计师" align="center">
            <template v-slot="scoped">
              <div>
                <div>
                  <img
                    :src="imagesValue + scoped.row.works.headimage"
                    alt=""
                    style="width: 24px; height: 24px; border-radius: 50%"
                  />
                </div>
                <div>
                  <span>{{ scoped.row.works.nickname }}</span>
                </div>
                <div class="clickcolor" @click="godesignermyCenter(scoped.row)">
                  点击设计师查看设计师主页
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上下架" width="87" align="center">
            <template v-slot="scoped">
              <el-switch
                v-model="scoped.row.status"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="91" align="center">
            <template v-slot="scoped">
              <preview class="spanstyle" :preview="scoped.row" />
              <outrecovery class="spanstyle" :havehs="scoped.row" />
              <del-list class="spanstyle" :haveDel="scoped.row"  />
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
  brandGetListApi,
  match_productGetListMyApi,
  match_productSelectSetDelApi,
  match_productSelectDelApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import Preview from "./options/Preview.vue";
import Outrecovery from "./recoveryoptions/outrecovery.vue";
import delList from "./recoveryoptions/del.vue";
export default {
  components: {
    Outrecovery,
    Preview,
    delList,
  },
  provide() {
    return {
      recycleBin: this.recycleBin,
    };
  },
  data() {
    return {
      InPreSale: {
        is_del: "1",
      },
      tableData: [],
      // 产品分类
      cusOptions: [],
      checkboxGroup1: {
        custom_type: "",
        is_del: "1",
      },
      checkboxGroup2: {
        is_del: "1",
      },
      // 品牌
      options: [],
      OptionsValue: {
        brand_id: "",
        is_del: "1",
      },
      OptionsValue2: {
        is_del: "1",
      },
      seatch: {
        keyword: "",
        is_del: "1",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
        status: "",
        is_del: "1",
      },
      // 批量操作
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      comDelsValues: {
        id: "",
        is_del: "0",
      },
      delsId: {
        id: "",
      },
    };
  },
  created() {
    this.custypeGetListValue();
    this.product_typeListValue();
    this.recycleBin();
    this.imagesValue = imgUrl();
  },
  methods: {
    // 产品分类
    custypeGetListValue() {
      postD(custypeGetListApi()).then((res) => {
        this.cusOptions = res.list;
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
          console.log(res);
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
    selectOptions() {
      postD(match_productGetListMyApi(), this.OptionsValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    recycleBin() {
      postD(match_productGetListMyApi(), this.InPreSale).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    keywordValue() {
      postD(match_productGetListMyApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 刷新
    Refresh() {
      this.recycleBin();
    },
    fulthumb(val) {
      return val.split(",").slice(1)[0];
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(match_productGetListMyApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
    // 批量还原
    async delsValue() {
      const delsValues = await this.$confirm(
        "此操作将移出回收站, 是否继续?",
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
        postD(match_productSelectSetDelApi(), this.comDelsValues).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("已还原");
              this.recycleBin();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("操作失败");
            }
          }
        );
      }
    },
    // 批量删除
    async delsvalueser() {
      const Delsvaluesser = await this.$confirm(
        "此操作将批量删除产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (Delsvaluesser !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (Delsvaluesser === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.delsId.id = this.ids.toString();
        postD(match_productSelectDelApi(), this.delsId).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功删除");
            this.recycleBin();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("操作失败");
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../PreorderList.less");
</style>