<template>
    <div class="v5-search">
        <div class="search-content">
            <!-- 搜索图标 -->
            <v5-icon :class="[iconImg,iconSearch]"/>
            <input type="text" :placeholder="searchPlaceholder" v-model="keyWord" />
            <!-- 取消图标 -->
            <div class="icon-dele" @click="clearResult">
                <v5-icon :class="iconDelete" v-if="flag" />
            </div>
        </div>
        <!-- 右侧取消按钮 -->
        <span class="cancel-text" v-if="isHidden" @click="submitResult">{{cancelText}}</span>
    </div>
</template>

<script>
export default {
    name: 'v5-search',
    props: {
        // 自定义搜索图标
        iconImg: {
            type: String,
            default: 'search'
        },
        // 自定义删除图标
        iconDelete: {
            type: String,
            default: 'delete'
        },
        // 搜索框占位内容
        searchPlaceholder: {
            type: String,
            default: '搜索'
        },
        // 是否显示取消按钮 默认不展示
        isHidden: {
            type: Boolean,
            default: false
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default: '取消'
        },
        inputVal: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            iconSearch: 'icon-search',
            keyWord: this.inputVal,
            flag: false
        }
    },
    watch: {
        inputVal(newVal,oldVal) {
            this.inputVal = newVal
        },
        keyWord(val) {
            this.$emit("update:inputVal", val)
            if(val.length) {
                this.flag = true
            }else{
                this.flag = false
            }
        }
    },
    methods: {
        // 清除事件
        clearResult() {
            this.keyWord = ''
        },
        // 搜索事件将input框中输入值传给父组件
        submitResult() {
            this.$emit('submitResult')
        }
    }
}
</script>

