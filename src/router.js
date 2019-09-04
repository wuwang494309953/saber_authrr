import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/Login')
    },
    {
      path: '/',
      name: 'Index',
      component: Layout,
      meta: { title: '首页' }
    },
    {
      path: '/gateway',
      name: 'Gateway',
      component: Layout,
      redirect: '/gateway/index',
      children: [
        {
          path: 'index',
          name: 'AppInfo',
          component: () => import('@/components/appinfo/index'),
          meta: { title: 'App信息' }
        },
        {
          path: 'gateway',
          name: 'Setting',
          component: () => import('@/components/gateway/index'),
          meta: { title: '网关配置' }
        },
        {
          path: 'shiro',
          name: 'Shrio',
          component: () => import('@/components/appshiro/index'),
          meta: { title: 'Shiro配置' }
        }
      ]
    },
    {
      path: '/t1',
      name: 'T1',
      component: Layout,
      redirect: '/t1/t1',
      children: [
        {
          path: 't1',
          name: 'TT1',
          component: () => import('@/components/test/T1'),
          meta: { title: 'T1标题' }
        }
      ]
    },
    {
      path: '/t2',
      name: 'T2',
      component: Layout,
      redirect: '/t2/t2',
      children: [
        {
          path: 't2',
          name: 'TT2',
          component: () => import('@/components/test/T2'),
          meta: { title: 'T2标题' }
        }
      ]
    }
  ]
})
