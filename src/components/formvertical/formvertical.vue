<template>
    <form class="v5-formvertical" @submit.prevent="submitForm">
        <v5-fieldvertical 
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
        </v5-fieldvertical>
        <slot name="footers">
            <v5-button type="primary">提交</v5-button>
        </slot>
    </form>
</template>

<script>
export default {
    name: 'v5-formvertical',

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
