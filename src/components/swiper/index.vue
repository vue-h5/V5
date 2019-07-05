<template>
    <div class="v5-swiper">
        <div 
            class="v5-swiper-display" 
            :style="styles"
            @touchstart="iTouchstart"
            @touchmove="iTouchmove"
            @touchend="iTouchend"
        >
            <slot/>
        </div>

        <slot name="indicator">
            <ul :class="['v5-swiper-indicators', {vertical}]">
                <li v-for="item in childSize" :key="item" :class="{current: item-1 == currentIndex}">{{item}}</li>
            </ul>
        </slot>
    </div>
</template>

<script>
import Scroll from '../../mixins/scroll.js'

export default {
    name: 'v5-swiper',
    mixins: [Scroll],
    props: {
        // 垂直 true 水平false
        vertical: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 滚动类型[swiper picker]
            scrollType: 'swiper',
            // 滚动盒子
            scrollBox: '.v5-swiper-display',
            // 当前索引
            current: 0,
            // 自动定时器
            timeEvent: null,
        }
    },
    watch: {
        currentIndex (val) {
            this.$emit('change', val)
        }
    },
    computed: {
        swiperVertical () {
            return this.vertical
        }
    },
    mounted () {
        this.scrollInit(this.setMaxX)
        this.init()
    },
    methods: {
        init () {
            if (this.autoplay) {
                this.swiperAnimate()
            }
        },

        iTouchstart (evt) {
            clearTimeout(this.timeEvent)

            if (this.childSize > 1)
                this.touchstart(evt)
        },

        iTouchmove (evt) {
            if (this.childSize > 1) {
                this.touchmove(evt)
            }
        },

        iTouchend (evt) {
            this.touchend(evt)

            if (this.autoplay) {
                this.current = this.currentIndex
                this.swiperAnimate(3000)
            }
        },

        swiperAnimate (time = this.autoplay) {
            this.timeEvent = setTimeout(() => {
                if (this.current >= this.childSize) {
                    this.current = 0
                    this.currentIndex = 0
                    this.$children[0].styles.transform = `translate3d(0,0,0)`
                    this.styles.transitionDuration = '0ms'
                    this.position.x = 0
                    this.position.y = 0
    
                    this.swiperAnimate(50)
                    return
                } else {
                    this.current++
                    this.currentIndex = this.current
        
                    if (this.swiperVertical) {
                        this.position.y = this.current * -this.itemHeight

                        if (this.current === this.childSize) {
                            this.currentIndex = 0
                            this.$children[0].styles.transform = `translate3d(0, ${this.itemHeight * this.childSize}px,0)`
                        }
                    } else {
                        this.position.x = this.current * -this.itemWidth

                        // 当索引指到与个数相同时
                        if (this.current === this.childSize) {
                            // 将第一个子元素后置
                            this.$children[0].styles.transform = `translate3d(${this.styles.width},0,0)`
                            // 索引归0
                            this.currentIndex = 0
                        }
                    }
        
                    this.styles.transitionDuration = '300ms'
                    this.swiperAnimate()
                }
    

            }, time)
        }
    }
}
</script>

