<template>
    <div class="flex buttons">
        <div class=" flex1" @click="state.setting=true">
			<a-icon type="setting" class="setting"/>
		</div>
        <div id="opt">
            <div class="opt" @click="changeWindow('mini')"><i class="iconfont iconzuixiaohua"></i></div>
            <div class="opt" @click="changeWindow('max')"><i class="iconfont iconzuidahua"></i></div>
            <div class="opt" @click="changeWindow('close')"><i class="iconfont iconguanbi"></i></div>
        </div>
        <a-modal
			title="设置"
			v-model="state.setting"
			@ok="handleOk"
			@cancel="state.setting=false"
		>
			<div class="flex">
                <div class="line">临时corpId：</div>
                <div>
                    <a-input v-model="state.corpId"/>
                </div>
            </div>
            <div class="flex">
                <div class="line">服务器地址：</div>
                <div>
                    <a-input v-model="state.baseUrl"/>
                </div>
            </div>
		</a-modal>
    </div>
    
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class Opt extends Vue {
    public state:any={
        setting: false,
        corpId: '',
        baseUrl:''
    }
    public name: string = 'Opt';

    public mounted(){
        this.state.corpId = localStorage.getItem('corpId')||'123';
        this.$axios.defaults.headers.corpId = this.state.corpId;
        this.state.baseUrl = localStorage.getItem('baseUrl')||'http://192.168.6.211';
        if(process.env.NODE_ENV == 'production'){
            this.$axios.defaults.baseURL = this.state.baseUrl;
        }
        
    }

    public handleOk(){
        localStorage.setItem('corpId',this.state.corpId);
		this.$axios.defaults.headers.corpId = this.state.corpId;
        localStorage.setItem('baseUrl',this.state.baseUrl);
        if(process.env.NODE_ENV == 'production'){
            this.$axios.defaults.baseURL = this.state.baseUrl;
        }
        this.state.setting = false;
    }
    public changeWindow(action: string) {
        //
        switch (action) {
            case 'mini':
                this.$electron.ipcRenderer.send('minimize');
                break;
            case 'max':
                this.$electron.ipcRenderer.send('maximize');
                break;
            case 'close':
                this.closeApp();
                break;
        }
    }

    public closeApp() {
        const that =  this;
        this.$confirm({
            title: '您确定要退出状态机制造器吗?',
            content: '此操作将会退出状态机制造器',
            onOk() {
            return new Promise((resolve, reject) => {
                that.$electron.ipcRenderer.send('close');
            }).catch(() => console.log('Oops errors!'));
            },
        });
    }
}
</script>
<style lang="less">
.buttons{
    justify-content: flex-end;
    .setting{
        -webkit-app-region: no-drag;
    }
    #opt{
        color: #fff;
        width: 120px;    
        display: flex;
        .opt{
            flex: 1;
            cursor: pointer;
            -webkit-app-region: no-drag;
            text-align: center;
            margin: 0 .5rem;
        }
    }
}

@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1262258_71o7875xnxg.eot?t=1561530679605'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1262258_71o7875xnxg.eot?t=1561530679605#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALsAAsAAAAABuwAAAKfAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqBKIEkATYCJAMQCwoABCAFhG0HSBsWBsiemjwpEtgGipWABUTgBPHQN0b7szsnosml+uviqIdEopIgVCIlUTKheKZy/7umv8i+L3IIdJC7ppR7uVzBjUC4qUnA50mjkJusm9BtgIArzwH9P9fUq3mB5LezuVXn80jAgU0H1olrso1kQr5BdxETI67aeQKtJlUwHQ1NLIBTAtMC8Y6oAjitgJRJulloHFmb4jM0aC4fzd8APvHvx1+oy0nRUIG5xy8GZej54S0sWHaLu+5RBIIEf3MDKpaAJF6NJp6wiIRh0TrYagdo1qxwVk95YaFYlCZezId/eYSiEo1AaTvYCpKVH15MEvwoJyn8WChRwUGMzb4oNQOsh5TxrFCUBI/s6LgbguBsgXzgt3ZdnL/tlWfvLl53S/h14Lwsc7v3flFq3Oy+TH0Neu3Cf5+69Z5xcFkd/e5Y+vjAHcx6H8WRbMkQBk7QgJ+rX01XgPrBAtzWZ0sNE4Ivhb627UDHP6cnwffWumbuu01YpwSnEa4WuqFwZUvWYmDMLCVY0LjS6O4pBa1a4XIZev2doRpYHSM0W8IEiiYTUDWbQpOyBA3abEGjZrvQatHw5jZ9GIvIFiw48iB0e4Ki0zeouv2gSfmFBoP+oVF3Fmh1GZE928xE3P0MCxzLSMwjItG0gszcLcrnsGokBWaKOXMJM52EUW1VTTc9jNOYnbFAz6h1nCtIYTSFhrzLcDJJkcZoHEu8Ksa51lZdrYy9qUqiKXA7xGACDpMhojyEkFBpCu3OuXufn4OpDEkCNlOx4l2CMTrSP1KrSs0KdFiRXlXxLdfoMlR1OE6BKBgqBRnybFgSJihEGx8Vh0m4KrEdMU2b6qCTslZRdb8q9QP5SQ3gwIwSNTIatL43SI4INGYITqWTBaG1qzieFgkAAA==') format('woff2'),
  url('//at.alicdn.com/t/font_1262258_71o7875xnxg.woff?t=1561530679605') format('woff'),
  url('//at.alicdn.com/t/font_1262258_71o7875xnxg.ttf?t=1561530679605') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1262258_71o7875xnxg.svg?t=1561530679605#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconzuixiaohua:before {
  content: "\e60c";
}

.iconzuidahua:before {
  content: "\e62b";
}

.iconguanbi:before {
  content: "\e654";
}

</style>


