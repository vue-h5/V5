<template>
    <div class="v5-alert-section-demo">
        <v5-button @click="alertEvt">alert</v5-button>
    </div>
</template>

<script>
export default {
    name: 'v5-alert-demo',
    methods: {
        alertEvt () {
            this.$v5Alert()
        }
    }
}
</script>

<style>

</style>
