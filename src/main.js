import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import emitter from './assets/util/emitter'
import moment from './assets/util/moment'
import 'bootstrap'
const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$moment = moment
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
