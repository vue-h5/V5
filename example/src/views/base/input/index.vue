<template>
    <div class="input-view">
        <h2>input --- 基础</h2>
        <h4>1、基础用法</h4>
        <v5-input placeholder="请输入" v-model="input1"></v5-input>
        <h4>2、禁用输入框</h4>
        <v5-input placeholder="请输入姓名" disabled></v5-input>
        <h4>3、自定义输入框类型</h4>
        <v5-input type="number" placeholder="请输入出席人数"></v5-input>
        <h4>4、是否显示右侧可清空</h4>
        <v5-input placeholder="请输入内容" clearable></v5-input>
        <h4>5、自定义右侧清空图标</h4>
        <v5-input placeholder="请输入内容" clearable iconDelete="error"></v5-input>
    </div>
</template>
<script>
export default {
    name: 'input-demo',
    data () {
        return {
           input1: '',
        }
    },
    watch: {
        input1(val) {
            console.log(val)
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
.input-view{
    
}
</style>


