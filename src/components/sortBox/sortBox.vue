<template>
    <div class="v5-sort-box">
        <ul class="sort-header">
            <li
                v-for="(item, sIndex) in sort"
                :key="sIndex"
                @click="sortList(item, sIndex)"
            >
                <span>{{item.label}}</span>
                <i v-if="item.sort" :class="item.classes"></i>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'v5-sort-box',
    props: {
        sort: Array,
        value: Array
    },
    data () {
        return {
            // 当前排序对象
            current: {}
        }
    },
    mounted () {
        let index = null
        // 获取默认排序最后一项
        this.sort.forEach((val, i) => {
            if (val.classes) index = i
        })
        // 设置排序效果
        this.sortData(this.sort[index])
    },
    methods: {
        sortList (item, index) {
            if (item !== this.current)
                this.current.classes = ''

            switch (item.classes) {
                case 'up': item.classes = 'down'; break;
                case 'down': item.classes = ''; break;
                default: this.$set(item, 'classes', 'up'); break;
            }
            
            this.sortData(item)
        },

        sortData (item) {
            this.current = item

            // 支持用户自定义排序方法
            if (typeof item.sort === 'function') {
                // 提供当前点击对象 方向 当前的数据
                item.sort(item, this.value)
            } else {
                // 默认按用户给定的key先升序后降序
                if (item.key) {
                    this.value = this.value.sort((a, b) => {
                        let result = 0

                        if (item.classes === 'up') {
                            result = a[item.key] - b[item.key]
                        } else if (item.classes === 'down') {
                            result = b[item.key] - a[item.key]
                        }

                        return result
                    })

                    this.$emit('input', this.value)
                }
            }
        }
    }
}
</script>
