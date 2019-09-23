import axios from 'axios'
import Qs from 'qs'
import { ip2 } from './common'

export function login (params) {
  let url = ip2 + '/login/in'
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