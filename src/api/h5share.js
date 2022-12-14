import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 通过config接口注入权限验证配置
export function webGetWXDetail(params) {
  return axios({
    url: 'business/weChatPay/webGetWXDetail',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱租赁
export function getContainerSpikeById(params) {
  return axios({
    url: 'business/containerSpike/getContainerSpikeById',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱买卖
export function getContainerTradingSecondary(params) {
  return axios({
    url: 'business/shipBooking/getContainerTradingSecondary',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱买卖
export function getContainerTradingMainList(params) {
  return axios({
    url: 'business/shipBooking/getContainerTradingMainList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱秒杀
export function getContainerSpikeList(params) {
  return axios({
    url: 'business/containerSpike/getContainerSpikeList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱竞拍
export function getAuctionCustomerList(params) {
  return axios({
    url: 'business/auctionCustomer/getAuctionCustomerList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱竞拍详情
export function getAuctionCustomerById(params) {
  return axios({
    url: 'business/auctionCustomer/getAuctionCustomerById',
    method: 'get',
    params: requestParam(params, 'get')
  })
}


