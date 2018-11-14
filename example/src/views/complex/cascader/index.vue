<template>
    <div>
        <h2>集联组件</h2>
        
        <h3>基础示例</h3>
		<p @click="show = !show">目前选择为: {{value}}</p>

        <v5-cascader :show.sync="show" :data="data" v-model="value" deep/>

        <h3>可以选择父级</h3>
		<p @click="show2 = !show2">目前选择为: {{value}}</p>

        <v5-cascader :show.sync="show2" :data="data" v-model="value"/>
        
        <h3>自定义选择条件</h3>
		<p @click="show3 = !show3">目前选择为: {{value2}}</p>

        <v5-cascader :show.sync="show3" :data="data2" v-model="value2" :filter="filter"/>
    </div>
</template>

<script>
export default {
    name: 'cascader-demo',
    data () {
        return {
            show: false,
            show2: false,
            show3: false,
            value2: [],
            value: ['jiangsu', 'nanjing', 'fuzimiao'],
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    subTitle: '中国·首都',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫',
                            disabled: true
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, 
                {
                    value: 'jiangsu',
                    label: '江苏',
                    disabled: true,
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            subTitle: '省会',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                },
                {
                    value: 'zhejiang',
                    label: '浙江',
                    children: [
                        {
                            value: 'hangzhou',
                            label: '杭州',
                            subTitle: '省会',
                            children: [
                                {
                                    value: 'xihu',
                                    label: '西湖'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'taiwang',
                    label: '台湾',
                    disabled: true,
                    children: [
                        {
                            value: 'taibei',
                            label: '台北'
                        }
                    ]
                },
            ],
            data2: [
                {
                    value: 1000,
                    label: 1000,
                    children: [
                        {
                            value: 1100,
                            label: 1100
                        },
                        {
                            value: 1200,
                            label: 1200,
                            children: [
                                {
                                    value: 1210,
                                    label: 1210
                                },
                                {
                                    value: 1220,
                                    label: 1220
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 2000,
                    label: 2000,
                    children: [
                        {
                            value: 2100,
                            label: 2100
                        },
                        {
                            value: 2200,
                            label: 2200
                        }
                    ]
                },
                {
                    value: 3000,
                    label: 3000,
                    children: [
                        {
                            value: 3100,
                            label: 3100
                        },
                        {
                            value: 3100,
                            label: 3100
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        filter (item, deep) {
            // 如果选择的项目 值大于2000的可以选择确认
            deep = item.value > 2000

            return deep
        }
    }
}
</script>
