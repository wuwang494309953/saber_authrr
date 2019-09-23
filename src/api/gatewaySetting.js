import axios from 'axios'
import { ip2 } from './common'

export function refreshRouter () {
  let url = ip2 + '/router/setting/refresh'
  return axios({
    method: 'post',
    url: url
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}

export function refreshPermission () {
  let url = ip2 + '/permission/setting/refresh'
  return axios({
    method: 'post',
    url: url
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  }).catch((erroe) => {
    return Promise.reject(erroe)
  })
}