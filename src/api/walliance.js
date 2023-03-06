import axios from '@/axios'
import requestParam from '@/axios/requestParam'

// 首页数据
export function getHomeInformation(params) {
  return axios({
    url: 'api/sys/apply/getHomeInformation',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 用户列表查询
export function getSubordinateList(params) {
  return axios({
    url: 'api/sys/user/getSubordinateList',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 用户列表删除
export function updatejms(data) {
  return axios({
    url: 'api/sys/user/updatejms',
    method: 'post',
    params: requestParam(data, 'post')
  })
}
// 账户余额查询
export function applyAebate(params) {
  return axios({
    url: 'api/business/userRebate/applyAebate',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 个人中心提交审核
export function information(data) {
  return axios({
    url: 'sys/user/information',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 个人中心修改密码
export function changepwd(data) {
  return axios({
    url: 'sys/apply/pwd/reset',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 个人中心列表
export function getPersonalCenter(params) {
  return axios({
    url: 'sys/user/getPersonalCenter',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

