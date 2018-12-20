<template>
    <div class="v5-picker-mod">
        <PickerItem 
            v-for="(item, index) in formatData" 
            :key="index"
            :index="index"
            :value="value[index]"
            :data="item"
            @input="update"
        ></PickerItem>
    </div>
</template>

<script>
import PickerItem from './child.vue'

export default {
    name: 'v5-picker',
    components: { PickerItem },
    props: {
        value: {
            type: Array
        },
        data: {
            type: Array
        }
    },
    watch: {
        data () {
            this.formatDataEvt()
            this.setChild()
        }
    },
    data () {
        return {
            formatData: [],
            linkObj: {}
        }
    },
    created () {
        this.formatDataEvt()
        this.setChild()
    },
    methods: {
        formatDataEvt (data = this.data) {
            this.$set(this.formatData, 0, data)

            data.forEach(item => {
                this.loopChild(item)
            })
        },

        loopChild (item) {
            if (item.children) {
                this.linkObj[item.value] = item.children
                item.children.forEach(val => {
                    this.loopChild(val)
                })
            }
        },

        setChild () {
            if (this.value.length) {
                this.value.forEach((item, index) => {
                    if (index) {
                        let key = this.value[index -1]
                        if (Reflect.has(this.linkObj, key))
                            this.$set(
                                this.formatData,
                                index,
                                this.linkObj[key]
                            )
                    }
                })
            }
        },

        resetChild (index) {
            let l = this.formatData.length

            for (; index < l; index++) {
                let key = this.value[index]
                let data = this.linkObj[key]

                if (data) {
                    this.$set(this.value, index+1, data[0].value)
                    this.$set(this.formatData, index+1, data)
                }
            }
        },

        update (data, index) {
            this.$set(this.value, index, data)
            this.resetChild(index)
            this.$emit('input', this.value)
        }
    }
}
</script>
