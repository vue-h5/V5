import Vue from 'vue';

//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: 'v5-button',
    props: {
        // 按钮样式 - primary danger warn 默认
        type: {
            type: String,
            default: ''
        },
        // 简约模式 - 关
        plain: {
            type: Boolean,
            default: false
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 大小
        size: {
            type: String,
            default: ''
        },
        // 加载状态
        loading: {
            type: Boolean,
            default: false
        },
        // 圆角
        radius: {
            type: [Number,String],
            default: 3
        },
        // 图标
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        style () {
            let result = {};
            if (typeof this.radius === 'string') {
                if (this.radius === 'round') {
                    result = {
                        borderRadius: '1em'
                    };
                } else {
                    result = {
                        borderRadius: `${this.radius}px`
                    };
                }
            }
            return result
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    _vm._g(
      {
        class: [
          "v5-button",
          _vm.type,
          _vm.size,
          { loading: _vm.loading, plain: _vm.plain }
        ],
        style: _vm.style,
        attrs: { disabled: _vm.disabled }
      },
      _vm.$listeners
    ),
    [
      _c("transition", { attrs: { name: "v5-scale" } }, [
        _vm.loading
          ? _c(
              "span",
              { staticClass: "v5-btn-loading" },
              [_c("v5-icon", { staticClass: "spinner3" })],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.icon ? _c("v5-icon", { class: _vm.icon }) : _vm._e(),
      _vm._v(" "),
      _c("span", [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Button = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
    name: 'v5-cascader',
    props: {
        // 选择值
        value: {
            type: Array,
            default: () => []
        },
        // 选择内容
        data: {
            type: Array,
            default: () => []
        },
        // 控制弹层显隐
        show: {
            type: Boolean,
            default: false
        },
        // 只能选择到最深才可以返回值
        deep: {
            type: Boolean,
            default: false
        },
        /* 接受用户对确认按钮的控制
         * @return {Boolean}
         */
        filter: Function,
        // 异步
        async: Boolean
    },
    data () {
        return {
            result: [],
            list: {},
            item: {},
            // 按钮点击控制器
            confirm: true,
            showLoading: false
        }
    },
    watch: {
        item: {
            handler (val) {
                // 如果存在 deep
                if (this.deep) {
                    // 只有在当前列表没有选择时，才可以返回值
                    this.confirm = !val.hasOwnProperty('children');
                }

                // 在异步情况下
                if (this.async) {
                    if (val.hasOwnProperty('children')) {
                        this.showLoading = !val.children.length;
                    }
                }
            },
            deep: true
        },
        show (val) {
            if (val) {
                this.format();
            }
        },
        data (val) {
            this.format();
        }
    },
    methods: {
        format () {
            // 清空老数据 
            this.result = [];
            this.item = {
                children: []
            };

            this.loop(this.data);
            this.getLabel();
    
            // 处理默认值回填
            if (this.result.length) {
                this.item = this.result.slice(-1)[0];
            } else {
                // 没有默认值就使用 data
                this.item = {
                    children: this.data
                };
            }
    
            if (this.deep) {
                this.confirm = false;
            }
        },

        /**
         * 处理数据回填使用
         * @param {Array} data 用户传入的数组
         * @param {String} parent 父级，用于在处理回填时，对上级可以准确判断，防止级别错误 
         */
        loop (data, parent) {
            data.forEach((item, i) => {
                this.list[item.value] = item;

                if (parent) {
                    this.list[item.value].parent = parent;
                }
                
                if (item.children) {
                    this.loop(item.children, item.value);
                }
            });
        },

        getLabel () {
            this.value.forEach((key, index) => {
                let item = this.list[key];

                if (!item) return

                // 对父级判断
                // 有父级的情况下，如果对应不上，则显示最近正确的层级
                if (item.parent) {
                    if (this.value[index -1] !== item.parent) {
                        return
                    }
                }

                this.result.push( item );
            });
        },

        update (item) {
            if (this.filter) {
                // 接受确认按钮状态
                this.confirm = this.filter(item, this.confirm);
            } 

            this.item = item;
            this.result.push(item);

            this.$emit('update', item);
        },

        change (nav, i) {
            if (this.filter) {
                // 接受确认按钮状态
                this.confirm = this.filter(nav, this.confirm);
            } 

            this.item = nav;
            this.result = this.result.slice(0, i+1);
            this.$emit('update', nav);
        },

        clear () {
            this.result = [];
            this.item = {
                children: this.data
            };
        },

        send () {
            if (this.confirm) {
                let data = this.result.map(val => {
                    return val.value
                });

                this.$emit('input', data);
                this.$emit('update:show', false);
                this.$emit('confirm', {
                    data,
                    result: this.result
                });
            }
        },
        
        cancel () {
            this.$emit('update:show', false);
            this.$emit('cancel');
        }
    }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v5-layer",
    {
      staticClass: "v5-cascader-mod",
      attrs: { show: _vm.show, position: "right" }
    },
    [
      _c("div", { staticClass: "v5-cascader-inner-mod" }, [
        _c(
          "header",
          { staticClass: "v5-cascader-header" },
          [
            _vm._l(_vm.result, function(nav, i) {
              return _c(
                "span",
                {
                  key: nav.value,
                  class: [{ child: nav.children }],
                  on: {
                    click: function($event) {
                      return _vm.change(nav, i)
                    }
                  }
                },
                [_vm._v(_vm._s(nav.label))]
              )
            }),
            _vm._v(" "),
            _c(
              "i",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.result.length,
                    expression: "result.length"
                  }
                ],
                staticClass: "close-btn",
                on: { click: _vm.clear }
              },
              [_vm._v("")]
            )
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { class: ["current-list-box", { async: _vm.async }] },
          [
            _vm.showLoading
              ? _c("div", { staticClass: "loading-box" }, [
                  _c("p", [_c("v5-icon", { staticClass: "spinner3" })], 1),
                  _vm._v(" "),
                  _c("p", [_vm._v("加载中...")])
                ])
              : _vm._l(_vm.item.children, function(item, index) {
                  return _c("v5-cell", {
                    key: index,
                    attrs: {
                      title: item.label,
                      subTitle: item.subTitle,
                      icon: item.children ? "right" : "",
                      disabled: item.disabled
                    },
                    on: {
                      click: function($event) {
                        return _vm.update(item)
                      }
                    }
                  })
                })
          ],
          2
        ),
        _vm._v(" "),
        _c("footer", [
          _c("button", { on: { click: _vm.cancel } }, [_vm._v("取消")]),
          _vm._v(" "),
          _c(
            "button",
            { attrs: { disabled: !_vm.confirm }, on: { click: _vm.send } },
            [_vm._v("确认")]
          )
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Cascader = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
    name: 'v5-cell',
    props: {
        // logo 图标
        logo: String,
        // 主标题内容
        title: [String, Number],
        // 副标题内容
        subTitle: [String, Number],
        // 跳转外网地址
        href: String,
        // 内部路由跳转
        to: String,
        // 内容
        inner: {
            default: ''
        },
        // 图标
        icon: String,
        // 不过使用
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        myIcon () {
            if (this.to || this.href) {
                return this.icon || 'right'
            } else {
                return this.icon || false
            }
        }
    },
    methods: {
        onClick () {
            if (this.to && this.$router && !this.disabled) {
                this.$router.push(this.to);
            }
        }
    }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "a",
    _vm._g(
      {
        staticClass: "v5-cell-mod",
        attrs: { href: _vm.href, disabled: _vm.disabled },
        on: { click: _vm.onClick }
      },
      _vm.$listeners
    ),
    [
      _c(
        "div",
        { staticClass: "left-box" },
        [
          _vm.logo ? _c("v5-icon", { class: _vm.logo }) : _vm._e(),
          _vm._v(" "),
          _c("main", [
            _c("div", { staticClass: "title" }, [_vm._v(_vm._s(_vm.title))]),
            _vm._v(" "),
            _c("div", { staticClass: "sub-title" }, [
              _vm._v(_vm._s(_vm.subTitle))
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "right-box" },
        [
          _c("p", [_vm._v(_vm._s(_vm.inner))]),
          _vm._v(" "),
          _vm.myIcon ? _c("v5-icon", { class: _vm.myIcon }) : _vm._e()
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Cell = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$3 = {
    name: 'v5-cell-group',
    data () {
        return {

        }
    }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v5-cell-group-mod" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5CellGroup = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
    name: 'v5-collapse',
    props: {
        // 标题内容
        title: String,
        // 图标库
        // http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927
        icon: String,
        // 状态
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 子集伸缩开关
            show: false,
            style: {
                height: 0
            }
        }
    },
    mounted () {
        if (this.open) {
            this.toggle();
        }
    },
    methods: {
        toggle () {
            let h = this.$el.querySelector('.v5-collapse-inner').scrollHeight;
            this.show = !this.show;
            this.style.height = this.show ? `${h}px` : 0;
        }
    }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("section", { staticClass: "v5-collapse-box" }, [
    _c(
      "header",
      { class: { open: _vm.show }, on: { click: _vm.toggle } },
      [
        _vm.icon ? _c("v5-icon", { class: _vm.icon }) : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "v5-collapse-title" }, [
          _c("span", [_vm._v(_vm._s(_vm.title))])
        ]),
        _vm._v(" "),
        _c("v5-icon", { staticClass: "down" })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "v5-collapse-inner", style: _vm.style },
      [_vm._t("default")],
      2
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Collapse = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$5 = {
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
                let _obj;

                if (typeof this.value === 'string') {
                    let _t = this.getTimeObj(this.value);
                    _obj = new Date(1970, 0, 1, _t.hour, _t.minutes);
                    _obj = this.getDateObj(_obj);
                } else {
                    _obj = this.getDateObj(this.value);
                }

                return _obj
            },
            set (val) {
                if (typeof this.value === 'string') {
                    this.$emit('input', this.date.map(val => { 
                        return val <= 9 ? `0${val}`: val
                    }).join(':'));
                } else {
                    this.$emit('input', new Date(
                        val.year,
                        val.month -1,
                        val.date,
                        val.hour,
                        val.minutes,
                        val.seconds,
                    ));
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
            };
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
                    this.timeTable = ['Y', 'M', 'D', 'HH', 'MM'];
                    break
                
                case 'time':
                    this.timeTable = ['HH', 'MM'];
                    break

                case 'date':
                    this.timeTable = ['Y', 'M', 'D'];
                    break
                default:
                    this.timeTable = this.type.split('/');
            }

            // 生成2个前后时间的边界，用于picker生成选择列表
            this.startDateObj = this.getTimeBoundary('preveDate');
            this.endDateObj = this.getTimeBoundary('nextDate', true);

            return this.getDateLists()
        },

        disDateObj () {
            let obj = {};
            let loop = (str, label) => {
                // _DT = dateTime
                let _DT = str.split(/\s/);
                let [_Y, _M, _D] = _DT[0].split('/');
                let _time = _DT[1] || '';
                let [_HH, _MM, _SS] = _time.split(':');

                if (!Reflect.has(obj, _Y)) {
                    obj[_Y] = _M ? {} : label;
                }

                if (_M && !Reflect.has(obj[_Y], _M)) {
                    obj[_Y][_M] = _D ? {} : label;
                }

                if (_D && !Reflect.has(obj[_Y][_M], _D)) {
                    obj[_Y][_M][_D] = _HH ? {} : label || str;
                }

                if (_HH && !Reflect.has(obj[_Y][_M][_D], _HH)) {
                    obj[_Y][_M][_D][_HH] = _MM ? {} : label;
                }

                if (_MM && !Reflect.has(obj[_Y][_M][_D][_HH], _MM)) {
                    obj[_Y][_M][_D][_HH][_MM] = _SS ? {} : label;
                }

                if (_SS && !Reflect.has(obj[_Y][_M][_D][_HH][_MM], _SS)) {
                    obj[_Y][_M][_D][_HH][_MM] = _SS ? {} : label;
                }
            };

            for (let key in this.disDate) {
                let label = this.disDate[key];

                if (key.includes('-')) {
                    if (key.includes(' ')) {
                        if (key.includes(':')) {
                            let [_startDate, _endTime] = key.split('-');
                            let [_padStart, _startTime] = _startDate.split(/\s/);
                            let [_startHour, _startMinutes] = _startTime.split(':');
                            let [_endHour, _endMinutes] = _endTime.split(':');

                            for (let h = _startHour; h <= _endHour; h++) {
                                let _SM = h == _startHour ? _startMinutes : 0;
                                let _EM = h == _endHour ? _endMinutes : 59;
                                for (let m = _SM; m <= _EM; m++) {
                                    loop(_padStart+` ${h}:${m}`, label);
                                }
                            }
                        } else {
                            let [_HD, _ED] = key.split('-');
                            // _ST = string
                            let [_ST, _SD] = _HD.split(' ');

                            for (let i = _SD; i <= _ED; i++) {
                                loop(_ST+' '+i, label);
                            }
                        }
                    } else {
                        let [_SD, _ED] = key.split('-');
                        let _SDArr = _SD.split('/');

                        switch (_SDArr.length) {
                            case 1:
                                for (let i = _SD; i <= _ED; i++) {
                                    loop(String(i), label);
                                }
                                break;
                            case 2:
                                for (let i = _SDArr[1]; i <= _ED; i++) {
                                    loop(`${_SDArr[0]}/${i}`, label);
                                }
                                break;
                            case 3:
                                for (let i = Number(_SDArr[2]); i <= _ED; i++) {
                                    loop(`${_SDArr[0]}/${_SDArr[1]}/${i}`, label);
                                }
                        }
                    }
                } else {
                    loop(key, this.disDate[key]);
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
            };

            if (this[type]) {
                // 获取指定时间的对象
                let _dateObj = this.getDateObj(this[type]);
                obj = Object.assign({}, obj, _dateObj);
            } else {
                // 当前时间前后默认10年选择
                obj.year = this.getDateObj().year + (isEnd ? 10 : -10);
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
            };

            if (val) {
                let [hour, minutes] = val.split(':');

                obj = Object.assign({}, obj, {
                    hour: Number(hour), 
                    minutes: Number(minutes)
                });
            }

            return obj
        },

        getDateLists () {
            let start = 1; 
            let end = 32;

            return this.timeTable.map(type => {
                switch (type) {
                    case 'Y':
                        return this.getList(this.startDateObj.year, this.endDateObj.year, 'year')
                    case 'M':
                        start = this.dateObj.year <= this.startDateObj.year ? this.startDateObj.month : 1;
                        
                        if (this.dateObj.year === this.endDateObj.year) {
                            end = this.endDateObj.month;
                            if (this.dateObj.month >= this.endDateObj.month) {
                                this.dateObj.month = end;
                            }
                        } else {
                            end = 12; 
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
            let result = [];
            for (let i = start; i <= end; i++) {
                let label = '';
                let disabled = false;

                if (typeof this.format === 'function') {
                    let _obj = this.format(type, i);

                    label = String(_obj.label);
                    disabled = _obj.disabled;
                } else {
                    label = i + this.iFormat[type];
    
                    if (['hour','minutes', 'seconds'].includes(type)) {
                        if (i <= 9) {
                            label = `0${label}`;
                        }
                    }
                }

                // disabled
                let {year, month, date, hour, minutes} = this.dateObj;

                switch (type) {
                    case 'year':
                        try {
                            disabled = this.disDateObj[i];
                            disabled = typeof disabled === 'string';
                        } catch (e) {}
                        break;
                    case 'month':
                        try {
                            disabled = this.disDateObj[year][i];
                            disabled = typeof disabled === 'string';
                        } catch (e) {}
                        break;
                    case 'date':
                        try {
                            disabled = this.disDateObj[year][month][i];
                            if (typeof disabled === 'string') {
                                label = `${i} ${disabled}`;
                            }
                            disabled = typeof disabled === 'string';
                        } catch (e) {}
                        break;
                    case 'hour':
                        try {
                            disabled = this.disDateObj[year][month][date][i];
                            if (typeof disabled === 'object') {
                                disabled = Object.keys(disabled).length === 60;
                            } else {
                                if (typeof disabled === 'string') {
                                    label = i+` ${disabled}`;
                                    disabled = true;
                                }
                            }
                        } catch (e) {}
                        break;
                    case 'minutes':
                        try {
                            disabled = this.disDateObj[year][month][date][hour][i];
                            if (typeof disabled === 'string') {
                                label = i+ ` ${disabled}`;
                                disabled = true;
                            }
                        } catch (e) {}
                        break;

                }
                result.push({
                    label,
                    value: i,
                    disabled
                });
            }
            return result
        },

        /**
         * 更新事件
         * @param {object} item 更新内容
         * @param {number} index 更新的索引
         */
        update (item, index) {
            this.dateObj[this.escapeTabel[this.timeTable[index]]] = item.value;

            // 判断当前月中是否有目前选择的
            let date = new Date(this.dateObj.year, this.dateObj.month, 0).getDate();
            // 如果当前月没有目前选择的，我们更新为当前月最大的
            if (date < this.dateObj.date) {
                this.dateObj.date = date;
            }

            this.dateObj = Object.assign({}, this.dateObj);
        },

        /**
         * 设置时间的前后边界
         * @param {string} type 取值对象
         */
        setTimeBoundary (type) {
            // 如果用户设置了时间的取值范围
            if (this[type]) {
                let _t = this.getTimeObj(this[type]);
                return new Date(1970, 0, 1, _t.hour, _t.minutes)
            } else {
                // 返回开始与结束时间
                return this[`${type.slice(0, -4)}Date`]
            }
        },

        getTimeNo (obj, type) {
            let arr = [obj.year, obj.month];

            switch (type) {
                case 'hour':
                    arr.push(obj.date);
                    break;
                case 'minutes':
                    arr.push(obj.date, obj.hour);
            }

            return new Date(...arr).getTime()

        },

        /**
         * 计算小时与分钟的边界选择列表
         * @returns 返回 picker 组件列表数组
         */
        computedBoundary (type) {
            let start = 0;
            let end = 0;
            
            switch (type) {
                case 'hour': end = 23; break;
                case 'minutes': end = 59; break;
                case 'date':
                    start = 1;
                    end = new Date(this.dateObj.year, this.dateObj.month, 0).getDate();

                    break;
            }

            let _STime = this.getTimeNo(this.startDateObj, type);
            let _ETime = this.getTimeNo(this.endDateObj, type);
            let _NTime = this.getTimeNo(this.dateObj, type);

            if (_NTime === _STime) {
                start = this.startDateObj[type];

                if (this.dateObj[type] <= this.startDateObj[type]) {
                    this.dateObj[type] = start;
                }
            }

            if (_NTime === _ETime) {
                end = this.endDateObj[type];

                if (this.dateObj[type] >= this.endDateObj[type]) {
                    this.dateObj[type] = end;
                }
            }

            return this.getList(start, end, type)
        }
    }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v5-datepicker-mod" },
    [
      _c("v5-picker", {
        attrs: { data: _vm.dateList, disformat: "" },
        on: { update: _vm.update },
        model: {
          value: _vm.date,
          callback: function($$v) {
            _vm.date = $$v;
          },
          expression: "date"
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Datepicker = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$6 = {
    name: 'v5-field',
    // 用于辅助验证子组件内容
    // https://cn.vuejs.org/v2/api/#provide-inject
    // https://github.com/baianat/vee-validate/issues/677#issuecomment-318969216
    inject: ['$validator'],
    props: {
        // 默认值
        value: '',
        // 占位符
        placeholder: {
            type: String,
            default: ''
        },
        // 标签与错误提示内容
        label: String,
        // 提交的内容，注要为 input 添加 name
        name: String,
        // 输入框类型
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        // 验证，具体可以查看 veeValidate
        validate: {
            type: [Object, String],
            default: ''
        },
        // 提供 Select option 对象
        options: {
            type: Array,
            default: () => []
        },
        // 提供用户自定组件内容
        slots: String,
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            mes: 'v5 forms',
        }
    },
    computed: {
        formatValidate () {
            let result = '';

            // 处理对象验证
            if (typeof this.validate === 'object') {
                result = Object.assign({}, this.validate, {
                    required: this.required
                });
            } else {
                result = this.required ? `required|${this.validate}` : this.validate;
            }

            return result
        }
    },
    watch: {
        value (val, old) {
            // 只有在使用了插槽的时候 值的变化会带来验证
            if (this.type === 'slot') {
                this.$validator.validate(this.name, val);
            }
        }
    },
    methods: {
        updateSelect (evt) {
            this.$emit('input', evt.target.value);
            // 标识选中效果
            this.options.forEach(val => {
                val.selected = val.value == evt.target.value;
            });
        }
    }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["v5-form-item-box", _vm.type, { disabled: _vm.disabled }] },
    [
      _vm.type === "separator"
        ? void 0
        : [
            _c("div", { staticClass: "v5-form-item-body" }, [
              _c(
                "label",
                { class: ["v5-form-item-label", { required: _vm.required }] },
                [_vm._v(_vm._s(_vm.label))]
              ),
              _vm._v(" "),
              _c(
                "span",
                { class: ["v5-form-item-content", _vm.type] },
                [
                  _vm.type !== "slot"
                    ? [
                        _vm.type === "select"
                          ? _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "validate",
                                    rawName: "v-validate",
                                    value: _vm.formatValidate,
                                    expression: "formatValidate"
                                  }
                                ],
                                attrs: {
                                  name: _vm.name,
                                  "data-vv-as": _vm.label
                                },
                                domProps: { value: _vm.value },
                                on: {
                                  change: function($event) {
                                    return _vm.updateSelect($event)
                                  }
                                }
                              },
                              [
                                _c(
                                  "option",
                                  { attrs: { selected: "", disabled: "" } },
                                  [_vm._v(_vm._s(_vm.placeholder))]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.options, function(opt, oi) {
                                  return _c(
                                    "option",
                                    {
                                      key: oi,
                                      domProps: {
                                        value: opt.value,
                                        selected: opt.selected
                                      }
                                    },
                                    [_vm._v(_vm._s(opt.label))]
                                  )
                                })
                              ],
                              2
                            )
                          : _c("input", {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value: _vm.formatValidate,
                                  expression: "formatValidate"
                                }
                              ],
                              attrs: {
                                type: _vm.type,
                                name: _vm.name,
                                "data-vv-as": _vm.label,
                                placeholder: _vm.placeholder,
                                disabled: _vm.disabled,
                                readonly: _vm.readonly,
                                autocomplete: "off"
                              },
                              domProps: { value: _vm.value },
                              on: {
                                input: function($event) {
                                  return _vm.$emit("input", $event.target.value)
                                }
                              }
                            })
                      ]
                    : [
                        _c("input", {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.formatValidate,
                              expression: "formatValidate"
                            }
                          ],
                          attrs: {
                            type: "hidden",
                            name: _vm.name,
                            "data-vv-as": _vm.label
                          },
                          domProps: { value: _vm.value }
                        }),
                        _vm._v(" "),
                        _vm._t(_vm.slots)
                      ]
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "v5-form-item-err" }, [
              _vm._v(_vm._s(_vm.errors.first(_vm.name)))
            ])
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Field = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$7 = {
    name: 'v5-form',

    props: {
        data: {
            type: Array,
            default: []
        },
        value: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    methods: {
        submitForm () {
			this.$validator.validateAll().then(result => {
                if (
                    'submit' in this.$listeners && 
                    typeof this.$listeners.submit === 'function'
                ) {
                    this.$emit('submit', result);
                }
            });
        }
    }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "v5-form",
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.submitForm($event)
        }
      }
    },
    [
      _vm._l(_vm.data, function(item, index) {
        return _c(
          "v5-field",
          {
            key: index,
            attrs: {
              label: item.label,
              type: item.type,
              placeholder: item.placeholder,
              name: item.name || item.value,
              required: item.required,
              disabled: item.disabled,
              readonly: item.readonly,
              validate: item.validate,
              options: item.options,
              slots: item.slot
            },
            model: {
              value: _vm.value[item.value],
              callback: function($$v) {
                _vm.$set(_vm.value, item.value, $$v);
              },
              expression: "value[item.value]"
            }
          },
          [_vm._t(item.slot, null, { slot: item.slot })],
          2
        )
      }),
      _vm._v(" "),
      _vm._t("footers", [
        _c("v5-button", { attrs: { type: "primary" } }, [_vm._v("提交")])
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Form = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$8 = {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
        }
    }
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v5-hello-mod" }, [
    _c("h1", [_vm._v(_vm._s(_vm.mes))])
  ])
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Hello = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//
//
//
//

var script$9 = {
    name: 'v5-icon'
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", { class: ["v5-icon"] })
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Icon = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$a = {
    name: 'v5-layer',
    props: {
        // 控制弹层显隐
        show: {
            type: Boolean,
            default: false
        },
        // 确认动画出现的方式，top left right bottom或空
        position: {
            type: String,
            default: ''
        },
        // 定义动画时长效果
        duration: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            styles: {
                transitionDuration: 300,
                zIndex: 1000
            }
        }
    },
    methods: {
        clickEvt () {
            this.$emit('click', this.show);
        }
    },
    watch: {
        show (val) {
            this.styles.zIndex =  Number(String(Date.now()).slice(-7));
        },
        duration: {
            handler (val) {
                if (this.position)
                    this.styles.transitionDuration = `${val}ms`;
            },
            immediate: true
        }
    }
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: ["v5-layer-mod", _vm.position, { show: _vm.show }],
      style: _vm.styles,
      on: {
        "&click": function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          return _vm.clickEvt()
        }
      }
    },
    [
      _vm._t("inner", [
        _c("div", { staticClass: "v5-layer-inner" }, [_vm._t("default")], 2)
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Layer = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$b = {
    name: 'v5-marquee',
    props: {
        // 滚动速度
        speed: {
            type: Number,
            default: 3
        },
        // 间隔，主要针对内容大于盒子时，连接之前添加空格
        gap: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 原始信息
            originEl: null,
            originStyle: {},
            mirrorStyle: {},
            // 容器的信息
            BCR: {},
            style: {}
        }
    },
    mounted () {
        this.originEl = this.$el.querySelector('.v5-marquee-origin');
        this.BCR = this.$el.getBoundingClientRect();
        this.init();
    },
    methods: {
        init () {
            // 设置容器大小
            this.style = {
                height: this.originEl.scrollHeight + 'px'
            };

            let left = this.BCR.width + 'px';
            let width = left;
            let animation = `v5-marquee ${this.speed}s linear 0s infinite`;
            let originW = this.originEl.scrollWidth;

            if (originW > this.BCR.width) {
               left = originW + this.gap + 'px';
               width = left;
            }

            this.mirrorStyle = { left, width, animation };
            this.originStyle = { width, animation };
        },
        update () {
            this.originStyle = {};
            this.mirrorStyle = {};

            this.$nextTick(() => {
                this.init();
            });
        }
    }
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v5-marquee-mod", style: _vm.style }, [
    _c(
      "span",
      {
        staticClass: "v5-marquee-inner v5-marquee-origin",
        style: _vm.originStyle
      },
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _c(
      "span",
      {
        staticClass: "v5-marquee-inner v5-marquee-right",
        style: _vm.mirrorStyle
      },
      [_vm._t("default")],
      2
    )
  ])
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Marquee = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

var Scroll = {
    data () {
        return {
            position: { x: 0, y: 0},
            // 移动方向 0没有移动 1 向上  -1 向下
            direction: 0,
            // swiper 使用垂直，默认false，请在你的组件中设置此属性
            // swiperVertical: false,
            SCache: {x: 0, y: 0},
            currentIndex: 0,
            // 最大可用距离
            maxY: 0,
            maxX: 0,
            // 滚动元素
            scrollBoxEl: null,
            // 滚动元素下的子集
            children: 0,
            childSize: 0,
            // 默认单个元素高与宽
            itemHeight: 44,
            itemWidth: 0,
            // 默认样式
            styles: {
                width: 'auto',
                height: 'auto',
                transform: '',
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                transitionDuration: '0s',
                transition: 'transform'
            },
            // 记录点击时的位置
            start: {x: 0, y: 0},
            // 点击时的时间辍
            sTime: 0,
            // 是否在移动
            isMove: false
        }
    },
    watch: {
        position: {
            handler (val) {
                this.styles.transform = `translate3d(${val.x}px, ${val.y}px, 0px)`;
            },
            deep: true
        }
    },
    methods: {
        /**
         * 
         * @param {function} cb 回调方法，用于组件自己处理默认值内容
         */
        scrollInit (cb) {
            this.styles.transform = `translateY(${this.position.y}px)`;   
            this.styles.top = `${this.position.y}px`; 
            
            this.$nextTick(() => {
                this.scrollBoxEl = this.$el.querySelector(this.scrollBox);
                this.children = this.scrollBoxEl.children;
                this.childSize = this.children.length;

                if (this.scrollType === 'picker') {
                    // 最大值
                    this.maxY = this.scrollBoxEl.getBoundingClientRect().height || 0;

                    // 只有在maxY有大于0值的时候运行
                    if (this.maxY) {
                        this.itemHeight = this.maxY / this.childSize;
                        // 最大可用空间总长度减最后一个项目高度
                        this.maxY -= this.itemHeight;
                    }

                    this.setDefaultVal();
                } else if (this.scrollType === 'swiper') {
                    let firstChild = this.$children[0];
                    let firstChildBCR = firstChild.$el.getBoundingClientRect();
                    // 设置最大 x 轴移动距离
                    let elBCR = this.$el.getBoundingClientRect();

                    this.itemHeight = firstChildBCR.height;
                    this.itemWidth = firstChildBCR.width; 

                    // swiper y轴
                    if (this.swiperVertical) {
                        this.maxY = this.itemHeight * this.childSize;
                        this.styles.height = this.itemHeight + 'px';
                        this.maxY -= this.itemHeight;
                    } 
                    // swiper 在x轴滚动时，我们要对父盒子进行大小设置
                    else {
                        // this.itemWidth = elBCR.width
                        this.maxX = this.itemWidth * this.childSize;
                        // 设置父容器最大宽度
                        this.styles.width = this.maxX + 'px';
                        this.maxX -= this.itemWidth;
                    }
                }
            });
        },

        setDefaultVal () {
            for (let i = 0, l = this.data.length; i < l; i++) {
                if (this.value === this.data[i].value) {
                    this.currentIndex = i;
                    break
                }
            }

            // 取到了默认值时，我们设置位置
            if (this.currentIndex !== 'undefined') this.goTo();
            // 没有取到值时，我们要设备为 0
            else this.currentIndex = 0;
        },

        goTo (index = this.currentIndex) {
            this.styles.transitionDuration = '300ms';

            if (this.scrollType === 'picker') {
                this.position.y = index * this.itemHeight * -1;
            }

            this.saveValue(index);
        },

        touchmove (evt) {
            evt.preventDefault();

            let touch = evt.touches[0];
            let x = 0;
            let y = 0;

            if (this.scrollType === 'picker') {
                // 最新位置 = 最位置 + （页面现在位置 - 页面开始位置）
                y = this.SCache.y + touch.pageY - this.start.y;
            } 
            else if (this.scrollType === 'swiper') {
                if (this.swiperVertical) {
                    y = this.SCache.y + touch.pageY - this.start.y;

                    // 大于 0 是反向从0滑动到swiper最后一位
                    if (y > 0) {
                        // 让最后一位元素移动到第一位元素前
                        this.$children[this.childSize -1].styles.transform = `translateY(-${this.itemHeight * this.childSize}px)`;
                    }
                    // 如果移动的位置已经大于了整个最大可用范围时
                    // 我们让第一个元素到最后一个元素的位置 
                    else if (Math.abs(y) > this.maxY) {
                        this.$children[0].styles.transform = `translateY(${this.itemHeight * this.childSize}px)`;
                    }

                } else {
                    x = this.SCache.x + touch.pageX - this.start.x;

                    // 用于展示连续效果
                    // 当我们滚动到了1的前面时，移动最后一位到1前
                    if (x > 0) {
                        this.$children[this.childSize -1].styles.transform = `translateX(-${this.styles.width})`;
                    }
                    else if (Math.abs(x) > this.maxX) {
                        this.$children[0].styles.transform = `translateX(${this.styles.width})`;
                    }
                }
            }

            this.position = { x, y };
            this.isMove = true;
        },

        touchstart (evt, index) {

            evt.preventDefault();
            // 取第一个点的位置
            this.start = {
                y: evt.touches[0].pageY,
                x: evt.touches[0].pageX
            };
            
            this.sTime = Date.now();
            // 设置过滤为0s
            this.styles.transitionDuration = '0s';
            
            // 实现无限循环功能
            if (this.scrollType === 'swiper') {
                // 垂直方向
                if (this.swiperVertical) {
                    if (this.position.y > 0) {
                        // 恢复正常主定位
                        this.position.y = - this.maxY;
                        // 恢复子集定位
                        this.$children[this.childSize -1].styles.transform = `translateY(0px)`;
                    } 
                    else if (Math.abs(this.position.y) > this.maxY) {
                        this.position.y = 0;
                        this.$children[0].styles.transform = `translateY(0px)`;
                    }
                } 
                // 水平方向
                else {
                    if (this.position.x > 0) {
                        // 恢复正常主定位
                        this.position.x = - this.maxX;
                        // 恢复子集定位
                        this.$children[this.childSize -1].styles.transform = `translateX(0px)`;
                    } 
                    else if (Math.abs(this.position.x) > this.maxX) {
                        this.position.x = 0;
                        this.$children[0].styles.transform = `translateX(0px)`;
                    }
                }
            }
            // 记录当前的位置，用于后期使用
            this.SCache = Object.assign({}, this.position);
        },

        touchend (evt, index) {
            if (!this.isMove) {
                this.currentIndex = index;
                this.goTo();
                return
            }

            let moveY = evt.changedTouches[0].pageY - this.start.y;
            let time = Date.now() - this.sTime;

            // 加数度
            let speed = moveY / time;
            // 0.001 摩擦力
            let cacheTime = Math.abs(speed) / 0.001;
            // 缓动距离 = 速度 * 缓动时间
            let distance = speed * cacheTime;

            if (this.scrollType === 'picker') {
                // 如果结束时，速度大于 0.25,我们就加上缓动距离
                if (Math.abs(speed) > 0.25) {
                    this.position.y += distance;
                    this.styles.transitionDuration = cacheTime+'ms';
                } else {
                    this.styles.transitionDuration = '300ms';
                }
                // 设置滚动方向
                this.direction = this.position.y - this.SCacheY > 0 ? 1 : -1;
            } 
            else if (this.scrollType === 'swiper') {
                
                if (this.swiperVertical) {
                    let result = this.swiperEnd(evt, time, this.itemHeight);

                    this.position.y += result.distance;
                    cacheTime = result.cacheTime;
                } else {
                    let result = this.swiperEnd(evt, time, this.itemWidth);
                    
                    this.position.x += result.distance;
                    cacheTime = result.cacheTime;
                }
                // 设置移动过渡时间
                this.styles.transitionDuration = cacheTime+'ms';
            }

            this.fixedCorrection();
            this.safePosition();
            this.isMove = false;
        },
        /**
         * swiper touch end event
         * @param {event} evt touchend event
         * @param {number} endTime 结束时touch事件花费的时间
         * @param {numebr} cell 要处理的元素大小
         */
        swiperEnd (evt, endTime, cell) {
            // 最终移动距离
            let distance = 0;
            // 目前方向上移动的距离
            let move = this.swiperVertical 
                ? evt.changedTouches[0].pageY - this.start.y
                : evt.changedTouches[0].pageX - this.start.x;
            // 移动结束时的速度
            let speed = move / endTime;
            // 模拟在有摩擦率下，最终停止需要的时间
            let cacheTime = Math.abs(speed) / 0.001;
            // 对小于 300ms 的时间过滤
            cacheTime = cacheTime > 300 ? cacheTime : 300;

            // 判断移动的距离的正数是否大于 1/10
            if (Math.abs(move) > cell / 10) {
                // 如果移动的距离大于 0，比如：移动了 30px,(假设cell的大小是 100px)
                // 因为 30 > 20 所以在用户停止时，我们要让整个元素移动，那我们还要移动的距离
                // 就是 100 - 30
                distance = move > 0 ? cell - move : (cell + move) * -1;
            }

            return {
                distance,
                cacheTime
            }
        },

        // 安全距离计算
        safePosition () {
            if (this.scrollType === 'picker') {
                // y 不能小于 0
                this.position.y = this.position.y < 0 ? this.position.y : 0;
                // y 最大可移动距离为 maxY
                this.position.y = Math.abs(this.position.y) > this.maxY ? -this.maxY : this.position.y;
            }
            
            this.saveValue();
        },

        // 保障最终安全值
        saveValue (index) {
            if (this.scrollType === 'picker') {
                this.safePicker(index);
            }
            else if (this.scrollType === 'swiper') {
                this.safeSwiper(index);
            }
        },

        safePicker (index) {
            // 取传入的值，没有时计算
            this.currentIndex = index || Math.abs(this.position.y / this.itemHeight);
            let currentItem = this.data[this.currentIndex];

            if (!currentItem) return
            // 处理 disabled 的元素
            if (currentItem.disabled) {
                let nextIndex = 0;
                let prveIndex = 0;
                // 取后面最近没有disabled的元素，记录步长
                for (let i = this.currentIndex; i < this.data.length; i++) {
                    nextIndex++;
                    if (!this.data[i].disabled) break
                }
                // 取前面最近没有disabled的元素，记录步长
                for (let n = this.currentIndex; n > 0; n--) {
                    prveIndex++;
                    if (!this.data[n].disabled) break
                }

                // 清楚一步，因为第一次取值都是当前的disabled的元素
                nextIndex--;
                prveIndex--;

                // 组成新的数组
                let arr = [{
                    type: 'prev',
                    value: prveIndex
                }, {
                    type: 'next',
                    value: nextIndex
                }];
                let min = {};
                // 取前后最小的内容
                for (let i = 0; i < 2; i++) {
                    if (arr[i].value) {
                        if (min.length) {
                            min = min.value > arr[i].value ? min : arr[i];
                        } else {
                            min = arr[i];
                        }
                    }
                }

                // 设置当前的索引为最近的步长数
                this.currentIndex = min.type === 'next' 
                    ? this.currentIndex + min.value
                    : this.currentIndex - min.value;
                this.position.y = this.currentIndex * this.itemHeight *-1;
            }
        },

        safeSwiper (index) {
            let offset = this.position.x; 
            let max = -this.maxX;
            let item = this.itemWidth;

            if (this.swiperVertical) {
                offset = this.position.y;
                max = -this.maxY;
                item = this.itemHeight;
            }

            // 当偏移大于0，我们使用最大可移动值计算索引
            if (offset > 0) {
                offset = max;
            } 
            // 当偏移超出了最大可偏移时，我们使用0计算
            else if (offset < max) {
                offset = 0;
            }

            this.currentIndex = index || -offset / item;
        },

        // 固定偏差 修复移动后，内容不居中的问题
        fixedCorrection () {
            let fun = (position, item) => {
                let fix = Math.abs(position % item);
                
                // fix 最后的值是为了修复position多出的内容
                // 如果 position 是大于 0，如 102(假设我们每个是100)
                // 此时 fix 就要是 -2 ：102 + -2 = 100
                fix = fix > item / 2 ? fix - item 
                    : position > 0 ? -fix : fix;
    
                return position + fix
            };

            if (this.scrollType === 'swiper') {
                if (this.swiperVertical) {
                    this.position.y = fun(this.position.y, this.itemHeight);
                } else {
                    this.position.x = fun(this.position.x, this.itemWidth);
                }
            } 
            else if (this.scrollType === 'picker') {
                this.position.y = fun(this.position.y, this.itemHeight);
            }
        }
    }
};

//

var script$c = {
    name: 'v5-picker-item',
    mixins: [Scroll],
    props: {
        value: {
            type: [String, Number]
        },
        data: {
            type: Array,
        },
        // picker 索引，由父级给定
        index: {
            type: Number,
        }
    },
    data () {
        return {
            // 设置 picker 类型
            scrollType: 'picker',
            // 设置滚动元素
            scrollBox: '.v5-picker-ul'
        }
    },
    watch: {
        data (val) {
            this.scrollInit();
        },
        value (val) {
            this.scrollInit();
        },
        
        currentIndex (val) {
            // 传值与自身的索引
            this.$emit('input', this.data[val], this.index);
        }
    },
    mounted () {
        this.scrollInit();
    }
};

/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v5-picker-item" }, [
    _c(
      "ul",
      { staticClass: "v5-picker-ul", style: _vm.styles },
      _vm._l(_vm.data, function(item, index) {
        return _c(
          "li",
          {
            key: index,
            attrs: { disabled: item.disabled },
            on: {
              touchmove: function($event) {
                return _vm.touchmove($event)
              },
              touchstart: function($event) {
                return _vm.touchstart($event, index)
              },
              touchend: function($event) {
                return _vm.touchend($event, index)
              }
            }
          },
          [_vm._v("\n            " + _vm._s(item.label) + "\n        ")]
        )
      }),
      0
    )
  ])
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PickerItem = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

//

var script$d = {
    name: 'v5-picker',
    components: { PickerItem },
    props: {
        // 默认值
        value: {
            type: Array
        },
        // 选择内容
        data: {
            type: Array
        },
        // 用于优化对象，不用格式化 data
        disformat: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        data () {
            this.formatDataEvt();
            this.setChild();
        }
    },
    data () {
        return {
            // 格式化后的对象
            formatData: [],
            // 格式化后得到的数组与索引的对象
            // 如地区的父子级关系
            linkObj: {},
            id: 0
        }
    },
    created () {
        this.formatDataEvt();
        this.setChild();
    },
    methods: {
        // 格式化数据
        formatDataEvt (data = this.data) {
            if (this.disformat) {
                this.formatData = this.data;
                return
            } 

            // 设置第一个picker
            this.$set(this.formatData, 0, data);

            data.forEach((item, index) => {
                this.loopChild(item);
            });
        },
        // 对子集进行对象转换
        loopChild (item) {
            this.id++;
            // console.log(item, this.id)
            item._id = this.id;
            if (item.children) {
                this.linkObj[item._id] = item.children;
                item.children.forEach(val => {
                    this.loopChild(val);
                });
            }
        },

        setChild () {
            // 如果设置了默认值
            if (this.value.length) {
                // 生成选项的索引功能字段
                let key = 0;
                let nextArr = [];
                // 第一个picker内容
                let arr = this.formatData[0];

                // 处理第一个picker 为第二个picker取到数组
                for (let i = 0, l = arr.length; i < l;i++) {
                    let item = arr[i];
                    // 判断是否有值是相等的
                    if (item.value === this.value[0]) {
                        key = item._id;
                        // 设置下一个数组的picker
                        nextArr = this.linkObj[key];
                        break
                    }
                }

                // 处理默认值
                this.value.forEach((item, index) => {
                    // 排除第一个值（因为第一个picker已经存在）
                    if (index) {
                        // 判断我们的对象中是否有这个key的内容
                        if (Reflect.has(this.linkObj, key)) {
                            this.$set(
                                this.formatData,
                                index,
                                nextArr
                            );
                            // 为下一个picker准备数组，可以简单理解为第三个
                            // 因为刚才我们就是在设置第二嘛
                            nextArr = this.linkObj[nextArr[0]._id];
                        }
                    }
                });
            }
        },
        // 联动时，对子级进行更新
        resetChild (key, index) {
            let child = this.linkObj[key];
            let nextIndex = index + 1;

            if (child) {
                this.$set(this.value, nextIndex, child[0].value);
                this.$set(this.formatData, nextIndex, child);
                // 对其子级进行更新，用于多联情况
                this.resetChild(child[0]._id, nextIndex);
            }
        },

        /**
         * @param {object} data 选择的内容
         * @param {number} index 选择的 picker 索引
         */
        update (data, index) {
            this.$set(this.value, index, data.value);
            this.resetChild(data._id, index);

            this.$emit('update', data, index);
        }
    }
};

/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v5-picker-mod" },
    _vm._l(_vm.formatData, function(item, index) {
      return _c("PickerItem", {
        key: index,
        attrs: { index: index, value: _vm.value[index], data: item },
        on: { input: _vm.update }
      })
    }),
    1
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Picker = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$e = {
    name: 'v5-sort-box',
    props: {
        sort: Array,
        value: Array
    },
    data () {
        return {
            // 当前排序对象
            current: {}
        }
    },
    watch: {
        value: {
            handler (val, old) {
                if (val === old) return
                this.init();
            },
            immediate: true
        }
    },
    methods: {
        init () {
            let index = null;
            // 获取默认排序最后一项
            this.sort.forEach((val, i) => {
                if (val.classes) index = i;
            });
            // 设置排序效果
            this.sortData(this.sort[index]);
        },

        sortList (item, index) {
            if (item !== this.current)
                this.current.classes = '';

            switch (item.classes) {
                case 'up': item.classes = 'down'; break;
                case 'down': item.classes = ''; break;
                default: this.$set(item, 'classes', 'up'); break;
            }
            
            this.sortData(item);
        },

        sortData (item) {
            this.current = item;

            // 支持用户自定义排序方法
            if (typeof item.sort === 'function') {
                // 提供当前点击对象 方向 当前的数据
                item.sort(item, this.value);
            } else {
                // 默认按用户给定的key先升序后降序
                if (item.key) {
                    this.value = this.value.sort((a, b) => {
                        let result = 0;

                        if (item.classes === 'up') {
                            result = a[item.key] - b[item.key];
                        } else if (item.classes === 'down') {
                            result = b[item.key] - a[item.key];
                        }

                        return result
                    });

                    this.$emit('input', this.value);
                }
            }
        }
    }
};

/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v5-sort-box" },
    [
      _c(
        "ul",
        { staticClass: "sort-header" },
        _vm._l(_vm.sort, function(item, sIndex) {
          return _c(
            "li",
            {
              key: sIndex,
              on: {
                click: function($event) {
                  return _vm.sortList(item, sIndex)
                }
              }
            },
            [
              _c("span", [_vm._v(_vm._s(item.label))]),
              _vm._v(" "),
              item.sort ? _c("i", { class: item.classes }) : _vm._e()
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5SortBox = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );

//

var script$f = {
    name: 'v5-swiper',
    mixins: [Scroll],
    props: {
        // 垂直 true 水平false
        vertical: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 滚动类型[swiper picker]
            scrollType: 'swiper',
            // 滚动盒子
            scrollBox: '.v5-swiper-display',
            // 当前索引
            current: 0,
            // 自动定时器
            timeEvent: null,
        }
    },
    watch: {
        currentIndex (val) {
            this.$emit('change', val);
        }
    },
    computed: {
        swiperVertical () {
            return this.vertical
        }
    },
    mounted () {
        this.scrollInit(this.setMaxX);
        this.init();
    },
    methods: {
        init () {
            if (this.autoplay) {
                this.swiperAnimate();
            }
        },

        iTouchstart (evt) {
            clearTimeout(this.timeEvent);

            if (this.childSize > 1)
                this.touchstart(evt);
        },

        iTouchmove (evt) {
            if (this.childSize > 1) {
                this.touchmove(evt);
            }
        },

        iTouchend (evt) {
            this.touchend(evt);

            if (this.autoplay) {
                this.current = this.currentIndex;
                this.swiperAnimate(3000);
            }
        },

        swiperAnimate (time = this.autoplay) {
            this.timeEvent = setTimeout(() => {
                if (this.current >= this.childSize) {
                    this.current = 0;
                    this.currentIndex = 0;
                    this.$children[0].styles.transform = `translate3d(0,0,0)`;
                    this.styles.transitionDuration = '0ms';
                    this.position.x = 0;
                    this.position.y = 0;
    
                    this.swiperAnimate(50);
                    return
                } else {
                    this.current++;
                    this.currentIndex = this.current;
        
                    if (this.swiperVertical) {
                        this.position.y = this.current * -this.itemHeight;

                        if (this.current === this.childSize) {
                            this.currentIndex = 0;
                            this.$children[0].styles.transform = `translate3d(0, ${this.itemHeight * this.childSize}px,0)`;
                        }
                    } else {
                        this.position.x = this.current * -this.itemWidth;

                        // 当索引指到与个数相同时
                        if (this.current === this.childSize) {
                            // 将第一个子元素后置
                            this.$children[0].styles.transform = `translate3d(${this.styles.width},0,0)`;
                            // 索引归0
                            this.currentIndex = 0;
                        }
                    }
        
                    this.styles.transitionDuration = '300ms';
                    this.swiperAnimate();
                }
    

            }, time);
        }
    }
};

/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v5-swiper" },
    [
      _c(
        "div",
        {
          staticClass: "v5-swiper-display",
          style: _vm.styles,
          on: {
            touchstart: _vm.iTouchstart,
            touchmove: _vm.iTouchmove,
            touchend: _vm.iTouchend
          }
        },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _vm._t("indicator", [
        _c(
          "ul",
          { class: ["v5-swiper-indicators", { vertical: _vm.vertical }] },
          _vm._l(_vm.childSize, function(item) {
            return _c(
              "li",
              { key: item, class: { current: item - 1 == _vm.currentIndex } },
              [_vm._v(_vm._s(item))]
            )
          }),
          0
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Swiper = normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$g = {
    name: 'v5-swiper-item',
    data () {
        return {
            styles: {
                transform: 'translateX(0px)'
            }
        }
    }
};

/* script */
const __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v5-swiper-item", style: _vm.styles },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5SwiperItem = normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$h = {
    name: 'v5-button',
    data () {
        return {
            show: false
        }
    },
    methods: {
        alertEvt () {
            // this.$v5Alert()
        }
    }
};

/* script */
const __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm._m(0)
};
var __vue_staticRenderFns__$h = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "v5-alert-mod" }, [
      _c("h1", [_vm._v("hello")])
    ])
  }
];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Com = normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );

let extendModel = Vue.extend(Com);
let instance;

const v5Alert = function(opts) {
    instance = new extendModel({
        data: opts
    });
    document.body.appendChild(instance.$mount().$el);
    console.log(instance);
    return instance
};

//
//
//
//
//
//
//
//

var script$i = {
    name: 'v5-loading-bar',
    props: {
        value: {
            type: Number,
            default: 10
        },
        show: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            display: false
        }
    },
    watch: {
        show (val) {
            if (val) {
                this.display = val;
            } else {
                setTimeout(()=> {
                    this.display = val;
                }, 500);
            }
        }
    }
};

/* script */
const __vue_script__$i = script$i;

/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "v5-fade" } }, [
    _c(
      "section",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.display,
            expression: "display"
          }
        ],
        class: ["v5-loading-bar", { error: _vm.error }]
      },
      [_c("i", { style: { width: _vm.value + "%" } })]
    )
  ])
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Mode = normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

let modelConstructor = Vue.extend(Mode);
let instance$1;
let timer;

const v5LoadingBar = () => {
    instance$1 = new modelConstructor;
    document.body.appendChild(instance$1.$mount().$el);
};

function step () {
    timer = setInterval(() => {
        instance$1.value += Math.floor(Math.random() * 5);

        if (instance$1.value > 90) {
            clearInterval(timer
            );
        }
    }, 100);
}

// 开始动画
// 可以传入初始值，有初始值时，我们不模拟加载了
v5LoadingBar.start = (val = 0) => {
    // 只生成一个加载状态
    if (!instance$1) {
        v5LoadingBar();
    }
    
    // 默认设置
    instance$1.value = val;
    instance$1.show = true;
    instance$1.error = false;

    if (!val) step();
};

v5LoadingBar.finish = () => {
    instance$1.value = 100;
    instance$1.show = false;
};

v5LoadingBar.progress = val => {
    instance$1.value = Number(val);
};

v5LoadingBar.error = () => {
    instance$1.error = true;
    instance$1.value = 100;
    instance$1.show = false;
};

const components = [
    v5Button,
    v5Cascader,
    v5Cell,
    v5CellGroup,
    V5Collapse,
    V5Datepicker,
    V5Field,
    V5Form,
    v5Hello,
    V5Icon,
    V5Layer,
    V5Marquee,
    V5Picker,
    V5SortBox,
    V5Swiper,
    V5SwiperItem
];

const install = Vue => {
    if (install.installed) return
    
    components.forEach(key => {
        Vue.component(key.name, key);
    });

    Vue.prototype.$v5LoadingBar = v5LoadingBar;
    Vue.prototype.$v5Alert = v5Alert;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

var index = {
    install,
    v5LoadingBar
};

export default index;
export { V5Collapse, V5Datepicker, V5Field, V5Form, V5Icon, V5Layer, V5Marquee, V5Picker, V5SortBox, V5Swiper, V5SwiperItem, install, v5Button, v5Cascader, v5Cell, v5CellGroup, v5Hello };
