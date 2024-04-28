import { createRouter, createWebHistory } from "vue-router";
//框架引入
import Layout from 'szd-client-web/client/layout'
//路由
export const routes = [{
    path: '/login',
    component: () => import('szd-client-web/client/login/login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    hidden: true,
    name: 'Layout',
    children: [{
      path: 'index',
      component: () => import('szd-client-web/client/home/home.vue'),
      name: '首页',
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }],
  }
]


const baseUrl=window.__POWERED_BY_QIANKUN__ ? '/micro/' : '/'
const router = createRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/micro/' : '/',
  history: createWebHistory(baseUrl),
  routes,
});

export default router;
