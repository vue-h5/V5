<template>
    <section class="from-view">
        <h2>Picker 选择器</h2>
        
        <h3>地区: {{city}}</h3>
        <v5-picker v-model="city" :data="citys"/>
        
        <h3>时间: {{year}}</h3>
        <v5-picker v-model="year" :data="date"/>
        
        <h3>城市: {{myCity}}</h3>
        <v5-picker v-model="myCity" :data="myCitys"/>
    </section>  
</template>

<script>
export default {
    name: 'v5-picker-demo',
    data () {
        return {
            city: ['tianjing'],
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
            year: [new Date().getFullYear()],
            date: [],
            myCity: ['zhejiang', 'ningbo'],
            myCitys: [
                {
                    label: '浙江',
                    value: 'zhejiang', 
                    children: [{
                        label: '杭州',
                        value: 'hanzhou'
                    }, {
                        label: '宁波',
                        value: 'ningbo',
                    }, {
                        label: '温州',
                        value: 'wenzhou'
                    }, {
                        label: '嘉兴',
                        value: 'jiaxin'
                    }, {
                        label: '湖州',
                        value: 'huzhou',
                        disabled: true
                    }]
                },
                {
                    label: '福建',
                    value: 'fujiang',
                    children: [{
                        label: '福州',
                        value: 'fuzhou'
                    }, {
                        label: '厦门',
                        value: 'xiamen'
                    }, {
                        label: '莆田',
                        value: 'putian'
                    }, {
                        label: '三明',
                        value: 'shangming'
                    }, {
                        label: '泉州',
                        value: 'quanzhou'
                    }]
                }
            ]
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
