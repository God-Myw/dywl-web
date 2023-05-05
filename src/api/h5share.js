import axios from "@/axios";
import requestParam from "@/axios/requestParam";
// 通过config接口注入权限验证配置
export function webGetWXDetail(params) {
	return axios({
		url: "api/business/weChatPay/webGetWXDetail",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱租赁
export function getContainerSpikeById(params) {
	return axios({
		url: "api/business/containerSpike/getContainerSpikeById",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱买卖
export function getContainerTradingSecondary(params) {
	return axios({
		url: "api/business/shipBooking/getContainerTradingSecondary",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱买卖
export function getContainerTradingMainList(params) {
	return axios({
		url: "api/business/shipBooking/getContainerTradingMainList",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱秒杀
export function getContainerSpikeList(params) {
	return axios({
		url: "api/business/containerSpike/getContainerSpikeList",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱竞拍
export function getAuctionCustomerList(params) {
	return axios({
		url: "api/business/auctionCustomer/getAuctionCustomerList",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 集装箱竞拍详情
export function getAuctionCustomerById(params) {
	return axios({
		url: "api/business/auctionCustomer/getAuctionCustomerById",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 保存融资
export function saveFinancing(params) {
	return axios({
		url: "/api/business/financing/saveFinancing",
		method: "post",
		data: params,
	});
}
// 广告详情页
export function getAdsById(params) {
	return axios({
		url: "/api/business/ads/getAdsById/" + params,
		method: "get",
		headers: { token: localStorage.getItem("token") },
		params: requestParam({}, "get"),
	});
}
// 船员培训详情
export function getCultivateById(params) {
	return axios({
		url: "/api/business/Cultivate/getCultivateById",
		method: "get",
		params: params,
	});
}
// 船员培训列表
export function getCultivateList(params) {
	return axios({
		url: "/api/business/Cultivate/getCultivateList",
		method: "get",
		params: params,
	});
}
// 订舱详情
export function getShipBookingDetailsForApp(params) {
	return axios({
		url: "/api/business/shipBooking/getShipBookingDetailsForApp",
		method: "get",
		params: params,
	});
}
