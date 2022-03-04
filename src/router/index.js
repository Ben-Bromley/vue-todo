import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todo',
      name: 'todo app',
      component: () => import('../views/TodoApp.vue')
    },
    {
      path: '/calculator',
      name: 'calculator app',
      component: () => import('../views/CalculatorApp.vue')
    },
    {
      path: '/pocket-solitaire',
      name: 'Pocket Solitaire',
      component: () => import('../views/PocketSolitaire.vue')
    }
  ]
})

export default router
