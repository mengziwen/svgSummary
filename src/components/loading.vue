<template>
	<div class="loadingbox">
		<loading />
	</div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import loading from './loadings/lo_1.vue'
@Component({
	components: {loading}
})
export default class Loading extends Vue {

}
</script>
<style lang="less">
.loadingbox{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #404d5b;
}
</style>


