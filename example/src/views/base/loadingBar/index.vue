<template>
    <section class="loading-bar-view">
        <h2>加载进度条</h2>
        <div>
            <h4>系统默认</h4>
            <button @click="start">开始</button>
            <button @click="finish">完成</button>
            <button @click="error">错误</button>
        </div>

        <div>
            <h4>手动控制</h4>
            <button @click="start2">开始</button>
            <button @click="finish">完成</button>
            <button @click="error">错误</button>
            <input type="number" min="0" max="100" v-model="value">
        </div>
    </section>
</template>

<script>
export default {
    name: 'loading-bar-demo',
    data () {
        return {
            value: 1
        }
    },
    watch: {
        value (val) {
            this.$v5LoadingBar.progress(val)
        }
    },
    methods: {
        start () {
            this.$v5LoadingBar.start()
        },

        finish () {
            this.$v5LoadingBar.finish()
        },

        error () {
            this.$v5LoadingBar.error()
        },

        start2 () {
            this.value = 1
            this.$v5LoadingBar.start(1)
        }
    }
}
</script>
