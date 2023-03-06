import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 集装箱秒杀列表
export function getContainerSpikeList(params) {
  return axios({
    url: 'api/business/containerSpike/getContainerSpikeList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱竞拍列表
export function getAuctionCustomerList(params) {
  return axios({
    url: 'api/business/auctionCustomer/getAuctionCustomerList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱订舱列表
export function getShipBookingList(params) {
  return axios({
    url: 'api/business/shipBooking/getShipBookingListForApp',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// post方法
export function insertActivity(data) {
  return axios({
    url: 'api/business/activity/insertActivity.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
