<template>
    <div class="v5-swiper-item" :style="styles">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'v5-swiper-item',
    data () {
        return {
            styles: {
                transform: 'translateX(0px)'
            }
        }
    }
}
</script>
