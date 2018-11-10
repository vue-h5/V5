<template>
    <section>
        <h1>Cell 单元格</h1>

        <h2>基础用法</h2>
        <v5-cell-group>
            <v5-cell title="标题"/>
            <v5-cell logo="ios-cog" title="通用" icon="right"/>
            <v5-cell title="标题" sub-title="二级标题"/>
            <v5-cell title="标题" sub-title="二级标题" inner="apple"/>
            <v5-cell title="标题" sub-title="二级标题" icon="apple"/>
        </v5-cell-group>

        <h2>跳转</h2>
        <v5-cell-group>
            <v5-cell title="返回主页" sub-title="/" to="/"/>
            <v5-cell title="跳转百度" sub-title="http://baidu.com" href="http://baidu.com"/>
        </v5-cell-group>

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
