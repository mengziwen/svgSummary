<template>
	<a-layout id="layout">
		<headerBox />
		<!-- <a-layout-content class="lay-body"> -->
			<!-- <siderBox /> -->
			<router-view id="layout-content"/>
		<!-- </a-layout-content> -->
	</a-layout>
</template>

<script lang="ts">
import headerBox from '@/components/headerbox.vue'
import siderBox from '@/components/siderbox.vue'
import {Vue, Component} from 'vue-property-decorator'
@Component({
	components: {headerBox, siderBox}
})
export default class Layout extends Vue {}
</script>

<style lang="less">
#layout{
	background: white;
	height: 100vh;
	#layout-content{
		
		overflow: hidden;
	}
	.lay-body{
		display: flex;
	}
	#sider{
		height: 100%;
	}
}
</style>

