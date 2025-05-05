import { createRouter, createWebHistory } from 'vue-router'
import ReservationStep1 from '../views/ReservationStep1.vue'
import ReservationStep2 from '../views/ReservationStep2.vue'
// router/index.ts
import Home from '../views/Home.vue'
// router/index.ts
import StorePage from '../views/StorePage.vue'
import Success from '../views/Success.vue'
import Cancel from '../views/Cancel.vue'
import Menu from '../views/Menu.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminOrders from '../views/AdminOrders.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/reserve', component: ReservationStep1 },
  { path: '/reserve/info', component: ReservationStep2 },
  { path: '/success', component: Success },
  { path: '/cancel', component: Cancel },
  { path: '/stores', component: StorePage },
  { path: '/menu', component: Menu },
  { path: '/admin/login', component: AdminLogin },
  { path: '/admin/orders', component: AdminOrders },
]



  const router = createRouter({
    history: createWebHistory(),
   routes
  })

export default router