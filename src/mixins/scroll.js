export default {
    data () {
        return {
            position: { x: 0, y: 0},
            // 移动方向 0没有移动 1 向上  -1 向下
            direction: 0,
            // swiper 使用垂直，默认false，请在你的组件中设置此属性
            // swiperVertical: false,
            SCache: {x: 0, y: 0},
            currentIndex: 0,
            // 最大可用距离
            maxY: 0,
            maxX: 0,
            // 滚动元素
            scrollBoxEl: null,
            // 滚动元素下的子集
            children: 0,
            childSize: 0,
            // 默认单个元素高与宽
            itemHeight: 44,
            itemWidth: 0,
            // 默认样式
            styles: {
                width: 'auto',
                height: 'auto',
                transform: '',
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                transitionDuration: '0s',
                transition: 'transform'
            },
            // 记录点击时的位置
            start: {x: 0, y: 0},
            // 点击时的时间辍
            sTime: 0,
            // 是否在移动
            isMove: false,
            swiperPause: false
        }
    },
    watch: {
        position: {
            handler (val) {
                this.styles.transform = `translate3d(${val.x}px, ${val.y}px, 0px)`
            },
            deep: true
        }
    },
    methods: {
        /**
         * 
         * @param {function} cb 回调方法，用于组件自己处理默认值内容
         */
        scrollInit (cb) {
            this.styles.transform = `translateY(${this.position.y}px)`   
            this.styles.top = `${this.position.y}px` 
            
            this.$nextTick(() => {
                this.scrollBoxEl = this.$el.querySelector(this.scrollBox)
                this.children = this.scrollBoxEl.children
                this.childSize = this.children.length

                if (this.scrollType === 'picker') {
                    // 最大值
                    this.maxY = this.scrollBoxEl.getBoundingClientRect().height || 0

                    // 只有在maxY有大于0值的时候运行
                    if (this.maxY) {
                        this.itemHeight = this.maxY / this.childSize
                        // 最大可用空间总长度减最后一个项目高度
                        this.maxY -= this.itemHeight
                    }

                    this.setDefaultVal()
                } else if (this.scrollType === 'swiper') {
                    let firstChild = this.$children[0]
                    let firstChildBCR = firstChild.$el.getBoundingClientRect()
                    // 设置最大 x 轴移动距离
                    let elBCR = this.$el.getBoundingClientRect()

                    this.itemHeight = firstChildBCR.height
                    this.itemWidth = firstChildBCR.width 

                    // swiper y轴
                    if (this.swiperVertical) {
                        this.maxY = this.itemHeight * this.childSize
                        this.styles.height = this.itemHeight + 'px'
                        this.maxY -= this.itemHeight
                    } 
                    // swiper 在x轴滚动时，我们要对父盒子进行大小设置
                    else {
                        // this.itemWidth = elBCR.width
                        this.maxX = this.itemWidth * this.childSize
                        // 设置父容器最大宽度
                        this.styles.width = this.maxX + 'px'
                        this.maxX -= this.itemWidth
                    }
                }
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

            if (this.scrollType === 'picker') {
                this.position.y = index * this.itemHeight * -1
            }

            this.saveValue(index)
        },

        touchmove (evt) {
            evt.preventDefault()

            let touch = evt.touches[0]
            let x = 0
            let y = 0

            if (this.scrollType === 'picker') {
                // 最新位置 = 最位置 + （页面现在位置 - 页面开始位置）
                y = this.SCache.y + touch.pageY - this.start.y
            } 
            else if (this.scrollType === 'swiper') {
                if (this.swiperVertical) {
                    y = this.SCache.y + touch.pageY - this.start.y

                    // 大于 0 是反向从0滑动到swiper最后一位
                    if (y > 0) {
                        // 让最后一位元素移动到第一位元素前
                        this.$children[this.childSize -1].styles.transform = `translateY(-${this.itemHeight * this.childSize}px)`
                    }
                    // 如果移动的位置已经大于了整个最大可用范围时
                    // 我们让第一个元素到最后一个元素的位置 
                    else if (Math.abs(y) > this.maxY) {
                        this.$children[0].styles.transform = `translateY(${this.itemHeight * this.childSize}px)`
                    }

                } else {
                    x = this.SCache.x + touch.pageX - this.start.x

                    // 用于展示连续效果
                    // 当我们滚动到了1的前面时，移动最后一位到1前
                    if (x > 0) {
                        this.$children[this.childSize -1].styles.transform = `translateX(-${this.styles.width})`
                    }
                    else if (Math.abs(x) > this.maxX) {
                        this.$children[0].styles.transform = `translateX(${this.styles.width})`
                    }
                }
            }

            this.position = { x, y }
            this.isMove = true
        },

        touchstart (evt, index) {

            evt.preventDefault()
            // 取第一个点的位置
            this.start = {
                y: evt.touches[0].pageY,
                x: evt.touches[0].pageX
            }
            
            this.sTime = + new Date()
            // 设置过滤为0s
            this.styles.transitionDuration = '0s'
            
            // 实现无限循环功能
            if (this.scrollType === 'swiper') {
                // 垂直方向
                if (this.swiperVertical) {
                    if (this.position.y > 0) {
                        // 恢复正常主定位
                        this.position.y = - this.maxY
                        // 恢复子集定位
                        this.$children[this.childSize -1].styles.transform = `translateY(0px)`
                    } 
                    else if (Math.abs(this.position.y) > this.maxY) {
                        this.position.y = 0
                        this.$children[0].styles.transform = `translateY(0px)`
                    }
                } 
                // 水平方向
                else {
                    if (this.position.x > 0) {
                        // 恢复正常主定位
                        this.position.x = - this.maxX
                        // 恢复子集定位
                        this.$children[this.childSize -1].styles.transform = `translateX(0px)`
                    } 
                    else if (Math.abs(this.position.x) > this.maxX) {
                        this.position.x = 0
                        this.$children[0].styles.transform = `translateX(0px)`
                    }
                }
            }
            // 记录当前的位置，用于后期使用
            this.SCache = Object.assign({}, this.position)
        },

        touchend (evt, index) {
            if (!this.isMove) {
                this.currentIndex = index
                this.goTo()
                return
            }

            let moveY = evt.changedTouches[0].pageY - this.start.y
            let time = + new Date() - this.sTime

            // 加数度
            let speed = moveY / time
            // 0.001 摩擦力
            let cacheTime = Math.abs(speed) / 0.001
            // 缓动距离 = 速度 * 缓动时间
            let distance = speed * cacheTime

            if (this.scrollType === 'picker') {
                // 如果结束时，速度大于 0.25,我们就加上缓动距离
                if (Math.abs(speed) > 0.25) {
                    this.position.y += distance
                    this.styles.transitionDuration = cacheTime+'ms'
                } else {
                    this.styles.transitionDuration = '300ms'
                }
                // 设置滚动方向
                this.direction = this.position.y - this.SCacheY > 0 ? 1 : -1
            } 
            else if (this.scrollType === 'swiper') {
                
                if (this.swiperVertical) {
                    let result = this.swiperEnd(evt, time, this.itemHeight)

                    this.position.y += result.distance
                    cacheTime = result.cacheTime
                } else {
                    let result = this.swiperEnd(evt, time, this.itemWidth)
                    
                    this.position.x += result.distance
                    cacheTime = result.cacheTime
                }
                // 设置移动过渡时间
                this.styles.transitionDuration = cacheTime+'ms'
            }

            this.fixedCorrection()
            this.safePosition()
            this.isMove = false
        },
        /**
         * swiper touch end event
         * @param {event} evt touchend event
         * @param {number} endTime 结束时touch事件花费的时间
         * @param {numebr} cell 要处理的元素大小
         */
        swiperEnd (evt, endTime, cell) {
            // 最终移动距离
            let distance = 0
            // 目前方向上移动的距离
            let move = this.swiperVertical 
                ? evt.changedTouches[0].pageY - this.start.y
                : evt.changedTouches[0].pageX - this.start.x
            // 移动结束时的速度
            let speed = move / endTime
            // 模拟在有摩擦率下，最终停止需要的时间
            let cacheTime = Math.abs(speed) / 0.001
            // 对小于 300ms 的时间过滤
            cacheTime = cacheTime > 300 ? cacheTime : 300

            // 判断移动的距离的正数是否大于 1/10
            if (Math.abs(move) > cell / 10) {
                // 如果移动的距离大于 0，比如：移动了 30px,(假设cell的大小是 100px)
                // 因为 30 > 20 所以在用户停止时，我们要让整个元素移动，那我们还要移动的距离
                // 就是 100 - 30
                distance = move > 0 ? cell - move : (cell + move) * -1
            }

            return {
                distance,
                cacheTime
            }
        },

        // 安全距离计算
        safePosition () {
            if (this.scrollType === 'picker') {
                // y 不能小于 0
                this.position.y = this.position.y < 0 ? this.position.y : 0
                // y 最大可移动距离为 maxY
                this.position.y = Math.abs(this.position.y) > this.maxY ? -this.maxY : this.position.y
            }
            
            this.saveValue()
        },

        // 保障最终安全值
        saveValue (index) {
            if (this.scrollType === 'picker') {
                this.safePicker(index)
            }
            else if (this.scrollType === 'swiper') {
                this.safeSwiper(index)
            }
        },

        safePicker (index) {
            // 取传入的值，没有时计算
            this.currentIndex = index || Math.abs(this.position.y / this.itemHeight)
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
                this.position.y = this.currentIndex * this.itemHeight *-1
            }
        },

        safeSwiper (index) {
            let offset = this.position.x 
            let max = -this.maxX
            let item = this.itemWidth

            if (this.swiperVertical) {
                offset = this.position.y
                max = -this.maxY
                item = this.itemHeight
            }

            // 当偏移大于0，我们使用最大可移动值计算索引
            if (offset > 0) {
                offset = max
            } 
            // 当偏移超出了最大可偏移时，我们使用0计算
            else if (offset < max) {
                offset = 0
            }

            this.currentIndex = index || -offset / item
        },

        // 固定偏差 修复移动后，内容不居中的问题
        fixedCorrection () {
            let fun = (position, item) => {
                let fix = Math.abs(position % item)
                
                // fix 最后的值是为了修复position多出的内容
                // 如果 position 是大于 0，如 102(假设我们每个是100)
                // 此时 fix 就要是 -2 ：102 + -2 = 100
                fix = fix > item / 2 ? fix - item 
                    : position > 0 ? -fix : fix
    
                return position + fix
            }

            if (this.scrollType === 'swiper') {
                if (this.swiperVertical) {
                    this.position.y = fun(this.position.y, this.itemHeight)
                } else {
                    this.position.x = fun(this.position.x, this.itemWidth)
                }
            } 
            else if (this.scrollType === 'picker') {
                this.position.y = fun(this.position.y, this.itemHeight)
            }
        }
    }
}