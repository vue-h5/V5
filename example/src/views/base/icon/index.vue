<template>
    <div class="icon-view">
        <h1>Icon 图标</h1>
		<ul class="icon-display">
            <li v-for="item in list" :key="item.label">
                <v5-icon :class="item.label"/>
                <input type="text" :value="item.label" readonly>
                <input type="text" :value="item.text" readonly>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'icon-demo',
    data () {
        return {
            list: [
                {
                    label: 'save',
                    text: '&#xe612'
                },
                {
                    label: 'error',
                    text: '&#xe611'
                },
                {
                    label: 'zoom-in',
                    text: '&#xe615'
                },
                {
                    label: 'youtube',
                    text: '&#xe614'
                },
                {
                    label: 'zap',
                    text: '&#xe613'
                },
                {
                    label: 'code',
                    text: '&#xe610'
                },
                {
                    label: 'battery',
                    text: '&#xe60f'
                },
                {
                    label: 'battery-charging',
                    text: '&#xe60e'
                },
                {
                    label: 'check',
                    text: '&#xe60d'
                },
                {
                    label: 'right',
                    text: '&#xe60c'
                },
                {
                    label: 'up',
                    text: '&#xe60a'
                },
                {
                    label: 'left',
                    text: '&#xe609'
                },
                {
                    label: 'component',
                    text: '&#xe814'
                },
                {
                    label: 'form',
                    text: '&#xe60b'
                },
                {
                    label: 'down',
                    text: '&#xe608'
                },
                {
                    label: 'apple',
                    text: '&#xe607'
                },
                {
                    label: 'ios-cog',
                    text: '&#xe7a7'
                },
                {
                    label: 'spinner3',
                    text: '&#xe606'
                },
                {
                    label: 'qrcode',
                    text: '&#xe605'
                },
                {
                    label: 'spinner2',
                    text: '&#xe603'
                },
                {
                    label: 'android',
                    text: '&#xe601'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-view {

}
.icon-display {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2px;

    li {
        padding: 10px 0;
        text-align: center;
        background: #fff;

        .v5-icon {
            font-size: 24px;
        }

        input {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            background: transparent;
            border: none;
            outline: none;
        }
    }
}
</style>
