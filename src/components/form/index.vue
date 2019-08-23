<template>
    <form class="v5-form" @submit.prevent="submitForm">
        <v5-field 
            v-for="(item, index) in data" 
            :key="index"
            :label="item.label"
            :type="item.type"
            :placeholder="item.placeholder"
            :name="item.name || item.value"
            :required="item.required"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :validate="item.validate"
            v-model="value[item.value]"
            :options="item.options"
            :slots="item.slot"
        >
            <slot :name="item.slot" :slot="item.slot"></slot>
        </v5-field>
        <slot name="footers">
            <v5-button type="primary">提交</v5-button>
        </slot>
    </form>
</template>

<script>
import v5Field from '../field'
import v5Button from '../button'

export default {
    name: 'v5-form',
    components: {
        v5Field,
        v5Button
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
			this.$validator.validateAll().then(result => {
                if (
                    'submit' in this.$listeners && 
                    typeof this.$listeners.submit === 'function'
                ) {
                    this.$emit('submit', result)
                }
            })
        }
    }
}
</script>
