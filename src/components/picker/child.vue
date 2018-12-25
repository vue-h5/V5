<template>
<div style="width: 100%">

    <div class="v5-picker-item">
        <ul 
            class="v5-picker-ul" 
            :style="styles"
        >
            <li 
                v-for="(item, index) in data" 
                :key="index" 
                :disabled="item.disabled"
                @touchmove="touchmove($event)"
                @touchstart="touchstart($event, index)"
                @touchend="touchend($event, index)"
            >
                {{item.label}}
            </li>
        </ul>
    </div>
        
</div>
</template>

<script>
export default {
    name: 'v5-picker-item',
    props: {
        value: {
            type: [String, Number]
        },
        data: {
            type: Array,
        },
        // picker 索引，由父级给定
        index: {
            type: Number,
        }
    },
    data () {
        return {
            y: 0,
            // 移动方向 0没有移动 1 向上  -1 向下
            direction: 0,
            cacheY: 0,
            currentIndex: 0,
            // 最大可用距离
            maxY: 0,
            // 默认行高
            itemHeight: 44,
            // 默认样式
            styles: {
                transform: '',
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                transitionDuration: '0s',
                transition: 'transform'
            },
            // 记录点击时的位置
            start: 0,
            // 点击时的时间辍
            sTime: 0,
            isMove: false
        }
    },
    watch: {
        data (val) {
            this.init()
        },
        value (val) {
            this.init()
        },
        y (val) {
            this.styles.transform = `translateY(${val}px)`
        },
        currentIndex (val) {
            // 传值与自身的索引
            this.$emit('input', this.data[val], this.index)
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.styles.transform = `translateY(${this.y}px)`   
            this.styles.top = `${this.y}px` 
            
            this.$nextTick(() => {
                // 最大值
                this.maxY = this.$el.querySelector('ul').getBoundingClientRect().height || 0

                // 只有在maxY有大于0值的时候运行
                if (this.maxY) {
                    this.itemHeight = this.maxY / this.data.length
                    // 最大可用空间总长度减最后一个项目高度
                    this.maxY -= this.itemHeight
                }

                this.setDefaultVal()
            })
        },

        setDefaultVal () {
            for (let i = 0, l = this.data.length; i < l; i++) {
                if (this.value === this.data[i].value) {
                    this.currentIndex = i
                    break
                }
            }

            // 取到了默认值时，我们设置位置
            if (this.currentIndex !== 'undefined') this.goTo()
            // 没有取到值时，我们要设备为 0
            else this.currentIndex = 0
        },

        goTo (index = this.currentIndex) {
            this.styles.transitionDuration = '300ms'
            this.y = index * this.itemHeight * -1

            this.saveValue(index)
        },

        touchmove (evt) {
            evt.preventDefault()

            let touch = evt.touches[0]
            let pageY = touch.pageY
            let pageX = touch.pageX
            // 最新位置 = 最位置 + （页面现在位置 - 页面开始位置）
            this.y = this.cacheY + pageY - this.start
            this.isMove = true
        },

        touchstart (evt, index) {
            evt.preventDefault()
            // 取第一个点的位置
            this.start = evt.touches[0].pageY
            this.sTime = + new Date()
            // 设置过滤为0s
            this.styles.transitionDuration = '0s'
            // 记录当前的位置，用于后期使用
            this.cacheY = this.y
        },

        touchend (evt, index) {
            if (!this.isMove) {
                this.currentIndex = index
                this.goTo()
                return
            }
            // 加数度
            let moveY = evt.changedTouches[0].pageY - this.start
            let time = + new Date() - this.sTime
            let speed = moveY / time
            // 0.001 摩擦力
            let cacheTime = Math.abs(speed) / 0.001
            // 缓动距离 = 速度 * 缓动时间
            let y = speed * cacheTime

            // 如果结束时，速度大于 0.25,我们就加上缓动距离
            if (Math.abs(speed) > 0.25) {
                this.y += y
                this.styles.transitionDuration = cacheTime+'ms'
            } else {
                this.styles.transitionDuration = '300ms'
            }
            // 设置滚动方向
            this.direction = this.y - this.cacheY > 0 ? 1 : -1
            this.isMove = false

            this.fixedCorrection()
            this.safeY()
        },
        // 安全距离计算
        safeY () {
            // y 不能小于 0
            this.y = this.y < 0 ? this.y : 0
            // y 最大可移动距离为 maxY
            this.y = Math.abs(this.y) > this.maxY ? -this.maxY : this.y
            
            this.saveValue()
        },
        // 保障最终安全值
        saveValue (index) {
            // 取传入的值，没有时计算
            this.currentIndex = index || Math.abs(this.y / this.itemHeight)
            let currentItem = this.data[this.currentIndex]

            if (!currentItem) return
            // 处理 disabled 的元素
            if (currentItem.disabled) {
                let nextIndex = 0
                let prveIndex = 0
                // 取后面最近没有disabled的元素，记录步长
                for (let i = this.currentIndex; i < this.data.length; i++) {
                    nextIndex++
                    if (!this.data[i].disabled) break
                }
                // 取前面最近没有disabled的元素，记录步长
                for (let n = this.currentIndex; n > 0; n--) {
                    prveIndex++
                    if (!this.data[n].disabled) break
                }

                // 清楚一步，因为第一次取值都是当前的disabled的元素
                nextIndex--
                prveIndex--

                // 组成新的数组
                let arr = [{
                    type: 'prev',
                    value: prveIndex
                }, {
                    type: 'next',
                    value: nextIndex
                }]
                let min = {}
                // 取前后最小的内容
                for (let i = 0; i < 2; i++) {
                    if (arr[i].value) {
                        if (min.length) {
                            min = min.value > arr[i].value ? min : arr[i]
                        } else {
                            min = arr[i]
                        }
                    }
                }

                // 设置当前的索引为最近的步长数
                this.currentIndex = min.type === 'next' 
                    ? this.currentIndex + min.value
                    : this.currentIndex - min.value
                this.y = this.currentIndex * this.itemHeight *-1
            }
        },
        // 固定偏差 修复移动后，内容不居中的问题
        fixedCorrection () {
            let fixY = Math.abs(this.y % this.itemHeight)

            fixY = fixY > this.itemHeight / 2 ? fixY - this.itemHeight : fixY

            this.y += fixY
        }
    },

}
</script>
