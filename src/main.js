import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import emitter from './assets/util/emitter'
import moment from './assets/util/moment'
import 'bootstrap'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$moment = moment
app.use(VueAxios, axios)
app.use(CKEditor)
app.component('VueLoading', VueLoading)
app.use(router)
app.mount('#app')
