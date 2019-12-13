<template>
    <div class="menu flex">
        <div class="foldMenu">
            <a-menu class="menu" v-show="!state.fold"
                @click="handleClick"
                style="width: 250px"
                :defaultSelectedKeys="['list']"
                :openKeys.sync="state.openKeys"
                mode="inline"
                >
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="bars" /><span>菜单</span></span>
                    <a-menu-item key="list">loading</a-menu-item>
                    <a-menu-item key="instanceList">暂无</a-menu-item>
                </a-sub-menu>
            </a-menu>
            <div class="fold">
                <a-icon type="swap" @click="state.fold=!state.fold"/>
            </div>
        </div>
        <div class="rightContent flex1">
            <router-view/>
        </div>
        
    </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import moment from 'moment'
@Component({
    filters: {
        time: (value: string)=> moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
})
export default class Index extends Vue {
    public state: any = {
        openKeys: ['sub1'],
        fold:false,
    }
    
    public handleClick(e: any) {
        this.$router.push('/' + e.key);
    }
}
</script>
<style lang="less">
.menu{
    height: 100%;
    .foldMenu{
        position: relative;
        .fold{
            z-index: 999;
            position: absolute;
            top:50%;
            right: -15px;
            background: lightblue;
            border: 1px solid grey;
            border-radius: 3px;
        }
    }
    .rightContent{
        overflow: auto;
        &::-webkit-scrollbar{
			width: 1rem;
			height: 1rem;
		}
    }
}
</style>