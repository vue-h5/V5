<template>
    <section class="v5-collapse-box">
        <header @click="toggle" :class="{open: show}">
            <v5-icon v-if="icon" :class="icon"></v5-icon>
            <div class="v5-collapse-title">
                <span>{{title}}</span>
            </div>
            <v5-icon class="down"></v5-icon>
        </header>
        <div class="v5-collapse-inner" :style="style">
            <slot/>
        </div>
    </section>
</template>

<script>
export default {
    name: 'v5-collapse',
    props: {
        // 标题内容
        title: String,
        // 图标库
        // http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927
        icon: String,
        // 状态
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 子集伸缩开关
            show: false,
            style: {
                height: 0
            },
            box: null
        }
    },
    mounted () {
        this.box = this.$el.querySelector('.v5-collapse-inner')

        if (this.open) {
            this.toggle()
        }

        this.box.addEventListener('transitionend', this.clearStyle)
    },
    methods: {
        toggle () {
            let h = this.box.scrollHeight

            // open
            if (this.show) {
                requestAnimationFrame(() => {
                    // 设置动画需要的高
                    this.style.height = h + 'px'
                    // 设置动画结束的位置
                    requestAnimationFrame(() => {
                        this.style.height = 0
                    })
                })
            }
            // close
            else {
                this.style.height = h + 'px'
            }

            this.show = !this.show
        },

        clearStyle () {
            if (this.show) this.style.height = null
        }
    },
    destroyed () {
        this.box.removeEventListener('transitionend', this.clearStyle)
    }
}
</script>
