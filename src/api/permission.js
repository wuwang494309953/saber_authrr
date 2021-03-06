import axios from 'axios'
import Qs from 'qs'
import { ip1 } from './common'

export function getPermissions (params) {
  const url = ip1 + '/permission/list'

  // const data = {}
  return axios.get(url, {
      params: params
  }).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function savePermission (params) {
  let url = ip1 + '/permission/save'
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

export function delPermission (userId) {
  const url = ip1 + '/permission/del/' + userId

  // const data = {}
  return axios.post(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getPermissionsWithAppIdAndUserId (appId, roleId) {
  var url = ip1 + '/permission/list'
  if (appId != undefined && appId != '') {
    url = url + '/' + appId
  }
  if (roleId != undefined && roleId != '') {
    url = url + '/' + roleId
  }

  // const data = {}
  return axios.get(url).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    }
  })
}