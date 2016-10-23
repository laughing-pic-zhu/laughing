/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _compile = __webpack_require__(1);

	var _compile2 = _interopRequireDefault(_compile);

	var _parse = __webpack_require__(3);

	var _parse2 = _interopRequireDefault(_parse);

	var _observe = __webpack_require__(5);

	var _observe2 = _interopRequireDefault(_observe);

	var _update = __webpack_require__(7);

	var _update2 = _interopRequireDefault(_update);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MVVM = function MVVM(params) {
	    this.$vm = document.querySelector(params.el);
	    this.$model = params.data || {};
	    this.$cache = [];
	    _compile2.default.call(this, this.$vm);
	    _parse2.default.call(this);
	    _observe2.default.call(this);
	    _update2.default.call(this);
	};

	window.MVVM = MVVM;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(2);

	var type_array = ['v-text', 'v-show', 'v-model', 'v-for', 'v-if', 'v-else'];

	var compile = function compile(dom) {
	    addQueue.call(this, dom);
	};

	var addQueue = function addQueue(nodes) {
	    if (nodes.nodeType == 1) {
	        if (hasDirective(nodes)) {
	            this.$cache.push(nodes);
	        }
	        if (nodes.hasChildNodes()) {
	            nodes.childNodes.forEach(function (item) {
	                addQueue.call(this, item);
	            }, this);
	        }
	    }
	};

	var hasDirective = function hasDirective(node) {
	    var flag = false;
	    type_array.forEach(function (attr) {
	        if (node.hasAttribute(attr)) {
	            flag = true;
	        }
	    });
	    if (!flag) {
	        var textContent = node.textContent;
	        if (new RegExp(_util.textReg).test(textContent)) {
	            flag = true;
	        }
	    }
	    return flag;
	};

	exports.default = compile;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var textReg = '^{{(.+)}}$';

	var createAnchor = function createAnchor() {
	    return document.createTextNode(' ');
	};

	var contrastArray = function contrastArray(_old, _new) {
	    var a = [];
	    if (_old.length > _new.length) {
	        for (var i = 0; i < _old.length; i++) {
	            if (_new[i] !== _old[i]) {
	                a.push(i);
	            }
	        }
	    } else {
	        for (var i = 0; i < _new.length; i++) {
	            if (_new[i] !== _old[i]) {
	                a.push(i);
	            }
	        }
	    }
	    return a;
	};

	var singleDom = function singleDom(node, newNode, value, _item) {
	    var textContent = node.getAttribute('v-text');
	    if (textContent == value) {
	        newNode.textContent = _item;
	    } else {
	        newNode.textContent = '';
	    }
	};

	var replaceNode = function replaceNode(node, old) {
	    old.parentNode.replaceChild(node, old);
	};

	var judgeNull = function judgeNull(value) {
	    if (value === undefined || value === null || value === '') {
	        return false;
	    }
	    return true;
	};

	var stringParse = function stringParse(str) {
	    var array = new RegExp(textReg).exec(str);
	    if (array) {
	        return array.slice(1);
	    }
	    return '';
	};

	var createFragment = function createFragment() {
	    return document.createDocumentFragment();
	};

	var removeAttribute = function removeAttribute(node, attr) {
	    if (node.hasAttribute(attr)) {
	        node.removeAttribute(attr);
	    }
	};

	exports.createAnchor = createAnchor;
	exports.contrastArray = contrastArray;
	exports.singleDom = singleDom;
	exports.replaceNode = replaceNode;
	exports.judgeNull = judgeNull;
	exports.stringParse = stringParse;
	exports.createFragment = createFragment;
	exports.removeAttribute = removeAttribute;
	exports.textReg = textReg;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(2);

	var _directive = __webpack_require__(4);

	var _directive2 = _interopRequireDefault(_directive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var parse = function parse() {
	    this.$cache = this.$cache.map(function (node) {
	        return paserNode.call(this, node);
	    }, this);
	};

	var storageDom = function storageDom(node) {
	    this.$parentNode = node.parentNode;
	    this.$nextNode = node.nextElementSibling;
	    this.$node = node;
	    this.$direct_array = [];
	};

	var onchange = function onchange(attr) {
	    this.$model[attr] = event.target.value;
	};

	var paserNode = function paserNode(node) {
	    var scope = {};
	    storageDom.call(scope, node);
	    var text = node.getAttribute('v-text');
	    var show = node.getAttribute('v-show');
	    var model = node.getAttribute('v-model');
	    var vFor = node.getAttribute('v-for');
	    var vIf = node.getAttribute('v-if');
	    var vElse = node.hasAttribute('v-else');
	    var textContent = node.textContent;
	    var $model = this.$model;
	    var direct_array = scope.$direct_array;
	    var directive;
	    if (textContent) {
	        text = (0, _util.stringParse)(textContent);
	    }

	    if (text) {
	        scope.text = text;
	        var descriptor = {
	            expression: 'v-text',
	            raw: text
	        };
	        (0, _util.removeAttribute)(node, 'v-text');
	        directive = new _directive2.default(descriptor, $model, node);
	        direct_array.push(directive);
	    }
	    if (show) {
	        scope.show = show;
	        var descriptor = {
	            expression: 'v-show',
	            raw: show,
	            key: 'display'
	        };
	        (0, _util.removeAttribute)(node, 'v-show');
	        directive = new _directive2.default(descriptor, $model, node);
	        direct_array.push(directive);
	    }
	    if (model) {
	        if (!$model.hasOwnProperty(model)) {
	            $model[model] = '';
	        }
	        scope.model = model;
	        var descriptor = {
	            expression: 'v-model',
	            raw: model
	        };
	        (0, _util.removeAttribute)(node, 'v-model');
	        directive = new _directive2.default(descriptor, $model, node);
	        direct_array.push(directive);
	        node.addEventListener('input', onchange.bind(this, model), false);
	    }
	    if (vFor) {
	        var t_array = vFor.split(/\s+/);
	        var newNode = (0, _util.createAnchor)();
	        scope.$end = newNode;
	        scope.$arrayCache = [];
	        scope.$domCache = [];

	        (0, _util.replaceNode)(newNode, node);
	        var descriptor = {
	            expression: 'v-for',
	            list: t_array[2],
	            obj: t_array[0]
	        };

	        directive = new _directive2.default(descriptor, $model, node);
	        (0, _util.removeAttribute)(node, 'v-for');
	        direct_array.push(directive);
	    }
	    if (vIf) {
	        scope.if = vIf;
	        var descriptor = {
	            expression: 'v-if',
	            raw: vIf
	        };
	        directive = new _directive2.default(descriptor, $model, node);
	        (0, _util.removeAttribute)(node, 'v-if');
	        direct_array.push(directive);
	    }

	    if (vElse) {
	        scope.else = true;
	        var descriptor = {
	            expression: 'v-else',
	            raw: vElse
	        };

	        directive = new _directive2.default(descriptor, $model, node);
	        (0, _util.removeAttribute)(node, 'v-else');
	        direct_array.push(directive);
	    }

	    return scope;
	};

	exports.default = parse;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function Directive(descriptor, vm, el, def) {
	    this.descriptor = descriptor;
	    this.vm = vm;
	    this.el = el;
	    this.bind(def);
	    el._directive = el._directive || [];
	    el._directive.push(this);
	}

	Directive.prototype.bind = function (def) {
	    //Object.assign(this,def);
	    //if(this.bind){
	    //    this.bind();
	    //}
	    console.log('bind');
	};

	Directive.prototype.mount = function () {
	    console.log('mount');
	};

	Directive.prototype.unbind = function () {
	    console.log('unbind');
	};

	exports.default = Directive;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _watch = __webpack_require__(6);

	var _watch2 = _interopRequireDefault(_watch);

	var _update = __webpack_require__(7);

	var _update2 = _interopRequireDefault(_update);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var observe = function observe() {
	    var model = this.$model;
	    _watch2.default.call(this, model, _update2.default.bind(this));
	};

	exports.default = observe;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Watch = function Watch(obj, callback) {
	    this.callback = callback;
	    this.$observe = function (_obj, path) {
	        var type = Object.prototype.toString.call(_obj);
	        if (type == '[object Object]' || type == '[object Array]') {
	            this.$observeObj(_obj, path);
	            if (type == '[object Array]') {
	                this.$cloneArray(_obj, path);
	            }
	        }
	    };

	    this.$observeObj = function (obj, path) {
	        var t = this;
	        Object.keys(obj).forEach(function (prop) {
	            var val = obj[prop];
	            var tpath = path.slice(0);
	            tpath.push(prop);
	            Object.defineProperty(obj, prop, {
	                get: function get() {
	                    return val;
	                },
	                set: function set(newVal) {
	                    var temp = val;
	                    val = newVal;
	                    t.callback(tpath, newVal, temp);
	                }
	            });
	            t.$observe(val, tpath);
	        });
	    };

	    this.$cloneArray = function (a_array, path) {
	        var ORP = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
	        var arrayProto = Array.prototype;
	        var newProto = Object.create(arrayProto);
	        var t = this;
	        ORP.forEach(function (prop) {
	            Object.defineProperty(newProto, prop, {
	                value: function value(newVal) {
	                    arrayProto[prop].apply(a_array, arguments);
	                    t.callback(path, newVal);
	                },
	                enumerable: false,
	                configurable: true,
	                writable: true
	            });
	        });
	        a_array.__proto__ = newProto;
	    };

	    this.$observe(obj, []);
	};
	exports.default = Watch;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _util = __webpack_require__(2);

	var textUpdate = function textUpdate(directive) {
	    var node = this.$node;
	    var descriptor = directive.descriptor;
	    var raw = descriptor.raw;
	    var vm = directive.vm;
	    var content = vm[raw];
	    if (typeof content == 'function') {
	        content = content.apply(vm);
	    }
	    node.textContent = content || '';
	};

	var styleUpdate = function styleUpdate(directive) {
	    var node = this.$node;
	    var descriptor = directive.descriptor;
	    var key = descriptor.key;
	    var raw = descriptor.raw;
	    var vm = directive.vm;
	    var value = vm[raw] ? 'block' : 'none';
	    node.style[key] = value;
	};

	var valueUpdate = function valueUpdate(directive) {

	    var node = this.$node;
	    var descriptor = directive.descriptor;
	    var raw = descriptor.raw;
	    var vm = directive.vm;
	    var content = vm[raw];

	    node.value = content || '';
	};

	var listUpdate = function listUpdate(directive) {

	    var descriptor = directive.descriptor;
	    var vm = directive.vm;
	    var list = vm[descriptor.list];
	    var obj = descriptor.obj;

	    var parentNode = this.$parentNode;
	    var node = this.$node;
	    var end = this.$end;
	    var arrayCache = this.$arrayCache;
	    var domCache = this.$domCache;

	    if (arrayCache.length == 0) {
	        list.forEach(function (_item) {
	            var fragment = (0, _util.createFragment)();
	            var newNode = node.cloneNode(true);
	            (0, _util.singleDom)(node, newNode, obj, _item);
	            fragment.appendChild(newNode);
	            parentNode.insertBefore(fragment, end);
	            arrayCache.push(_item);
	            domCache.push(newNode);
	        });
	    } else {
	        var diff = (0, _util.contrastArray)(arrayCache, list);
	        correctDom.call(this, directive, diff);
	    }
	};

	var correctDom = function correctDom(directive, diff) {
	    var diffArray = diff.slice();
	    var domCache = this.$domCache;
	    var arrayCache = this.$arrayCache;
	    var node = this.$node;
	    var end = this.$end;
	    var parentNode = this.$parentNode;

	    var descriptor = directive.descriptor;
	    var obj = descriptor.obj;
	    var vm = directive.vm;
	    var list = vm[descriptor.list];
	    diffArray.forEach(function (_item) {
	        var fragment = (0, _util.createFragment)();
	        var newNode = node.cloneNode(true);
	        if (list[_item]) {
	            (0, _util.singleDom)(node, newNode, obj, list[_item]);
	        } else {
	            parentNode.removeChild(domCache[_item]);
	            delete domCache[_item];
	            delete arrayCache[_item];
	            return;
	        }
	        fragment.appendChild(newNode);
	        if (domCache[_item]) {
	            replaceNode(fragment, domCache[_item]);
	        } else {
	            parentNode.insertBefore(fragment, end);
	        }
	        domCache[_item] = newNode;
	        arrayCache[_item] = list[_item];
	    });
	};

	var ifUpdate = function ifUpdate(directive) {
	    var descriptor = directive.descriptor;
	    var raw = descriptor.raw;
	    var vm = directive.vm;
	    var judge = vm[raw];
	    var node = this.$node;
	    var nextNode = this.$nextNode;
	    var parentNode = this.$parentNode;
	    var flag;
	    if (judge) {
	        parentNode.appendChild(node);
	        flag = true;
	    } else {
	        parentNode.removeChild(node);
	        flag = false;
	    }
	    nextNode.judge = flag;
	};

	var elseUpdate = function elseUpdate() {
	    var node = this.$node;
	    var flag = !node.judge;
	    var parentNode = this.$parentNode;
	    if (flag) {
	        parentNode.appendChild(node);
	    } else {
	        parentNode.removeChild(node);
	    }
	};

	var render = function render() {
	    var cache = this.$cache;
	    cache.forEach(function (item) {
	        var $direct_array = item.$direct_array;
	        $direct_array.forEach(function (directive) {
	            var descriptor = directive.descriptor;
	            var expression = descriptor.expression;
	            directive.mount();
	            type_array[expression].call(item, directive);
	        });
	    });
	};

	var type_array = {
	    'v-text': textUpdate,
	    'v-show': styleUpdate,
	    'v-model': valueUpdate,
	    'v-for': listUpdate,
	    'v-if': ifUpdate,
	    'v-else': elseUpdate
	};

	exports.default = render;

/***/ }
/******/ ]);