<template>
    <div class="button-view">
        <h2>按钮</h2>

        <h3>基础</h3>
        <v5-button>基础</v5-button>
        <v5-button type="primary">primary</v5-button>
        <v5-button type="danger">danger</v5-button>
        <v5-button type="warn">primary</v5-button>
        
        <h3>简约</h3>
        <div style="background: #8BC34A">
            <v5-button plain>基础</v5-button>
            <v5-button plain type="primary">primary</v5-button>
            <v5-button plain type="danger">danger</v5-button>
            <v5-button plain type="warn">primary</v5-button>
        </div>

        <h3>禁用</h3>
        <v5-button disabled>基础</v5-button>
        <v5-button disabled type="primary">primary</v5-button>
        <v5-button disabled type="danger">danger</v5-button>
        <v5-button disabled type="warn">primary</v5-button>
        <v5-button disabled plain>基础</v5-button>
        <v5-button disabled plain type="primary">primary</v5-button>
        <v5-button disabled plain type="danger">danger</v5-button>
        <v5-button disabled plain type="warn">primary</v5-button>
        
        <h3>大小</h3>
        <v5-button size="hug">hug</v5-button>
        <v5-button size="big">big</v5-button>
        <v5-button>def</v5-button>
        <v5-button size="small">small</v5-button>
        <v5-button size="min">min</v5-button>
        
        <h3>加载中</h3>
        <v5-button @click="loading = !loading">{{loading?'关闭加载':'打开加载'}}</v5-button>

        <v5-button :loading="loading" size="hug">基础</v5-button>
        <v5-button :loading="loading" type="primary">primary</v5-button>
        <v5-button :loading="loading" type="danger">danger</v5-button>
        <v5-button :loading="loading" type="warn">primary</v5-button>
        <v5-button :loading="loading" plain>基础</v5-button>
        <v5-button :loading="loading" plain type="primary">primary</v5-button>
        <v5-button :loading="loading" plain type="danger">danger</v5-button>
        <v5-button :loading="loading" plain type="warn">primary</v5-button>


        <h3>圆角</h3>
        <v5-button type="primary" radius="0">圆角-0</v5-button>
        <v5-button type="primary">圆角-默认(3)</v5-button>
        <v5-button type="primary" radius="5">圆角-5</v5-button>
        <v5-button type="primary" radius="round">圆角-round</v5-button>
        
        <h3>图标</h3>
        <v5-button icon="youtube"></v5-button>
        <v5-button icon="zap">闪电</v5-button>
        <v5-button>
            <v5-icon class="android"/>
            android
        </v5-button>

    </div>
</template>

<script>
export default {
    name: 'button-demo',
    data () {
        return {
            loading: true
        }
    }
}
</script>

<style lang="scss" scoped>
.button-view {
    button {
        margin: 5px 10px;
        text-transform: uppercase;
    }
}
</style>
