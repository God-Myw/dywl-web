import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 集装箱买卖地区
export function getContainerTradingMainList(params) {
  return axios({
    url: 'api/business/shipBooking/getContainerTradingMainList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 集装箱买卖内容
export function getContainerTradingSecondary(params) {
  return axios({
    url: 'api/business/shipBooking/getContainerTradingSecondary',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

