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
const developmentUrl = `http://39.105.35.83:10443/api`
const productionUrl = `https://www.dylnet.cn/api`
export default {
  development: developmentUrl, // 模拟数据
  production: productionUrl, // 正式数据
  // developmentIp
}
