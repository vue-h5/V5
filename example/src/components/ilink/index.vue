<template>
    <ul>
        <li class="i-link" v-for="item in list" :key="item.to">
            <router-link :to="item.to" >{{item.lable}}</router-link>
            <ilink v-if="item.children" :list="item.children"/>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ilink',
    props: {
        list: Array
    }
}
</script>

<style lang="scss" scoped>
ul {
    margin-left: 1em;
}
.i-link {
    display: block;

    a {
        color: #09f;
        font-size: 14px;
    }
}
</style>
