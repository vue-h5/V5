<template>
    <section class="v5-sort-box-demo">
        <h2>V5-Sort-Box</h2>
        <h3>排序盒子</h3>
        <v5-sort-box class="sort-box" :sort="sort" v-model="data" ref="sort">
            <ul>
                <li v-for="(item, index) in data" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.age}}</span>
                    <span>{{item.grade}}</span>
                </li>
            </ul>
        </v5-sort-box>
    </section>
</template>

<script>
export default {
    name: 'v5-sort-box-demo',
    data () {
        return {
            sort: [
                {
                    label: '姓名',
                    sort: false,
                    // sort 为 false时，排序是没有作用的
                    classes: 'up'
                },
                {
                    label: '年龄',
                    key: 'age',
                    // 默认降序排列，注意多个排序时，只使用最后一个
                    classes: 'up',
                    sort: this.sortList
                },
                {
                    label: '成绩',
                    key: 'grade',
                    sort: true
                }
            ],
            data: [
                {
                    name: 'tom',
                    age: 20,
                    grade: 80
                },
                {
                    name: 'bob',
                    age: 22,
                    grade: 82
                },
                {
                    name: 'alis',
                    age: 21,
                    grade: 30
                },
                {
                    name: 'oppo',
                    age: 20,
                    grade: 100
                },
                {
                    name: 'limi',
                    age: 23,
                    grade: 90
                },
                {
                    name: 'jeri',
                    age: 19,
                    grade: 60
                },
            ]
        }
    },
    methods: {
        /**
         * 自定义排序方法
         * @param {Object} item 当前点击的对象
        */
        sortList (item) {
            this.data.sort((a, b) => {
                let result = 0
                let key = item.key
                if (item.classes === 'up') {
                    result = a[key] - b[key]
                } else if (item.classes === 'down') {
                    result = b[key] - a[key]
                }
                return result
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-box {
    font-size: 16px;

    ul {
        
        li {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 2px;
            margin: 2px 0;
            text-align: center;

            span {

                background: #fff;
            }
        }
    }
}
</style>

