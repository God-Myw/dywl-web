import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 查询港口
export function getPortListOnlyPortName(params) {
  return axios({
    url: 'api/business/portlist/getPortListOnlyPortName',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 热门港口
export function getHotSearch(params) {
  return axios({
    url: 'api/business/portlist/getHotSearch',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 详情
export function getPortListById(params) {
  return axios({
    url: 'api/business/portlist/getPortListById',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
