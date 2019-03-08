<template>
    <div class="serach-view">
        <h2>搜索</h2>
        <h3>基础用法</h3>
        <h4>1、默认</h4>
        <v5-search></v5-search>
        <h4>2、自定义左侧搜索图标</h4>
        <v5-search :iconImg="iconImg"></v5-search>
        <h4>3、自定义右侧清除图标</h4>
        <v5-search :iconDelete="iconDelete"></v5-search>
        <h4>4、自定义搜索框占位内容</h4>
        <v5-search :searchPlaceholder="searchPlaceholder"></v5-search>
        <h4>5、启用单独取消按钮</h4>
        <v5-search :isHidden="isHidden"></v5-search>
        <h4>6、启用单独取消按钮的同时修改"取消"按钮文字</h4>
        <v5-search :isHidden="isHidden" :cancelText="cancelText"  @submitResult="submitResult"></v5-search>
        <h4>7、确定搜索</h4>
        <v5-search 
            :inputVal.sync="ipText" 
            :isHidden="isHidden" 
            :searchPlaceholder="searchPlaceholder" 
            :cancelText="cancelText"  
            @submitResult="submitResult">
        </v5-search>
    </div>
</template>
<script>
export default {
    name: 'search-demo',
    data () {
        return {
            iconImg: 'zoom-in',
            iconDelete: 'error',
            searchPlaceholder: '请输入企业名称查询',
            isHidden: true,
            cancelText: '搜索',
            // 搜索框中输入的内容->组件中传递出来的
            ipText: ''
        }
    },
    methods: {
        submitResult() {
            console.log(this.ipText)
        }
    }
}
</script>
<style lang="scss" scoped>
.search-view{
    
}
</style>


