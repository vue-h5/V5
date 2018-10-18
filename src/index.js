import v5Hello from './components/hello'
import v5Field from './components/field'

const components = {
    v5Hello,
    v5Field
}

const v5 = {
    ...components
}

const install = function(Vue, opts = {}) {
    if (install.installed) return;
    
    Object.keys(v5).forEach(key => {
        console.log(key)
        Vue.component(key, v5[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: process.env.VERSION,
    install
}
