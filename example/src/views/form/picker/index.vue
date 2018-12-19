<template>
    <section class="from-view">
        <h2>Picker 选择器</h2>
        
        <h3>地区: {{city}}</h3>
        <v5-picker v-model="city" :data="citys"/>
        
        <h3>时间: {{year}}</h3>
        <v5-picker v-model="year" :data="date"/>
    </section>  
</template>

<script>
export default {
    name: 'v5-picker-demo',
    data () {
        return {
            city: 'tianjing',
            citys: [
                {
                    label: '安徽',
                    value: 'anhui',
                    disabled: true
                }, 
                {
                    label: '浙江',
                    value: 'zhejiang'
                }, 
                {
                    label: '上海',
                    value: 'shanghai'
                },
                {
                    label: '北京',
                    value: 'beijing',
                    disabled: true
                },
                {
                    label: '天津',
                    value: 'tianjing'
                },
                {
                    label: '重庆',
                    value: 'chongqing',
                    disabled: true
                },
            ],
            year: new Date().getFullYear(),
            date: []
        }
    },
    mounted () {
        for (let i = 1949; i < 2200; i++) {
            this.date.push({
                label: i,
                value: i  
            })
        }
    }
}
</script>
