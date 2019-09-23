import axios from 'axios'
import Qs from 'qs'
import { ip1 } from './common'

export function getRoles (params) {
  const url = ip1 + '/role/list'

  // const data = {}
  return axios.get(url, {
      params: params
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function saveRole (params) {
  let url = ip1 + '/role/save'
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

export function delRole (roleId) {
  const url = ip1 + '/role/del/' + roleId

  // const data = {}
  return axios.post(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getRolesWithAppIdAndUserId (appId, userId) {
  var url = ip1 + '/role/list'
  if (appId != undefined && appId != '') {
    url = url + '/' + appId
  }
  if (userId != undefined && userId != '') {
    url = url + '/' + userId
  }

  // const data = {}
  return axios.get(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}