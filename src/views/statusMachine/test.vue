<template>
    <div>
        <svg class="svg" xmlns="http://www.w3.org/2000/svg" id="main" version="1.1" width="1000px" height="1000px" ref="svg">
            <circle class="circle" cx="100" cy="100" r="40" stroke-width="2" fill="red">
                <animate attributeName="cy"
                 attributeType="XML"
                 dur="2s"
                 values="100 ; 50 ; 100 ; 100; 100"
                 keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1"
                 repeatCount="indefinite"/>
                <!-- <animateMotion id="ball" path="M 0 0 V -50 V 0 Z" dur="2s" begin="0; pause.end" repeatCount="indefinite" /> -->
            </circle>
            <circle class="circle" cx="200" cy="100" r="40" stroke-width="2" fill="yellow">
                <animate attributeName="cy"
                 attributeType="XML"
                 begin="+0.2s"
                 dur="2s"
                 values="100 ; 50 ; 100 ; 100; 100"
                 keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1"
                 repeatCount="indefinite"/>
            </circle>
            <circle class="circle" cx="300" cy="100" r="40" stroke-width="2" fill="green">
                <animate attributeName="cy"
                 attributeType="XML"
                 begin="+0.4s"
                 dur="2s"
                 values="100 ; 50 ; 100 ; 100; 100"
                 keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1"
                 repeatCount="indefinite"/>
            </circle>
            
        </svg>
    </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class test extends Vue {

}
</script>
<style lang="less">
.circle{
    stroke-width:0;
}
</style>