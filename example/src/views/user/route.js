import user from './demo.vue'
import safe from './safe/demo.vue'
import info from './info/demo.vue'

export default {
    path: '/user',
    component: user,
    children: [
        {
            path: 'safe',
            component: safe
        },
        {
            path: 'info',
            component: info
        }
    ]
}