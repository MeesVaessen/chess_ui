import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Chat from '@/views/Chat.vue'
import Lobby from '@/views/Lobby.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/chat', name: 'Chat', component: Chat},
    {path: '/lobby', name: 'Lobby', component: Lobby},

]
const router = createRouter({ 
    history: createWebHistory(),
    routes
}
)
export default router