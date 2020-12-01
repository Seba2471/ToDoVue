import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskPanel from '@/views/TaskPanel.vue'
import Task from '@/views/Task.vue'
import Test from '@/views/Test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TaskPanel',
    component: TaskPanel,
    props: true
  },
  {
    path: '/task/:name',
    name: 'Task',
    component: Task,
    props: true
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
