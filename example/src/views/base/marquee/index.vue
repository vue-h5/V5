<template>
    <section class="marquee-view">
        <h2>弹幕</h2>
        <v5-marquee :speed="5">{{mes}}</v5-marquee>
        <v5-marquee :speed="20" :gap="50">{{mes2}}</v5-marquee>
        <div class="box">
            <v5-marquee class="txt" :speed="5">{{mes}}</v5-marquee>
            <v5-marquee class="txt" :speed="20" :gap="50">{{mes2}}</v5-marquee>
        </div>
    </section>
</template>

<script>
export default {
    name: 'marquee-demo',
    data () {
        return {
            mes: '举杯邀明月，对影成三人。',
            mes2: '花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。月既不解饮，影徒随我身。暂伴月将影，行乐须及春。我歌月徘徊，我舞影零乱。醒时同交欢，醉后各分散。永结无情游，相期邈云汉。'
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 50vw;
    border: 2px solid #000;
    background: #333;

    .txt {
        color: #FFC107;
        font-size: 14px;
    }
}
</style>
