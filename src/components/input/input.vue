<template>
<div class="v5-input">
    <input 
        class="v5-input-inner" 
        required
        :type="type" 
        :placeholder="placeholder" 
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        v-model="keyWord"
    >
    <a class="clear" v-if="clearable" @click="clearContent">
        <v5-icon :class="iconDelete" />
    </a>
</div>
</template>

<script>
export default {
    name: 'v5-input',
    props: {
        // 输入框是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 占位符默认值
        placeholder: {
            type: String,
            default: ''
        },
        // 输入框类型
        type: {
            type: String,
            default: 'text'
        },
        // 是否显示清空
        clearable: {
            type: Boolean,
            default: false
        },
        // 自定义清空图标
        iconDelete: {
            type: String,
            default: 'delete'
        }

    },
    data () {
        return {
           keyWord: ''
        }
    },
    methods: {
        clearContent () {
            this.keyWord = ''
        }
    }
}
</script>