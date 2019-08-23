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
      component: Layout
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
