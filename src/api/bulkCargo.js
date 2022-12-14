import axios from '@/axios'
import requestParam from '@/axios/requestParam'

// 获取国际国内方法
export function postPallet(data) {
  return axios({
    url: 'business/pallet/postPallet',
    method: 'post',
    data: requestParam(data, 'post'),
  })
}
// 加盟商提交
export function saveUserApply(data) {
  return axios({
    url: 'business/userApply/saveUserApply',
    method: 'post',
    data: requestParam(data, 'post'),
  })
}
// 获取列表
export function getUserApplyList(params) {
  return axios({
    url: 'business/userApply/getUserApplyList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
