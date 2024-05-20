import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Api } from './utils/Api'

const app = createApp(App)
export const api = new Api('https://rickandmortyapi.com/api/')

app.use(router)

app.mount('#app')
