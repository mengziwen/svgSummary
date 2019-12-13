<template>
    <div class="log1">
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
                <div class="flex1 line">日志类型：</div>
                <div class="flex2">
                    <a-select style="width: 120px" @change="handleChange">
                        <a-select-option :value="item.key" v-for="item in state.option" :key="item.key">
                            {{item.value}}
                        </a-select-option>
                    </a-select>
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
export default class Log1 extends Vue{
    @Prop(String) instanceCode!: string;

    public state: any = {
        logType:'',
        maxPageSize:30,
        time:'',
        option:[
            {
                key:'',
                value:'全部'
            },
            {
                key:'eventPre',
                value:'收到事件0'
            },
            {
                key:'stateChangePre',
                value:'状态改变前1'
            },
            {
                key:'stateChangePost',
                value:'状态改变后4'
            },
            {
                key:'transitionPre',
                value:'迁变前2'
            },
            {
                key:'transitionPost',
                value:'迁变后3'
            },
        ],
        columns:[
            {title: '类型',dataIndex: 'logType'},
            {title: '事件',dataIndex: 'eventCode'},
            {title: '源',dataIndex: 'source'},
            {title: '目的',dataIndex: 'target'},
            {title: '机器状态',dataIndex: 'machineState'},
            {title: 'id',dataIndex: 'receiveId'},
			
		],
        data: [],
    }
    public maxPageSize = 30;
    public logType = '';
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
        this.logType = this.state.logType;
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
    public handleChange(e: any){
        this.state.logType = e;
    }
    public selectDate(date: any, dateString: string){
        if(date){
            this.state.time = date._d.getTime();
        }else{
            this.state.time = '';
        }
    }

    public async searchTableData(){
		let res = await this.$axios.post('/api/smartfsm/v1/machineAdmin/getLogByInstance', {
			instanceCode: this.instanceCode,
            maxPageSize: this.maxPageSize,
            logType: this.logType,
			endTime: this.time?this.time:new Date().getTime()
		});
		this.state.data = res.data;
	}
}
</script>
<style lang="less">
.log1{
    height: 600px;
}
</style>