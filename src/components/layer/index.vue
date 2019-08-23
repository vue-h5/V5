<template>
    <transition 
        name="fade-in"
    >
    <div 
        :class="['v5-layer-mod', position]" 
        @click.passive.self="hideLayer"
        :style="styles"
        v-show="show"
    >
        <slot name="inner">
            <div class="v5-layer-inner">
                <slot/>
            </div>
        </slot>
    </div>
    </transition>
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
        }
    },
    data () {
        return {
            styles: {
                zIndex: 1000
            }
        }
    },
    methods: {
        hideLayer () {
            this.$emit('click')
            this.$emit('update:show', false)
        }
    },
    watch: {
        show (val) {
            this.styles.zIndex =  Number(String(Date.now()).slice(-7))
        }
    }
}
</script>
