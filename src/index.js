import v5Cascader from './components/cascader/index.js'
import v5Cell from './components/cell/index.js'
import v5CellGroup from './components/cellGroup/index.js'
import v5Collapse from './components/collapse/index.js'
import V5Field from './components/field/index.js'
import v5Hello from './components/hello/index.js'
import V5Icon from './components/icon/index.js'
import V5Layer from './components/layer/index.js'
import V5Marquee from './components/marquee/index.js'
import V5SortBox from './components/sortBox/index.js'

import v5LoadingBar from './components/loadingBar/index.js'

const components = [
    v5Cascader,
    v5Cell,
    v5CellGroup,
    v5Collapse,
    V5Field,
    v5Hello,
    V5Icon,
    V5Layer,
    V5Marquee,
    V5SortBox
]

const install = Vue => {
    if (install.installed) return
    
    components.forEach(key => {
        Vue.component(key.name, key)
    })

    Vue.prototype.$v5LoadingBar = v5LoadingBar
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    install,
    v5Cascader,
    v5Cell,
    v5CellGroup,
    v5Collapse,
    V5Field,
    v5Hello,
    V5Icon,
    V5Layer,
    V5Marquee,
    V5SortBox
}

export default {
    install,
    v5LoadingBar
}
