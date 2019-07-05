<template>
    <button :class="['v5-button', type, size, {loading, plain}]" :disabled="disabled" :style="style" v-on="$listeners">
        <transition name="v5-scale">
            <span v-if="loading" class="v5-btn-loading">
                <v5-icon class="spinner3"/>
            </span>
        </transition>
        <v5-icon v-if="icon" :class="icon"/>
        <span><slot/></span>
    </button>
</template>

<script>
export default {
    name: 'v5-button',
    props: {
        // 按钮样式 - primary danger warn 默认
        type: {
            type: String,
            default: ''
        },
        // 简约模式 - 关
        plain: {
            type: Boolean,
            default: false
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 大小
        size: {
            type: String,
            default: ''
        },
        // 加载状态
        loading: {
            type: Boolean,
            default: false
        },
        // 圆角
        radius: {
            type: [Number,String],
            default: 3
        },
        // 图标
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        style () {
            let result = {}
            if (typeof this.radius === 'string') {
                if (this.radius === 'round') {
                    result = {
                        borderRadius: '1em'
                    }
                } else {
                    result = {
                        borderRadius: `${this.radius}px`
                    }
                }
            }
            return result
        }
    }
}
</script>
