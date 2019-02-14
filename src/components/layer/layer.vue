<template>
    <div 
        :class="['v5-layer-mod', position, {show}]" 
        @click.passive.self="clickEvt()"
        :style="styles"
    >
        <slot name="inner">
            <div class="v5-layer-inner">
                <slot/>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'v5-layer',
    props: {
        // 控制弹层显隐
        show: {
            type: Boolean,
            default: false
        },
        // 确认动画出现的方式，top left right bottom或空
        position: {
            type: String,
            default: ''
        },
        // 定义动画时长效果
        duration: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            styles: {
                transitionDuration: 300,
                zIndex: 1000
            }
        }
    },
    methods: {
        clickEvt () {
            this.$emit('click', this.show)
        }
    },
    watch: {
        show (val) {
            this.styles.zIndex =  Number(String(new Date().getTime()).slice(-7))
        },
        duration: {
            handler (val) {
                if (this.position)
                    this.styles.transitionDuration = `${val}ms`
            },
            immediate: true
        }
    }
}
</script>
