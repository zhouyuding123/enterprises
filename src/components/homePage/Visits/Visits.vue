<template>
  <div>
    <div class="vis">
      <div class="vis_line1">
        <div class="vis_line1_text">访问量</div>
        <div>
          <el-select v-model="value" placeholder="门店">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="value" placeholder="品牌">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker v-model="value1" type="date" placeholder="日期">
          </el-date-picker>
        </div>
      </div>
      <div class="vis_line2">
        <div>
          <v-chart
            class="chart"
            style="width: 120px; height: 120px"
            :option="option"
          />
        </div>
        <div class="line2SJ">
            <div class="dis line2SJ_yel">
                <div class="yellowxian"></div>
                <div class="text_j">今日访问量：</div>
                <div class="y_num">1,925</div>
            </div>
            <div class="dis line2SJ_bue">
                <div class="bluewxian"></div>
                <div class="text_z">总访问量：</div>
                <div class="b_num">97,025</div>
            </div>
        </div>
      </div>
      <div class="dis vis_line3">
          <div class="dis vis_line3_left">
              <div>总转换率</div>
              <div style="margin-left:10px">75%</div>
          </div>
          <div class="dis vis_line3_right">
              <div>今日转换率</div>
              <div style="margin-left:10px">60%</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LineChart } from "echarts/charts"; //引入折线图
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers"; //使用canvas渲染，可选使用svg渲染
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts";

use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

export default {
  name: "ProhibitTotalTrend",
  components: {
    VChart,
  },
  //主题选择，可选dark主题
  provide: {
    [THEME_KEY]: "",
  },
  //数据配置
  data() {
    return {
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      option: {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            color: ["#33C7FF"],
            data: [{ value: 1048, name: "Search Engine" }],
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./Visits.less");
</style>