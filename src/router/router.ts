
import Lay from '@/views/layout.vue'
import menu from '@/views/statusMachine/menu.vue'
import test from '@/views/statusMachine/test.vue'
export const path = [
	{
		path: '/',
		component: Lay,
		children: [
			{
				path: '/',
				name: 'menu',
				component: menu,
				children:[
					
					{
						path: '/',
						name: 'test',
						component: test
					},
				]
			},
			
		]
	},
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
	// }
]
