<template>
<div class="v5-input-mod">
    <!-- input框左侧图标 -->
    <span class="icon-left" v-show="lIcon || this.$slots.leftIcon">
        <slot name="leftIcon">
            <v5-icon :class="lIcon"/>
        </slot>
    </span>
    <input 
        class="v5-input-inner" 
        required
        :type="type" 
        :maxlength="maxlength"
        :placeholder="placeholder" 
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        v-model="keyWord"
    >
    <!-- input框右侧清除图标 -->
    <span class="clear" @click="clearContent" v-show="clearable">
        <slot name="deleteIcon">×</slot>
    </span>
    <!-- input框右侧图标 -->
    <span class="icon-right" v-show="rIcon || this.$slots.rightIcon">
        <slot name="rightIcon">
            <v5-icon :class="rIcon"/>
        </slot>
    </span>
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
        // 限制最大输入字符个数
        maxlength: {
            type: String,
        },
        rIcon: {
            type: String,
        },
        lIcon: {
            type: String,
        },
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