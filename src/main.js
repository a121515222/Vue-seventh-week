import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

import CKEditor from '@ckeditor/ckeditor5-vue'

import emitter from '@/methods/emitter'

import moment from '@/methods/moment'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$moment = moment
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
