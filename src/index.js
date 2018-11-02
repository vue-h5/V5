import v5Hello from './components/hello/index.js'
import V5Field from './components/field/index.js'
import v5Cell from './components/cell/index.js'
import v5Collapse from './components/collapse/index.js'
import V5Icon from './components/icon/index.js'

const version = '0.0.1'
const components = [
    v5Hello,
    V5Field,
    v5Cell,
    v5Collapse,
    V5Icon
]

const install = Vue => {
    if (install.installed) return
    
    components.forEach(key => {
        Vue.component(key.name, key)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    version,
    install,
    v5Hello,
    V5Field,
    v5Cell,
    v5Collapse,
    V5Icon
}

export default {
    version,
    install
}
