<template>
    <div class="v5-strip-box">
        <header>
            <p>
                <span>{{data.title.label}}</span>
                <b>{{data.title.value}}</b>
            </p>
            <p>
                <span>{{data.subTitle.label}}</span>
                <b>{{data.subTitle.value}}</b>
            </p>
        </header>
        <ul class="strip-bar">
            <li 
                v-for="(list, il) in item" 
                :key="il" 
                :style="{width: list, backgroundColor: styleColor(il)}"
            ></li>
        </ul>
        <ul class="strip-tip" v-if="!hideMarker">
            <li 
                v-for="(list, iil) in data.list" 
                :key="`t-${iil}`" 
                :style="{color: styleColor(iil)}" 
            >
                <span class="label">{{list.label}}</span>
                <span class="value">{{list.value}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'V5Strip',
    props: {
        // 数据内容
        data: Object,
        // 进度条颜色
        colors: {
            type: Array,
            default () {
                return [
                    '#2C81F4',
                    '#63C57D',
                    '#FFAA00'
                ]
            }
        },
        hideMarker: Boolean,
        // 自定义进度条处理
        evt: Function
    },
    data () {
        return {
        }
    },
    computed: {
        item () {
            return this.data.list.map(val => {
                let result = 0

                // 如果用户定义了自己的进度处理方法
                if (this.evt && typeof this.evt === 'function') {
                    result = this.evt(val, this.data)
                } else {
                    if (this.data.title.value) {
                        result = val.value / this.data.title.value * 100
                    }
                }

                return result + '%'
            })
        }
    },
    methods: {
        styleColor (index) {
            return this.colors[index % this.colors.length]
        }
    }
}
</script>

<style lang="scss" scoped>
.v5-strip-box {
    & > header {
        display: flex;

        p {
            flex: 1;
            font-size: .42rem;

            span {
                color: #666;
            }
            b {
                color: #333;
            }
        }
    }

    .strip-bar {
        margin: .2rem 0;
        width: 100%;
        height: .22rem;
        font-size: 0;
        border-radius: .2rem;
        overflow: hidden;
        background: #eee;

        li {
            float: left;
            height: 100%;
            transition: width .5s ease-out;
        }
    }

    .strip-tip {
        display: block;
        font-size: 0;

        li {
            display: inline-block;
            width: 33.33%;
            font-size: 0;

            &::before {
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                margin: 0 .15rem 0 0;
                border-radius: .1rem;
                overflow: hidden;
                background-color: currentColor;
            }

            span {
                font-size: .39rem;

                &.label {
                    color: #666;
                    margin-right: .15rem;
                }
            }

            &:nth-child(3n + 1) {
                text-align: left;
            }
            &:nth-child(3n + 2) {
                text-align: left;
            }
            &:nth-child(3n + 3) {
                text-align: right;
            }
        }
    }
}
</style>
