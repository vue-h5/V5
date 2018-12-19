<template>
    <div class="v5-picker-mod">
        <ul class="v5-picker-ul">
            <li v-for="(item, index) in data" :key="index" :disabled="item.disabled">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'v5-picker',
    props: {
        value: {
            type: [String, Number]
        },
        data: {
            type: Array,
        }
    },
    data () {
        return {
            scroll: null,
            selectedIndex: 0,
            current: {}
        }
    },
    watch: {
        data (val) {
            this.init()
        },
        value (val) {
            this.init()
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.init()
            this.scrollEnd()
        })
    },
    methods: {

        init () {
            if (this.value) {
                this.data.forEach((item, index) => {
                    if (item.value === this.value) {
                        this.selectedIndex = index
                    }
                })
            }
            
            this.scroll = new BScroll(this.$el, {
                scrollY: true,
                click: true,
                wheel: {
                    // 当前选择的索引
                    selectedIndex: this.selectedIndex,
                    // 列表的弧度
                    rotate: 0,
                    // 切换选择项的调整时间
                    adjustTime: 400
                },
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                }
            })

        },
        scrollEnd () {
            this.scroll.on('scrollEnd', ({y}) => {
                let index = this.scroll.getSelectedIndex()
                this.current = this.data[index]

                if (this.current.disabled) {
                    while (Reflect.has(this.current, 'disabled')) {
                        switch (this.scroll.directionY) {
                            case 1:
                                --index; break;
                            case -1: ++index; break; 
                        }
                        this.current = this.data[index]
                    }
                    
                    this.scroll.wheelTo(index)
                }

                this.$emit('input', this.current.value)
            })

        }
    },

}
</script>
