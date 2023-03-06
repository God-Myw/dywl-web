import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 国际国外货盘
export function getPalletListByWeb(params) {
  return axios({
    url: 'api/business/pallet/getPalletListByWeb',
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 国际国外航次
export function getVoyageListByWeb(params) {
  return axios({
    url: 'api/business/voyage/getVoyageListByWeb',
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 国内国际货盘详情
export function getSharetPalletInfo(params) {
  return axios({
    url: 'api/business/pallet/getSharetPalletInfo' + `/${params}`,
    method: 'get'
  })
}


