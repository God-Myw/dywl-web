import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 获取手机前缀
export function getPortListOnlyPortName(params) {
  return axios({
    url: 'api/business/portlist/getPortListOnlyPortName',
    method: 'get',
    params: requestParam(params, 'get')
  })
}