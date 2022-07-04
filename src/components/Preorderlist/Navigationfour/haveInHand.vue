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
          <span>批量回收</span>
        </div>
        <div class="plsj" @click="BatchLaunchValue">
          <span>批量上架</span>
        </div>
        <div class="plsj" @click="offBatchValue">
          <span>批量下架</span>
        </div>
        <div class="buttonxz">
          <div ref="wholes" @click="whole()">
            <span ref="allWholes">全部</span>
          </div>
          <div ref="PutOn" @click="onTheShelf()">
            <span ref="allPutOn">上架</span>
          </div>
          <div ref="Offtheshelf" @click="underShelfx()">
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
                <div class="clickcolor" @click="godesignermyCenter(scoped.row)">点击设计师查看设计师主页</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上下架" width="87" align="center">
            <template v-slot="scoped">
              <el-switch
                v-model="scoped.row.status"
                active-color="#13ce66"
                @change="clickStatus(scoped.row)"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="91" align="center">
            <template v-slot="scoped">
              <div>
                <preview class="spanstyle" :preview="scoped.row" />
                <have-in-hand class="spanstyle" :havehs="scoped.row" />
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
  match_productSetStatusApi,
  match_productSelectSetDelApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import haveInHand from "./options/recovery.vue";
import preview from "./options/Preview.vue";
export default {
  provide() {
    return {
      PreOrder: this.PreOrder,
    };
  },
  components: { haveInHand, preview },
  data() {
    return {
      tableData: [],
      InPreSale: {
        condition: "0",
      },
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
        status: "",
      },
      // 批量操作
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      comDelsValues: {
        id: "",
        is_del: "1",
      },
      // 上下架
      Upperandlowershelves: {
        id: "",
        status: "",
      },
      //   下架
      Putontheshelf: {
        id: "",
        status: "0",
      },
      // 上架
      frame: {
        id: "",
        status: "1",
      },
      // 上架中
      onTheShelfValue: {
        status: "1",
        condition: "0",
      },
      // 下架中
      underShelf: {
        status: "0",
        condition: "0",
      },
    };
  },
  created() {
    this.custypeGetListValue();
    this.product_typeListValue();
    this.PreOrder();
    this.imagesValue = imgUrl();
  },
  methods: {
    PreOrder() {
      postD(match_productGetListMyApi(), this.InPreSale).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
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
      this.PreOrder();
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
    keywordValue() {
      postD(match_productGetListMyApi(), this.seatch).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handleSelectionChange(val) {
      this.arrs = val;
    },
    // 上下架
    clickStatus(val) {
      this.Upperandlowershelves.id = val.id;
      this.Upperandlowershelves.status = val.status;
      postD(match_productSetStatusApi(), this.Upperandlowershelves).then(
        (res) => {
          if (res.code == "200") {
            this.$message.success("修改成功");
            this.PreOrder();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("修改失败");
          }
        }
      );
    },
    // 批量上架
    async BatchLaunchValue() {
      const BatchList = await this.$confirm(
        "此操作将批量上架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (BatchList !== "confirm") {
        return this.$message.info("取消上架");
      }
      if (BatchList === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.frame.id = this.ids.toString();
        postD(match_productSetStatusApi(), this.frame).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功上架");
            this.PreOrder();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("上架失败");
          }
        });
      }
    },
    // 批量下架
    async offBatchValue() {
      const offBatchValueList = await this.$confirm(
        "此操作将批量下架产品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (offBatchValueList !== "confirm") {
        return this.$message.info("取消下架");
      }
      if (offBatchValueList === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.Putontheshelf.id = this.ids.toString();
        postD(match_productSetStatusApi(), this.Putontheshelf).then((res) => {
          if (res.code == "200") {
            this.$message.success("已成功下架");
            this.PreOrder();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("下架失败");
          }
        });
      }
    },
    // 全部
    whole() {
      postD(match_productGetListMyApi(), this.InPreSale).then((res) => {
        if (res.code == "200") {
          this.tableData = res.list;
          this.page1.totalResult = res.count;
          this.$refs.wholes.style.backgroundColor = "#FF2659";
          this.$refs.allWholes.style.color = "#ffffff";
          this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
          this.$refs.allPutOn.style.color = "#999999";
          this.$refs.Offtheshelf.style.backgroundColor = "#FFFFFF";
          this.$refs.allOfftheshelf.style.color = "#999999";
        }
      });
    },
    // 上架中
    onTheShelf() {
      postD(match_productGetListMyApi(), this.onTheShelfValue).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.$refs.PutOn.style.backgroundColor = "#FF2659";
        this.$refs.allPutOn.style.color = "#ffffff";
        this.$refs.wholes.style.backgroundColor = "#FFFFFF";
        this.$refs.allWholes.style.color = "#999999";
        this.$refs.Offtheshelf.style.backgroundColor = "#FFFFFF";
        this.$refs.allOfftheshelf.style.color = "#999999";
      });
    },
    // 下架中
    underShelfx() {
      postD(match_productGetListMyApi(), this.underShelf).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.$refs.Offtheshelf.style.backgroundColor = "#FF2659";
        this.$refs.allOfftheshelf.style.color = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
        this.$refs.allPutOn.style.color = "#999999";
        this.$refs.wholes.style.backgroundColor = "#FFFFFF";
        this.$refs.allWholes.style.color = "#999999";
      });
    },
    // 批量回收
    async delsValue() {
      const delsValues = await this.$confirm(
        "此操作将放入回收站, 是否继续?",
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
              this.$message.success("已成功放入回收站");
              this.PreOrder();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("回收失败");
            }
          }
        );
      }
    },
    // 去详情页
    gomatchdetil(val) {
      this.$router.push("/match/detial" + val.match_id);
    },
    // 去设计师页
    godesignermyCenter(val) {
        this.$router.push("/designer/myCenter/" + val.works.username);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../PreorderList.less");
</style>
