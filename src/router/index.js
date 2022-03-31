import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontPage.vue'),
    meta: { title: 'Home' },
    children: [{
      path: '',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home' }
    },
    {
      path: 'articles',
      component: () => import('../views/Articles.vue'),
      meta: { title: 'article' }
    },
    {
      path: 'article/:id',
      component: () => import('../views/Article.vue'),
      meta: { title: 'article' }
    },
    {
      path: 'products',
      name: 'Products',
      component: () => import('../views/ProductsView.vue'),
      meta: { title: 'Products' }
    },
    {
      path: 'product/:id',
      component: () => import('../views/ProductView.vue'),
      meta: { title: 'Product' }
    },
    {
      path: 'sendInfo',
      name: 'SendInfo',
      component: () => import('../views/SendInfo.vue'),
      meta: { title: 'SendInfo' }
    },
    {
      path: 'guestOrderList',
      name: 'GuestOrderList',
      component: () => import('../views/GuestOrders.vue'),
      meta: { title: 'GuestOrderList' }
    },
    {
      path: 'guestOrderPay/:id',
      name: 'GuestOrderPay',
      component: () => import('../views/GuestOrderEdit.vue'),
      meta: { title: 'GuestOrderPay' }
    }]
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue'),
    meta: { title: 'LogIn' }
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'adminProducts',
        name: 'AdminProducts',
        component: () => import('../views/AdminProduct.vue'),
        meta: { title: 'AdminProducts' }
      },
      {
        path: 'adminCoupons',
        name: 'AdminCoupons',
        component: () => import('../views/AdminCoupon.vue'),
        meta: { title: 'AdminCoupons' }
      },
      {
        path: 'adminOrders',
        name: 'AdminOrders',
        component: () => import('../views/AdminOrder.vue'),
        meta: { title: 'AdminOrders' }
      },
      {
        path: 'adminArticles',
        name: 'AdminArticles',
        component: () => import('../views/AdminArticle.vue'),
        meta: { title: 'AdminArticle' }
      }
    ]
  },
  {
    path: '/:matchPath(.*)*',
    name: 'FindNoPage',
    component: () => import('../views/FindNoPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) { return savedPosition || { top: 0 } }
})

export default router
