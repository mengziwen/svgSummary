<template>
    <div class="log2">
        <div>
            <div class="flex">
                <div>结束时间：</div>
                <div>
                    <a-date-picker showTime @change="selectDate"/>
                </div>
                <div>
                    <a-button type="primary" @click="check">查询</a-button>
                </div>
            </div>
            <div class="flex">
                <div class="flex1 line">显示条数：</div>
                <div class="flex2">
                    <a-input v-model="state.maxPageSize"/>
                </div>
                <div class="flex1 line"></div>
                <div class="flex2">
                </div>
            </div>
        </div>
        <a-table
            :columns="state.columns"
            :rowKey="record => record.id"
            :dataSource="state.data"
            :pagination="false"
        />
    </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component
export default class Log2 extends Vue{
    @Prop(String) instanceCode!: string;
    public state: any = {
        maxPageSize:30,
        time:'',
        columns:[
            {title: 'code',dataIndex: 'actionCode'},
            {title: '机器状态',dataIndex: 'machineState'},
            {title: '事件',dataIndex: 'eventCode'},
            {title: '阶段',dataIndex: 'transferStep'},
			{title: 'id',dataIndex: 'receiveId'},
			
		],
		data: [],
    }
    public maxPageSize = 30;
    public time = '';
    public interval: any = null;
    public mounted(){
        this.searchTableData();
        this.interval = setInterval(() => {
			this.searchTableData();
		},3000);
    }
    public beforeDestroy(){
		clearInterval(this.interval);
    }
    public check(){
        clearInterval(this.interval);
        this.maxPageSize = this.state.maxPageSize;
        this.time = this.state.time;
        if(this.state.time){
            this.searchTableData();
        }else{
            this.searchTableData();
            this.interval = setInterval(() => {
                this.searchTableData();
            },3000);
        }
    }
    public selectDate(date: any, dateString: string){
        if(date){
            this.state.time = date._d.getTime();
        }else{
            this.state.time = '';
        }
    }
    public async searchTableData(){
		let res = await this.$axios.post('/api/smartfsm/v1/machineAdmin/getActionLogByInstance', {
			instanceCode: this.instanceCode,
			maxPageSize: this.maxPageSize,
			endTime: this.time?this.time:new Date().getTime()
		});
		this.state.data = res.data;
	}
}
</script>
<style lang="less">
.log2{
    height: 600px;
}
</style>