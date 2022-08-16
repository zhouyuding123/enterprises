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

import VueAMap from 'vue-amap' // 引入高德地图
VueAMap.initAMapApiLoader({
	key: '4809a108fd29d9ff15029338f2e1f49a', // 如果没有这个key请去高德地图开放平台申请
	plugin: [
		'AMap.CircleEditor',// 圆形编辑器插件
		"AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
		"AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
		"AMap.Autocomplete",
		"AMap.PlaceSearch",
		"AMap.CitySearch",
	],
	v: '1.4.4',
	uiVersion: '1.0.11'
})
//高德的安全密钥
window._AMapSecurityConfig = {
	securityJsCode: '2cea2f6fc6bd30a516c9f1d5ea38c9b0',
}

Vue.use(VueAMap);
Vue.use(VXETable)
Vue.use(elementui)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
