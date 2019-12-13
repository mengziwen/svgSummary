import antDesign from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
declare global {
	interface Window { require: any; }
}
const ui = {
	install(Vue: any){
		if (Vue) {
			Vue.use(antDesign);
			console.log(process.env)
			if (!process.env.VUE_APP_IS_WEB) {
				Vue.prototype.$electron = window.require('electron');
			}
		} else {
			(window as any).vue.use(antDesign)
		}
	},
	state: true,
}
export {
	ui
}
