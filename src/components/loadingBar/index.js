import Vue from 'vue'
import Mode from './loadingBar.vue'

let modelConstructor = Vue.extend(Mode)
let instance
let timer

const v5LoadingBar = () => {
    instance = new modelConstructor
    document.body.appendChild(instance.$mount().$el)
}

function step () {
    timer = setInterval(() => {
        instance.value += Math.floor(Math.random() * 5)

        if (instance.value > 90) {
            clearInterval(timer
            )
        }
    }, 100)
}

// 开始动画
// 可以传入初始值，有初始值时，我们不模拟加载了
v5LoadingBar.start = (val = 0) => {
    // 只生成一个加载状态
    if (!instance) {
        v5LoadingBar()
    }
    
    // 默认设置
    instance.value = val
    instance.show = true
    instance.error = false

    if (!val) step()
}

v5LoadingBar.finish = () => {
    instance.value = 100
    instance.show = false
}

v5LoadingBar.progress = val => {
    instance.value = Number(val)
}

v5LoadingBar.error = () => {
    instance.error = true
    instance.value = 100
    instance.show = false
}

export default v5LoadingBar