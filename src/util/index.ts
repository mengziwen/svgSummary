import store from './store'
import {instance} from './axios'
import {ui} from './plugin'

const install = (Vue: any) => {
	if (ui.state) {
		ui.install(Vue);
	}
	Vue.prototype.$axios = instance;
}
export {
	store,
	instance,
	install
}

