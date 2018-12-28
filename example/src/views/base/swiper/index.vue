<template>
    <section class="swiper-view">
        <h2>Swiper 轮播图</h2>

        <h3>水平滚动</h3>
        <v5-swiper :autoplay="2000">
            <v5-swiper-item class="demo-swiper">1</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">2</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">3</v5-swiper-item>
        </v5-swiper>
        
        <h3>垂直滚动</h3>
        <v5-swiper vertical :autoplay="2000">
            <v5-swiper-item class="demo-swiper">1</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">2</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">3</v5-swiper-item>
        </v5-swiper>

        <h3>宽度 90vw</h3>
        <v5-swiper class="horizontal-swiper">
            <v5-swiper-item class="demo-swiper">1</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">2</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">3</v5-swiper-item>
        </v5-swiper>
        
        <h3>单个 Swiper</h3>
        <v5-swiper>
            <v5-swiper-item class="demo-swiper">1</v5-swiper-item>
        </v5-swiper>
        
        <h3></h3>
        <v5-cell title="change 事件" sub-title="当前索引" :inner="currentIndex"/>
        <v5-swiper @change="myChange">
            <v5-swiper-item class="demo-swiper">1</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">2</v5-swiper-item>
            <v5-swiper-item class="demo-swiper">3</v5-swiper-item>
        </v5-swiper>
        
    </section>
</template>

<script>
export default {
    name: 'swiper-view',
    data () {
        return {
           currentIndex: 0
        }
    },
    methods: {
        myChange (index) {
            this.currentIndex = index
        }
    }
}
</script>

<style lang="scss" scoped>

.demo-swiper {
    width: 100vw;
    line-height: 150px;
    color: #fff;
    font-size: 42px;
    text-align: center;

    &:nth-child(1) {
        background-color: #4CAF50;
    }
    &:nth-child(2) {
        background-color: #03A9F4;
    }
    &:nth-child(3) {
        background-color: #FF9800;
    }
}

.horizontal-swiper {
    width: 90vw;

    .demo-swiper {
        width: 90vw;
    }
}
</style>
