<template>
    <div :class="['v5-form-item-box', type, {disabled}]">
        <template v-if="type === 'separator'"></template>
        <ValidationProvider v-else 
            :rules="formatValidate"
            :name="label"
            :events="['input', 'change']"
        >
        <div class="v5-form-item" slot-scope="{ errors }">
            <div class="v5-form-item-body" >
                <label :class="['v5-form-item-label', {required: required}]">{{label}}</label>
                <span :class="['v5-form-item-content', type]">
                    <template v-if="type !== 'slot'">
                        <select 
                            v-if="type ==='select'" 
                            :name="name"
                            v-model="myVal"
                        >
                            <option selected value="" disabled>{{placeholder}}</option>
                            <option v-for="(opt, oi) in options" :key="oi" :value="opt.value" :selected="opt.selected">{{opt.label}}</option>
                        </select>
                        <input 
                            v-else
                            :type="type" 
                            :name="name" 
                            :placeholder="placeholder"
                            :disabled="disabled"
                            :readonly="readonly"
                            v-model="myVal"
                            autocomplete="off"
                            @click="clickInt"
                        >
                    </template>
                </span>
            </div>
            <p class="v5-form-item-err">{{errors[0]}}</p>
        </div>
        </ValidationProvider>
    </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'v5-field',
    components: {
        ValidationProvider
    },
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
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
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
        event: Function
    },
    data () {
        return {
            myVal: ''
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
            this.myVal = val
        },
        myVal(val, old) {
            if (this.type === 'number') val = Number(val)
            this.$emit('input', val)
        } 
    },
    mounted () {
        this.myVal = this.value
    },
    methods: {
        clickInt () {
            if (this.event) this.event()
        }
    }
}
</script>