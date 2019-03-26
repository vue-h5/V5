<template>
    <section class="v5-datepicker-demo">
        <h2>Datepicker - 时间选择器</h2>

        <div class="box">
            <v5-cell sub-title="type='Y/M/D/HH/MM/SS'" title="自定义时间显示" :inner="realTime"/>
            <v5-datepicker v-model="realTime" type="Y/M/D/HH/MM/SS" :format="format"/>

            <div class="mark">
                <p>你也可以自己定义时间的显示内容，通过<code>/</code>来分隔。</p>
            </div>
        </div>

        <div class="box">
            <v5-cell sub-title="type='date'" title="函数式自定义显示" :inner="currentDate"/>
            <v5-datepicker type="date" v-model="currentDate" :format="formatEvt"/>
        </div>
       
        <div class="box">
            <v5-cell sub-title="type='date'" title="自定义过滤时间" :inner="currentDate"/>
            <v5-datepicker v-model="currentDate" :disDate="disDate"/>

            <div class="mark">
                <strong>以下日期不可以选择：</strong>
                <p>元旦: 2019/1/1</p>
                <p>春节: 2019/2/2-10</p>
                <p>妇女节: 2019/3/8 13:30-17:50</p>
                <p>午休: 2019/3/25 11-13</p>
                <p>劳动节: 2019/5/1-4</p>
                <p>国庆节: 2019/10/1-7</p>
                <p>2019/11-12</p>
                <p>2021-2022</p>
            </div>
        </div>

        <div class="box">
            <v5-cell sub-title="type='datetime'" title="给定时间区间" :inner="currentDate"/>
            <v5-datepicker :startDate="startDate" :endDate="endDate" v-model="currentDate"/>

            <div class="mark">
                <p>startDate: 2018-2-14 12:30</p>
                <p>endDate: 2020-2-14 12:30</p>
            </div>
        </div>

        <div class="box">
            <v5-cell sub-title="type='time'" title="time" :inner="currentTime"/>
            <v5-datepicker type="time" :startTime="startTime" :endTime="endTime" v-model="currentTime"/>
            <div class="mark">
                <p>startTime: 8:30</p>
                <p>endTime: 17:30</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'v5-datepicker-demo',
    data () {
        return {
            currentDate: new Date,
            currentTime: '12:20',
            format: {
                year: '年',
                month: '月',
                date: '日',
                hour: '时',
                minutes: '分',
                seconds: '秒'
            },
            startDate: new Date(2018, 1, 14, 12, 30),
            endDate: new Date(2020, 1, 14, 12, 30),
            startTime: '8:30',
            endTime: '17:30',
            realTime: new Date,
            disDate: {
                '2019/1/1': '元旦',
                '2019/2/2-10': '春节',
                '2019/3/8 13:30-17:50': '妇女节',
                '2019/3/25 11-13': '午休',
                '2019/5/1-4': '劳动节',
                '2019/10/1-7': '国庆节',
                '2019/11-12': '',
                '2021-2022': ''
            }
        }
    },
    mounted () {
        setInterval(()=> {
            // this.realTime = new Date
        }, 1000)
    },
    methods: {
        formatEvt (type, value) {
            let label = value
            // 注意：disabled 都是true时，即没有可选内容时
            // 全卡死，因为无法给出推荐选择
            let disabled = false
            switch (type) {
                case 'year':
                    // 2019不可选择
                    // disabled = value == 2020;
                    label = String(label).slice(-2)+'年'
                    break;
                case 'month':
                    if (value <= 9) label = `0${label}`;
                    label += 'M'
                    break;
                case 'date':
                    label = label+'th'
            }

            return {label, disabled}
        }
    }
}
</script>

<style lang="scss" scoped>
.v5-datepicker-demo {
    .box {
        margin: 2em 0;

        .mark {
            color: #999;
            padding: .5em 1em;
        }
    }
}
</style>

