import axios from '@/axios'
import requestParam from '@/axios/requestParam'
// 集装箱秒杀详情
export function getContainerSpikeById(params) {
  return axios({
    url: 'business/containerSpike/getContainerSpikeById',
    method: 'get',
    params: requestParam(params, 'get')
  })
}


