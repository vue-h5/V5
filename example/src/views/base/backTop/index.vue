<template>
    <div class="back-top-view">
        <div class="box"></div>
        <v5-back-top :height=500>
            <div class="back-top-mod" slot="backStyle">返回</div>
        </v5-back-top>
    </div>
</template>
<script>
export default {
    name: 'back-top-view',
    data () {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.back-top-view{
    .box {
        height: 2000px;
        background: #ccc;
    }
    .back-top-mod{
        position: fixed;
        right: 13px;
        bottom: 50px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        border: 1px solid #E0E0E0;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 1px 4px 0 rgba(53, 38, 38, 0.26);/*0 1px 4px 0*/
        color: #30A4FF;
        background: rgba(255,255,255,0.90);
    }
}
</style>


