import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import 'default-passive-events'

Vue.config.productionTip = false

Vue.use(ElementUI)

// axios.interceptors.request.use(
//   config => {
//     config.baseURL = '/v1/saberAuth'
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

axios.interceptors.response.use(
  res => {
    if (res.data.code == 1001) {
      //用户未登录
      router.push('/login')
      Notification.error({
        title: '用户未登录，请登录后重试'
      })
    }

    return res
  },
  error => {
    return Promise.reject(error);
  }
)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
