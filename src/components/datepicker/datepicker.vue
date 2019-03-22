<template>
    <div class="v5-datepicker-mod">
        <v5-picker v-model="date" :data="dateList" disformat @update="update"/>
    </div>
</template>

<script>
export default {
    name: 'v5-datepicker',
    props: {
        value: {
            type: [Date, String],
            default: () => new Date
        },
        type: {
            type: String,
            // dateTime 2019-2-28 12:34
            // date 2019-2-28
            // time 12:34
            default: 'datetime'
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        format: {
            type: Object
        }
    },
    data () {
        return {
            startDateObj: {},
            endDateObj: {},
            // 时间渲染方式
            timeTable: [],
            escapeTabel: {
                'Y': 'year',
                'M': 'month',
                'D': 'date',
                'HH': 'hour',
                'MM': 'minutes',
                'SS': 'seconds'
            }
        }
    },
    computed: {
        date () {
            return this.timeTable.map((type, i) => {
                return this.dateObj[this.escapeTabel[type]]
            })
        },

        dateObj: {
            get () {
                let _obj

                if (typeof this.value === 'string') {
                    let _t = this.getTimeObj(this.value)
                    _obj = new Date(1970, 0, 1, _t.hour, _t.minutes)
                    _obj = this.getDateObj(_obj)
                } else {
                    _obj = this.getDateObj(this.value)
                }

                return _obj
            },
            set (val) {
                if (typeof this.value === 'string') {
                    this.$emit('input', this.date.map(val => { 
                        return val <= 9 ? `0${val}`: val
                    }).join(':'))
                } else {
                    this.$emit('input', new Date(
                        val.year,
                        val.month -1,
                        val.date,
                        val.hour,
                        val.minutes,
                        val.seconds,
                    ))
                }
            }
        },

        iFormat () {
            return Object.assign({
                year: '',
                month: '',
                date: '',
                hour: '',
                minutes: '',
                seconds: ''
            }, this.format)
        },

        preveDate () {
            return this.setTimeBoundary('startTime')
        },

        nextDate () {
            return this.setTimeBoundary('endTime')
        },

        dateList () {
            switch (this.type) {
                case 'datetime':
                    this.timeTable = ['Y', 'M', 'D', 'HH', 'MM']
                    break
                
                case 'time':
                    this.timeTable = ['HH', 'MM']
                    break

                case 'date':
                    this.timeTable = ['Y', 'M', 'D']
                    break
                default:
                    this.timeTable = this.type.split('/')
            }

            this.startDateObj = this.getTimeBoundary('preveDate')
            this.endDateObj = this.getTimeBoundary('nextDate', true)

            return this.getDateLists()
        },


    },
    methods: {
        /**
         * 处理时间边界
         * @param {string} type 指定处理开始前还是结束时间边界
         */
        getTimeBoundary (type, isEnd = false) {
            let obj = {
                year: 1970,
                month: isEnd ? 12 : 1,
                date: isEnd ? 32 : 1,
                hour: isEnd ? 23 : 0,
                minutes: isEnd ? 59 : 0,
                seconds: isEnd ? 59 : 0
            }

            if (this[type]) {
                // 获取指定时间的对象
                let _dateObj = this.getDateObj(this[type])
                obj = Object.assign({}, obj, _dateObj)
            } else {
                // 当前时间前后默认10年选择
                obj.year = this.getDateObj().year + (isEnd ? 10 : -10)
            }

            return obj
        },
        /**
         * 返回时间对象
         * @param {Date} time 时间字符串
         */
        getDateObj (time = new Date) {
            return {
                year: time.getFullYear(),
                month: time.getMonth() + 1,
                date: time.getDate(),
                hour: time.getHours(),
                minutes: time.getMinutes(),
                seconds: time.getSeconds(),
                day: time.getDay()
            }
        },

        /**
         * 获取时间
         * @param {string} 时间，格式：12:30
         * @returns {object} 返回时间对象
         */
        getTimeObj (val) {
            let obj = {
                hour: 0,
                minutes: 0
            }

            if (val) {
                let [hour, minutes] = val.split(':')

                obj = Object.assign({}, obj, {
                    hour: Number(hour), 
                    minutes: Number(minutes)
                })
            }

            return obj
        },

        getDateLists () {
            let start = 1 
            let end = 32

            return this.timeTable.map(type => {
                switch (type) {
                    case 'Y':
                        return this.getList(this.startDateObj.year, this.endDateObj.year, 'year')
                    case 'M':
                        start = this.dateObj.year <= this.startDateObj.year ? this.startDateObj.month : 1
                        
                        if (this.dateObj.year === this.endDateObj.year) {
                            end = this.endDateObj.month
                            if (this.dateObj.month >= this.endDateObj.month) {
                                this.dateObj.month = end
                            }
                        } else {
                            end = 12 
                        }

                        return this.getList(start, end, 'month');
                    case 'D':
                        end = new Date(this.dateObj.year, this.dateObj
                        .month, 0).getDate()
                        
                        if (
                            this.dateObj.year === this.startDateObj.year
                            && this.dateObj.month <= this.startDateObj.month
                        ) {
                            start = this.startDateObj.date

                            if (this.dateObj.date <= this.startDateObj.date) {
                                this.dateObj.date = start
                            }
                        }

                        if (
                            this.dateObj.year === this.endDateObj.year
                            && this.dateObj.month >= this.endDateObj.month
                        ) {
                            end = this.endDateObj.date

                            if (this.dateObj.date >= this.endDateObj.date) {
                                this.dateObj.date = end
                            }
                        }

                        return this.getList(start, end, 'date')
                    case 'HH':
                        return this.computedBoundary('hour')
                    case 'MM':
                        return this.computedBoundary('minutes')
                    case 'SS':
                        return this.getList(0, 59, 'seconds')
                }
            })
        },

        getList (start, end, type) {
            let result = []
            for (let i = start; i <= end; i++) {
                let label = i + this.iFormat[type]

                if (['hour','minutes', 'seconds'].includes(type)) {
                    if (i <= 9) {
                        label = `0${label}`
                    }
                }

                result.push({
                    label,
                    value: i
                })
            }
            return result
        },

        /**
         * 更新事件
         * @param {object} item 更新内容
         * @param {number} index 更新的索引
         */
        update (item, index) {
            this.dateObj[this.escapeTabel[this.timeTable[index]]] = item.value
            this.dateObj = Object.assign({}, this.dateObj)
        },

        /**
         * 设置时间的前后边界
         * @param {string} type 取值对象
         */
        setTimeBoundary (type) {
            // 如果用户设置了时间的取值范围
            if (this[type]) {
                let _t = this.getTimeObj(this[type])
                return new Date(1970, 0, 1, _t.hour, _t.minutes)
            } else {
                // 返回开始与结束时间
                return this[`${type.slice(0, -4)}Date`]
            }
        },

        getTimeNo (obj, type) {
            let arr = [obj.year, obj.month, obj.date]

            if (type === 'minutes') {
                arr.push(obj.hour)
            }

            return new Date(...arr).getTime()

        },

        /**
         * 计算小时与分钟的边界选择列表
         * @returns 返回 picker 组件列表数组
         */
        computedBoundary (type) {
            let start = 0
            let end = type === 'hour' ? 23 : 59

            let _STime = this.getTimeNo(this.startDateObj, type)
            let _ETime = this.getTimeNo(this.endDateObj, type)
            let _NTime = this.getTimeNo(this.dateObj, type)

            if (_NTime === _STime) {
                start = this.startDateObj[type]

                if (this.dateObj[type] <= this.startDateObj[type]) {
                    this.dateObj[type] = start
                }
            }

            if (_NTime === _ETime) {
                end = this.endDateObj[type]

                if (this.dateObj[type] >= this.endDateObj[type]) {
                    this.dateObj[type] = end
                }
            }

            return this.getList(start, end, type)
        }
    }
}
</script>