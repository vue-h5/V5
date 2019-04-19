<template>
    <div class="input-view">
        <h2>input --- 基础</h2>
        <h4>1、基础用法</h4>
        <v5-input placeholder="请输入" v-model="input1"></v5-input>
        <h4>2、禁用输入框</h4>
        <v5-input placeholder="请输入姓名" disabled></v5-input>
        <h4>3、自定义输入框类型</h4>
        <v5-input type="number" placeholder="请输入出席人数"></v5-input>
        <h4>4、右侧清空图标--默认</h4>
        <v5-input placeholder="请输入内容" clearable></v5-input>
        <h4>5、右侧清空图标--自定义（slot方式）</h4>
        <v5-input placeholder="请输入内容" clearable>
            <v5-icon class="delete" slot="deleteIcon"/>
        </v5-input>
        <!--  用弹性布局 -->
        <h4>6、input左侧图标（slot方式）</h4>
        <v5-input placeholder="请输入你想去的地方">
            <v5-icon class="form" slot="leftIcon"/>
        </v5-input>
        <h4>7、input左侧图标（属性方式）</h4>
        <v5-input placeholder="请输入你想去的地方" lIcon="form"></v5-input>
        <h4>8、input右侧图标（slot方式）</h4>
        <v5-input placeholder="请输入企业名称">
            <v5-icon class="apple" slot="rightIcon"/>
        </v5-input>
        <h4>9、input右侧图标（属性方式）</h4>
        <v5-input placeholder="请输入企业名称" rIcon="apple"></v5-input>
        <h4>10、最大输入长度</h4>
        <v5-input placeholder="请输入不超过5个字符" maxlength=5></v5-input>
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


