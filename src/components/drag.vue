<template>
	<div id="drag" :class="getcontrol ? 'active' : ''" @mouseleave="mouseover">
		<opt />
	</div>
</template>
<script lang="ts">
import { Vue, Component} from 'vue-property-decorator'
import opt from './opt.vue';
import { Getter, Mutation} from 'vuex-class'
import { setTimeout } from 'timers';
@Component({
	components: {opt}
})
export default class Drag extends Vue {
	@Mutation public SETSTATE: any
	public mouseover() {
		this.$nextTick(() => {
			this.SETSTATE(false);
		})
	}
	@Getter public control: any;
	get getcontrol() {
		return this.control;
	}
}
</script>
<style lang="less">
#drag{
	height: 44px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: red;
	top: -44px;
	transition: all .3s;
	display: flex;
	align-items: center;
	-webkit-app-region: drag;
	&.active{
		top: 0;
	}
}
</style>

