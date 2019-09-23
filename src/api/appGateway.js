import axios from 'axios'
import Qs from 'qs'
import { ip1 } from './common'

export function getGateWays (params) {
  const url = ip1 + '/gateway/setting/list'

  // const data = {}
  return axios.get(url, {
      params: params
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function saveGateway (params) {
  let url = ip1 + '/gateway/setting/save'
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }]
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function delGateWay (appId) {
  const url = ip1 + '/gateway/setting/del/' + appId

  // const data = {}
  return axios.post(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}