<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<form class="from-box" @submit.prevent="submitForm">
            <v5-field 
                class="add-unit-item"
                v-for="(item, index) in formData" :key="index" 
                :label="item.label" 
                :type="item.type" 
                :placeholder="item.placeholder" 
                v-model="params[item.value]" 
                :name="item.name" 
                :required="item.required"
                :options="item.options"
                :slots="item.slot"
                :validate="item.validate">

				<!-- 所属地区 -->
                <div slot="companyAddres" @click="mapValue = !mapValue">
                    {{params.companyAddr}}
                </div>

				<!-- 单位地址 -->
                <div slot="orgbox" @click="orgPop = !orgPop">
                    {{params.orgId}} {{params.orgName}}
                </div>
            </v5-field>
            <button type="submit" class="check">保存</button>
        </form>
		<HelloWorld msg="Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'home',
	components: {
		HelloWorld
	},
	data () {
		return {
			formData: [
                {
                    label: '单位名称',
                    type: 'text',
                    placeholder: '请输入',
                    value: 'companyName',
                    name: 'companyName',
                    required: true,
                    validate: 'min:1|max:50'
                },
                {
                    label: '所属地区',
                    type: 'slot',
                    slot: 'orgbox',
                    placeholder: '请输入',
                    value: 'orgId',
                    name: 'orgId',
                    required: true,
                    validate: ''
                },
                {
                    label: '单位地址',
                    type: 'slot',
                    slot: 'companyAddres',
                    placeholder: '请输入',
                    value: 'companyAddr',
                    name: 'companyAddr',
                    required: false,
                    validate: 'min:1|max:50'
                },
                {
                    label: '统一社会信用代码',
                    type: 'text',
                    placeholder: '请输入',
                    value: 'orgNo',
                    name: 'orgNo',
                    required: false,
                    validate: 'min:1|max:18'
                },
                {
                    label: '场所性质',
                    type: 'select',
                    placeholder: '请输入',
                    value: 'label',
                    name: 'label',
                    required: true,
                    validate: '',
                    options: []
                },
                {
                    type: 'separator'
                },
                {
                    label: '单位(场所)所在建筑',
                    type: 'text',
                    placeholder: '请输入',
                    value: 'building',
                    name: 'building',
                    required: true,
                    validate: 'min:1|max:999'
                },
                {
                    label: '单位(场所)所在层数',
                    type: 'number',
                    placeholder: '请输入',
                    value: 'currentUnit',
                    name: 'currentUnit',
                    required: true,
                    validate: 'min:1|max:999|numeric'
                },
                {
                    label: '单位(场所)建筑面积',
                    type: 'number',
                    placeholder: '请输入',
                    value: 'area',
                    name: 'area',
                    required: true,
                    validate: 'min:1|max:99999999|numeric'
                },
                {
                    type: 'separator'
                },
                {
                    label: '消防负责人姓名',
                    type: 'text',
                    placeholder: '请输入',
                    value: 'manager',
                    name: 'manager',
                    required: true,
                    validate: 'min:2|max:20'
                },
                {
                    label: '身份证号码',
                    type: 'text',
                    placeholder: '请输入',
                    value: 'cardNo',
                    name: 'cardNo',
                    required: false,
                    validate: 'min:15|max:18'
                },
                {
                    label: '联系电话',
                    type: 'tel',
                    placeholder: '请输入',
                    value: 'mobile',
                    name: 'mobile',
                    required: true,
                    validate: {
                        regex: /^(([1][3,4,5,6,7,8][0-9]{9})|(0\d{2,3}-?\d{7,8}))$/
                    }
                }
            ],
            mapValue: false,
            // 提交内容
			params: {
                source: sessionStorage.getItem('source'), 
                // 单位名称
                companyName: '',
                // 所属地区
                orgId: null, 
                // 所属地区名称（显示不提交使用）
                orgName: '请选择',
                // 单位地址 
                companyAddr: '选择地址',
                // 纬度
                latitude: 30.263964,
                // 经度 
                longitude: 120.123218, 
                // 统一社会信用代码
                orgNo: '',
                // 标签ID > 场所性质
                label: '', 

                // 单位建筑 
                building: '', 
                // 所在层数
                currentUnit: '',
                // 建筑面积
                area: '', 

                // 消防负责人
                manager: '', 
                // 负责人身份证号
                cardNo: '',
                // 负责人电话 
                mobile: ''
            },
		}
    },
    methods: {
        // 提交表单
		submitForm () {
			this.$validator.validateAll().then((result) => {
				if (result) {
					console.log('OK')

					return
				}

				console.log('表单出现错误')
			})
		},
    }
}
</script>
