<template>
    <section>
        <h1>Cell 单元格</h1>

        <h2>基础用法</h2>
        <v5-cell title="标题"/>
        <v5-cell title="标题" sub-title="二级标题"/>
        <v5-cell title="标题" sub-title="二级标题" icon="apple"/>

        <h2>to 跳转</h2>
        <v5-cell title="返回主页" sub-title="/" to="/"/>

        <h2>href 跳转</h2>
        <v5-cell title="跳转百度" sub-title="http://baidu.com" href="http://baidu.com"/>
    </section>
</template>

<script>
export default {
    name: 'cell-demo',
    data () {
        return {
        }
    }
}
</script>
