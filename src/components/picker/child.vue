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
import Scroll from '../../mixins/scroll.js'

export default {
    name: 'v5-picker-item',
    mixins: [Scroll],
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
            // 设置 picker 类型
            scrollType: 'picker',
            // 设置滚动元素
            scrollBox: '.v5-picker-ul'
        }
    },
    watch: {
        data (val) {
            this.scrollInit()
        },
        value (val) {
            this.scrollInit()
        },
        
        currentIndex (val) {
            // 传值与自身的索引
            this.$emit('input', this.data[val], this.index)
        }
    },
    mounted () {
        this.scrollInit()
    },
    methods: {
        init () {
            this.$nextTick(() => {

            })
        }
    },
}
</script>
