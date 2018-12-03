<template>
    <section class="from-view">
        <h1>表单</h1>

        <v5-form :data="format" :value="params"></v5-form>
    </section>
</template>

<script>
export default {
    name: 'form-demo',
    data () {
        return {
            format: [{
                label: '姓名',
                type: 'text',
                placeholder: '你叫啥？',
                value: 'name',
                name: 'name',
                required: true,
                validate: 'min:1|max:5'
            }, {
                label: '证件类型',
                type: 'select',
                placeholder: '请出示证件',
                value: 'card',
                name: 'card',
                required: true,
                options: [{
                    label: '身份证',
                    value: 'IDCard'
                }, {
                    label: '公司牌🐶',
                    value: 'dogCard'
                }]
            }, {
                label: '身高',
                type: 'number',
                value: 'tail',
                readonly: true,
                event: this.random,
                validate: 'max_value:100|min_value:-10'
            }, {
                label: '是否接受加班',
                type: 'text',
                value: 'addJob',
                disabled: true
            }],
            params: {
                name: '二狗',
                card: '',
                tail: 0,
                addJob: '是'
            }
        }
    },
    methods: {
        random () {
            this.params.tail = Math.random() * 100 -50
        }
    }
}
</script>

