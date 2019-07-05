<template>
    <transition name="v5-fade">
        <section v-show="display" :class="['v5-loading-bar', {error}]">
            <i :style="{width: value+'%'}"></i>
        </section>
    </transition>
</template>

<script>
export default {
    name: 'v5-loading-bar',
    props: {
        value: {
            type: Number,
            default: 10
        },
        show: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            display: false
        }
    },
    watch: {
        show (val) {
            if (val) {
                this.display = val
            } else {
                setTimeout(()=> {
                    this.display = val
                }, 500)
            }
        }
    }
}
</script>

