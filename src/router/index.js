import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Front/FrontPage.vue'),
    meta: { title: 'Home' },
    children: [{
      path: '',
      name: 'HomeView',
      component: () => import('../views/Front/HomeView.vue'),
      meta: { title: 'Home' }
    },
    {
      path: 'articles',
      component: () => import('../views/Front/Articles.vue'),
      meta: { title: 'article' }
    },
    {
      path: 'article/:id',
      component: () => import('../views/Front/Article.vue'),
      meta: { title: 'article' }
    },
    {
      path: 'products',
      name: 'Products',
      component: () => import('../views/Front/ProductsView.vue'),
      meta: { title: 'Products' }
    },
    {
      path: 'product/:id',
      component: () => import('../views/Front/ProductView.vue'),
      meta: { title: 'Product' }
    },
    {
      path: 'guestOrderPay/:id',
      name: 'GuestOrderPay',
      component: () => import('../views/Front/GuestOrderPay.vue'),
      meta: { title: 'GuestOrderPay' }
    },
    {
      path: 'payProcess',
      component: () => import('../views/Front/GuestPayProcess.vue'),
      meta: { title: 'PayProcess' },
      children: [
        {
          path: 'sendInfo',
          name: 'SendInfo',
          component: () => import('../views/Front/SendInfo.vue'),
          meta: { title: 'SendInfo' }
        },
        {
          path: 'guestOrderPay/:id',
          name: 'GuestOrderPay',
          component: () => import('../views/Front/GuestOrderPay.vue'),
          meta: { title: 'GuestOrderPay' }
        },
        {
          path: 'guestOrderFinished',
          name: 'GuestOrderPay',
          component: () => import('../views/Front/GuestOrderFinished.vue'),
          meta: { title: 'GuestOrderFinished' }
        }
      ]
    },
    {
      path: 'guestOrderLists',
      name: 'GuestOrderLists',
      component: () => import('../views/Front/GuestOrderLists.vue'),
      meta: { title: 'GuestOrderLists' }
    }]
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: () => import('../views/Admin/LogIn.vue'),
    meta: { title: 'LogIn' }
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: () => import('../views/Admin/DashBoard.vue'),
    children: [
      {
        path: 'adminProducts',
        name: 'AdminProducts',
        component: () => import('../views/Admin/AdminProduct.vue'),
        meta: { title: 'AdminProducts' }
      },
      {
        path: 'adminCoupons',
        name: 'AdminCoupons',
        component: () => import('../views/Admin/AdminCoupon.vue'),
        meta: { title: 'AdminCoupons' }
      },
      {
        path: 'adminOrders',
        name: 'AdminOrders',
        component: () => import('../views/Admin/AdminOrder.vue'),
        meta: { title: 'AdminOrders' }
      },
      {
        path: 'adminArticles',
        name: 'AdminArticles',
        component: () => import('../views/Admin/AdminArticle.vue'),
        meta: { title: 'AdminArticle' }
      }
    ]
  },
  {
    path: '/:matchPath(.*)*',
    name: 'FindNoPage',
    component: () => import('../views/Front/FindNoPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) { return savedPosition || { top: 0 } }
})

export default router
