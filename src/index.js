import v5Hello from './components/hello/index.js'
import v5Field from './components/field/index.js'

const version = '0.0.1'
const components = [
    v5Hello,
    v5Field
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
    v5Field
}

export default {
    version,
    install
}
