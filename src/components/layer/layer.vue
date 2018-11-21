<template>
    <div 
        :class="['v5-layer-mod', position, {show: show}]" 
        @click.passive.self="clickEvt()"
        :style="{zIndex}"
    >
        <div class="v5-layer-inner">
            <slot/>
        </div>
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
        // 定义动画效果
        animate: {
            type: String,
            default: 'fade'
        }
    },
    data () {
        return {
            zIndex: 1000
        }
    },
    methods: {
        clickEvt () {
            this.$emit('click', this.show)
        }
    },
    watch: {
        show (val) {
            this.zIndex = new Date().getTime()
        }
    }
}
</script>
