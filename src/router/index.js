import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import Forget from '@/components/login/Forget'
import Home from '@/components/home/Home'
import My from '@/components/my/My'
import FastPractice from '@/components/fastpractice/FastPractice'
import Collection from '@/components/my/Collection'
import Mistakes from '@/components/my/Mistakes'
import DailyPractice from '@/components/home/DailyPractice'
import Simulation from '@/components/home/Simulation'
import OrderPractice from '@/components/home/OrderPractice'
import SimPractice from '@/components/home/SimPractice'
import QuestionDetail from '@/components/public/QuestionDetail'
import QuestionDetailM from '@/components/public/QuestionDetailM'
import Hand from '@/components/home/Hand'
import Card from '@/components/home/Card'
import Privacy from '@/components/login/Privacy'
// import Redirect from '@/components/home/Redirect'
import { Toast } from 'mint-ui';

Vue.use(Router)

const router =  new Router({
  routes: [
	// {
	//   	path: '/redirect',
	//   	component: Redirect
	// },
    {
		path: '/login',
		component: Login
    },
	{
		path: '/register',
		component: Register
	},
	{
		path: '/forget',
		component: Forget
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/fastpractice',
		component: FastPractice,
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/my',
		name: 'my',
		component: My,
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/collection',
		component: Collection
	},
	{
		path: '/mistakes',
		component: Mistakes
	},
	{
		path: '/dailypractice',
		component: DailyPractice
	},
	{
		path: '/simulation',
		component: Simulation
	},
	{
		path: '/orderpractice',
		component: OrderPractice
	},
	{
		path: '/simpractice/:id',
		name: 'simpractice',
		component: SimPractice
	},
	{
		path: '/questiondetail/:id',
		name: 'questiondetail',
		component: QuestionDetail
	},
	{
		path: '/questiondetailm/:id',
		name: 'questiondetailm',
		component: QuestionDetailM
	},
	{
		path: '/hand',
		name: 'hand',
		component: Hand
	},
	{
		path: '/card',
		name: 'card',
		component: Card
	},
	{
		path: '/privacy',
		component: Privacy
	},
	{
		path: '*',
		redirect: '/home'
	}
  ]
});

//  路由权限控制 进入my组件时候 需要登录状态
     	router.beforeEach((to,from,next) => {
  		// console.log(to.meta.requiresAuth)
  		if(to.meta.requiresAuth){
  			// 如果不为空 说明已经登录 直接放行
 			// console.log(localStorage.getItem("token"));
  			if(localStorage.getItem("token")!= null){
  				next();
  			}else{
 				Toast({
						message: '请先登录！',
						duration: 1000
					});
  				next({path: "/login"});
  			}
  		}else{
  			next();
  		}
     	});

 export default router;
