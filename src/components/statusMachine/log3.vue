<template>
    <div class="log3">
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
                <div class="flex1 line">receiveId：</div>
                <div class="flex2">
                    <a-input v-model="state.receiveId"/>
                </div>
                <div class="flex1 line">显示条数：</div>
                <div class="flex2">
                    <a-input v-model="state.maxPageSize"/>
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
export default class Log3 extends Vue{
    @Prop(String) instanceCode!: string;

    public state: any = {
        receiveId:'',
        maxPageSize:30,
        time:'',
        columns:[
            {title: '类型',dataIndex: 'logType'},
            {title: '事件',dataIndex: 'eventCode'},
            {title: '源/code',dataIndex: 'source'},
            {title: '目的/阶段',dataIndex: 'target'},
            {title: '机器状态',dataIndex: 'machineState'},
			{title: 'id',dataIndex: 'receiveId'},
		],
		data: [],
    }
    public maxPageSize = 30;
    public receiveId = '';
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
        this.receiveId = this.state.receiveId;
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
		let res = await this.$axios.post('/api/smartfsm/v1/machineAdmin/getAllLogByReceiveId', {
			instanceCode: this.instanceCode,
			maxPageSize: this.maxPageSize,
            receiveId: this.receiveId,
			endTime: this.time?this.time:new Date().getTime()
        });
        if(res.data){
            for(let item of res.data){
                if(item.respType == "respAction"){
                    item.source = item.actionCode;
                    item.target = item.transferStep;
                }
            }
        }
		this.state.data = res.data;
	}
}
</script>
<style lang="less">
.log3{
    height: 600px;
}
</style>