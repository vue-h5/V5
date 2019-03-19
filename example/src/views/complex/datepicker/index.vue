<template>
    <section class="v5-datepicker-demo">
        <h2>Datepicker - 时间选择器</h2>
        <v5-cell sub-title="type='datetime'" title="datetime" :inner="currentDate"/>
        <v5-datepicker v-model="currentDate" :format="format"/>

        <h3>type="date"</h3>
        <v5-cell sub-title="type='date'" title="date" :inner="currentDate"/>
        <p>startDate: 2018-1-14 8:30</p>
        <p>startDate: 2020-1-14 17:30</p>
        <v5-datepicker :startDate="startDate" :endDate="endDate" v-model="currentDate"/>

        <h3>type="time"</h3>
        <v5-cell sub-title="type='time'" title="time" :inner="currentDate"/>
        <v5-datepicker type="time" :startTime="startTime" :endTime="endTime" v-model="currentDate"/>
    </section>
</template>

<script>
export default {
    name: 'v5-datepicker-demo',
    data () {
        return {
            currentDate: new Date(),
            format: {
                year: '年',
                month: '月',
                date: '日',
                hour: '时',
                minutes: '分'
            },
            startDate: new Date(2018, 1, 14, 8, 30),
            endDate: new Date(2020, 1, 14, 17, 30),
            startTime: '8:30',
            endTime: '17:30'
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-box {
    font-size: 16px;

    ul {
        
        li {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 2px;
            margin: 2px 0;
            text-align: center;

            span {

                background: #fff;
            }
        }
    }
}
</style>

