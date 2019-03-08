<template>
    <section class="from-view">
        <h1>纵行表单</h1>
        
        <div>
            <label for="tbname" @click="onShow">姓名</label><br>
            <input type="text" v-model="tbname" v-if="!isHidden" placeholder="请输入姓名">
        </div>

        <v5-formvertical :data="format" :value="params" @submit="submit">
            <div slot="experience">
                <input type="number" v-model="params.experience">
            </div>
        </v5-formvertical>

    </section>
</template>

<script>
export default {
    name: 'form-demo',
    data () {
        return {
            isHidden: true,
            // 目前三种情况：input，select,slot
            format: [
                {
                    label: '姓名',
                    type: 'text',
                    placeholder: '请输入你的姓名',
                    value: 'name',
                    name: 'name',
                    required: true,
                    validate: 'min:1|max:5'
                }, 
                {
                    label: '证件类型',
                    type: 'select',
                    placeholder: '请出示证件',
                    value: 'card',
                    name: 'card',
                    required: true,
                    options: [
                        {
                            label: '身份证',
                            value: 'IDCard'
                        }, 
                        {
                            label: '公司牌🐶',
                            value: 'dogCard'
                        }
                    ]
                }, 
                {
                    type: 'separator'
                }, 
                {
                    label: '工作经验',
                    type: 'slot',
                    value: 'experience',
                    slot: 'experience',
                    required: true
                },
            ],
            params: {
                name: '',
                card: '',
                experience: '',
            },
            tbname:''
        }
    },
    methods: {
        onShow() {
            this.isHidden = !this.isHidden
        },
        submit (result) {
            if (result) {
                console.log('OK')
            } else {
                console.error('Error')
            }
        }
    }
}
</script>

