<template>
    <div class="v5-picker-mod">
        <PickerItem 
            v-for="(item, index) in formatData" 
            :key="index"
            :index="index"
            :value="value[index]"
            :data="item"
            @input="update"
        ></PickerItem>
    </div>
</template>

<script>
import PickerItem from './child.vue'

export default {
    name: 'v5-picker',
    components: { PickerItem },
    props: {
        // 默认值
        value: {
            type: Array
        },
        // 选择内容
        data: {
            type: Array
        },
        // 用于优化对象，不用格式化 data
        disformat: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        data () {
            this.formatDataEvt()
            this.setChild()
        }
    },
    data () {
        return {
            // 格式化后的对象
            formatData: [],
            // 格式化后得到的数组与索引的对象
            // 如地区的父子级关系
            linkObj: {},
            id: 0
        }
    },
    created () {
        this.formatDataEvt()
        this.setChild()
    },
    methods: {
        // 格式化数据
        formatDataEvt (data = this.data) {
            if (this.disformat) {
                this.formatData = this.data
                return
            } 

            // 设置第一个picker
            this.$set(this.formatData, 0, data)

            data.forEach((item, index) => {
                this.loopChild(item)
            })
        },
        // 对子集进行对象转换
        loopChild (item) {
            this.id++
            // console.log(item, this.id)
            item._id = this.id
            if (item.children) {
                this.linkObj[item._id] = item.children
                item.children.forEach(val => {
                    this.loopChild(val)
                })
            }
        },

        setChild () {
            // 如果设置了默认值
            if (this.value.length) {
                // 生成选项的索引功能字段
                let key = 0
                let nextArr = []
                // 第一个picker内容
                let arr = this.formatData[0]

                // 处理第一个picker 为第二个picker取到数组
                for (let i = 0, l = arr.length; i < l;i++) {
                    let item = arr[i]
                    // 判断是否有值是相等的
                    if (item.value === this.value[0]) {
                        key = item._id
                        // 设置下一个数组的picker
                        nextArr = this.linkObj[key]
                        break
                    }
                }

                // 处理默认值
                this.value.forEach((item, index) => {
                    // 排除第一个值（因为第一个picker已经存在）
                    if (index) {
                        // 判断我们的对象中是否有这个key的内容
                        if (Reflect.has(this.linkObj, key)) {
                            this.$set(
                                this.formatData,
                                index,
                                nextArr
                            )
                            // 为下一个picker准备数组，可以简单理解为第三个
                            // 因为刚才我们就是在设置第二嘛
                            nextArr = this.linkObj[nextArr[0]._id]
                        }
                    }
                })
            }
        },
        // 联动时，对子级进行更新
        resetChild (key, index) {
            let child = this.linkObj[key]
            let nextIndex = index + 1

            if (child) {
                this.$set(this.value, nextIndex, child[0].value)
                this.$set(this.formatData, nextIndex, child)
                // 对其子级进行更新，用于多联情况
                this.resetChild(child[0]._id, nextIndex)
            }
        },

        /**
         * @param {object} data 选择的内容
         * @param {number} index 选择的 picker 索引
         */
        update (data, index) {
            this.$set(this.value, index, data.value)
            this.resetChild(data._id, index)

            this.$emit('update', data, index)
        }
    }
}
</script>
