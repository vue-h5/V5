<template>
    <section class="layer-demo-mod">
        <h2>Layer 弹层</h2>
        
        <p>基础效果</p>
        <v5-button @click="show = !show">{{show ? '关闭' : '打开'}}</v5-button>

        <v5-layer class="demo-1" :show.sync="show" @click="toggle">
            <h1>Hello Layer</h1>

            <v5-button type="primary" @click="show = !show">关闭</v5-button>
        </v5-layer>

        <br/>
        <br/>

        <div>
            <p>环绕效果</p>
            <label v-for="(item, index) in position" :key="index">
                <input type="radio" name="position" :value="item" :checked="item == positionVal" v-model="positionVal">
                {{item}}
            </label>
        </div>

        <v5-button @click="positionShow = !positionShow">打开</v5-button>

        <v5-layer 
            class="demo-1" 
            :show.sync="positionShow" 
            :position="positionVal" 
        >
            <h1>Hello World</h1>

            <v5-button type="primary" @click="positionShow = !positionShow">关闭</v5-button>
        </v5-layer>

        <h3>自定义弹层效果</h3>
        <p>效果请选择 <code>left</code></p>
        <v5-button @click="customize = !customize">打开</v5-button>

        <v5-layer 
            class="demo-1" 
            :show.sync="customize" 
            :position="positionVal" 
        >
            <div class="customize-box" slot="inner">
                <h1>Hello World</h1>

                <v5-button type="primary" @click="customize = !customize">关闭</v5-button>
            </div>
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
            positionShow: false,
            customize: false
        }
    },
    methods: {
        toggle () {
            console.log('show', this.show)
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-1 {
    display: flex;
    justify-content: center;
    align-items: center;

    .v5-layer-inner {
        width: 80vw;
        height: 40vh;
        text-align: center;
        background: #fff;
    }
}

.customize-box {
    width: 100%;
    height: 100%;
    background: #fff;
    transition: 
        opacity .3s ease-in,
        transform .3s ease-in,
        background .3s ease-in;
}
.left {
    transition: background 300ms ease-out;

    .customize-box {
        opacity: 0;
        transform: scale(.5) translateX(-100%);
    
    }
    &.show {

        .customize-box {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }
}
</style>
