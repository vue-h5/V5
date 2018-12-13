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
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/button/button.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Button = __vue_normalize__(
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
                      _vm.change(nav, i);
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
                        _vm.update(item);
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
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/cascader/cascader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Cascader = __vue_normalize__$1(
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
        inner: String,
        // 图标
        icon: String,
        // 不过使用
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
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
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/cell/cell.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Cell = __vue_normalize__$2(
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
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/cellGroup/cell-group.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5CellGroup = __vue_normalize__$3(
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
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/collapse/collapse.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Collapse = __vue_normalize__$4(
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

var script$5 = {
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
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function() {
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
                                    _vm.updateSelect($event);
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
                                  _vm.$emit("input", $event.target.value);
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
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/field/field.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Field = __vue_normalize__$5(
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

var script$6 = {
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
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function() {
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
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/form/form.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Form = __vue_normalize__$6(
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

var script$7 = {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
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
  return _c("h1", [_vm._v(_vm._s(_vm.mes))])
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
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/hello/hello.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var v5Hello = __vue_normalize__$7(
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

var script$8 = {
    name: 'v5-icon'
};

/* script */
            const __vue_script__$8 = script$8;
            
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", { class: ["v5-icon"] })
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
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/icon/icon.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Icon = __vue_normalize__$8(
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
//
//
//
//
//
//
//
//

var script$9 = {
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
        // 定义动画效果
        animate: {
            type: String,
            default: 'fade'
        }
    },
    data () {
        return {
            zIndex: 1000
        }
    },
    methods: {
        clickEvt () {
            this.$emit('click', this.show);
        }
    },
    watch: {
        show (val) {
            this.zIndex = new Date().getTime();
        }
    }
};

/* script */
            const __vue_script__$9 = script$9;
            
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: ["v5-layer-mod", _vm.position, { show: _vm.show }],
      style: { zIndex: _vm.zIndex },
      on: {
        "&click": function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          _vm.clickEvt();
        }
      }
    },
    [_c("div", { staticClass: "v5-layer-inner" }, [_vm._t("default")], 2)]
  )
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
  /* component normalizer */
  function __vue_normalize__$9(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/layer/layer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Layer = __vue_normalize__$9(
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

var script$a = {
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
            inner: null,
            innerBCR: {},
            BCR: {},
            style: {}
        }
    },
    mounted () {
        this.inner = this.$el.querySelector('.v5-marquee-inner');
        this.innerBCR = this.inner.getBoundingClientRect();
        this.BCR = this.$el.getBoundingClientRect();

        // 设置容器的高度
        this.style = {
            height: this.innerBCR.height + 'px'
        };
        
        // 处理复制内容的位置
        let left = 0;
        let gap = 0;
        // 如果内容的宽度大于容器
        if (this.BCR.width > this.innerBCR.width) {
            left = this.BCR.width;
            this.inner.style.width = this.BCR.width + 'px';
        } else {
            left = this.innerBCR.width + this.gap;
            gap = this.gap;
        }

        // 添加动画样式
        let className = `v5-marquee-inner${+ new Date}`;
        let css = document.createElement('style');
        css.type = 'text/css';

        let style = `.${className} { padding-right: ${gap}px; animation: v5-marquee ${this.speed}s linear 0s infinite;}`;

        // 添加样式
        css.appendChild(document.createTextNode(style));

        this.$el.appendChild(css);
        this.inner.classList.add(className);

        // 克隆对象
        let node = this.inner.cloneNode(true);
        node.style.left = left + 'px';
        this.$el.appendChild(node);
    }
};

/* script */
            const __vue_script__$a = script$a;
            
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v5-marquee-mod", style: _vm.style }, [
    _c("span", { staticClass: "v5-marquee-inner" }, [_vm._t("default")], 2)
  ])
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
  /* component normalizer */
  function __vue_normalize__$a(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/marquee/marquee.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5Marquee = __vue_normalize__$a(
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
//
//
//
//
//
//
//
//
//

var script$b = {
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
    mounted () {
        let index = null;
        // 获取默认排序最后一项
        this.sort.forEach((val, i) => {
            if (val.classes) index = i;
        });
        // 设置排序效果
        this.sortData(this.sort[index]);
    },
    methods: {
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
            const __vue_script__$b = script$b;
            
/* template */
var __vue_render__$b = function() {
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
                  _vm.sortList(item, sIndex);
                }
              }
            },
            [
              _c("span", [_vm._v(_vm._s(item.label))]),
              _vm._v(" "),
              item.sort ? _c("i", { class: item.classes }) : _vm._e()
            ]
          )
        })
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
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
  /* component normalizer */
  function __vue_normalize__$b(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/sortBox/sortBox.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var V5SortBox = __vue_normalize__$b(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
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

var script$c = {
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
            const __vue_script__$c = script$c;
            
/* template */
var __vue_render__$c = function() {
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
  /* component normalizer */
  function __vue_normalize__$c(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/V5/src/components/loadingBar/loadingBar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Mode = __vue_normalize__$c(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

let modelConstructor = Vue.extend(Mode);
let instance;
let timer;

const v5LoadingBar = () => {
    instance = new modelConstructor;
    document.body.appendChild(instance.$mount().$el);
};

function step () {
    timer = setInterval(() => {
        instance.value += Math.floor(Math.random() * 5);

        if (instance.value > 90) {
            clearInterval(timer
            );
        }
    }, 100);
}

// 开始动画
// 可以传入初始值，有初始值时，我们不模拟加载了
v5LoadingBar.start = (val = 0) => {
    // 只生成一个加载状态
    if (!instance) {
        v5LoadingBar();
    }
    
    // 默认设置
    instance.value = val;
    instance.show = true;
    instance.error = false;

    if (!val) step();
};

v5LoadingBar.finish = () => {
    instance.value = 100;
    instance.show = false;
};

v5LoadingBar.progress = val => {
    instance.value = Number(val);
};

v5LoadingBar.error = () => {
    instance.error = true;
    instance.value = 100;
    instance.show = false;
};

const components = [
    v5Button,
    v5Cascader,
    v5Cell,
    v5CellGroup,
    v5Collapse,
    V5Field,
    V5Form,
    v5Hello,
    V5Icon,
    V5Layer,
    V5Marquee,
    V5SortBox
];

const install = Vue$$1 => {
    if (install.installed) return
    
    components.forEach(key => {
        Vue$$1.component(key.name, key);
    });

    Vue$$1.prototype.$v5LoadingBar = v5LoadingBar;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

var index = {
    install,
    v5LoadingBar
};

export default index;
export { install, v5Button, v5Cascader, v5Cell, v5CellGroup, v5Collapse, V5Field, V5Form, v5Hello, V5Icon, V5Layer, V5Marquee, V5SortBox };
