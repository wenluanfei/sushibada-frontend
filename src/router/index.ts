import { createRouter, createWebHistory } from 'vue-router'

import ReservationStep1 from '../views/ReservationStep1.vue'
import ReservationStep2 from '../views/ReservationStep2.vue'
// router/index.ts
import Home from '../views/Home.vue'
// router/index.ts
import StorePage from '../views/StorePage.vue'

import Menu from '../views/Menu.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/reserve', component: ReservationStep1 },
  { path: '/reserve/info', component: ReservationStep2 },
  { path: '/stores', component: StorePage },
  { path: '/menu', component: Menu },
]



  const router = createRouter({
    history: createWebHistory(),
   routes
  })

export default router