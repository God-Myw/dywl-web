import axios from '@/axios'
import requestParam from '@/axios/requestParam'

// 获取列表数据
export function getSpartList(params) {
  return axios({
    url: '/business/spart/getSpartList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 上下架
export function shelfChange(params) {
  return axios({
    url: '/business/spart/upPartShelf',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 上下架
export function getSpartById(params) {
  return axios({
    url: '/business/spart/getSpartById',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
