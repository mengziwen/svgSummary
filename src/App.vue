<template>
 <div id="app">
	 <a-locale-provider :locale="locale">
	  	<router-view/>
		<loading v-if="state" />
		<drag />
	</a-locale-provider>
 </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {Getter, Mutation} from 'vuex-class';
import loading from '@/components/loading.vue';
import drag from '@/components/drag.vue';

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
@Component({
	components: {loading, drag},
})
export default class Layout extends Vue {
	public locale:any = zh_CN
	public state: boolean = true;
	@Getter public control: any;
	get getControl() {
		return this.control;
	}
	@Watch('$route.path', {immediate: true})
	public watchrouter() {
		setTimeout(() => {
			this.state = false;
		}, 100)
	}
	public created(){
		// this.$router.push('/menu');
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
