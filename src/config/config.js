// const IP = {
//   // 测试
//   // ip_00: 'pcinterface7.mkdpwx.cn',
//   // 本地
//   ip_01: '47.101.56.77:10443'
// }
// let interfaceIp = (flag = location.hostname) => {
//   const enviroment = {
//     'dylnet.cn': '47.101.56.77:10443' // 正式
//   }[flag]
//   return enviroment ? enviroment : '47.101.56.77:10443'
// }

// const developmentIp = IP.ip_01
const developmentUrl = `http://192.168.1.114:9527/`
const productionUrl = `https://www.dylnet.cn/`
export default {
  development: developmentUrl, // 模拟数据
  production: productionUrl, // 正式数据
  // developmentIp
}
