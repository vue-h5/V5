<template>
    <div class="v5-datepicker-mod">
        {{date}}
        <v5-picker v-model="date" :data="dateList" disformat @update="update"/>
    </div>
</template>

<script>
export default {
    name: 'v5-datepicker',
    props: {
        value: {
            type: Date,
            default: () => new Date()
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
            // dateObj: {},
            startDateObj: {},
            endDateObj: {},
            // date: [2019, 3, 1, 12, 0],
            // dateList: [],
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
                console.log('C_GET dateObj')
                let _obj = this.getDateObj(this.value)

                return _obj

            },
            set (val) {
                console.log('C_SET dateObj')
                this.$emit('input', new Date(
                    val.year,
                    val.month -1,
                    val.date,
                    val.hour,
                    val.minutes,
                    val.seconds,
                ))
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

        dateList () {
            if (!this.nowDateObj) {
                this.nowDateObj = this.getDateObj()
            }

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

            }

            this.startDateObj = this.getTimeBoundary('startDate')
            this.endDateObj = this.getTimeBoundary('endDate')

            console.log('startDateObj:', this.startDateObj)
            console.log('endDateObj:', this.endDateObj)

            return this.getDateLists()
        }
    },
    methods: {
        getTimeBoundary (type) {
            let obj = {}
            let isEnd = type === 'endDate'

            obj = {
                month: isEnd ? 12 : 1,
                date: isEnd ? 30 : 1,
                hour: isEnd ? 23 : 0,
                minutes: isEnd ? 59 : 0,
                seconds: isEnd ? 59 : 0
            }

            if (this[type]) {
                let _dateObj = this.getDateObj(this[type])
                obj.year = _dateObj.year

                if (this.dateObj.year === _dateObj.year) {
                    obj.month = _dateObj.month

                    if (this.dateObj.month === _dateObj.month) {
                        obj.date = _dateObj.date

                        if (this.dateObj.date === _dateObj.date) {
                            obj.hour = _dateObj.hour

                            if (this.dateObj.hour === _dateObj.hour) {
                                obj.minutes = _dateObj.minutes
                            }
                        }
                    }
                }
            } else {
                obj.year = this.getDateObj().year + (isEnd ? 10 : -10)
            }

            return obj
        },

        getDateObj (val) {
            let _d = val ? new Date(val) : new Date()

            return {
                year: _d.getFullYear(),
                month: _d.getMonth() + 1,
                date: _d.getDate(),
                hour: _d.getHours(),
                minutes: _d.getMinutes(),
                seconds: _d.getSeconds(),
                day: _d.getDay()
            }
        },

        getTimeObj (val, num = 0) {
            let obj = {
                hour: num,
                minutes: num
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

                if (['hour','minutes'].includes(type)) {
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

        update (item, index) {
            console.warn('update')
            console.count()
            this.dateObj[this.escapeTabel[this.timeTable[index]]] = item.value
            this.dateObj = Object.assign({}, this.dateObj)
        }
    }
}
</script>