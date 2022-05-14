import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

import mitt from 'mitt'

import CKEditor from '@ckeditor/ckeditor5-vue'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.use(VueAxios, axios)
app.use(CKEditor)
app.component('VueLoading', VueLoading)
app.use(router)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
app.mount('#app')
