<template>
    <ValidationObserver ref="observer">
        <form slot-scope="{ invalid }" @submit.prevent="submitForm">
            <v5-field 
                v-for="(item, index) in data" 
                :key="index"
                :label="item.label"
                :type="item.type"
                :placeholder="item.placeholder"
                :name="item.name || item.key"
                :required="item.required"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :validate="item.validate"
                v-model="value[item.value]"
                :options="item.options"
                :event="item.event"
            ></v5-field>

            <button :disabled="invalid" type="submit">提交</button>
            <button type="reset" @click="resetForm">重置</button>
        </form>
    </ValidationObserver>
</template>

<script>
import Vue from 'vue'
import veeValidate, { Validator, ValidationObserver} from 'vee-validate'
// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(veeValidate)
Validator.localize('zh', zh_CN)

export default {
    name: 'v5-form',
    components: {
        ValidationObserver
    },
    props: {
        data: {
            type: Array,
            default: []
        },
        value: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    methods: {
        submitForm () {
			this.$refs.observer.validate().then((result) => {
                if (result) {
                    alert('OK')
                } else {
                    alert('Error')
                }
            })
        },

        resetForm () {
            this.$refs.observer.reset()
        }
    }
}
</script>
