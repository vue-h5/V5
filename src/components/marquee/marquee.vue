<template>
    <div class="v5-marquee-mod" :style="style">
        <span class="v5-marquee-inner v5-marquee-origin" :style="originStyle"><slot></slot></span>
        <span class="v5-marquee-inner v5-marquee-right" :style="mirrorStyle"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: 'v5-marquee',
    props: {
        // 滚动速度
        speed: {
            type: Number,
            default: 3
        },
        // 间隔，主要针对内容大于盒子时，连接之前添加空格
        gap: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 原始信息
            originEl: null,
            originStyle: {},
            mirrorStyle: {},
            // 容器的信息
            BCR: {},
            style: {}
        }
    },
    mounted () {
        this.originEl = this.$el.querySelector('.v5-marquee-origin')
        this.BCR = this.$el.getBoundingClientRect()
        this.init()
    },
    methods: {
        init () {
            // 设置容器大小
            this.style = {
                height: this.originEl.scrollHeight + 'px'
            }

            let left = this.BCR.width + 'px'
            let width = left
            let animation = `v5-marquee ${this.speed}s linear 0s infinite`
            let originW = this.originEl.scrollWidth

            if (originW > this.BCR.width) {
               left = originW + this.gap + 'px'
               width = left
            }

            this.mirrorStyle = { left, width, animation }
            this.originStyle = { width, animation }
        },
        update () {
            this.originStyle = {}
            this.mirrorStyle = {}

            this.$nextTick(() => {
                this.init()
            })
        }
    }
}
</script>
