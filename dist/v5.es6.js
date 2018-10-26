//
//
//
//

var script = {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
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
  return _c("h1", [_vm._v(_vm._s(_vm.mes))])
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
  

  
  var v5Hello = __vue_normalize__(
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
//
//
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
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
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
  

  
  var V5Field = __vue_normalize__$1(
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

var script$2 = {
    name: 'v5-collapse',
    props: {
        // 标题内容
        title: String,
        // 图标库
        // http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927
        icon: String,
    },
    data () {
        return {
            mes: 'jskajks'
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
    "section",
    { staticClass: "v5-collapse-box" },
    [
      _c(
        "header",
        [
          _vm.icon ? _c("v5-icon", [_vm._v(_vm._s(_vm.icon))]) : _vm._e(),
          _vm._v(" "),
          _c("h3", [_vm._v(_vm._s(_vm.title))]),
          _vm._v(" "),
          _c("v5-icon", [_vm._v("")])
        ],
        1
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
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
  

  
  var v5Collapse = __vue_normalize__$2(
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
    name: 'v5-icon'
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", { class: ["v5-icon"] }, [_vm._t("default")], 2)
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
  

  
  var V5Icon = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

const version = '0.0.1';
const components = [
    v5Hello,
    V5Field,
    v5Collapse,
    V5Icon
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
export { version, install, v5Hello, V5Field, v5Collapse, V5Icon };
