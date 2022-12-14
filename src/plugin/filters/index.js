import moment from 'moment'
import Vue from 'vue'
/* 
  全局过滤器
*/

// 日期时间格式转化
Vue.filter('dateFormat', function(value) {
  if (!value) return ''
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

// 价格后面加元
Vue.filter('moneyFormat', function(value) {
  if (!value) return ''
  return value + '元'
})
// 转化时间格式/2022-01-30T09:38:16.000+0000/01-30
Vue.filter('renderTime', function(value) {
  if (!value) return ''
  let dateee = new Date(value).toJSON();
  let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return (/\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0]).slice(5)
})
// 转化时间格式/2022-01-30T09:38:16.000+0000/2022-01-30
Vue.filter('renderTimeY', function(value) {
  if (!value) return ''
  let dateee = new Date(value).toJSON();
  let datesfm = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return (/\d{4}-\d{1,2}-\d{1,2}/g.exec(datesfm)[0])
})