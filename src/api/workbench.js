import axios from "@/axios";
import requestParam from "@/axios/requestParam";

// 获取列表数据
export function getSpartList(params) {
	return axios({
		url: "api/business/spart/getSpartListByWeb",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 新增
export function saveSpart(params) {
	return axios({
		url: "api/business/spart/saveSpart",
		method: "post",
		headers: { token: localStorage.getItem("token") },
		data: requestParam(params, "post"),
	});
}
// 编辑
export function getSpartById(params) {
	return axios({
		url: "api/business/spart/getSpartById",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 上下架
export function shelfChange(params) {
	return axios({
		url: "api/business/spart/upPartShelf",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 商铺
export function getSpartListByMerchant(params) {
	return axios({
		url: "api/business/spart/getSpartListByMerchant",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 一级分类
export function getSpartLevel(params) {
	return axios({
		url: "api/business/spartLevel/getSpartLevel",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 已发布的二级分类
export function getSpartTwoLevel(params) {
	return axios({
		url: "api/business/spartLevel/getSpartTwoLevel",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 所有二级分类
export function getSpartTwoLevelAll(params) {
	return axios({
		url: "api/business/spartLevel/getSpartTwoLevelAll",
		method: "get",
		params: requestParam(params, "get"),
	});
}
// 是否申请店铺
export function getIsMerchant() {
	return axios({
		url: "api/business/merchant/getIsMerchant",
		method: "get",
		headers: { token: localStorage.getItem("token") },
	});
}
// 申请店铺
export function saveMerchant(params) {
	return axios({
		url: "api/business/merchant/saveMerchant",
		method: "post",
		headers: { token: localStorage.getItem("token") },
		params: params,
	});
}
// 百度OCR获取id
export function getAccessToken(params) {
	return axios({
		url: "baiduApi/oauth/2.0/token",
		method: "post",
		params: params,
	});
}
// 百度OCR身份证识别
export function identification(params) {
	return axios({
		url: "baiduApi/rest/2.0/ocr/v1/idcard",
		method: "post",
		params: params,
	});
}
// 百度OCR营业执照识别
export function businessLicense(params) {
	return axios({
		url: "baiduApi/rest/2.0/ocr/v1/business_license",
		method: "post",
		params: params,
	});
}
