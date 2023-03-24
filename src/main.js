import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引用vuex
import store from "./store";
// 引用全局组件
import "@/components/index.js";
// 引用项目配置
import admin from "@/plugin/admin";
// 全局注册过滤器
import "@/plugin/filters";
import Router from "vue-router";
// 图片放大插件
import Viewer from "viewerjs";
import "../node_modules/viewerjs/dist/viewer.min.css";
// rem转化器
import "lib-flexible";
// 字体包
import "./common/font.css";
import "./assets/icon/iconfont.css";

import TDesign from "tdesign-vue";
// 引入组件库全局样式资源
import "tdesign-vue/es/style/index.css";

// 导出excel
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

Vue.use(TDesign);
// Vue.prototype.$echarts = echarts
Vue.prototype.$Viewer = Viewer;
// 重写路由的push方法
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};
Vue.use(admin);
import {
	Uploader,
	Toast,
	Dialog,
	Field,
	Radio,
	RadioGroup,
	Cell,
	CellGroup,
	List,
	ActionSheet,
	Button,
	Form,
	Overlay,
} from "vant";
Vue.use(List);
Vue.use(Uploader);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Button);
Vue.use(ActionSheet);
Vue.use(Overlay);
Vue.config.productionTip = false; //屏蔽提示信息
Vue.config.ignoredElements = ["wx-open-launch-app"];
new Vue({
	router,
	store,
	global,
	render: (h) => h(App),
}).$mount("#app");
