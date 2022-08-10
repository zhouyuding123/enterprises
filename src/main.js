import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from './elementui'
import "@/assets/css/reset.less"
import "@/assets/font_nslx23r4lvg/iconfont.css"
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//main.js
import ECharts from "vue-echarts";
Vue.component('v-chart', ECharts)//全局注册


Vue.use(VXETable)
Vue.use(elementui)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
