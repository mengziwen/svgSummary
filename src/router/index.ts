import Vue from 'vue'
import Router from 'vue-router'
import {path} from './router'
Vue.use(Router)
const routerTure = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: path
})

routerTure.beforeEach((to, from, next) => { 
	next()
})
const router = routerTure;
export {router, Router}
export default routerTure
