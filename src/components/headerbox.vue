<template>
	<a-layout-header id="header" class="drag">
		<opt />
		
	</a-layout-header>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import opt from '@/components/opt.vue'
import { Mutation } from 'vuex-class'
import { stat } from 'fs';
interface State {
	status: boolean,
	
}
@Component({
	components: {opt}
})
export default class Headerbox extends Vue {
	public state: State = {
		status: false,
	}
	
	@Mutation public SETSTATE: any
	public mousemove(e: any) {
		let status = false;
		if (e.clientY <= 5) {
			status = true;
		} else {
			status = false;
		}
		this.state.status = status;
	}
	get getstatus() {
		return this.state.status;
	}
	@Watch('getstatus')
	asd() {
		this.SETSTATE(this.getstatus)
	}
}
</script>
<style lang="less">
#header{
	color: #fff;
}
</style>


