import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import LoginForm from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard', component: Dashboard
  },
  {
    path: '/login', component: LoginForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
