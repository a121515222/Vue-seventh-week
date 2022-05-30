import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

import CKEditor from '@ckeditor/ckeditor5-vue'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(VueAxios, axios)
app.use(CKEditor)
app.component('VueLoading', VueLoading)
app.use(router)
app.use(pinia)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
app.mount('#app')
