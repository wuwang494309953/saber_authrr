import axios from 'axios'
import Qs from 'qs'
import { ip1 } from './common'

export function saveRolePermission (params) {
  let url = ip1 + '/rolePermission/save'
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