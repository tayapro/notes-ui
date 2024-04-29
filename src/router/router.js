import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotesView from '../views/NotesView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/notes', component: NotesView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
