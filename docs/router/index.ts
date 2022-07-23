import { createRouter, createWebHistory } from 'vue-router';
import demoRoutes from './demoRoutes';
import referenceRoutes from './referenceRoutes';
import Layout from '../components/Layout.vue';

const routes = [
  {
    path: '/components',
    component: Layout,
    children: [...demoRoutes]
  },
  {
    path: '/getting-started',
    component: () => import('../views/getting-started.md'),
    meta: {
      hiddenSidebar: true
    }
  },
  {
    path: '/utils/index',
    meta: {
      hiddenSidebar: true
    },
    component: () => import('../views/references/security/xss-and-csrf.md')
  },
  {
    path: '/references',
    component: Layout,
    children: [...referenceRoutes]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'auto' };
    }
  }
});
