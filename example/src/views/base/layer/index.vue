<template>
    <section class="layer-demo-mod">
        <h2>Layer 弹层</h2>
        
        <p>基础效果</p>
        <button @click="show = !show">{{show ? '关闭' : '打开'}}</button>

        <v5-layer class="demo-1" :show="show">
            <h1>Hello World</h1>
            <button @click="show = !show">close</button>
        </v5-layer>

        <p>环绕效果</p>
        <label v-for="(item, index) in position" :key="index">
            <input type="radio" name="position" :value="item" :checked="item == positionVal" v-model="positionVal">
            {{item}}
        </label>

        <button @click="positionShow = !positionShow">打开</button>

        <v5-layer class="demo-1" :show="positionShow" :position="positionVal">
            <h1>Hello World</h1>
            <button @click="positionShow = !positionShow">close</button>
        </v5-layer>
    </section>
</template>

<script>
export default {
    name: 'layer-demo',
    data () {
        return {
            show: false,
            position: ['top', 'right', 'bottom', 'left'],
            positionVal: 'top',
            positionShow: false
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-1 {
    display: flex;
    justify-content: center;
    align-items: center;

    /deep/ .v5-layer-inner {
        padding: 10px;
        text-align: center;
        border-radius: 2px;
        background: #fff;
    }
}
</style>
