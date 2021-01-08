import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskPanel from '@/views/TaskPanel.vue'
import Task from '@/views/Task.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Register from '@/views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TaskPanel',
    component: TaskPanel,
    props: true,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: '/task/:name/:list/:description',
    name: 'Task',
    component: Task,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
