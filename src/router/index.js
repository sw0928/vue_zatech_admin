import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@/views/homePage'

import white from '@/views/white/index'
import loginIn from '@/views/loginIn/index'
import tepArr from './routerArr.js'
let routerArr = tepArr.map(item => {
	return {
		path: item.name,
		name: item.name,
		component: () => import(`@/views/${item.name}/index`),
		meta: {
			title: item.title,
		}
	}
})

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const router =  new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '',
      redirect: '/homePage'
    },
    {
      path: '/white',
      name: 'white',
      component: white
    },
    {
      path: '/loginIn',
      name: 'loginIn',
      component: loginIn,
      meta:{
        title:'友邦人壽後台管理'
    }
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      children: [
        {
        		path: '',
        		redirect: 'welcome'
        	},
        ...routerArr
      ]
    },
    {
      path: '*',
			redirect: '/homePage'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
      document.title = to.meta.title
    }
		next()
})
export default router
