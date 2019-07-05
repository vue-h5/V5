<template>
    <v5-layer class="v5-cascader-mod" :show="show" position="right">
        <div class="v5-cascader-inner-mod">
            <header class="v5-cascader-header">
                <span 
                    v-for="(nav, i) in result" 
                    :key="nav.value" 
                    :class="[{child: nav.children}]"
                    @click="change(nav, i)"
                >{{nav.label}}</span>

                <i v-show="result.length" class="close-btn" @click="clear">&#xe611;</i>
            </header>
            <div :class="['current-list-box', {async}]">
                <div v-if="showLoading" class="loading-box">
                    <p><v5-icon class="spinner3"/></p>
                    <p>加载中...</p>
                </div>
                <template v-else>
                    <v5-cell 
                        v-for="(item, index) in item.children" 
                        :key="index" 
                        :title="item.label"
                        :subTitle="item.subTitle"
                        :icon="item.children ? 'right' : ''"
                        @click="update(item)"
                        :disabled="item.disabled"
                    />
                </template>
            </div>
            <footer>
                <button @click="cancel">取消</button>
                <button :disabled="!confirm" @click="send">确认</button>
            </footer>
        </div>
    </v5-layer>
</template>

<script>
export default {
    name: 'v5-cascader',
    props: {
        // 选择值
        value: {
            type: Array,
            default: () => []
        },
        // 选择内容
        data: {
            type: Array,
            default: () => []
        },
        // 控制弹层显隐
        show: {
            type: Boolean,
            default: false
        },
        // 只能选择到最深才可以返回值
        deep: {
            type: Boolean,
            default: false
        },
        /* 接受用户对确认按钮的控制
         * @return {Boolean}
         */
        filter: Function,
        // 异步
        async: Boolean
    },
    data () {
        return {
            result: [],
            list: {},
            item: {},
            // 按钮点击控制器
            confirm: true,
            showLoading: false
        }
    },
    watch: {
        item: {
            handler (val) {
                // 如果存在 deep
                if (this.deep) {
                    // 只有在当前列表没有选择时，才可以返回值
                    this.confirm = !val.hasOwnProperty('children')
                }

                // 在异步情况下
                if (this.async) {
                    if (val.hasOwnProperty('children')) {
                        this.showLoading = !val.children.length
                    }
                }
            },
            deep: true
        },
        show (val) {
            if (val) {
                this.format()
            }
        },
        data (val) {
            this.format()
        }
    },
    methods: {
        format () {
            // 清空老数据 
            this.result = []
            this.item = {
                children: []
            }

            this.loop(this.data)
            this.getLabel()
    
            // 处理默认值回填
            if (this.result.length) {
                this.item = this.result.slice(-1)[0]
            } else {
                // 没有默认值就使用 data
                this.item = {
                    children: this.data
                }
            }
    
            if (this.deep) {
                this.confirm = false
            }
        },

        /**
         * 处理数据回填使用
         * @param {Array} data 用户传入的数组
         * @param {String} parent 父级，用于在处理回填时，对上级可以准确判断，防止级别错误 
         */
        loop (data, parent) {
            data.forEach((item, i) => {
                this.list[item.value] = item

                if (parent) {
                    this.list[item.value].parent = parent
                }
                
                if (item.children) {
                    this.loop(item.children, item.value)
                }
            })
        },

        getLabel () {
            this.value.forEach((key, index) => {
                let item = this.list[key]

                if (!item) return

                // 对父级判断
                // 有父级的情况下，如果对应不上，则显示最近正确的层级
                if (item.parent) {
                    if (this.value[index -1] !== item.parent) {
                        return
                    }
                }

                this.result.push( item )
            })
        },

        update (item) {
            if (this.filter) {
                // 接受确认按钮状态
                this.confirm = this.filter(item, this.confirm)
            } 

            this.item = item
            this.result.push(item)

            this.$emit('update', item)
        },

        change (nav, i) {
            if (this.filter) {
                // 接受确认按钮状态
                this.confirm = this.filter(nav, this.confirm)
            } 

            this.item = nav
            this.result = this.result.slice(0, i+1)
            this.$emit('update', nav)
        },

        clear () {
            this.result = []
            this.item = {
                children: this.data
            }
        },

        send () {
            if (this.confirm) {
                let data = this.result.map(val => {
                    return val.value
                })

                this.$emit('input', data)
                this.$emit('update:show', false)
                this.$emit('confirm', {
                    data,
                    result: this.result
                })
            }
        },
        
        cancel () {
            this.$emit('update:show', false)
            this.$emit('cancel')
        }
    }
}
</script>
