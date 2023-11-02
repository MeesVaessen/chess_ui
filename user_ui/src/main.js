import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vue3GoogleLogin from 'vue3-google-login'

const Client_ID = "775068021981-ifo51uu9udsnu0q2rnpjpdvqonvh9snt.apps.googleusercontent.com";
createApp(App)
.use(vue3GoogleLogin,{clientId : Client_ID})
.use(router)
.mount('#app')
