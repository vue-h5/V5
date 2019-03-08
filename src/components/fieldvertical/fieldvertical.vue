<template>
    <div :class="['v5-formvertical-item-box', type, {disabled}]">
        <template v-if="type === 'separator'"></template>
        <template v-else>
            <div class="v5-form-item-body">
                <label :class="['v5-form-item-label', {required: required}]">{{label}}</label><br/>
                <div :class="['v5-form-item-content', type]">
                    <template v-if="type !== 'slot'">
                        <select 
                            v-if="type ==='select'" 
                            :name="name"
                            :data-vv-as="label"
                            :value="value"
                            v-validate="formatValidate"
                            @change="updateSelect($event)"
                        >
                            <option selected disabled>{{placeholder}}</option>
                            <option v-for="(opt, oi) in options" :key="oi" :value="opt.value" :selected="opt.selected">{{opt.label}}</option>
                        </select>
                        <input 
                            v-else
                            :type="type" 
                            :name="name" 
                            :data-vv-as="label"
                            v-validate="formatValidate"
                            :placeholder="placeholder"
                            :disabled="disabled"
                            :readonly="readonly"
                            :value="value"
                            autocomplete="off"
                            @input="$emit('input', $event.target.value)"
                        >
                    </template>
                    <!-- 动态调用用户自定义组件 -->
                    <template v-else>
                        <input 
                            type="hidden"
                            :name="name" 
                            :data-vv-as="label"
                            v-validate="formatValidate"
                            :value="value">
                        <slot :name="slots"></slot>
                    </template>
                </div>
            </div>
            <p class="v5-form-item-err">{{errors.first(name)}}</p>
        </template>

    </div>
</template>

<script>
export default {
    name: 'v5-fieldvertical',
    // 用于辅助验证子组件内容
    // https://cn.vuejs.org/v2/api/#provide-inject
    // https://github.com/baianat/vee-validate/issues/677#issuecomment-318969216
    inject: ['$validator'],
    props: {
        // 默认值
        value: '',
        // 占位符
        placeholder: {
            type: String,
            default: ''
        },
        // 标签与错误提示内容
        label: String,
        // 提交的内容，注要为 input 添加 name
        name: String,
        // 输入框类型
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        // 验证，具体可以查看 veeValidate
        validate: {
            type: [Object, String],
            default: ''
        },
        // 提供 Select option 对象
        options: {
            type: Array,
            default: () => []
        },
        // 提供用户自定组件内容
        slots: String,
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            mes: 'v5 forms',
        }
    },
    computed: {
        formatValidate () {
            let result = ''

            // 处理对象验证
            if (typeof this.validate === 'object') {
                result = Object.assign({}, this.validate, {
                    required: this.required
                })
            } else {
                result = this.required ? `required|${this.validate}` : this.validate
            }

            return result
        }
    },
    watch: {
        value (val, old) {
            // 只有在使用了插槽的时候 值的变化会带来验证
            if (this.type === 'slot') {
                this.$validator.validate(this.name, val)
            }
        }
    },
    methods: {
        updateSelect (evt) {
            this.$emit('input', evt.target.value)
            // 标识选中效果
            this.options.forEach(val => {
                val.selected = val.value == evt.target.value
            })
        }
    }
}
</script>