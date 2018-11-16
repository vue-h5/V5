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

var script = {
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
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
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
  

  
  var v5Cascader = __vue_normalize__(
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

var script$1 = {
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
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
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
  

  
  var v5Cell = __vue_normalize__$1(
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

var script$2 = {
    name: 'v5-cell-group',
    data () {
        return {

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
  return _c("div", { staticClass: "v5-cell-group-mod" }, [_vm._t("default")], 2)
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
  

  
  var v5CellGroup = __vue_normalize__$2(
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
//
//
//
//
//
//
//
//
//

var script$3 = {
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
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
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
  

  
  var v5Collapse = __vue_normalize__$3(
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

var script$4 = {
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
        },
        // 提供 Select option 对象
        options: {
            type: Array,
            default: () => []
        },
        // 提供用户自定组件内容
        slots: String
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
            this.options.forEach(val => {
                val.selected = val.value == evt.target.value;
            });
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
  return _c(
    "div",
    { class: ["v5-form-item-box", _vm.type] },
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
  

  
  var V5Field = __vue_normalize__$4(
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

var script$5 = {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
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
  return _c("h1", [_vm._v(_vm._s(_vm.mes))])
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
  

  
  var v5Hello = __vue_normalize__$5(
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

var script$6 = {
    name: 'v5-icon',
    props: {
        icon: String
    }
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", { class: ["v5-icon"], attrs: { icon: _vm.icon } })
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
  

  
  var V5Icon = __vue_normalize__$6(
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

var script$7 = {
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
        },
        // 自定义样式
        classes: {
            type: String
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
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: ["v5-layer-mod", _vm.position, _vm.classes, { show: _vm.show }],
      style: { zIndex: _vm.zIndex },
      on: {
        "&click": function($event) {
          _vm.clickEvt();
        }
      }
    },
    [_c("div", { staticClass: "v5-layer-inner" }, [_vm._t("default")], 2)]
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
  /* component normalizer */
  function __vue_normalize__$7(
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
  

  
  var V5Layer = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

const version = '0.0.1';
const components = [
    v5Cascader,
    v5Cell,
    v5CellGroup,
    v5Collapse,
    V5Field,
    v5Hello,
    V5Icon,
    V5Layer
];

const install = Vue => {
    if (install.installed) return
    
    components.forEach(key => {
        Vue.component(key.name, key);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

var index = {
    version,
    install
};

export default index;
export { version, install, v5Cascader, v5Cell, v5CellGroup, v5Collapse, V5Field, v5Hello, V5Icon, V5Layer };
