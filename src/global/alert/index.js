import Vue from 'vue'
import Com from './index.vue'

let extendModel = Vue.extend(Com)
let instance
let timer

const v5Alert = function(opts) {
    instance = new extendModel({
        data: opts
    })
    document.body.appendChild(instance.$mount().$el)
    console.log(instance)
    return instance
}

export default v5Alert