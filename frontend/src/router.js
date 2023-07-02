import { createRouter, createWebHistory } from 'vue-router'
import Reverse from './components/Reverse-Home'
import Order from './components/Order-Home'
import Dashboard from './components/Dashboard-Home'

const routes = [
    {
      path: '/reservation',
      component: Reverse
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  

export default router