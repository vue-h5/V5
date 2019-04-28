<template>
    <div v-show="goTopShow" @click="goTop">
        <!-- 默认样式 -->
        <slot name="backStyle"></slot>
    </div>
</template>
<script>
export default {
    name: "v5-back-top",
    props: {
        height: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            scrollTop: '',
            goTopShow: false,
        }
    },
    mounted () {
        // handleScroll 事件监听
        // 语法： element.addEventListener(event,function,useCapture)
        // 第一个参数：事件的类型（如：click）注意：不要使用 on 前缀
        // 第二个参数：事件触发后调用的函数
        // 第三个参数：布尔值，用于描述是冒泡还是捕获，可选，默认值为false，即冒泡传递，当为true时，即为捕获传递
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll () {
            // 设置或返回当前页面相对于窗口显示区左上角的 Y 位置  ||  获取当前页面滚动条纵坐标的位置  ||  网页被卷去的高
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (this.scrollTop > this.height) {
                this.goTopShow = true
            }else {
                this.goTopShow = false
            }
        },
        // 在web动画、app动画中，我们经常通过setInterval或setTimeout定时修改DOM、CSS实现动画。
        // 弊端：耗费资源，刚开始比较流畅，之后动画就卡住了
        // requestAnimationFrame的方式的优势：
        // 1、经过浏览器优化，动画更流畅
        // 2、窗口没激活时，动画将停止，省计算资源
        // 3、更省电，尤其是对移动端
        goTop () {
            let timer = null, 
                _that = this
            cancelAnimationFrame(timer)
            timer = requestAnimationFrame (function fn () {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 50
                    document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                    timer = requestAnimationFrame(fn)
                } else {
                    // 取消动画
                    cancelAnimationFrame(timer)
                    _that.goTopShow = false
                }
            })
        }
    },
    destroyed () {
        // 移除 handleScroll 事件监听
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
