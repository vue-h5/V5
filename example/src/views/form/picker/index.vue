<template>
    <section class="from-view">
        <h2>Picker 选择器</h2>
        
        <v5-field label="地区" v-model="city" readonly/>
        <v5-picker v-model="city" :data="citys"/>
        <br/>
        
        <v5-field label="城市" v-model="myCity" readonly/>
        <v5-picker v-model="myCity" :data="myCitys"/>
        <br/>

        <v5-field label="非联动效果" v-model="hero" readonly/>
        <v5-picker v-model="hero" disformat :data="heros"/>
        <br/>

        <v5-field label="年" v-model="year" readonly/>
        <v5-picker v-model="year" :data="date"/>
        <br/>
        
        <v5-field label="时间" v-model="time" readonly/>
        <v5-picker v-model="time" :data="dateTime" disformat @update="update"/>
        
    </section>  
</template>

<script>
import chinaCitys from './citys.js'

export default {
    name: 'v5-picker-demo',
    data () {
        return {
            city: ['anhui'],
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
            myCity: ['北京', '北京', '朝阳区'],
            myCitys: chinaCitys,
            dateTime: [[], [], []],
            time: [2018, 12, 25],
            heros: [
                [{
                    label: '孙悟空',
                    value: '孙悟空'
                }, {
                    label: '唐僧',
                    value: '唐僧'
                }, {
                    label: '猪八戒',
                    value: '猪八戒'
                }, {
                    label: '沙僧',
                    value: '沙僧'
                }],
                [{
                    label: '金箍棒',
                    value: '金箍棒'
                }, {
                    label: '九齿钉耙',
                    value: '九齿钉耙'
                }, {
                    label: '紫金袈裟',
                    value: '紫金袈裟'
                }, {
                    label: '月牙铲',
                    value: '月牙铲'
                }]
            ],
            hero: ['孙悟空', '金箍棒']
        }
    },
    mounted () {
        setTimeout(() => {
            for (let i = 1949; i < 2200; i++) {
                this.date.push({
                    label: i,
                    value: i  
                })

                this.dateTime[0].push({
                    label: i,
                    value: i
                })
            }

            // 
            for (let i = 1; i < 13; i++) {
                this.dateTime[1].push({
                    label: i,
                    value: i
                })
            }

            this.getDate()

        }, 3000)
    },
    methods: {
        update (item, index) {
            // 如果更新索引是 1 即为月时更新天数
            if (index === 1) {
                this.time[2] = 1
                this.getDate()
            }
        },

        getDate () {
            let days = new Date(this.time[0], this.time[1], 0).getDate()

            this.dateTime[2] = []
            
            for (let i = 1; i <= days; i++) {
                this.dateTime[2].push({
                    label: i,
                    value: i
                })
            }
        }
    }

}
</script>
