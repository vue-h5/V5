import Hello from './components/hello'

const components = {
    Hello
}

const v5 = {
    ...components
}

const install = function(Vue, opts = {}) {
    console.log(1)
    if (install.installed) return;
    console.log(Object.keys(v5))

    Object.keys(v5).forEach(key => {
console.log(key)

        Vue.component(key, v5[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION,
    install
}

export default API
