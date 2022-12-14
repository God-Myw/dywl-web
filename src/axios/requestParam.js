import util from '@/libs/util'
import merge from 'lodash/merge'

export default function (params) {
  // 默认参数
  var defaults = {
    token: localStorage.getItem('token'),
  }
  params = merge(defaults, params)
  return params
}
