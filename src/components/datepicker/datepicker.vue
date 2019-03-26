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
            type: [Object, Function]
        },
        // 用于规定那些时间不可选择，具体到天
        disDate: {
            type: [Object, String]
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
            let defaultOptions = {
                year: '',
                month: '',
                date: '',
                hour: '',
                minutes: '',
                seconds: ''
            }
            if (typeof this.format === 'object') {
                return Object.assign(defaultOptions, this.format)
            } else {
                return defaultOptions
            }
        },

        preveDate () {
            // 将用户给定的时间转化为时间对象
            return this.setTimeBoundary('startTime')
        },

        nextDate () {
            // 将用户给定的时间转化为时间对象
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

            // 生成2个前后时间的边界，用于picker生成选择列表
            this.startDateObj = this.getTimeBoundary('preveDate')
            this.endDateObj = this.getTimeBoundary('nextDate', true)

            return this.getDateLists()
        },

        disDateObj () {
            let obj = {}
            let loop = (str, label) => {
                // _DT = dateTime
                let _DT = str.split(/\s/)
                let [_Y, _M, _D] = _DT[0].split('/')
                let _time = _DT[1] || ''
                let [_HH, _MM, _SS] = _time.split(':')

                if (!Reflect.has(obj, _Y)) {
                    obj[_Y] = _M ? {} : label
                }

                if (_M && !Reflect.has(obj[_Y], _M)) {
                    obj[_Y][_M] = _D ? {} : label
                }

                if (_D && !Reflect.has(obj[_Y][_M], _D)) {
                    obj[_Y][_M][_D] = _HH ? {} : label || str
                }

                if (_HH && !Reflect.has(obj[_Y][_M][_D], _HH)) {
                    obj[_Y][_M][_D][_HH] = _MM ? {} : label
                }

                if (_MM && !Reflect.has(obj[_Y][_M][_D][_HH], _MM)) {
                    obj[_Y][_M][_D][_HH][_MM] = _SS ? {} : label
                }

                if (_SS && !Reflect.has(obj[_Y][_M][_D][_HH][_MM], _SS)) {
                    obj[_Y][_M][_D][_HH][_MM] = _SS ? {} : label
                }
            }

            for (let key in this.disDate) {
                let label = this.disDate[key]

                if (key.includes('-')) {
                    if (key.includes(' ')) {
                        if (key.includes(':')) {
                            let [_startDate, _endTime] = key.split('-')
                            let [_padStart, _startTime] = _startDate.split(/\s/)
                            let [_startHour, _startMinutes] = _startTime.split(':')
                            let [_endHour, _endMinutes] = _endTime.split(':')

                            for (let h = _startHour; h <= _endHour; h++) {
                                let _SM = h == _startHour ? _startMinutes : 0
                                let _EM = h == _endHour ? _endMinutes : 59
                                for (let m = _SM; m <= _EM; m++) {
                                    loop(_padStart+` ${h}:${m}`, label)
                                }
                            }
                        } else {
                            let [_HD, _ED] = key.split('-')
                            // _ST = string
                            let [_ST, _SD] = _HD.split(' ')

                            for (let i = _SD; i <= _ED; i++) {
                                loop(_ST+' '+i, label)
                            }
                        }
                    } else {
                        let [_SD, _ED] = key.split('-')
                        let _SDArr = _SD.split('/')

                        switch (_SDArr.length) {
                            case 1:
                                for (let i = _SD; i <= _ED; i++) {
                                    loop(String(i), label)
                                }
                                break;
                            case 2:
                                for (let i = _SDArr[1]; i <= _ED; i++) {
                                    loop(`${_SDArr[0]}/${i}`, label)
                                }
                                break;
                            case 3:
                                for (let i = Number(_SDArr[2]); i <= _ED; i++) {
                                    loop(`${_SDArr[0]}/${_SDArr[1]}/${i}`, label)
                                }
                        }
                    }
                } else {
                    loop(key, this.disDate[key])
                }
            }

            return obj
        }
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
                        return this.computedBoundary('date')
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
                let label = ''
                let disabled = false

                if (typeof this.format === 'function') {
                    let _obj = this.format(type, i)

                    label = String(_obj.label)
                    disabled = _obj.disabled
                } else {
                    label = i + this.iFormat[type]
    
                    if (['hour','minutes', 'seconds'].includes(type)) {
                        if (i <= 9) {
                            label = `0${label}`
                        }
                    }
                }

                // disabled
                let {year, month, date, hour, minutes} = this.dateObj;

                switch (type) {
                    case 'year':
                        try {
                            disabled = this.disDateObj[i]
                            disabled = typeof disabled === 'string'
                        } catch (e) {}
                        break;
                    case 'month':
                        try {
                            disabled = this.disDateObj[year][i];
                            disabled = typeof disabled === 'string'
                        } catch (e) {}
                        break;
                    case 'date':
                        try {
                            disabled = this.disDateObj[year][month][i];
                            if (typeof disabled === 'string') {
                                label = `${i} ${disabled}`;
                            }
                            disabled = typeof disabled === 'string'
                        } catch (e) {}
                        break;
                    case 'hour':
                        try {
                            disabled = this.disDateObj[year][month][date][i];
                            if (typeof disabled === 'object') {
                                disabled = Object.keys(disabled).length === 60
                            } else {
                                if (typeof disabled === 'string') {
                                    label = i+` ${disabled}`
                                    disabled = true
                                }
                            }
                        } catch (e) {}
                        break;
                    case 'minutes':
                        try {
                            disabled = this.disDateObj[year][month][date][hour][i];
                            if (typeof disabled === 'string') {
                                label = i+ ` ${disabled}`
                                disabled = true
                            }
                        } catch (e) {}
                        break;

                }
                result.push({
                    label,
                    value: i,
                    disabled
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

            // 判断当前月中是否有目前选择的
            let date = new Date(this.dateObj.year, this.dateObj.month, 0).getDate()
            // 如果当前月没有目前选择的，我们更新为当前月最大的
            if (date < this.dateObj.date) {
                this.dateObj.date = date
            }

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
            let arr = [obj.year, obj.month]

            switch (type) {
                case 'hour':
                    arr.push(obj.date)
                    break;
                case 'minutes':
                    arr.push(obj.date, obj.hour)
            }

            return new Date(...arr).getTime()

        },

        /**
         * 计算小时与分钟的边界选择列表
         * @returns 返回 picker 组件列表数组
         */
        computedBoundary (type) {
            let start = 0
            let end = 0
            
            switch (type) {
                case 'hour': end = 23; break;
                case 'minutes': end = 59; break;
                case 'date':
                    start = 1
                    end = new Date(this.dateObj.year, this.dateObj.month, 0).getDate();

                    break;
            }

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