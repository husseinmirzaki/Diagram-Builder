import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {AppInstance} from "@/AppInstance";

const app = createApp(App)

AppInstance.init(app);

app.use(createPinia())
app.use(router)

app.mount('#app')
