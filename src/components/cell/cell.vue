<template>
    <a class="v5-cell-mod" :href="href" @click="onClick">
        <div class="left-box">
            <v5-icon v-if="logo" :class="logo"/>
            <main>
                <div class="title">{{title}}</div>
                <div class="sub-title">{{subTitle}}</div>
            </main>
        </div>
        <div class="right-box">
            <p>{{inner}}</p>
            <v5-icon v-if="myIcon" :class="myIcon"/>
        </div>
    </a>
</template>

<script>
export default {
    name: 'v5-cell',
    props: {
        // logo 图标
        logo: String,
        // 主标题内容
        title: String,
        // 副标题内容
        subTitle: String,
        // 跳转外网地址
        href: String,
        // 内部路由跳转
        to: String,
        // 内容
        inner: String,
        // 图标
        icon: String
    },
    data () {
        return {
        }
    },
    computed: {
        myIcon () {
            if (this.to || this.href) {
                return this.icon || 'right'
            } else {
                return this.icon || false
            }
        }
    },
    methods: {
        onClick () {
            if (this.to && this.$router) {
                this.$router.push(this.to)
            }
        }
    }
}
</script>
