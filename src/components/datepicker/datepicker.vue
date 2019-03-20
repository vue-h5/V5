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
            let obj = {}

            obj = {
                year: 1970,
                month: isEnd ? 12 : 1,
                date: isEnd ? 30 : 1,
                hour: isEnd ? 23 : 0,
                minutes: isEnd ? 59 : 0,
                seconds: isEnd ? 59 : 0
            }

            if (this[type]) {
                // 获取指定时间的对象
                let _dateObj = this.getDateObj(this[type])
                obj.year = _dateObj.year

                // 处理时间边界
                if (this.dateObj.year === _dateObj.year) {
                    obj.month = _dateObj.month

                    if (isEnd) {
                        if (this.dateObj.month >= _dateObj.month) {
                            obj.date = _dateObj.date
                            this.dateObj.month = _dateObj.month
    
                            if (this.dateObj.date >= _dateObj.date) {
                                obj.hour = _dateObj.hour
                                this.dateObj.date = _dateObj.date
    
                                if (this.dateObj.hour >= _dateObj.hour) {
                                    obj.minutes = _dateObj.minutes
                                    this.dateObj.hour = _dateObj.hour

                                    if (this.dateObj.minutes >= _dateObj.minutes) {
                                        obj.seconds = _dateObj.seconds
                                        this.dateObj.minutes = _dateObj.minutes
                                    }
                                }
                            }
                        }
                    } else {
                        if (this.dateObj.month <= _dateObj.month) {
                            obj.date = _dateObj.date
                            this.dateObj.month = _dateObj.month
    
                            if (this.dateObj.date <= _dateObj.date) {
                                obj.hour = _dateObj.hour
                                this.dateObj.date = _dateObj.date
    
                                if (this.dateObj.hour <= _dateObj.hour) {
                                    obj.minutes = _dateObj.minutes
                                    this.dateObj.hour = _dateObj.hour

                                    if (this.dateObj.minutes <= _dateObj.minutes) {
                                        obj.seconds = _dateObj.seconds
                                        this.dateObj.minutes = _dateObj.minutes
                                    }
                                }
                            }
                        }
                    }
                }
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
            return this.timeTable.map(type => {
                switch (type) {
                    case 'Y':
                        return this.getList(this.startDateObj.year, this.endDateObj.year, 'year')
                    case 'M':
                        return this.getList(this.startDateObj.month, this.endDateObj.month, 'month');
                    case 'D':
                        return this.getList(this.startDateObj.date, this.endDateObj.date, 'month')
                    case 'HH':
                        return this.getList(this.startDateObj.hour, this.endDateObj.hour, 'hour')
                    case 'MM':
                        return this.getList(this.startDateObj.minutes, this.endDateObj.minutes, 'minutes')
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
        }
    }
}
</script>