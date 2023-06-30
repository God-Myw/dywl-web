import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		redirect: "/index",
		component: () => import("@/views/Main.vue"),
		children: [
			// 首页
			{
				path: "/index",
				name: "index",
				component: () => import("@/views/home/index.vue"),
			},
			// 注册
			{
				path: "/register",
				name: "register",
				component: () => import("@/views/register/index.vue"),
			},
			// 登录
			{
				path: "/login",
				name: "login",
				component: () => import("@/views/login/index.vue"),
			},
			// 修改密码
			{
				path: "/amendCode",
				name: "amendCode",
				component: () => import("@/views/amendcode/index.vue"),
			},
			// 绑定手机
			{
				path: "/perfection",
				name: "perfection",
				component: () => import("@/views/perfection/index.vue"),
			},
			// 产品服务集装箱
			{
				path: "/product",
				name: "product",
				component: () => import("@/views/product/index.vue"),
			},
			// 集装箱买卖
			{
				path: "/product/containerdeal",
				name: "containerdeal",
				component: () => import("@/views/product/containerdeal/index.vue"),
			},
			// 秒杀详情
			{
				path: "/product/seckillDet",
				name: "seckillDet",
				component: () => import("@/views/details/seckill.vue"),
			},
			// 预告详情
			{
				path: "/product/foreshow",
				name: "foreshow",
				component: () => import("@/views/details/foreshow.vue"),
			},
			// 产品服务国际国内航次
			{
				path: "/product/voyagetime",
				name: "voyagetime",
				component: () => import("@/views/product/voyagetime/index.vue"),
			},
			// 国内航次详情
			{
				path: "/details/voyagetime/internal",
				name: "detvoyinternal",
				component: () => import("@/views/details/voyagetime/internal.vue"),
			},
			// 国外航次详情
			{
				path: "/details/voyagetime/foreign",
				name: "detvoyforeign",
				component: () => import("@/views/details/voyagetime/foreign.vue"),
			},
			// 产品服务国际国内货盘
			{
				path: "/product/pallet",
				name: "pallet",
				component: () => import("@/views/product/pallet/index.vue"),
			},
			// 国内货盘详情
			{
				path: "/details/pallet/internal",
				name: "detinternal",
				component: () => import("@/views/details/pallet/internal.vue"),
			},
			// 国外货盘详情
			{
				path: "/details/pallet/foreign",
				name: "detforeign",
				component: () => import("@/views/details/pallet/foreign.vue"),
			},
			// 关于我们
			{
				path: "/aboutUs",
				name: "aboutUs",
				component: () => import("@/views/aboutUs/index.vue"),
			},
			// 港口信息查询
			{
				path: "/tool/portmessage",
				name: "portmessage",
				component: () => import("@/views/tool/portmessage.vue"),
			},
			// 港口信息详情
			{
				path: "/portmessage/details",
				name: "pordetails",
				component: () => import("@/views/tool/prodetails.vue"),
			},
			// 其他服务-代理商服务
			{
				path: "/otherServe/agency",
				name: "agency",
				component: () => import("@/views/otherServe/agency.vue"),
			},
		],
	},

	// 工作台
	{
		path: "/workbench",
		name: "workbench",
		component: () => import("@/views/workbench/index.vue"),
		children: [
			// 工作台-首页
			{
				path: "/workbench",
				name: "home",
				component: () => import("@/views/workbench/home/index.vue"),
			},
			// 工作台-资料认证
			{
				path: "/workbench/dataVerify",
				name: "dataVerify",
				component: () => import("@/views/workbench/dataVerify/index.vue"),
			},
			// 工作台-我要发布
			{
				path: "/workbench/release",
				name: "release",
				component: () => import("@/views/workbench/release/index.vue"),
			},
			// 工作台-散杂货发布
			{
				path: "/workbench/release/bulkCargo",
				name: "bulkCargo",
				component: () => import("@/views/workbench/release/bulkCargo/index.vue"),
			},
			// 工作台-船舶供应发布
			{
				path: "/workbench/release/spart",
				name: "spart",
				component: () => import("@/views/workbench/release/spart/index.vue"),
			},
			// 工作台-船舶供应
			// {
			//   path: '/workbench/spart',
			//   name: 'spart',
			//   component: () => import('@/views/workbench/spart/spartList/index.vue'),
			// },
			// 工作台-发布船舶供应
			{
				path: "/workbench/spart/reSpart",
				name: "reSpart",
				component: () => import("@/views/workbench/spart/reSpart/index.vue"),
			},
			// 工作台-船舶供应列表
			{
				path: "/workbench/spart/spartList",
				name: "spartList",
				component: () => import("@/views/workbench/spart/spartList/index.vue"),
			},
			// 工作台-船舶供应编辑
			{
				path: "/workbench/spart/spartEdit",
				name: "spartList",
				component: () => import("@/views/workbench/spart/spartList/spartEdit.vue"),
			},
			// 工作台-我的商铺
			{
				path: "/workbench/spart/myStore",
				name: "myStore",
				component: () => import("@/views/workbench/spart/myStore/index.vue"),
			},
			// 工作台-实名认证
			{
				path: "/workbench/spart/realNameAut",
				name: "realNameAut",
				component: () => import("@/views/workbench/spart/myStore/realNameAut.vue"),
			},
			// 工作台-订单列表
			{
				path: "/workbench/orderList",
				name: "orderList",
				component: () => import("@/views/workbench/orderList/bulkShip/index.vue"),
			},
			// 工作台-散货船订单
			{
				path: "/workbench/orderList/bulkShip",
				name: "bulkShip",
				component: () => import("@/views/workbench/orderList/bulkShip/index.vue"),
			},
			// 工作台-集装箱订单
			{
				path: "/workbench/orderList/container",
				name: "containerList",
				component: () => import("@/views/workbench/orderList/container/index.vue"),
			},
		],
	},
	// 加盟工作台
	{
		path: "/walliance",
		name: "walliance",
		component: () => import("@/views/walliance/index.vue"),
		children: [
			// 首页
			{
				path: "/walliance/homepage",
				name: "homepage",
				component: () => import("@/views/walliance/homepage/index.vue"),
			},
			// 用户列表
			{
				path: "/walliance/userlist",
				name: "userlist",
				component: () => import("@/views/walliance/userlist/index.vue"),
			},
			// 账户余额
			{
				path: "/walliance/balance",
				name: "balance",
				component: () => import("@/views/walliance/balance/index.vue"),
			},
			// 个人中心
			{
				path: "/walliance/personage",
				name: "personage",
				component: () => import("@/views/walliance/personage/index.vue"),
			},
		],
	},
	// 随便
	{
		path: "/ceLogin",
		name: "ceLogin",
		component: () => import("@/views/ceLogin.vue"),
	},
	// app中分享h5链接
	// 加油注册
	{
		path: "/h5share/bank",
		name: "bank",
		component: () => import("@/views/h5share/bank.vue"),
	},
	// 加油注册
	{
		path: "/h5share/h5register",
		name: "h5register",
		component: () => import("@/views/h5share/h5register.vue"),
	},
	{
		// 集装箱租赁
		path: "/h5share/WeCatpa",
		name: "WeCatpa",
		component: () => import("@/views/h5share/WeCatpa.vue"),
	},
	// 加油详情
	{
		path: "/h5share/oilstationdetail",
		name: "oilstationdetail",
		component: () => import("@/views/h5share/oilstationdetail.vue"),
	},
	// 国内航次详情
	{
		path: "/h5share/intervoyageinland",
		name: "intervoyageinland",
		component: () => import("@/views/h5share/intervoyageinland.vue"),
	},
	// 国际航次详情
	{
		path: "/h5share/intervoyage",
		name: "intervoyage",
		component: () => import("@/views/h5share/intervoyage.vue"),
	},
	// 国内货盘详情
	{
		path: "/h5share/inlandIntpallet",
		name: "inlandIntpallet",
		component: () => import("@/views/h5share/inlandIntpallet.vue"),
	},
	// 国际货盘详情
	{
		path: "/h5share/contIntpallet",
		name: "contIntpallet",
		component: () => import("@/views/h5share/contIntpallet.vue"),
	},
	// 集装箱订舱
	{
		path: "/h5share/contBooking",
		name: "contBooking",
		component: () => import("@/views/h5share/contBooking.vue"),
	},
	// 集装箱订舱详情
	{
		path: "/h5share/contBookingDetail",
		name: "contBookingDetail",
		component: () => import("@/views/h5share/contBookingDetail.vue"),
	},
	// 集装箱买卖
	{
		path: "/h5share/container",
		name: "container",
		component: () => import("@/views/h5share/container.vue"),
	},
	// 集装箱秒杀
	{
		path: "/h5share/caontSeckill",
		name: "caontSeckill",
		component: () => import("@/views/h5share/caontSeckill.vue"),
	},
	// 集装箱现舱竞拍
	{
		path: "/h5share/caontAuction",
		name: "caontAuction",
		component: () => import("@/views/h5share/caontAuction.vue"),
	},
	// 油站详情
	{
		path: "/h5share/oilstationdet",
		name: "oilstationdet",
		component: () => import("@/views/h5share/oilstationdet.vue"),
	},
	// 危险品
	{
		path: "/h5share/riskgoods",
		name: "riskgoods",
		component: () => import("@/views/h5share/riskgoods.vue"),
	},
	// 招商表单
	{
		path: "/h5share/leagueus",
		name: "leagueus",
		component: () => import("@/views/h5share/leagueus.vue"),
	},
	// 船舶交易
	{
		path: "/h5share/shipDeal",
		name: "shipDeal",
		component: () => import("@/views/h5share/shipDeal.vue"),
	},
	// 船舶求购
	{
		path: "/h5share/shipTobuy",
		name: "shipTobuy",
		component: () => import("@/views/h5share/shipTobuy.vue"),
	},
	// 买船详情
	{
		path: "/h5share/shiBuy",
		name: "shiBuy",
		component: () => import("@/views/h5share/shiBuy.vue"),
	},
	// 船舶求购详情
	{
		path: "/h5share/askbuy",
		name: "askbuy",
		component: () => import("@/views/h5share/askbuy.vue"),
	},
	// 港口服务
	{
		path: "/h5share/portservice",
		name: "portservice",
		component: () => import("@/views/h5share/portservice.vue"),
	},
	// 海运垫付
	{
		path: "/h5share/hypothecate",
		name: "hypothecate",
		component: () => import("@/views/h5share/hypothecate.vue"),
	},
	// 携手助力
	{
		path: "/h5share/assistance",
		name: "assistance",
		component: () => import("@/views/h5share/assistance.vue"),
	},
	// 船舶供应
	{
		path: "/h5share/spart",
		name: "h5spart",
		component: () => import("@/views/h5share/sparts.vue"),
	},
	// 商品列表
	{
		path: "/h5share/storeList",
		name: "h5storeList",
		component: () => import("@/views/h5share/storeList.vue"),
	},
	// 紧急修理详情页
	{
		path: "/h5share/adDetail",
		name: "adDetail",
		component: () => import("@/views/h5share/adDetail.vue"),
	},
	// 申请融资
	{
		path: "/h5share/applyFinanc",
		name: "applyFinanc",
		component: () => import("@/views/h5share/applyFinanc.vue"),
	},
	// 船员培训
	{
		path: "/h5share/crewTraining",
		name: "crewTraining",
		component: () => import("@/views/h5share/crewTraining.vue"),
	},
	// 申请抵押
	{
		path: "/h5share/applyMortgage",
		name: "applyMortgage",
		component: () => import("@/views/h5share/applyMortgage.vue"),
	},
	// h5富文本
	{
		path: "/h5share/h5Editor",
		name: "h5Editor",
		component: () => import("@/views/h5share/h5Editor.vue"),
	},
	// 船舶供应详情页
	{
		path: "/h5share/spartEdit",
		name: "spartEdit",
		component: () => import("@/views/h5share/spartEdit.vue"),
	},
	// 船舶供应分享页H5
	{
		path: "/h5share/spartShareH5",
		name: "spartShareH5",
		component: () => import("@/views/h5share/spartShareH5.vue"),
	},
	// 船舶供应详情页H5
	{
		path: "/h5share/spartDetailsH5",
		name: "spartDetailsH5",
		component: () => import("@/views/h5share/spartDetailsH5.vue"),
	},
];

const router = new VueRouter({
	routes,
	mode: "history",
});

//路由跳转后，页面回到顶部
router.afterEach(() => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});
// token验证
// router.beforeEach((to, from, next) => {
//   let token = util.cookies.get('token')
//   if (to.path === '/login') {
//     next()
//   } else {
//     if (token && token !== 'undefined') {
//       next()
//     } else {
//       next('/login')
//       // next()
//     }
//   }
// })
export default router;
