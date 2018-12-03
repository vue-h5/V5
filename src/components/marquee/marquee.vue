<template>
    <div class="v5-marquee-mod" :style="style">
        <span class="v5-marquee-inner"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: 'v5-marquee',
    props: {
        // 滚动速度
        speed: {
            type: Number,
            default: 3
        },
        // 间隔，主要针对内容大于盒子时，连接之前添加空格
        gap: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            inner: null,
            innerBCR: {},
            BCR: {},
            style: {}
        }
    },
    mounted () {
        this.inner = this.$el.querySelector('.v5-marquee-inner')
        this.innerBCR = this.inner.getBoundingClientRect()
        this.BCR = this.$el.getBoundingClientRect()

        // 设置容器的高度
        this.style = {
            height: this.innerBCR.height + 'px'
        }
        
        // 处理复制内容的位置
        let left = 0
        let gap = 0
        // 如果内容的宽度大于容器
        if (this.BCR.width > this.innerBCR.width) {
            left = this.BCR.width
            this.inner.style.width = this.BCR.width + 'px'
        } else {
            left = this.innerBCR.width + this.gap
            gap = this.gap
        }

        // 添加动画样式
        let className = `v5-marquee-inner${+ new Date}`
        let css = document.createElement('style')
        css.type = 'text/css'

        let style = `.${className} { padding-right: ${gap}px; animation: v5-marquee ${this.speed}s linear 0s infinite;}`

        // 添加样式
        css.appendChild(document.createTextNode(style))

        this.$el.appendChild(css)
        this.inner.classList.add(className)

        // 克隆对象
        let node = this.inner.cloneNode(true)
        node.style.left = left + 'px'
        this.$el.appendChild(node)
    }
}
</script>
