import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/Index.vue'),
      children: [
        {
          path: 'detail/:id',
          component: () => import('./pages/Detail.vue'),
          props: true,
        },
      ],
    },
  ],
})
