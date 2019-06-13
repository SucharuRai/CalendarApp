import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Events from '@/components/Events'
import AddEvent from '@/components/AddEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/events/new',
      name: 'AddEvent',
      component: AddEvent
    }
  ]
})
