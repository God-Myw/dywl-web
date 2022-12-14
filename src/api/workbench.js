import axios from "@/axios";
import requestParam from "@/axios/requestParam";

// 获取列表数据
export function getSpartList(params) {
  return axios({
    url: "business/spart/getSpartListByWeb",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 新增
export function saveSpart(params) {
  return axios({
    url: "business/spart/saveSpart",
    method: "post",
    headers: { token: localStorage.getItem("token") },
    data: requestParam(params, "post"),
  });
}
// 编辑
export function getSpartById(params) {
  return axios({
    url: "business/spart/getSpartById",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 上下架
export function shelfChange(params) {
  return axios({
    url: "business/spart/upPartShelf",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 商铺
export function getSpartListByMerchant(params) {
  return axios({
    url: "business/spart/getSpartListByMerchant",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 一级分类
export function getSpartLevel(params) {
  return axios({
    url: "/business/spartLevel/getSpartLevel",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 已发布的二级分类
export function getSpartTwoLevel(params) {
  return axios({
    url: "business/spartLevel/getSpartTwoLevel",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 所有二级分类
export function getSpartTwoLevelAll(params) {
  return axios({
    url: "business/spartLevel/getSpartTwoLevelAll",
    method: "get",
    params: requestParam(params, "get"),
  });
}
// 是否申请店铺
export function getIsMerchant() {
  return axios({
    url: "/business/merchant/getIsMerchant",
    method: "get",
    headers: { token: localStorage.getItem("token") },
  });
}
