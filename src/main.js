import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './css/index.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
