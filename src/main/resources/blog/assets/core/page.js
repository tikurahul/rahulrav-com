// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__spreadArray = __spreadArray;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
},{}],"../node_modules/@material/auto-init/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = void 0;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  AUTO_INIT_ATTR: 'data-mdc-auto-init',
  AUTO_INIT_STATE_ATTR: 'data-mdc-auto-init-state',
  INITIALIZED_STATE: 'initialized'
};
exports.strings = strings;
},{}],"../node_modules/@material/auto-init/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdcAutoInit = mdcAutoInit;
exports.default = void 0;

var _tslib = require("tslib");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var AUTO_INIT_ATTR = _constants.strings.AUTO_INIT_ATTR,
    AUTO_INIT_STATE_ATTR = _constants.strings.AUTO_INIT_STATE_ATTR,
    INITIALIZED_STATE = _constants.strings.INITIALIZED_STATE;
var registry = {};
var CONSOLE_WARN = console.warn.bind(console); // tslint:disable-line:no-console

function emit(evtType, evtData, shouldBubble) {
  if (shouldBubble === void 0) {
    shouldBubble = false;
  }

  var evt;

  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      bubbles: shouldBubble,
      detail: evtData
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, shouldBubble, false, evtData);
  }

  document.dispatchEvent(evt);
}
/* istanbul ignore next: optional argument is not a branch statement */

/**
 * Auto-initializes all MDC components on a page.
 */


function mdcAutoInit(root) {
  var e_1, _a;

  if (root === void 0) {
    root = document;
  }

  var components = [];
  var nodes = [].slice.call(root.querySelectorAll("[" + AUTO_INIT_ATTR + "]"));
  nodes = nodes.filter(function (node) {
    return node.getAttribute(AUTO_INIT_STATE_ATTR) !== INITIALIZED_STATE;
  });

  try {
    for (var nodes_1 = (0, _tslib.__values)(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
      var node = nodes_1_1.value;
      var ctorName = node.getAttribute(AUTO_INIT_ATTR);

      if (!ctorName) {
        throw new Error('(mdc-auto-init) Constructor name must be given.');
      }

      var Constructor = registry[ctorName]; // tslint:disable-line:variable-name

      if (typeof Constructor !== 'function') {
        throw new Error("(mdc-auto-init) Could not find constructor in registry for " + ctorName);
      } // TODO: Should we make an eslint rule for an attachTo() static method?
      // See https://github.com/Microsoft/TypeScript/issues/14600 for discussion of static interface support in TS


      var component = Constructor.attachTo(node);
      Object.defineProperty(node, ctorName, {
        configurable: true,
        enumerable: false,
        value: component,
        writable: false
      });
      components.push(component);
      node.setAttribute(AUTO_INIT_STATE_ATTR, INITIALIZED_STATE);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  emit('MDCAutoInit:End', {});
  return components;
} // Constructor is PascalCased because it is a direct reference to a class, rather than an instance of a class.
// tslint:disable-next-line:variable-name


mdcAutoInit.register = function (componentName, Constructor, warn) {
  if (warn === void 0) {
    warn = CONSOLE_WARN;
  }

  if (typeof Constructor !== 'function') {
    throw new Error("(mdc-auto-init) Invalid Constructor value: " + Constructor + ". Expected function.");
  }

  var registryValue = registry[componentName];

  if (registryValue) {
    warn("(mdc-auto-init) Overriding registration for " + componentName + " with " + Constructor + ". Was: " + registryValue);
  }

  registry[componentName] = Constructor;
};

mdcAutoInit.deregister = function (componentName) {
  delete registry[componentName];
};
/** @nocollapse */


mdcAutoInit.deregisterAll = function () {
  var e_2, _a;

  try {
    for (var _b = (0, _tslib.__values)(Object.keys(registry)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var componentName = _c.value;
      mdcAutoInit.deregister(componentName);
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
}; // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.


var _default = mdcAutoInit;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./constants":"../node_modules/@material/auto-init/constants.js"}],"../node_modules/@material/drawer/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFocusTrapInstance = createFocusTrapInstance;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function createFocusTrapInstance(surfaceEl, focusTrapFactory) {
  return focusTrapFactory(surfaceEl, {
    // Component handles focusing on active nav item.
    skipInitialFocus: true
  });
}
},{}],"../node_modules/@material/drawer/adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/base/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFoundation = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: false,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

exports.MDCFoundation = MDCFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFoundation;
exports.default = _default;
},{}],"../node_modules/@material/base/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCComponent = void 0;

var _tslib = require("tslib");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root = root;
    this.initialize.apply(this, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args))); // Note that we initialize foundation here and not within the constructor's
    // default param so that this.root is defined and can be used within the
    // foundation class.

    this.foundation = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation.MDCFoundation({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler, options) {
    this.root.addEventListener(evtType, handler, options);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler, options) {
    this.root.removeEventListener(evtType, handler, options);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root.dispatchEvent(evt);
  };

  return MDCComponent;
}();

exports.MDCComponent = MDCComponent;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCComponent;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./foundation":"../node_modules/@material/base/foundation.js"}],"../node_modules/@material/dom/focus-trap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusTrap = void 0;

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
/**
 * Utility to trap focus in a given root element, e.g. for modal components such
 * as dialogs. The root should have at least one focusable child element,
 * for setting initial focus when trapping focus.
 * Also tracks the previously focused element, and restores focus to that
 * element when releasing focus.
 */

var FocusTrap =
/** @class */
function () {
  function FocusTrap(root, options) {
    if (options === void 0) {
      options = {};
    }

    this.root = root;
    this.options = options; // Previously focused element before trapping focus.

    this.elFocusedBeforeTrapFocus = null;
  }
  /**
   * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
   * otherwises sets initial focus to the first focusable child element.
   */


  FocusTrap.prototype.trapFocus = function () {
    var focusableEls = this.getFocusableElements(this.root);

    if (focusableEls.length === 0) {
      throw new Error('FocusTrap: Element must have at least one focusable child.');
    }

    this.elFocusedBeforeTrapFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.wrapTabFocus(this.root);

    if (!this.options.skipInitialFocus) {
      this.focusInitialElement(focusableEls, this.options.initialFocusEl);
    }
  };
  /**
   * Releases focus from `root`. Also restores focus to the previously focused
   * element.
   */


  FocusTrap.prototype.releaseFocus = function () {
    [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS)).forEach(function (sentinelEl) {
      sentinelEl.parentElement.removeChild(sentinelEl);
    });

    if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
      this.elFocusedBeforeTrapFocus.focus();
    }
  };
  /**
   * Wraps tab focus within `el` by adding two hidden sentinel divs which are
   * used to mark the beginning and the end of the tabbable region. When
   * focused, these sentinel elements redirect focus to the first/last
   * children elements of the tabbable region, ensuring that focus is trapped
   * within that region.
   */


  FocusTrap.prototype.wrapTabFocus = function (el) {
    var _this = this;

    var sentinelStart = this.createSentinel();
    var sentinelEnd = this.createSentinel();
    sentinelStart.addEventListener('focus', function () {
      var focusableEls = _this.getFocusableElements(el);

      if (focusableEls.length > 0) {
        focusableEls[focusableEls.length - 1].focus();
      }
    });
    sentinelEnd.addEventListener('focus', function () {
      var focusableEls = _this.getFocusableElements(el);

      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    });
    el.insertBefore(sentinelStart, el.children[0]);
    el.appendChild(sentinelEnd);
  };
  /**
   * Focuses on `initialFocusEl` if defined and a child of the root element.
   * Otherwise, focuses on the first focusable child element of the root.
   */


  FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
    var focusIndex = 0;

    if (initialFocusEl) {
      focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
    }

    focusableEls[focusIndex].focus();
  };

  FocusTrap.prototype.getFocusableElements = function (root) {
    var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
    return focusableEls.filter(function (el) {
      var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' || el.getAttribute('disabled') != null || el.getAttribute('hidden') != null || el.getAttribute('aria-hidden') === 'true';
      var isTabbableAndVisible = el.tabIndex >= 0 && el.getBoundingClientRect().width > 0 && !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
      var isProgrammaticallyHidden = false;

      if (isTabbableAndVisible) {
        var style = getComputedStyle(el);
        isProgrammaticallyHidden = style.display === 'none' || style.visibility === 'hidden';
      }

      return isTabbableAndVisible && !isProgrammaticallyHidden;
    });
  };

  FocusTrap.prototype.createSentinel = function () {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('tabindex', '0'); // Don't announce in screen readers.

    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.classList.add(FOCUS_SENTINEL_CLASS);
    return sentinel;
  };

  return FocusTrap;
}();

exports.FocusTrap = FocusTrap;
},{}],"../node_modules/@material/dom/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = closest;
exports.matches = matches;
exports.estimateScrollWidth = estimateScrollWidth;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}

function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}
/**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 */


function estimateScrollWidth(element) {
  // Check the offsetParent. If the element inherits display: none from any
  // parent, the offsetParent property will be null (see
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
  // This check ensures we only clone the node when necessary.
  var htmlEl = element;

  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }

  var clone = htmlEl.cloneNode(true);
  clone.style.setProperty('position', 'absolute');
  clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
  document.documentElement.appendChild(clone);
  var scrollWidth = clone.scrollWidth;
  document.documentElement.removeChild(clone);
  return scrollWidth;
}
},{}],"../node_modules/@material/list/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evolutionClassNameMap = exports.evolutionAttribute = exports.deprecatedClassNameMap = exports.numbers = exports.cssClasses = exports.strings = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a, _b;

var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
  LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
  ROOT: 'mdc-list'
};
exports.cssClasses = cssClasses;
var evolutionClassNameMap = (_a = {}, _a["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated', _a["" + cssClasses.LIST_ITEM_CLASS] = 'mdc-list-item', _a["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled', _a["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected', _a["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text', _a["" + cssClasses.ROOT] = 'mdc-list', _a);
exports.evolutionClassNameMap = evolutionClassNameMap;
var deprecatedClassNameMap = (_b = {}, _b["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated', _b["" + cssClasses.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item', _b["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled', _b["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected', _b["" + cssClasses.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text', _b["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text', _b["" + cssClasses.ROOT] = 'mdc-deprecated-list', _b);
exports.deprecatedClassNameMap = deprecatedClassNameMap;
var strings = {
  ACTION_EVENT: 'MDCList:action',
  SELECTION_CHANGE_EVENT: 'MDCList:selectionChange',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
  ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a\n  ",
  DEPRECATED_SELECTOR: '.mdc-deprecated-list',
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]',
  SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
exports.strings = strings;
var numbers = {
  UNSET_INDEX: -1,
  TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
exports.numbers = numbers;
var evolutionAttribute = 'evolution';
exports.evolutionAttribute = evolutionAttribute;
},{}],"../node_modules/@material/dom/keyboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeKey = normalizeKey;
exports.isNavigationEvent = isNavigationEvent;
exports.KEY = void 0;

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * KEY provides normalized string values for keys.
 */
var KEY = {
  UNKNOWN: 'Unknown',
  BACKSPACE: 'Backspace',
  ENTER: 'Enter',
  SPACEBAR: 'Spacebar',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  HOME: 'Home',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  DELETE: 'Delete',
  ESCAPE: 'Escape',
  TAB: 'Tab'
};
exports.KEY = KEY;
var normalizedKeys = new Set(); // IE11 has no support for new Map with iterable so we need to initialize this
// by hand.

normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  DELETE: 46,
  ESCAPE: 27,
  TAB: 9
};
var mappedKeyCodes = new Map(); // IE11 has no support for new Map with iterable so we need to initialize this
// by hand.

mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set(); // IE11 has no support for new Set with iterable so we need to initialize this
// by hand.

navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
/**
 * normalizeKey returns the normalized string for a navigational action.
 */

function normalizeKey(evt) {
  var key = evt.key; // If the event already has a normalized key, return it

  if (normalizedKeys.has(key)) {
    return key;
  } // tslint:disable-next-line:deprecation


  var mappedKey = mappedKeyCodes.get(evt.keyCode);

  if (mappedKey) {
    return mappedKey;
  }

  return KEY.UNKNOWN;
}
/**
 * isNavigationEvent returns whether the event is a navigation event
 */


function isNavigationEvent(evt) {
  return navigationKeys.has(normalizeKey(evt));
}
},{}],"../node_modules/@material/list/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventDefaultEvent = void 0;

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
/**
 * Ensures that preventDefault is only called if the containing element
 * doesn't consume the event, and it will cause an unintended scroll.
 *
 * @param evt keyboard event to be prevented.
 */

var preventDefaultEvent = function (evt) {
  var target = evt.target;

  if (!target) {
    return;
  }

  var tagName = ("" + target.tagName).toLowerCase();

  if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
    evt.preventDefault();
  }
};

exports.preventDefaultEvent = preventDefaultEvent;
},{}],"../node_modules/@material/list/typeahead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initState = initState;
exports.initSortedIndex = initSortedIndex;
exports.matchItem = matchItem;
exports.isTypingInProgress = isTypingInProgress;
exports.clearBuffer = clearBuffer;
exports.handleKeydown = handleKeydown;

var _keyboard = require("@material/dom/keyboard");

var _constants = require("./constants");

var _events = require("./events");

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Initializes a state object for typeahead. Use the same reference for calls to
 * typeahead functions.
 *
 * @return The current state of the typeahead process. Each state reference
 *     represents a typeahead instance as the reference is typically mutated
 *     in-place.
 */
function initState() {
  var state = {
    bufferClearTimeout: 0,
    currentFirstChar: '',
    sortedIndexCursor: 0,
    typeaheadBuffer: ''
  };
  return state;
}
/**
 * Initializes typeahead state by indexing the current list items by primary
 * text into the sortedIndexByFirstChar data structure.
 *
 * @param listItemCount numer of items in the list
 * @param getPrimaryTextByItemIndex function that returns the primary text at a
 *     given index
 *
 * @return Map that maps the first character of the primary text to the full
 *     list text and it's index
 */


function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
  var sortedIndexByFirstChar = new Map(); // Aggregate item text to index mapping

  for (var i = 0; i < listItemCount; i++) {
    var primaryText = getPrimaryTextByItemIndex(i).trim();

    if (!primaryText) {
      continue;
    }

    var firstChar = primaryText[0].toLowerCase();

    if (!sortedIndexByFirstChar.has(firstChar)) {
      sortedIndexByFirstChar.set(firstChar, []);
    }

    sortedIndexByFirstChar.get(firstChar).push({
      text: primaryText.toLowerCase(),
      index: i
    });
  } // Sort the mapping
  // TODO(b/157162694): Investigate replacing forEach with Map.values()


  sortedIndexByFirstChar.forEach(function (values) {
    values.sort(function (first, second) {
      return first.index - second.index;
    });
  });
  return sortedIndexByFirstChar;
}
/**
 * Given the next desired character from the user, it attempts to find the next
 * list option matching the buffer. Wraps around if at the end of options.
 *
 * @param opts Options and accessors
 *   - nextChar - the next character to match against items
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - skipFocus - whether or not to focus the matched item
 *   - isItemAtIndexDisabled - function that determines whether an item at a
 *        given index is disabled
 * @param state The typeahead state instance. See `initState`.
 *
 * @return The index of the matched item, or -1 if no match.
 */


function matchItem(opts, state) {
  var nextChar = opts.nextChar,
      focusItemAtIndex = opts.focusItemAtIndex,
      sortedIndexByFirstChar = opts.sortedIndexByFirstChar,
      focusedItemIndex = opts.focusedItemIndex,
      skipFocus = opts.skipFocus,
      isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  clearTimeout(state.bufferClearTimeout);
  state.bufferClearTimeout = setTimeout(function () {
    clearBuffer(state);
  }, _constants.numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
  state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
  var index;

  if (state.typeaheadBuffer.length === 1) {
    index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
  } else {
    index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
  }

  if (index !== -1 && !skipFocus) {
    focusItemAtIndex(index);
  }

  return index;
}
/**
 * Matches the user's single input character in the buffer to the
 * next option that begins with such character. Wraps around if at
 * end of options. Returns -1 if no match is found.
 */


function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);

  if (!itemsMatchingFirstChar) {
    return -1;
  } // Has the same firstChar been recently matched?
  // Also, did starting index remain the same between key presses?
  // If both hold true, simply increment index.


  if (firstChar === state.currentFirstChar && itemsMatchingFirstChar[state.sortedIndexCursor].index === focusedItemIndex) {
    state.sortedIndexCursor = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;

    if (!isItemAtIndexDisabled(newIndex)) {
      return newIndex;
    }
  } // If we're here, it means one of the following happened:
  // - either firstChar or startingIndex has changed, invalidating the
  // cursor.
  // - The next item of typeahead is disabled, so we have to look further.


  state.currentFirstChar = firstChar;
  var newCursorPosition = -1;
  var cursorPosition; // Find the first non-disabled item as a fallback.

  for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  } // Advance cursor to first item matching the firstChar that is positioned
  // after starting item. Cursor is unchanged from fallback if there's no
  // such item.


  for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex && !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }

  if (newCursorPosition !== -1) {
    state.sortedIndexCursor = newCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }

  return -1;
}
/**
 * Attempts to find the next item that matches all of the typeahead buffer.
 * Wraps around if at end of options. Returns -1 if no match is found.
 */


function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);

  if (!itemsMatchingFirstChar) {
    return -1;
  } // Do nothing if text already matches


  var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];

  if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 && !isItemAtIndexDisabled(startingItem.index)) {
    return startingItem.index;
  } // Find next item that matches completely; if no match, we'll eventually
  // loop around to same position


  var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
  var nextCursorPosition = -1;

  while (cursorPosition !== state.sortedIndexCursor) {
    var currentItem = itemsMatchingFirstChar[cursorPosition];
    var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
    var isEnabled = !isItemAtIndexDisabled(currentItem.index);

    if (matches && isEnabled) {
      nextCursorPosition = cursorPosition;
      break;
    }

    cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
  }

  if (nextCursorPosition !== -1) {
    state.sortedIndexCursor = nextCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }

  return -1;
}
/**
 * Whether or not the given typeahead instaance state is currently typing.
 *
 * @param state The typeahead state instance. See `initState`.
 */


function isTypingInProgress(state) {
  return state.typeaheadBuffer.length > 0;
}
/**
 * Clears the typeahaed buffer so that it resets item matching to the first
 * character.
 *
 * @param state The typeahead state instance. See `initState`.
 */


function clearBuffer(state) {
  state.typeaheadBuffer = '';
}
/**
 * Given a keydown event, it calculates whether or not to automatically focus a
 * list item depending on what was typed mimicing the typeahead functionality of
 * a standard <select> element that is open.
 *
 * @param opts Options and accessors
 *   - event - the KeyboardEvent to handle and parse
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
 *      is disabled
 *   - isTargetListItem - whether or not the event target is a list item
 * @param state The typeahead state instance. See `initState`.
 *
 * @returns index of the item matched by the keydown. -1 if not matched.
 */


function handleKeydown(opts, state) {
  var event = opts.event,
      isTargetListItem = opts.isTargetListItem,
      focusedItemIndex = opts.focusedItemIndex,
      focusItemAtIndex = opts.focusItemAtIndex,
      sortedIndexByFirstChar = opts.sortedIndexByFirstChar,
      isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  var isArrowLeft = (0, _keyboard.normalizeKey)(event) === 'ArrowLeft';
  var isArrowUp = (0, _keyboard.normalizeKey)(event) === 'ArrowUp';
  var isArrowRight = (0, _keyboard.normalizeKey)(event) === 'ArrowRight';
  var isArrowDown = (0, _keyboard.normalizeKey)(event) === 'ArrowDown';
  var isHome = (0, _keyboard.normalizeKey)(event) === 'Home';
  var isEnd = (0, _keyboard.normalizeKey)(event) === 'End';
  var isEnter = (0, _keyboard.normalizeKey)(event) === 'Enter';
  var isSpace = (0, _keyboard.normalizeKey)(event) === 'Spacebar';

  if (event.altKey || event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
    return -1;
  }

  var isCharacterKey = !isSpace && event.key.length === 1;

  if (isCharacterKey) {
    (0, _events.preventDefaultEvent)(event);
    var matchItemOpts = {
      focusItemAtIndex: focusItemAtIndex,
      focusedItemIndex: focusedItemIndex,
      nextChar: event.key.toLowerCase(),
      sortedIndexByFirstChar: sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled: isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }

  if (!isSpace) {
    return -1;
  }

  if (isTargetListItem) {
    (0, _events.preventDefaultEvent)(event);
  }

  var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);

  if (typeaheadOnListItem) {
    var matchItemOpts = {
      focusItemAtIndex: focusItemAtIndex,
      focusedItemIndex: focusedItemIndex,
      nextChar: ' ',
      sortedIndexByFirstChar: sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled: isItemAtIndexDisabled
    }; // space participates in typeahead matching if in rapid typing mode

    return matchItem(matchItemOpts, state);
  }

  return -1;
}
},{"@material/dom/keyboard":"../node_modules/@material/dom/keyboard.js","./constants":"../node_modules/@material/list/constants.js","./events":"../node_modules/@material/list/events.js"}],"../node_modules/@material/list/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCListFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _keyboard = require("@material/dom/keyboard");

var _constants = require("./constants");

var _events = require("./events");

var typeahead = _interopRequireWildcard(require("./typeahead"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}
/** List of modifier keys to consider while handling keyboard events. */


var handledModifierKeys = ['Alt', 'Control', 'Meta', 'Shift'];
/** Checks if the event has the given modifier keys. */

function createModifierChecker(event) {
  var eventModifiers = new Set(event ? handledModifierKeys.filter(function (m) {
    return event.getModifierState(m);
  }) : []);
  return function (modifiers) {
    return modifiers.every(function (m) {
      return eventModifiers.has(m);
    }) && modifiers.length === eventModifiers.size;
  };
}

var MDCListFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCListFoundation.defaultAdapter), adapter)) || this;

    _this.wrapFocus = false;
    _this.isVertical = true;
    _this.isSingleSelectionList = false;
    _this.areDisabledItemsFocusable = true;
    _this.selectedIndex = _constants.numbers.UNSET_INDEX;
    _this.focusedItemIndex = _constants.numbers.UNSET_INDEX;
    _this.useActivatedClass = false;
    _this.useSelectedAttr = false;
    _this.ariaCurrentAttrValue = null;
    _this.isCheckboxList = false;
    _this.isRadioList = false;
    _this.lastSelectedIndex = null;
    _this.hasTypeahead = false; // Transiently holds current typeahead prefix from user.

    _this.typeaheadState = typeahead.initState();
    _this.sortedIndexByFirstChar = new Map();
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClassForElementIndex: function () {
          return undefined;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        getAttributeForElementIndex: function () {
          return null;
        },
        getFocusedElementIndex: function () {
          return 0;
        },
        getListItemCount: function () {
          return 0;
        },
        hasCheckboxAtIndex: function () {
          return false;
        },
        hasRadioAtIndex: function () {
          return false;
        },
        isCheckboxCheckedAtIndex: function () {
          return false;
        },
        isFocusInsideList: function () {
          return false;
        },
        isRootFocused: function () {
          return false;
        },
        listItemAtIndexHasClass: function () {
          return false;
        },
        notifyAction: function () {
          return undefined;
        },
        notifySelectionChange: function () {},
        removeClassForElementIndex: function () {
          return undefined;
        },
        setAttributeForElementIndex: function () {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function () {
          return undefined;
        },
        setTabIndexForListItemChildren: function () {
          return undefined;
        },
        getPrimaryTextAtIndex: function () {
          return '';
        }
      };
    },
    enumerable: false,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter.getListItemCount() === 0) {
      return;
    } // TODO(b/172274142): consider all items when determining the list's type.


    if (this.adapter.hasCheckboxAtIndex(0)) {
      this.isCheckboxList = true;
    } else if (this.adapter.hasRadioAtIndex(0)) {
      this.isRadioList = true;
    } else {
      this.maybeInitializeSingleSelection();
    }

    if (this.hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  /** Returns the index of the item that was last focused. */


  MDCListFoundation.prototype.getFocusedItemIndex = function () {
    return this.focusedItemIndex;
  };
  /** Toggles focus wrapping with keyboard navigation. */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus = value;
  };
  /**
   * Toggles orientation direction for keyboard navigation (true for vertical,
   * false for horizontal).
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical = value;
  };
  /** Toggles single-selection behavior. */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList = value;

    if (value) {
      this.maybeInitializeSingleSelection();
      this.selectedIndex = this.getSelectedIndexFromDOM();
    }
  };

  MDCListFoundation.prototype.setDisabledItemsFocusable = function (value) {
    this.areDisabledItemsFocusable = value;
  };
  /**
   * Automatically determines whether the list is single selection list. If so,
   * initializes the internal state to match the selected item.
   */


  MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
    var selectedItemIndex = this.getSelectedIndexFromDOM();
    if (selectedItemIndex === _constants.numbers.UNSET_INDEX) return;
    var hasActivatedClass = this.adapter.listItemAtIndexHasClass(selectedItemIndex, _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS);

    if (hasActivatedClass) {
      this.setUseActivatedClass(true);
    }

    this.isSingleSelectionList = true;
    this.selectedIndex = selectedItemIndex;
  };
  /** @return Index of the first selected item based on the DOM state. */


  MDCListFoundation.prototype.getSelectedIndexFromDOM = function () {
    var selectedIndex = _constants.numbers.UNSET_INDEX;
    var listItemsCount = this.adapter.getListItemCount();

    for (var i = 0; i < listItemsCount; i++) {
      var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_SELECTED_CLASS);
      var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS);

      if (!(hasSelectedClass || hasActivatedClass)) {
        continue;
      }

      selectedIndex = i;
      break;
    }

    return selectedIndex;
  };
  /**
   * Sets whether typeahead is enabled on the list.
   * @param hasTypeahead Whether typeahead is enabled.
   */


  MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
    this.hasTypeahead = hasTypeahead;

    if (hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  /**
   * @return Whether typeahead is currently matching a user-specified prefix.
   */


  MDCListFoundation.prototype.isTypeaheadInProgress = function () {
    return this.hasTypeahead && typeahead.isTypingInProgress(this.typeaheadState);
  };
  /** Toggle use of the "activated" CSS class. */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass = useActivated;
  };
  /**
   * Toggles use of the selected attribute (true for aria-selected, false for
   * aria-checked).
   */


  MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
    this.useSelectedAttr = useSelected;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index, options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isIndexValid(index)) {
      return;
    }

    if (this.isCheckboxList) {
      this.setCheckboxAtIndex(index, options);
    } else if (this.isRadioList) {
      this.setRadioAtIndex(index, options);
    } else {
      this.setSingleSelectionAtIndex(index, options);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (listItemIndex) {
    if (listItemIndex >= 0) {
      this.focusedItemIndex = listItemIndex;
      this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
      this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
      this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any
     * element. Setting a delay to wait till the focus is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedOrFocusedItem();
      }
    }, 0);
  };

  MDCListFoundation.prototype.isIndexDisabled = function (index) {
    return this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
    var _this = this;

    var _a;

    var isArrowLeft = (0, _keyboard.normalizeKey)(event) === 'ArrowLeft';
    var isArrowUp = (0, _keyboard.normalizeKey)(event) === 'ArrowUp';
    var isArrowRight = (0, _keyboard.normalizeKey)(event) === 'ArrowRight';
    var isArrowDown = (0, _keyboard.normalizeKey)(event) === 'ArrowDown';
    var isHome = (0, _keyboard.normalizeKey)(event) === 'Home';
    var isEnd = (0, _keyboard.normalizeKey)(event) === 'End';
    var isEnter = (0, _keyboard.normalizeKey)(event) === 'Enter';
    var isSpace = (0, _keyboard.normalizeKey)(event) === 'Spacebar'; // The keys for forward and back differ based on list orientation.

    var isForward = this.isVertical && isArrowDown || !this.isVertical && isArrowRight;
    var isBack = this.isVertical && isArrowUp || !this.isVertical && isArrowLeft; // Have to check both upper and lower case, because having caps lock on
    // affects the value.

    var isLetterA = event.key === 'A' || event.key === 'a';
    var eventHasModifiers = createModifierChecker(event);

    if (this.adapter.isRootFocused()) {
      if ((isBack || isEnd) && eventHasModifiers([])) {
        event.preventDefault();
        this.focusLastElement();
      } else if ((isForward || isHome) && eventHasModifiers([])) {
        event.preventDefault();
        this.focusFirstElement();
      } else if (isBack && eventHasModifiers(['Shift']) && this.isCheckboxList) {
        event.preventDefault();
        var focusedIndex = this.focusLastElement();

        if (focusedIndex !== -1) {
          this.setSelectedIndexOnAction(focusedIndex, false);
        }
      } else if (isForward && eventHasModifiers(['Shift']) && this.isCheckboxList) {
        event.preventDefault();
        var focusedIndex = this.focusFirstElement();

        if (focusedIndex !== -1) {
          this.setSelectedIndexOnAction(focusedIndex, false);
        }
      }

      if (this.hasTypeahead) {
        var handleKeydownOpts = {
          event: event,
          focusItemAtIndex: function (index) {
            _this.focusItemAtIndex(index);
          },
          focusedItemIndex: -1,
          isTargetListItem: isRootListItem,
          sortedIndexByFirstChar: this.sortedIndexByFirstChar,
          isItemAtIndexDisabled: function (index) {
            return _this.isIndexDisabled(index);
          }
        };
        typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
      }

      return;
    }

    var currentIndex = this.adapter.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    if (isForward && eventHasModifiers([])) {
      (0, _events.preventDefaultEvent)(event);
      this.focusNextElement(currentIndex);
    } else if (isBack && eventHasModifiers([])) {
      (0, _events.preventDefaultEvent)(event);
      this.focusPrevElement(currentIndex);
    } else if (isForward && eventHasModifiers(['Shift']) && this.isCheckboxList) {
      (0, _events.preventDefaultEvent)(event);
      var focusedIndex = this.focusNextElement(currentIndex);

      if (focusedIndex !== -1) {
        this.setSelectedIndexOnAction(focusedIndex, false);
      }
    } else if (isBack && eventHasModifiers(['Shift']) && this.isCheckboxList) {
      (0, _events.preventDefaultEvent)(event);
      var focusedIndex = this.focusPrevElement(currentIndex);

      if (focusedIndex !== -1) {
        this.setSelectedIndexOnAction(focusedIndex, false);
      }
    } else if (isHome && eventHasModifiers([])) {
      (0, _events.preventDefaultEvent)(event);
      this.focusFirstElement();
    } else if (isEnd && eventHasModifiers([])) {
      (0, _events.preventDefaultEvent)(event);
      this.focusLastElement();
    } else if (isHome && eventHasModifiers(['Control', 'Shift']) && this.isCheckboxList) {
      (0, _events.preventDefaultEvent)(event);

      if (this.isIndexDisabled(currentIndex)) {
        return;
      }

      this.focusFirstElement();
      this.toggleCheckboxRange(0, currentIndex, currentIndex);
    } else if (isEnd && eventHasModifiers(['Control', 'Shift']) && this.isCheckboxList) {
      (0, _events.preventDefaultEvent)(event);

      if (this.isIndexDisabled(currentIndex)) {
        return;
      }

      this.focusLastElement();
      this.toggleCheckboxRange(currentIndex, this.adapter.getListItemCount() - 1, currentIndex);
    } else if (isLetterA && eventHasModifiers(['Control']) && this.isCheckboxList) {
      event.preventDefault();
      this.checkboxListToggleAll(this.selectedIndex === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex, true);
    } else if ((isEnter || isSpace) && eventHasModifiers([])) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers
        // synthetic MouseEvent event.
        var target = event.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        (0, _events.preventDefaultEvent)(event);

        if (this.isIndexDisabled(currentIndex)) {
          return;
        }

        if (!this.isTypeaheadInProgress()) {
          if (this.isSelectableList()) {
            this.setSelectedIndexOnAction(currentIndex, false);
          }

          this.adapter.notifyAction(currentIndex);
        }
      }
    } else if ((isEnter || isSpace) && eventHasModifiers(['Shift']) && this.isCheckboxList) {
      // Return early if enter key is pressed on anchor element which triggers
      // synthetic MouseEvent event.
      var target = event.target;

      if (target && target.tagName === 'A' && isEnter) {
        return;
      }

      (0, _events.preventDefaultEvent)(event);

      if (this.isIndexDisabled(currentIndex)) {
        return;
      }

      if (!this.isTypeaheadInProgress()) {
        this.toggleCheckboxRange((_a = this.lastSelectedIndex) !== null && _a !== void 0 ? _a : currentIndex, currentIndex, currentIndex);
        this.adapter.notifyAction(currentIndex);
      }
    }

    if (this.hasTypeahead) {
      var handleKeydownOpts = {
        event: event,
        focusItemAtIndex: function (index) {
          _this.focusItemAtIndex(index);
        },
        focusedItemIndex: this.focusedItemIndex,
        isTargetListItem: isRootListItem,
        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
        isItemAtIndexDisabled: function (index) {
          return _this.isIndexDisabled(index);
        }
      };
      typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
    }
  };
  /**
   * Click handler for the list.
   *
   * @param index Index for the item that has been clicked.
   * @param isCheckboxAlreadyUpdatedInAdapter Whether the checkbox for
   *   the list item has already been updated in the adapter. This attribute
   *   should be set to `true` when e.g. the click event directly landed on
   *   the underlying native checkbox element which would cause the checked
   *   state to be already toggled within `adapter.isCheckboxCheckedAtIndex`.
   */


  MDCListFoundation.prototype.handleClick = function (index, isCheckboxAlreadyUpdatedInAdapter, event) {
    var _a;

    var eventHasModifiers = createModifierChecker(event);

    if (index === _constants.numbers.UNSET_INDEX) {
      return;
    }

    if (this.isIndexDisabled(index)) {
      return;
    }

    if (eventHasModifiers([])) {
      if (this.isSelectableList()) {
        this.setSelectedIndexOnAction(index, isCheckboxAlreadyUpdatedInAdapter);
      }

      this.adapter.notifyAction(index);
    } else if (this.isCheckboxList && eventHasModifiers(['Shift'])) {
      this.toggleCheckboxRange((_a = this.lastSelectedIndex) !== null && _a !== void 0 ? _a : index, index, index);
      this.adapter.notifyAction(index);
    }
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter.getListItemCount();
    var nextIndex = index;
    var firstChecked = null;

    do {
      nextIndex++;

      if (nextIndex >= count) {
        if (this.wrapFocus) {
          nextIndex = 0;
        } else {
          // Return early because last item is already focused.
          return index;
        }
      }

      if (nextIndex === firstChecked) {
        return -1;
      }

      firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : nextIndex;
    } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(nextIndex));

    this.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var count = this.adapter.getListItemCount();
    var prevIndex = index;
    var firstChecked = null;

    do {
      prevIndex--;

      if (prevIndex < 0) {
        if (this.wrapFocus) {
          prevIndex = count - 1;
        } else {
          // Return early because first item is already focused.
          return index;
        }
      }

      if (prevIndex === firstChecked) {
        return -1;
      }

      firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : prevIndex;
    } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(prevIndex));

    this.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    // Pass -1 to `focusNextElement`, since it will incremement to 0 and focus
    // the first element.
    return this.focusNextElement(-1);
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    // Pass the length of the list to `focusNextElement` since it will decrement
    // to length - 1 and focus the last element.
    return this.focusPrevElement(this.adapter.getListItemCount());
  };

  MDCListFoundation.prototype.focusInitialElement = function () {
    var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.focusItemAtIndex(initialIndex);
    return initialIndex;
  };
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
    if (!this.isIndexValid(itemIndex, false)) {
      return;
    }

    if (isEnabled) {
      this.adapter.removeClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'false');
    } else {
      this.adapter.addClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'true');
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex = function (index, options) {
    if (options === void 0) {
      options = {};
    }

    if (this.selectedIndex === index && !options.forceUpdate) {
      return;
    }

    var selectedClassName = _constants.cssClasses.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass) {
      selectedClassName = _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      this.adapter.removeClassForElementIndex(this.selectedIndex, selectedClassName);
    }

    this.setAriaForSingleSelectionAtIndex(index);
    this.setTabindexAtIndex(index);

    if (index !== _constants.numbers.UNSET_INDEX) {
      this.adapter.addClassForElementIndex(index, selectedClassName);
    }

    this.selectedIndex = index; // If the selected value has changed through user interaction,
    // we want to notify the selection change to the adapter.

    if (options.isUserInteraction && !options.forceUpdate) {
      this.adapter.notifySelectionChange([index]);
    }
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex = function (index) {
    // Detect the presence of aria-current and get the value only during list
    // initialization when it is in unset state.
    if (this.selectedIndex === _constants.numbers.UNSET_INDEX) {
      this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(index, _constants.strings.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue !== null;
    var ariaAttribute = isAriaCurrent ? _constants.strings.ARIA_CURRENT : _constants.strings.ARIA_SELECTED;

    if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex, ariaAttribute, 'false');
    }

    if (index !== _constants.numbers.UNSET_INDEX) {
      var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue : 'true';
      this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    }
  };
  /**
   * Returns the attribute to use for indicating selection status.
   */


  MDCListFoundation.prototype.getSelectionAttribute = function () {
    return this.useSelectedAttr ? _constants.strings.ARIA_SELECTED : _constants.strings.ARIA_CHECKED;
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it
   * is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex = function (index, options) {
    if (options === void 0) {
      options = {};
    }

    var selectionAttribute = this.getSelectionAttribute();
    this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex === index && !options.forceUpdate) {
      return;
    }

    if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex, selectionAttribute, 'false');
    }

    this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
    this.selectedIndex = index; // If the selected value has changed through user interaction,
    // we want to notify the selection change to the adapter.

    if (options.isUserInteraction && !options.forceUpdate) {
      this.adapter.notifySelectionChange([index]);
    }
  };

  MDCListFoundation.prototype.setCheckboxAtIndex = function (index, options) {
    if (options === void 0) {
      options = {};
    }

    var currentIndex = this.selectedIndex; // If this update is not triggered by a user interaction, we do not
    // need to know about the currently selected indices and can avoid
    // constructing the `Set` for performance reasons.

    var currentlySelected = options.isUserInteraction ? new Set(currentIndex === _constants.numbers.UNSET_INDEX ? [] : currentIndex) : null;
    var selectionAttribute = this.getSelectionAttribute();
    var changedIndices = [];

    for (var i = 0; i < this.adapter.getListItemCount(); i++) {
      var previousIsChecked = currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(i);
      var newIsChecked = index.indexOf(i) >= 0; // If the selection has changed for this item, we keep track of it
      // so that we can notify the adapter.

      if (newIsChecked !== previousIsChecked) {
        changedIndices.push(i);
      }

      this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
      this.adapter.setAttributeForElementIndex(i, selectionAttribute, newIsChecked ? 'true' : 'false');
    }

    this.selectedIndex = index; // If the selected value has changed through user interaction,
    // we want to notify the selection change to the adapter.

    if (options.isUserInteraction && changedIndices.length) {
      this.adapter.notifySelectionChange(changedIndices);
    }
  };
  /**
   * Toggles the state of all checkboxes in the given range (inclusive) based on
   * the state of the checkbox at the `toggleIndex`. To determine whether to set
   * the given range to checked or unchecked, read the value of the checkbox at
   * the `toggleIndex` and negate it. Then apply that new checked state to all
   * checkboxes in the range.
   * @param fromIndex The start of the range of checkboxes to toggle
   * @param toIndex The end of the range of checkboxes to toggle
   * @param toggleIndex The index that will be used to determine the new state
   *     of the given checkbox range.
   */


  MDCListFoundation.prototype.toggleCheckboxRange = function (fromIndex, toIndex, toggleIndex) {
    this.lastSelectedIndex = toggleIndex;
    var currentlySelected = new Set(this.selectedIndex === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex);
    var newIsChecked = !(currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(toggleIndex));

    var _a = (0, _tslib.__read)([fromIndex, toIndex].sort(), 2),
        startIndex = _a[0],
        endIndex = _a[1];

    var selectionAttribute = this.getSelectionAttribute();
    var changedIndices = [];

    for (var i = startIndex; i <= endIndex; i++) {
      if (this.isIndexDisabled(i)) {
        continue;
      }

      var previousIsChecked = currentlySelected.has(i); // If the selection has changed for this item, we keep track of it
      // so that we can notify the adapter.

      if (newIsChecked !== previousIsChecked) {
        changedIndices.push(i);
        this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
        this.adapter.setAttributeForElementIndex(i, selectionAttribute, "" + newIsChecked);

        if (newIsChecked) {
          currentlySelected.add(i);
        } else {
          currentlySelected.delete(i);
        }
      }
    } // If the selected value has changed, update and notify the selection change
    // to the adapter.


    if (changedIndices.length) {
      this.selectedIndex = (0, _tslib.__spreadArray)([], (0, _tslib.__read)(currentlySelected));
      this.adapter.notifySelectionChange(changedIndices);
    }
  };

  MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
    if (this.focusedItemIndex === _constants.numbers.UNSET_INDEX && index !== 0) {
      // If some list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no
      // preselected items.
      this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
      this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
    } // Set the previous selection's tabindex to -1. We need this because
    // in selection menus that are not visible, programmatically setting an
    // option will not change focus but will change where tabindex should be 0.


    if (!(this.selectedIndex instanceof Array) && this.selectedIndex !== index) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex, 'tabindex', '-1');
    }

    if (index !== _constants.numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
    }
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio
   *     list.
   */


  MDCListFoundation.prototype.isSelectableList = function () {
    return this.isSingleSelectionList || this.isCheckboxList || this.isRadioList;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
    var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.setTabindexAtIndex(targetIndex);
  };

  MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
    // Action lists retain focus on the most recently focused item.
    if (!this.isSelectableList()) {
      return Math.max(this.focusedItemIndex, 0);
    } // Single-selection lists focus the selected item.


    if (typeof this.selectedIndex === 'number' && this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      return this.selectedIndex;
    } // Multiple-selection lists focus the first selected item.


    if (isNumberArray(this.selectedIndex) && this.selectedIndex.length > 0) {
      return this.selectedIndex.reduce(function (minIndex, currentIndex) {
        return Math.min(minIndex, currentIndex);
      });
    } // Selection lists without a selection focus the first item.


    return 0;
  };

  MDCListFoundation.prototype.isIndexValid = function (index, validateListType) {
    var _this = this;

    if (validateListType === void 0) {
      validateListType = true;
    }

    if (index instanceof Array) {
      if (!this.isCheckboxList && validateListType) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList && validateListType) {
        throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
      }

      return this.isIndexInRange(index) || this.isSingleSelectionList && index === _constants.numbers.UNSET_INDEX;
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange = function (index) {
    var listSize = this.adapter.getListItemCount();
    return index >= 0 && index < listSize;
  };
  /**
   * Sets selected index on user action, toggles checkboxes in checkbox lists
   * by default, unless `isCheckboxAlreadyUpdatedInAdapter` is set to `true`.
   *
   * In cases where `isCheckboxAlreadyUpdatedInAdapter` is set to `true`, the
   * UI is just updated to reflect the value returned by the adapter.
   *
   * When calling this, make sure user interaction does not toggle disabled
   * list items.
   */


  MDCListFoundation.prototype.setSelectedIndexOnAction = function (index, isCheckboxAlreadyUpdatedInAdapter) {
    this.lastSelectedIndex = index;

    if (this.isCheckboxList) {
      this.toggleCheckboxAtIndex(index, isCheckboxAlreadyUpdatedInAdapter);
      this.adapter.notifySelectionChange([index]);
    } else {
      this.setSelectedIndex(index, {
        isUserInteraction: true
      });
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex = function (index, isCheckboxAlreadyUpdatedInAdapter) {
    var selectionAttribute = this.getSelectionAttribute();
    var adapterIsChecked = this.adapter.isCheckboxCheckedAtIndex(index); // By default the checked value from the adapter is toggled unless the
    // checked state in the adapter has already been updated beforehand.
    // This can be happen when the underlying native checkbox has already
    // been updated through the native click event.

    var newCheckedValue;

    if (isCheckboxAlreadyUpdatedInAdapter) {
      newCheckedValue = adapterIsChecked;
    } else {
      newCheckedValue = !adapterIsChecked;
      this.adapter.setCheckedCheckboxOrRadioAtIndex(index, newCheckedValue);
    }

    this.adapter.setAttributeForElementIndex(index, selectionAttribute, newCheckedValue ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not
    // initialized then provide a default value.

    var selectedIndexes = this.selectedIndex === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex.slice();

    if (newCheckedValue) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex = selectedIndexes;
  };

  MDCListFoundation.prototype.focusItemAtIndex = function (index) {
    this.adapter.focusItemAtIndex(index);
    this.focusedItemIndex = index;
  };

  MDCListFoundation.prototype.checkboxListToggleAll = function (currentlySelectedIndexes, isUserInteraction) {
    var count = this.adapter.getListItemCount(); // If all items are selected, deselect everything.

    if (currentlySelectedIndexes.length === count) {
      this.setCheckboxAtIndex([], {
        isUserInteraction: isUserInteraction
      });
    } else {
      // Otherwise select all enabled options.
      var allIndexes = [];

      for (var i = 0; i < count; i++) {
        if (!this.isIndexDisabled(i) || currentlySelectedIndexes.indexOf(i) > -1) {
          allIndexes.push(i);
        }
      }

      this.setCheckboxAtIndex(allIndexes, {
        isUserInteraction: isUserInteraction
      });
    }
  };
  /**
   * Given the next desired character from the user, adds it to the typeahead
   * buffer. Then, attempts to find the next option matching the buffer. Wraps
   * around if at the end of options.
   *
   * @param nextChar The next character to add to the prefix buffer.
   * @param startingIndex The index from which to start matching. Only relevant
   *     when starting a new match sequence. To start a new match sequence,
   *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
   *     to clear after a set interval defined in list foundation. Defaults to
   *     the currently focused index.
   * @return The index of the matched item, or -1 if no match.
   */


  MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
    var _this = this;

    if (skipFocus === void 0) {
      skipFocus = false;
    }

    var opts = {
      focusItemAtIndex: function (index) {
        _this.focusItemAtIndex(index);
      },
      focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
      nextChar: nextChar,
      sortedIndexByFirstChar: this.sortedIndexByFirstChar,
      skipFocus: skipFocus,
      isItemAtIndexDisabled: function (index) {
        return _this.isIndexDisabled(index);
      }
    };
    return typeahead.matchItem(opts, this.typeaheadState);
  };
  /**
   * Initializes the MDCListTextAndIndex data structure by indexing the current
   * list items by primary text.
   *
   * @return The primary texts of all the list items sorted by first character.
   */


  MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
    return typeahead.initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
  };
  /**
   * Clears the typeahead buffer.
   */


  MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
    typeahead.clearBuffer(this.typeaheadState);
  };

  return MDCListFoundation;
}(_foundation.MDCFoundation);

exports.MDCListFoundation = MDCListFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCListFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","@material/dom/keyboard":"../node_modules/@material/dom/keyboard.js","./constants":"../node_modules/@material/list/constants.js","./events":"../node_modules/@material/list/events.js","./typeahead":"../node_modules/@material/list/typeahead.js"}],"../node_modules/@material/list/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCList = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _ponyfill = require("@material/dom/ponyfill");

var _constants = require("./constants");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCList =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function (value) {
      this.foundation.setVerticalOrientation(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function () {
      return Array.from(this.root.querySelectorAll("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function (value) {
      this.foundation.setWrapFocus(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "typeaheadInProgress", {
    /**
     * @return Whether typeahead is currently matching a user-specified prefix.
     */
    get: function () {
      return this.foundation.isTypeaheadInProgress();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "hasTypeahead", {
    /**
     * Sets whether typeahead functionality is enabled on the list.
     * @param hasTypeahead Whether typeahead is enabled.
     */
    set: function (hasTypeahead) {
      this.foundation.setHasTypeahead(hasTypeahead);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function (isSingleSelectionList) {
      this.foundation.setSingleSelection(isSingleSelectionList);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "disabledItemsFocusable", {
    set: function (areDisabledItemsFocusable) {
      this.foundation.setDisabledItemsFocusable(areDisabledItemsFocusable);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function () {
      return this.foundation.getSelectedIndex();
    },
    set: function (index) {
      this.foundation.setSelectedIndex(index);
    },
    enumerable: false,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.isEvolutionEnabled = _constants.evolutionAttribute in this.root.dataset;

    if (this.isEvolutionEnabled) {
      this.classNameMap = _constants.evolutionClassNameMap;
    } else if ((0, _ponyfill.matches)(this.root, _constants.strings.DEPRECATED_SELECTOR)) {
      this.classNameMap = _constants.deprecatedClassNameMap;
    } else {
      this.classNameMap = Object.values(_constants.cssClasses).reduce(function (obj, className) {
        obj[className] = className;
        return obj;
      }, {});
    }

    this.handleClick = this.handleClickEvent.bind(this);
    this.handleKeydown = this.handleKeydownEvent.bind(this);
    this.focusInEventListener = this.handleFocusInEvent.bind(this);
    this.focusOutEventListener = this.handleFocusOutEvent.bind(this);
    this.listen('keydown', this.handleKeydown);
    this.listen('click', this.handleClick);
    this.listen('focusin', this.focusInEventListener);
    this.listen('focusout', this.focusOutEventListener);
    this.layout();
    this.initializeListType();
    this.ensureFocusable();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown);
    this.unlisten('click', this.handleClick);
    this.unlisten('focusin', this.focusInEventListener);
    this.unlisten('focusout', this.focusOutEventListener);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root.getAttribute(_constants.strings.ARIA_ORIENTATION);
    this.vertical = direction !== _constants.strings.ARIA_ORIENTATION_HORIZONTAL;
    var itemSelector = "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not([tabindex])";
    var childSelector = _constants.strings.FOCUSABLE_CHILD_ELEMENTS; // List items need to have at least tabindex=-1 to be focusable.

    var itemEls = this.root.querySelectorAll(itemSelector);

    if (itemEls.length) {
      Array.prototype.forEach.call(itemEls, function (el) {
        el.setAttribute('tabindex', '-1');
      });
    } // Child button/a elements are not tabbable until the list item is focused.


    var focusableChildEls = this.root.querySelectorAll(childSelector);

    if (focusableChildEls.length) {
      Array.prototype.forEach.call(focusableChildEls, function (el) {
        el.setAttribute('tabindex', '-1');
      });
    }

    if (this.isEvolutionEnabled) {
      this.foundation.setUseSelectedAttribute(true);
    }

    this.foundation.layout();
  };
  /**
   * Extracts the primary text from a list item.
   * @param item The list item element.
   * @return The primary text in the element.
   */


  MDCList.prototype.getPrimaryText = function (item) {
    var _a;

    var primaryText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS]);

    if (this.isEvolutionEnabled || primaryText) {
      return (_a = primaryText === null || primaryText === void 0 ? void 0 : primaryText.textContent) !== null && _a !== void 0 ? _a : '';
    }

    var singleLineText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_TEXT_CLASS]);
    return singleLineText && singleLineText.textContent || '';
  };
  /**
   * Initialize selectedIndex value based on pre-selected list items.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    this.isInteractive = (0, _ponyfill.matches)(this.root, _constants.strings.ARIA_INTERACTIVE_ROLES_SELECTOR);

    if (this.isEvolutionEnabled && this.isInteractive) {
      var selection = Array.from(this.root.querySelectorAll(_constants.strings.SELECTED_ITEM_SELECTOR), function (listItem) {
        return _this.listElements.indexOf(listItem);
      });

      if ((0, _ponyfill.matches)(this.root, _constants.strings.ARIA_MULTI_SELECTABLE_SELECTOR)) {
        this.selectedIndex = selection;
      } else if (selection.length > 0) {
        this.selectedIndex = selection[0];
      }

      return;
    }

    var checkboxListItems = this.root.querySelectorAll(_constants.strings.ARIA_ROLE_CHECKBOX_SELECTOR);
    var radioSelectedListItem = this.root.querySelector(_constants.strings.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root.querySelectorAll(_constants.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = Array.from(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  /**
   * Updates the list item at itemIndex to the desired isEnabled state.
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
    this.foundation.setEnabled(itemIndex, isEnabled);
  };
  /**
   * Given the next desired character from the user, adds it to the typeahead
   * buffer. Then, attempts to find the next option matching the buffer. Wraps
   * around if at the end of options.
   *
   * @param nextChar The next character to add to the prefix buffer.
   * @param startingIndex The index from which to start matching. Defaults to
   *     the currently focused index.
   * @return The index of the matched item.
   */


  MDCList.prototype.typeaheadMatchItem = function (nextChar, startingIndex) {
    return this.foundation.typeaheadMatchItem(nextChar, startingIndex,
    /** skipFocus */
    true);
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take
    // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
    // methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(_this.classNameMap[className]);
        }
      },
      focusItemAtIndex: function (index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function (index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function () {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function () {
        return _this.listElements.length;
      },
      getPrimaryTextAtIndex: function (index) {
        return _this.getPrimaryText(_this.listElements[index]);
      },
      hasCheckboxAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function (index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function () {
        return _this.root !== document.activeElement && _this.root.contains(document.activeElement);
      },
      isRootFocused: function () {
        return document.activeElement === _this.root;
      },
      listItemAtIndexHasClass: function (index, className) {
        return _this.listElements[index].classList.contains(_this.classNameMap[className]);
      },
      notifyAction: function (index) {
        _this.emit(_constants.strings.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      notifySelectionChange: function (changedIndices) {
        _this.emit(_constants.strings.SELECTION_CHANGE_EVENT, {
          changedIndices: changedIndices
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(_this.classNameMap[className]);
        }
      },
      setAttributeForElementIndex: function (index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var selector = _constants.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
        Array.prototype.forEach.call(element.querySelectorAll(selector), function (el) {
          el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new _foundation.MDCListFoundation(adapter);
  };
  /**
   * Ensures that at least one item is focusable if the list is interactive and
   * doesn't specify a suitable tabindex.
   */


  MDCList.prototype.ensureFocusable = function () {
    if (this.isEvolutionEnabled && this.isInteractive) {
      if (!this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + "[tabindex=\"0\"]")) {
        var index = this.initialFocusIndex();

        if (index !== -1) {
          this.listElements[index].tabIndex = 0;
        }
      }
    }
  };

  MDCList.prototype.initialFocusIndex = function () {
    if (this.selectedIndex instanceof Array && this.selectedIndex.length > 0) {
      return this.selectedIndex[0];
    }

    if (typeof this.selectedIndex === 'number' && this.selectedIndex !== _constants.numbers.UNSET_INDEX) {
      return this.selectedIndex;
    }

    var el = this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not(." + this.classNameMap[_constants.cssClasses.LIST_ITEM_DISABLED_CLASS] + ")");

    if (el === null) {
      return -1;
    }

    return this.getListItemIndex(el);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1
   * if there is no list item
   */


  MDCList.prototype.getListItemIndex = function (el) {
    var nearestParent = (0, _ponyfill.closest)(el, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ", ." + this.classNameMap[_constants.cssClasses.ROOT]); // Get the index of the element if it is a list item.

    if (nearestParent && (0, _ponyfill.matches)(nearestParent, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS])) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleFocusInEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusIn(index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleFocusOutEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusOut(index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred
   * before sending the event to the foundation.
   */


  MDCList.prototype.handleKeydownEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target;
    this.foundation.handleKeydown(evt, target.classList.contains(this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to
   * the foundation.
   */


  MDCList.prototype.handleClickEvent = function (evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the
    // checkbox will have 2 change events.

    var toggleCheckbox = !(0, _ponyfill.matches)(target, _constants.strings.CHECKBOX_RADIO_SELECTOR);
    this.foundation.handleClick(index, toggleCheckbox, evt);
  };

  return MDCList;
}(_component.MDCComponent);

exports.MDCList = MDCList;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","./constants":"../node_modules/@material/list/constants.js","./foundation":"../node_modules/@material/list/foundation.js"}],"../node_modules/@material/drawer/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ANIMATE: 'mdc-drawer--animate',
  CLOSING: 'mdc-drawer--closing',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  OPENING: 'mdc-drawer--opening',
  ROOT: 'mdc-drawer'
};
exports.cssClasses = cssClasses;
var strings = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened',
  SCRIM_SELECTOR: '.mdc-drawer-scrim',
  LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
  LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated,.mdc-deprecated-list-item--activated'
};
exports.strings = strings;
},{}],"../node_modules/@material/drawer/dismissible/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCDismissibleDrawerFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("../constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCDismissibleDrawerFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDismissibleDrawerFoundation, _super);

  function MDCDismissibleDrawerFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;

    _this.animationFrame = 0;
    _this.animationTimer = 0;
    return _this;
  }

  Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        elementHasClass: function () {
          return false;
        },
        notifyClose: function () {
          return undefined;
        },
        notifyOpen: function () {
          return undefined;
        },
        saveFocus: function () {
          return undefined;
        },
        restoreFocus: function () {
          return undefined;
        },
        focusActiveNavigationItem: function () {
          return undefined;
        },
        trapFocus: function () {
          return undefined;
        },
        releaseFocus: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: false,
    configurable: true
  });

  MDCDismissibleDrawerFoundation.prototype.destroy = function () {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }
  };
  /**
   * Opens the drawer from the closed state.
   */


  MDCDismissibleDrawerFoundation.prototype.open = function () {
    var _this = this;

    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter.addClass(_constants.cssClasses.OPEN);
    this.adapter.addClass(_constants.cssClasses.ANIMATE); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame(function () {
      _this.adapter.addClass(_constants.cssClasses.OPENING);
    });
    this.adapter.saveFocus();
  };
  /**
   * Closes the drawer from the open state.
   */


  MDCDismissibleDrawerFoundation.prototype.close = function () {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter.addClass(_constants.cssClasses.CLOSING);
  };
  /**
   * Returns true if the drawer is in the open position.
   * @return true if drawer is in open state.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
    return this.adapter.hasClass(_constants.cssClasses.OPEN);
  };
  /**
   * Returns true if the drawer is animating open.
   * @return true if drawer is animating open.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
    return this.adapter.hasClass(_constants.cssClasses.OPENING) || this.adapter.hasClass(_constants.cssClasses.ANIMATE);
  };
  /**
   * Returns true if the drawer is animating closed.
   * @return true if drawer is animating closed.
   */


  MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
    return this.adapter.hasClass(_constants.cssClasses.CLOSING);
  };
  /**
   * Keydown handler to close drawer when key is escape.
   */


  MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };
  /**
   * Handles the `transitionend` event when the drawer finishes opening/closing.
   */


  MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
    var OPENING = _constants.cssClasses.OPENING,
        CLOSING = _constants.cssClasses.CLOSING,
        OPEN = _constants.cssClasses.OPEN,
        ANIMATE = _constants.cssClasses.ANIMATE,
        ROOT = _constants.cssClasses.ROOT; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    var isRootElement = this.isElement(evt.target) && this.adapter.elementHasClass(evt.target, ROOT);

    if (!isRootElement) {
      return;
    }

    if (this.isClosing()) {
      this.adapter.removeClass(OPEN);
      this.closed();
      this.adapter.restoreFocus();
      this.adapter.notifyClose();
    } else {
      this.adapter.focusActiveNavigationItem();
      this.opened();
      this.adapter.notifyOpen();
    }

    this.adapter.removeClass(ANIMATE);
    this.adapter.removeClass(OPENING);
    this.adapter.removeClass(CLOSING);
  };
  /**
   * Extension point for when drawer finishes open animation.
   */


  MDCDismissibleDrawerFoundation.prototype.opened = function () {}; // tslint:disable-line:no-empty

  /**
   * Extension point for when drawer finishes close animation.
   */


  MDCDismissibleDrawerFoundation.prototype.closed = function () {}; // tslint:disable-line:no-empty

  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(function () {
      _this.animationFrame = 0;
      clearTimeout(_this.animationTimer);
      _this.animationTimer = setTimeout(callback, 0);
    });
  };

  MDCDismissibleDrawerFoundation.prototype.isElement = function (element) {
    // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
    return Boolean(element.classList);
  };

  return MDCDismissibleDrawerFoundation;
}(_foundation.MDCFoundation);

exports.MDCDismissibleDrawerFoundation = MDCDismissibleDrawerFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCDismissibleDrawerFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","../constants":"../node_modules/@material/drawer/constants.js"}],"../node_modules/@material/drawer/modal/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCModalDrawerFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("../dismissible/foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* istanbul ignore next: subclass is not a branch statement */
var MDCModalDrawerFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCModalDrawerFoundation, _super);

  function MDCModalDrawerFoundation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Handles click event on scrim.
   */


  MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
    this.close();
  };
  /**
   * Called when drawer finishes open animation.
   */


  MDCModalDrawerFoundation.prototype.opened = function () {
    this.adapter.trapFocus();
  };
  /**
   * Called when drawer finishes close animation.
   */


  MDCModalDrawerFoundation.prototype.closed = function () {
    this.adapter.releaseFocus();
  };

  return MDCModalDrawerFoundation;
}(_foundation.MDCDismissibleDrawerFoundation);

exports.MDCModalDrawerFoundation = MDCModalDrawerFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCModalDrawerFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","../dismissible/foundation":"../node_modules/@material/drawer/dismissible/foundation.js"}],"../node_modules/@material/drawer/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCDrawer = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _focusTrap = require("@material/dom/focus-trap");

var _component2 = require("@material/list/component");

var _foundation = require("./dismissible/foundation");

var _foundation2 = require("./modal/foundation");

var util = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = _foundation.MDCDismissibleDrawerFoundation.cssClasses,
    strings = _foundation.MDCDismissibleDrawerFoundation.strings;
/**
 * @events `MDCDrawer:closed {}` Emits when the navigation drawer has closed.
 * @events `MDCDrawer:opened {}` Emits when the navigation drawer has opened.
 */

var MDCDrawer =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDrawer, _super);

  function MDCDrawer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCDrawer.attachTo = function (root) {
    return new MDCDrawer(root);
  };

  Object.defineProperty(MDCDrawer.prototype, "open", {
    /**
     * @return boolean Proxies to the foundation's `open`/`close` methods.
     * Also returns true if drawer is in the open position.
     */
    get: function () {
      return this.foundation.isOpen();
    },

    /**
     * Toggles the drawer open and closed.
     */
    set: function (isOpen) {
      if (isOpen) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDrawer.prototype, "list", {
    // initialSyncWithDOM()
    get: function () {
      return this.innerList;
    },
    enumerable: false,
    configurable: true
  });

  MDCDrawer.prototype.initialize = function (focusTrapFactory, listFactory) {
    if (focusTrapFactory === void 0) {
      focusTrapFactory = function (el) {
        return new _focusTrap.FocusTrap(el);
      };
    }

    if (listFactory === void 0) {
      listFactory = function (el) {
        return new _component2.MDCList(el);
      };
    }

    var listEl = this.root.querySelector(strings.LIST_SELECTOR);

    if (listEl) {
      this.innerList = listFactory(listEl);
      this.innerList.wrapFocus = true;
    }

    this.focusTrapFactory = focusTrapFactory;
  };

  MDCDrawer.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var MODAL = cssClasses.MODAL;
    var SCRIM_SELECTOR = strings.SCRIM_SELECTOR;
    this.scrim = this.root.parentNode.querySelector(SCRIM_SELECTOR);

    if (this.scrim && this.root.classList.contains(MODAL)) {
      this.handleScrimClick = function () {
        return _this.foundation.handleScrimClick();
      };

      this.scrim.addEventListener('click', this.handleScrimClick);
      this.focusTrap = util.createFocusTrapInstance(this.root, this.focusTrapFactory);
    }

    this.handleKeydown = function (evt) {
      _this.foundation.handleKeydown(evt);
    };

    this.handleTransitionEnd = function (evt) {
      _this.foundation.handleTransitionEnd(evt);
    };

    this.listen('keydown', this.handleKeydown);
    this.listen('transitionend', this.handleTransitionEnd);
  };

  MDCDrawer.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown);
    this.unlisten('transitionend', this.handleTransitionEnd);

    if (this.innerList) {
      this.innerList.destroy();
    }

    var MODAL = cssClasses.MODAL;

    if (this.scrim && this.handleScrimClick && this.root.classList.contains(MODAL)) {
      this.scrim.removeEventListener('click', this.handleScrimClick); // Ensure drawer is closed to hide scrim and release focus

      this.open = false;
    }
  };

  MDCDrawer.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take
    // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
    // methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        _this.root.classList.add(className);
      },
      removeClass: function (className) {
        _this.root.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      elementHasClass: function (element, className) {
        return element.classList.contains(className);
      },
      saveFocus: function () {
        _this.previousFocus = document.activeElement;
      },
      restoreFocus: function () {
        var previousFocus = _this.previousFocus;

        if (previousFocus && previousFocus.focus && _this.root.contains(document.activeElement)) {
          previousFocus.focus();
        }
      },
      focusActiveNavigationItem: function () {
        var activeNavItemEl = _this.root.querySelector(strings.LIST_ITEM_ACTIVATED_SELECTOR);

        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: function () {
        _this.emit(strings.CLOSE_EVENT, {}, true
        /* shouldBubble */
        );
      },
      notifyOpen: function () {
        _this.emit(strings.OPEN_EVENT, {}, true
        /* shouldBubble */
        );
      },
      trapFocus: function () {
        _this.focusTrap.trapFocus();
      },
      releaseFocus: function () {
        _this.focusTrap.releaseFocus();
      }
    }; // tslint:enable:object-literal-sort-keys

    var DISMISSIBLE = cssClasses.DISMISSIBLE,
        MODAL = cssClasses.MODAL;

    if (this.root.classList.contains(DISMISSIBLE)) {
      return new _foundation.MDCDismissibleDrawerFoundation(adapter);
    } else if (this.root.classList.contains(MODAL)) {
      return new _foundation2.MDCModalDrawerFoundation(adapter);
    } else {
      throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
    }
  };

  return MDCDrawer;
}(_component.MDCComponent);

exports.MDCDrawer = MDCDrawer;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/focus-trap":"../node_modules/@material/dom/focus-trap.js","@material/list/component":"../node_modules/@material/list/component.js","./dismissible/foundation":"../node_modules/@material/drawer/dismissible/foundation.js","./modal/foundation":"../node_modules/@material/drawer/modal/foundation.js","./util":"../node_modules/@material/drawer/util.js"}],"../node_modules/@material/drawer/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  util: true
};
exports.util = void 0;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var _adapter = require("./adapter");

Object.keys(_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _adapter[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./dismissible/foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _foundation2 = require("./modal/foundation");

Object.keys(_foundation2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _foundation2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation2[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./util":"../node_modules/@material/drawer/util.js","./adapter":"../node_modules/@material/drawer/adapter.js","./component":"../node_modules/@material/drawer/component.js","./constants":"../node_modules/@material/drawer/constants.js","./dismissible/foundation":"../node_modules/@material/drawer/dismissible/foundation.js","./modal/foundation":"../node_modules/@material/drawer/modal/foundation.js"}],"../node_modules/@material/list/adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/list/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/list/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adapter = require("./adapter");

Object.keys(_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _adapter[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
},{"./adapter":"../node_modules/@material/list/adapter.js","./component":"../node_modules/@material/list/component.js","./constants":"../node_modules/@material/list/constants.js","./foundation":"../node_modules/@material/list/foundation.js","./types":"../node_modules/@material/list/types.js"}],"../node_modules/@material/top-app-bar/adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/dom/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPassive = applyPassive;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  return supportsPassiveOption(globalObj) ? {
    passive: true
  } : false;
}

function supportsPassiveOption(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  } // See
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener


  var passiveSupported = false;

  try {
    var options = {
      // This function will be called when the browser
      // attempts to access the passive property.
      get passive() {
        passiveSupported = true;
        return false;
      }

    };

    var handler = function () {};

    globalObj.document.addEventListener('test', handler, options);
    globalObj.document.removeEventListener('test', handler, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
}
},{}],"../node_modules/@material/ripple/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbers = exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
exports.cssClasses = cssClasses;
var strings = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
exports.strings = strings;
var numbers = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices

};
exports.numbers = numbers;
},{}],"../node_modules/@material/ripple/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsCssVariables = supportsCssVariables;
exports.getNormalizedEventCoords = getNormalizedEventCoords;

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');
  supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}

function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}
},{}],"../node_modules/@material/ripple/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCRippleFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

var _util = require("./util");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;

    _this.activationAnimationHasEnded = false;
    _this.activationTimer = 0;
    _this.fgDeactivationRemovalTimer = 0;
    _this.fgScale = '0';
    _this.frame = {
      width: 0,
      height: 0
    };
    _this.initialSize = 0;
    _this.layoutFrame = 0;
    _this.maxRadius = 0;
    _this.unboundedCoords = {
      left: 0,
      top: 0
    };
    _this.activationState = _this.defaultActivationState();

    _this.activationTimerCallback = function () {
      _this.activationAnimationHasEnded = true;

      _this.runDeactivationUXLogicIfReady();
    };

    _this.activateHandler = function (e) {
      _this.activateImpl(e);
    };

    _this.deactivateHandler = function () {
      _this.deactivateImpl();
    };

    _this.focusHandler = function () {
      _this.handleFocus();
    };

    _this.blurHandler = function () {
      _this.handleBlur();
    };

    _this.resizeHandler = function () {
      _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        browserSupportsCssVars: function () {
          return true;
        },
        computeBoundingRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function () {
          return true;
        },
        deregisterDocumentInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        deregisterResizeHandler: function () {
          return undefined;
        },
        getWindowPageOffset: function () {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function () {
          return true;
        },
        isSurfaceDisabled: function () {
          return true;
        },
        isUnbounded: function () {
          return true;
        },
        registerDocumentInteractionHandler: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        registerResizeHandler: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        updateCssVariable: function () {
          return undefined;
        }
      };
    },
    enumerable: false,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple();
    this.registerRootHandlers(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter.addClass(ROOT_1);

        if (_this.adapter.isUnbounded()) {
          _this.adapter.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple()) {
      if (this.activationTimer) {
        clearTimeout(this.activationTimer);
        this.activationTimer = 0;
        this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer) {
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.fgDeactivationRemovalTimer = 0;
        this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter.removeClass(ROOT_2);

        _this.adapter.removeClass(UNBOUNDED_2);

        _this.removeCssVars();
      });
    }

    this.deregisterRootHandlers();
    this.deregisterDeactivationHandlers();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activateImpl(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivateImpl();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame) {
      cancelAnimationFrame(this.layoutFrame);
    }

    this.layoutFrame = requestAnimationFrame(function () {
      _this.layoutInternal();

      _this.layoutFrame = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter.addClass(UNBOUNDED);
    } else {
      this.adapter.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple = function () {
    return this.adapter.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers = function (supportsPressRipple) {
    var e_1, _a;

    if (supportsPressRipple) {
      try {
        for (var ACTIVATION_EVENT_TYPES_1 = (0, _tslib.__values)(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
          var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
          this.adapter.registerInteractionHandler(evtType, this.activateHandler);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      if (this.adapter.isUnbounded()) {
        this.adapter.registerResizeHandler(this.resizeHandler);
      }
    }

    this.adapter.registerInteractionHandler('focus', this.focusHandler);
    this.adapter.registerInteractionHandler('blur', this.blurHandler);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers = function (evt) {
    var e_2, _a;

    if (evt.type === 'keydown') {
      this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
    } else {
      try {
        for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = (0, _tslib.__values)(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
          var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
          this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers = function () {
    var e_3, _a;

    try {
      for (var ACTIVATION_EVENT_TYPES_2 = (0, _tslib.__values)(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
        var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
        this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
    this.adapter.deregisterInteractionHandler('blur', this.blurHandler);

    if (this.adapter.isUnbounded()) {
      this.adapter.deregisterResizeHandler(this.resizeHandler);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function () {
    var e_4, _a;

    this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);

    try {
      for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = (0, _tslib.__values)(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
        var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
        this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
  };

  MDCRippleFoundation.prototype.removeCssVars = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activateImpl = function (evt) {
    var _this = this;

    if (this.adapter.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState = _this.defaultActivationState();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer);
    clearTimeout(this.fgDeactivationRemovalTimer);
    this.rmBoundedActivationClasses();
    this.adapter.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter.computeBoundingRect();
    this.adapter.addClass(FG_ACTIVATION);
    this.activationTimer = setTimeout(function () {
      _this.activationTimerCallback();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates = function () {
    var _a = this.activationState,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = (0, _util.getNormalizedEventCoords)(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame.width / 2,
        y: this.frame.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize / 2,
      y: startPoint.y - this.initialSize / 2
    };
    var endPoint = {
      x: this.frame.width / 2 - this.initialSize / 2,
      y: this.frame.height / 2 - this.initialSize / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded) {
      this.rmBoundedActivationClasses();
      this.adapter.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer = setTimeout(function () {
        _this.adapter.removeClass(FG_DEACTIVATION);
      }, _constants.numbers.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded = false;
    this.adapter.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState = function () {
    var _this = this;

    this.previousActivationEvent = this.activationState.activationEvent;
    this.activationState = this.defaultActivationState(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivateImpl = function () {
    var _this = this;

    var activationState = this.activationState; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = (0, _tslib.__assign)({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        _this.animateDeactivation(state);
      });
      this.resetActivationState();
    } else {
      this.deregisterDeactivationHandlers();
      requestAnimationFrame(function () {
        _this.activationState.hasDeactivationUXRun = true;

        _this.animateDeactivation(state);

        _this.resetActivationState();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal = function () {
    var _this = this;

    this.frame = this.adapter.computeBoundingRect();
    var maxDim = Math.max(this.frame.height, this.frame.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function () {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE); // Unbounded ripple size should always be even number to equally center align.

    if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize = initialSize - 1;
    } else {
      this.initialSize = initialSize;
    }

    this.fgScale = "" + this.maxRadius / this.initialSize;
    this.updateLayoutCssVars();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
    this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);

    if (this.adapter.isUnbounded()) {
      this.unboundedCoords = {
        left: Math.round(this.frame.width / 2 - this.initialSize / 2),
        top: Math.round(this.frame.height / 2 - this.initialSize / 2)
      };
      this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
      this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
    }
  };

  return MDCRippleFoundation;
}(_foundation.MDCFoundation);

exports.MDCRippleFoundation = MDCRippleFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCRippleFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/ripple/constants.js","./util":"../node_modules/@material/ripple/util.js"}],"../node_modules/@material/ripple/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCRipple = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _events = require("@material/dom/events");

var _ponyfill = require("@material/dom/ponyfill");

var _foundation = require("./foundation");

var util = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCRipple =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCRipple, _super);

  function MDCRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.disabled = false;
    return _this;
  }

  MDCRipple.attachTo = function (root, opts) {
    if (opts === void 0) {
      opts = {
        isUnbounded: undefined
      };
    }

    var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (opts.isUnbounded !== undefined) {
      ripple.unbounded = opts.isUnbounded;
    }

    return ripple;
  };

  MDCRipple.createAdapter = function (instance) {
    return {
      addClass: function (className) {
        return instance.root.classList.add(className);
      },
      browserSupportsCssVars: function () {
        return util.supportsCssVariables(window);
      },
      computeBoundingRect: function () {
        return instance.root.getBoundingClientRect();
      },
      containsEventTarget: function (target) {
        return instance.root.contains(target);
      },
      deregisterDocumentInteractionHandler: function (evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return instance.root.removeEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      deregisterResizeHandler: function (handler) {
        return window.removeEventListener('resize', handler);
      },
      getWindowPageOffset: function () {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      isSurfaceActive: function () {
        return (0, _ponyfill.matches)(instance.root, ':active');
      },
      isSurfaceDisabled: function () {
        return Boolean(instance.disabled);
      },
      isUnbounded: function () {
        return Boolean(instance.unbounded);
      },
      registerDocumentInteractionHandler: function (evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      registerInteractionHandler: function (evtType, handler) {
        return instance.root.addEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      registerResizeHandler: function (handler) {
        return window.addEventListener('resize', handler);
      },
      removeClass: function (className) {
        return instance.root.classList.remove(className);
      },
      updateCssVariable: function (varName, value) {
        return instance.root.style.setProperty(varName, value);
      }
    };
  };

  Object.defineProperty(MDCRipple.prototype, "unbounded", {
    get: function () {
      return Boolean(this.isUnbounded);
    },
    set: function (unbounded) {
      this.isUnbounded = Boolean(unbounded);
      this.setUnbounded();
    },
    enumerable: false,
    configurable: true
  });

  MDCRipple.prototype.activate = function () {
    this.foundation.activate();
  };

  MDCRipple.prototype.deactivate = function () {
    this.foundation.deactivate();
  };

  MDCRipple.prototype.layout = function () {
    this.foundation.layout();
  };

  MDCRipple.prototype.getDefaultFoundation = function () {
    return new _foundation.MDCRippleFoundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function () {
    var root = this.root;
    this.isUnbounded = 'mdcRippleIsUnbounded' in root.dataset;
  };
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   */


  MDCRipple.prototype.setUnbounded = function () {
    this.foundation.setUnbounded(Boolean(this.isUnbounded));
  };

  return MDCRipple;
}(_component.MDCComponent);

exports.MDCRipple = MDCRipple;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/events":"../node_modules/@material/dom/events.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","./foundation":"../node_modules/@material/ripple/foundation.js","./util":"../node_modules/@material/ripple/util.js"}],"../node_modules/@material/top-app-bar/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item'
};
exports.cssClasses = cssClasses;
var numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
exports.numbers = numbers;
var strings = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};
exports.strings = strings;
},{}],"../node_modules/@material/top-app-bar/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTopAppBarBaseFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBarBaseFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTopAppBarBaseFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */

  function MDCTopAppBarBaseFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        getTopAppBarHeight: function () {
          return 0;
        },
        notifyNavigationIconClicked: function () {
          return undefined;
        },
        getViewportScrollY: function () {
          return 0;
        },
        getTotalActionItems: function () {
          return 0;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: false,
    configurable: true
  });
  /** Other variants of TopAppBar foundation overrides this method */

  MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () {}; // tslint:disable-line:no-empty

  /** Other variants of TopAppBar foundation overrides this method */


  MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () {}; // tslint:disable-line:no-empty


  MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
    this.adapter.notifyNavigationIconClicked();
  };

  return MDCTopAppBarBaseFoundation;
}(_foundation.MDCFoundation);

exports.MDCTopAppBarBaseFoundation = MDCTopAppBarBaseFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTopAppBarBaseFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/top-app-bar/constants.js"}],"../node_modules/@material/top-app-bar/standard/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTopAppBarFoundation = void 0;

var _tslib = require("tslib");

var _constants = require("../constants");

var _foundation = require("../foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INITIAL_VALUE = 0;

var MDCTopAppBarFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTopAppBarFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */

  function MDCTopAppBarFoundation(adapter) {
    var _this = _super.call(this, adapter) || this;
    /**
     * Indicates if the top app bar was docked in the previous scroll handler iteration.
     */


    _this.wasDocked = true;
    /**
     * Indicates if the top app bar is docked in the fully shown position.
     */

    _this.isDockedShowing = true;
    /**
     * Variable for current scroll position of the top app bar
     */

    _this.currentAppBarOffsetTop = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     */

    _this.isCurrentlyBeingResized = false;
    /**
     * The timeout that's used to throttle the resize events
     */

    _this.resizeThrottleId = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized
     * variable after a resize
     */

    _this.resizeDebounceId = INITIAL_VALUE;
    _this.lastScrollPosition = _this.adapter.getViewportScrollY();
    _this.topAppBarHeight = _this.adapter.getTopAppBarHeight();
    return _this;
  }

  MDCTopAppBarFoundation.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    this.adapter.setStyle('top', '');
  };
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   */


  MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
    var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
    var diff = currentScrollPosition - this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition; // If the window is being resized the lastScrollPosition needs to be updated
    // but the current scroll of the top app bar should stay in the same
    // position.

    if (!this.isCurrentlyBeingResized) {
      this.currentAppBarOffsetTop -= diff;

      if (this.currentAppBarOffsetTop > 0) {
        this.currentAppBarOffsetTop = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
        this.currentAppBarOffsetTop = -this.topAppBarHeight;
      }

      this.moveTopAppBar();
    }
  };
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   */


  MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
    var _this = this; // Throttle resize events 10 p/s


    if (!this.resizeThrottleId) {
      this.resizeThrottleId = setTimeout(function () {
        _this.resizeThrottleId = INITIAL_VALUE;

        _this.throttledResizeHandler();
      }, _constants.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized = true;

    if (this.resizeDebounceId) {
      clearTimeout(this.resizeDebounceId);
    }

    this.resizeDebounceId = setTimeout(function () {
      _this.handleTargetScroll();

      _this.isCurrentlyBeingResized = false;
      _this.resizeDebounceId = INITIAL_VALUE;
    }, _constants.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  };
  /**
   * Function to determine if the DOM needs to update.
   */


  MDCTopAppBarFoundation.prototype.checkForUpdate = function () {
    var offscreenBoundaryTop = -this.topAppBarHeight;
    var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
    var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
    var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked) {
        this.wasDocked = true;
        return true;
      } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
        this.isDockedShowing = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  };
  /**
   * Function to move the top app bar if needed.
   */


  MDCTopAppBarFoundation.prototype.moveTopAppBar = function () {
    if (this.checkForUpdate()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      var offset = this.currentAppBarOffsetTop;

      if (Math.abs(offset) >= this.topAppBarHeight) {
        offset = -_constants.numbers.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter.setStyle('top', offset + 'px');
    }
  };
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   */


  MDCTopAppBarFoundation.prototype.throttledResizeHandler = function () {
    var currentHeight = this.adapter.getTopAppBarHeight();

    if (this.topAppBarHeight !== currentHeight) {
      this.wasDocked = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
      this.topAppBarHeight = currentHeight;
    }

    this.handleTargetScroll();
  };

  return MDCTopAppBarFoundation;
}(_foundation.MDCTopAppBarBaseFoundation);

exports.MDCTopAppBarFoundation = MDCTopAppBarFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTopAppBarFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","../constants":"../node_modules/@material/top-app-bar/constants.js","../foundation":"../node_modules/@material/top-app-bar/foundation.js"}],"../node_modules/@material/top-app-bar/fixed/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFixedTopAppBarFoundation = void 0;

var _tslib = require("tslib");

var _constants = require("../constants");

var _foundation = require("../standard/foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFixedTopAppBarFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCFixedTopAppBarFoundation, _super);

  function MDCFixedTopAppBarFoundation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * State variable for the previous scroll iteration top app bar state
     */


    _this.wasScrolled = false;
    return _this;
  }
  /**
   * Scroll handler for applying/removing the modifier class on the fixed top app bar.
   */


  MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
    var currentScroll = this.adapter.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled) {
        this.adapter.removeClass(_constants.cssClasses.FIXED_SCROLLED_CLASS);
        this.wasScrolled = false;
      }
    } else {
      if (!this.wasScrolled) {
        this.adapter.addClass(_constants.cssClasses.FIXED_SCROLLED_CLASS);
        this.wasScrolled = true;
      }
    }
  };

  return MDCFixedTopAppBarFoundation;
}(_foundation.MDCTopAppBarFoundation);

exports.MDCFixedTopAppBarFoundation = MDCFixedTopAppBarFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFixedTopAppBarFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","../constants":"../node_modules/@material/top-app-bar/constants.js","../standard/foundation":"../node_modules/@material/top-app-bar/standard/foundation.js"}],"../node_modules/@material/top-app-bar/short/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCShortTopAppBarFoundation = void 0;

var _tslib = require("tslib");

var _constants = require("../constants");

var _foundation = require("../foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCShortTopAppBarFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCShortTopAppBarFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */

  function MDCShortTopAppBarFoundation(adapter) {
    var _this = _super.call(this, adapter) || this;

    _this.collapsed = false;
    _this.isAlwaysCollapsed = false;
    return _this;
  }

  Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
    // Public visibility for backward compatibility.
    get: function () {
      return this.collapsed;
    },
    enumerable: false,
    configurable: true
  });

  MDCShortTopAppBarFoundation.prototype.init = function () {
    _super.prototype.init.call(this);

    if (this.adapter.getTotalActionItems() > 0) {
      this.adapter.addClass(_constants.cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
    } // If initialized with SHORT_COLLAPSED_CLASS, the bar should always be collapsed


    this.setAlwaysCollapsed(this.adapter.hasClass(_constants.cssClasses.SHORT_COLLAPSED_CLASS));
  };
  /**
   * Set if the short top app bar should always be collapsed.
   *
   * @param value When `true`, bar will always be collapsed. When `false`, bar may collapse or expand based on scroll.
   */


  MDCShortTopAppBarFoundation.prototype.setAlwaysCollapsed = function (value) {
    this.isAlwaysCollapsed = !!value;

    if (this.isAlwaysCollapsed) {
      this.collapse();
    } else {
      // let maybeCollapseBar determine if the bar should be collapsed
      this.maybeCollapseBar();
    }
  };

  MDCShortTopAppBarFoundation.prototype.getAlwaysCollapsed = function () {
    return this.isAlwaysCollapsed;
  };
  /**
   * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
   */


  MDCShortTopAppBarFoundation.prototype.handleTargetScroll = function () {
    this.maybeCollapseBar();
  };

  MDCShortTopAppBarFoundation.prototype.maybeCollapseBar = function () {
    if (this.isAlwaysCollapsed) {
      return;
    }

    var currentScroll = this.adapter.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.collapsed) {
        this.uncollapse();
      }
    } else {
      if (!this.collapsed) {
        this.collapse();
      }
    }
  };

  MDCShortTopAppBarFoundation.prototype.uncollapse = function () {
    this.adapter.removeClass(_constants.cssClasses.SHORT_COLLAPSED_CLASS);
    this.collapsed = false;
  };

  MDCShortTopAppBarFoundation.prototype.collapse = function () {
    this.adapter.addClass(_constants.cssClasses.SHORT_COLLAPSED_CLASS);
    this.collapsed = true;
  };

  return MDCShortTopAppBarFoundation;
}(_foundation.MDCTopAppBarBaseFoundation);

exports.MDCShortTopAppBarFoundation = MDCShortTopAppBarFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCShortTopAppBarFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","../constants":"../node_modules/@material/top-app-bar/constants.js","../foundation":"../node_modules/@material/top-app-bar/foundation.js"}],"../node_modules/@material/top-app-bar/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTopAppBar = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _component2 = require("@material/ripple/component");

var _constants = require("./constants");

var _foundation = require("./fixed/foundation");

var _foundation2 = require("./short/foundation");

var _foundation3 = require("./standard/foundation");

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBar =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCTopAppBar, _super);

  function MDCTopAppBar() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTopAppBar.attachTo = function (root) {
    return new MDCTopAppBar(root);
  };

  MDCTopAppBar.prototype.initialize = function (rippleFactory) {
    if (rippleFactory === void 0) {
      rippleFactory = function (el) {
        return _component2.MDCRipple.attachTo(el);
      };
    }

    this.navIcon = this.root.querySelector(_constants.strings.NAVIGATION_ICON_SELECTOR); // Get all icons in the toolbar and instantiate the ripples

    var icons = [].slice.call(this.root.querySelectorAll(_constants.strings.ACTION_ITEM_SELECTOR));

    if (this.navIcon) {
      icons.push(this.navIcon);
    }

    this.iconRipples = icons.map(function (icon) {
      var ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
    this.scrollTarget = window;
  };

  MDCTopAppBar.prototype.initialSyncWithDOM = function () {
    this.handleNavigationClick = this.foundation.handleNavigationClick.bind(this.foundation);
    this.handleWindowResize = this.foundation.handleWindowResize.bind(this.foundation);
    this.handleTargetScroll = this.foundation.handleTargetScroll.bind(this.foundation);
    this.scrollTarget.addEventListener('scroll', this.handleTargetScroll);

    if (this.navIcon) {
      this.navIcon.addEventListener('click', this.handleNavigationClick);
    }

    var isFixed = this.root.classList.contains(_constants.cssClasses.FIXED_CLASS);
    var isShort = this.root.classList.contains(_constants.cssClasses.SHORT_CLASS);

    if (!isShort && !isFixed) {
      window.addEventListener('resize', this.handleWindowResize);
    }
  };

  MDCTopAppBar.prototype.destroy = function () {
    var e_1, _a;

    try {
      for (var _b = (0, _tslib.__values)(this.iconRipples), _c = _b.next(); !_c.done; _c = _b.next()) {
        var iconRipple = _c.value;
        iconRipple.destroy();
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);

    if (this.navIcon) {
      this.navIcon.removeEventListener('click', this.handleNavigationClick);
    }

    var isFixed = this.root.classList.contains(_constants.cssClasses.FIXED_CLASS);
    var isShort = this.root.classList.contains(_constants.cssClasses.SHORT_CLASS);

    if (!isShort && !isFixed) {
      window.removeEventListener('resize', this.handleWindowResize);
    }

    _super.prototype.destroy.call(this);
  };

  MDCTopAppBar.prototype.setScrollTarget = function (target) {
    // Remove scroll handler from the previous scroll target
    this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    this.scrollTarget = target; // Initialize scroll handler on the new scroll target

    this.handleTargetScroll = this.foundation.handleTargetScroll.bind(this.foundation);
    this.scrollTarget.addEventListener('scroll', this.handleTargetScroll);
  };

  MDCTopAppBar.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root.classList.remove(className);
      },
      setStyle: function (property, value) {
        return _this.root.style.setProperty(property, value);
      },
      getTopAppBarHeight: function () {
        return _this.root.clientHeight;
      },
      notifyNavigationIconClicked: function () {
        return _this.emit(_constants.strings.NAVIGATION_EVENT, {});
      },
      getViewportScrollY: function () {
        var win = _this.scrollTarget;
        var el = _this.scrollTarget;
        return win.pageYOffset !== undefined ? win.pageYOffset : el.scrollTop;
      },
      getTotalActionItems: function () {
        return _this.root.querySelectorAll(_constants.strings.ACTION_ITEM_SELECTOR).length;
      }
    }; // tslint:enable:object-literal-sort-keys

    var foundation;

    if (this.root.classList.contains(_constants.cssClasses.SHORT_CLASS)) {
      foundation = new _foundation2.MDCShortTopAppBarFoundation(adapter);
    } else if (this.root.classList.contains(_constants.cssClasses.FIXED_CLASS)) {
      foundation = new _foundation.MDCFixedTopAppBarFoundation(adapter);
    } else {
      foundation = new _foundation3.MDCTopAppBarFoundation(adapter);
    }

    return foundation;
  };

  return MDCTopAppBar;
}(_component.MDCComponent);

exports.MDCTopAppBar = MDCTopAppBar;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/ripple/component":"../node_modules/@material/ripple/component.js","./constants":"../node_modules/@material/top-app-bar/constants.js","./fixed/foundation":"../node_modules/@material/top-app-bar/fixed/foundation.js","./short/foundation":"../node_modules/@material/top-app-bar/short/foundation.js","./standard/foundation":"../node_modules/@material/top-app-bar/standard/foundation.js"}],"../node_modules/@material/top-app-bar/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adapter = require("./adapter");

Object.keys(_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _adapter[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _foundation2 = require("./fixed/foundation");

Object.keys(_foundation2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation2[key];
    }
  });
});

var _foundation3 = require("./short/foundation");

Object.keys(_foundation3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation3[key];
    }
  });
});

var _foundation4 = require("./standard/foundation");

Object.keys(_foundation4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation4[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation4[key];
    }
  });
});
},{"./adapter":"../node_modules/@material/top-app-bar/adapter.js","./component":"../node_modules/@material/top-app-bar/component.js","./constants":"../node_modules/@material/top-app-bar/constants.js","./foundation":"../node_modules/@material/top-app-bar/foundation.js","./fixed/foundation":"../node_modules/@material/top-app-bar/fixed/foundation.js","./short/foundation":"../node_modules/@material/top-app-bar/short/foundation.js","./standard/foundation":"../node_modules/@material/top-app-bar/standard/foundation.js"}],"../node_modules/@material/ripple/adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/ripple/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/ripple/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  util: true
};
exports.util = void 0;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var _adapter = require("./adapter");

Object.keys(_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _adapter[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./util":"../node_modules/@material/ripple/util.js","./adapter":"../node_modules/@material/ripple/adapter.js","./component":"../node_modules/@material/ripple/component.js","./constants":"../node_modules/@material/ripple/constants.js","./foundation":"../node_modules/@material/ripple/foundation.js","./types":"../node_modules/@material/ripple/types.js"}],"../node_modules/@material/data-table/adapter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/@material/animation/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrectPropertyName = getCorrectPropertyName;
exports.getCorrectEventName = getCorrectEventName;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssPropertyNameMap = {
  animation: {
    prefixed: '-webkit-animation',
    standard: 'animation'
  },
  transform: {
    prefixed: '-webkit-transform',
    standard: 'transform'
  },
  transition: {
    prefixed: '-webkit-transition',
    standard: 'transition'
  }
};
var jsEventTypeMap = {
  animationend: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationEnd',
    standard: 'animationend'
  },
  animationiteration: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationIteration',
    standard: 'animationiteration'
  },
  animationstart: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationStart',
    standard: 'animationstart'
  },
  transitionend: {
    cssProperty: 'transition',
    prefixed: 'webkitTransitionEnd',
    standard: 'transitionend'
  }
};

function isWindow(windowObj) {
  return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}

function getCorrectPropertyName(windowObj, cssProperty) {
  if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
    var el = windowObj.document.createElement('div');
    var _a = cssPropertyNameMap[cssProperty],
        standard = _a.standard,
        prefixed = _a.prefixed;
    var isStandard = (standard in el.style);
    return isStandard ? standard : prefixed;
  }

  return cssProperty;
}

function getCorrectEventName(windowObj, eventType) {
  if (isWindow(windowObj) && eventType in jsEventTypeMap) {
    var el = windowObj.document.createElement('div');
    var _a = jsEventTypeMap[eventType],
        standard = _a.standard,
        prefixed = _a.prefixed,
        cssProperty = _a.cssProperty;
    var isStandard = (cssProperty in el.style);
    return isStandard ? standard : prefixed;
  }

  return eventType;
}
},{}],"../node_modules/@material/checkbox/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbers = exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  BACKGROUND: 'mdc-checkbox__background',
  CHECKED: 'mdc-checkbox--checked',
  CHECKMARK: 'mdc-checkbox__checkmark',
  CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
  DISABLED: 'mdc-checkbox--disabled',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  MIXEDMARK: 'mdc-checkbox__mixedmark',
  NATIVE_CONTROL: 'mdc-checkbox__native-control',
  ROOT: 'mdc-checkbox',
  SELECTED: 'mdc-checkbox--selected',
  UPGRADED: 'mdc-checkbox--upgraded'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
  DATA_INDETERMINATE_ATTR: 'data-indeterminate',
  NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_UNCHECKED: 'unchecked'
};
exports.strings = strings;
var numbers = {
  ANIM_END_LATCH_MS: 250
};
exports.numbers = numbers;
},{}],"../node_modules/@material/checkbox/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCCheckboxFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCCheckboxFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCCheckboxFoundation, _super);

  function MDCCheckboxFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCCheckboxFoundation.defaultAdapter), adapter)) || this;

    _this.currentCheckState = _constants.strings.TRANSITION_STATE_INIT;
    _this.currentAnimationClass = '';
    _this.animEndLatchTimer = 0;
    _this.enableAnimationEndHandler = false;
    return _this;
  }

  Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        forceLayout: function () {
          return undefined;
        },
        hasNativeControl: function () {
          return false;
        },
        isAttachedToDOM: function () {
          return false;
        },
        isChecked: function () {
          return false;
        },
        isIndeterminate: function () {
          return false;
        },
        removeClass: function () {
          return undefined;
        },
        removeNativeControlAttr: function () {
          return undefined;
        },
        setNativeControlAttr: function () {
          return undefined;
        },
        setNativeControlDisabled: function () {
          return undefined;
        }
      };
    },
    enumerable: false,
    configurable: true
  });

  MDCCheckboxFoundation.prototype.init = function () {
    this.currentCheckState = this.determineCheckState();
    this.updateAriaChecked();
    this.adapter.addClass(_constants.cssClasses.UPGRADED);
  };

  MDCCheckboxFoundation.prototype.destroy = function () {
    clearTimeout(this.animEndLatchTimer);
  };

  MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
    this.adapter.setNativeControlDisabled(disabled);

    if (disabled) {
      this.adapter.addClass(_constants.cssClasses.DISABLED);
    } else {
      this.adapter.removeClass(_constants.cssClasses.DISABLED);
    }
  };
  /**
   * Handles the animationend event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
    var _this = this;

    if (!this.enableAnimationEndHandler) {
      return;
    }

    clearTimeout(this.animEndLatchTimer);
    this.animEndLatchTimer = setTimeout(function () {
      _this.adapter.removeClass(_this.currentAnimationClass);

      _this.enableAnimationEndHandler = false;
    }, _constants.numbers.ANIM_END_LATCH_MS);
  };
  /**
   * Handles the change event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleChange = function () {
    this.transitionCheckState();
  };

  MDCCheckboxFoundation.prototype.transitionCheckState = function () {
    if (!this.adapter.hasNativeControl()) {
      return;
    }

    var oldState = this.currentCheckState;
    var newState = this.determineCheckState();

    if (oldState === newState) {
      return;
    }

    this.updateAriaChecked();
    var TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;
    var SELECTED = _constants.cssClasses.SELECTED;

    if (newState === TRANSITION_STATE_UNCHECKED) {
      this.adapter.removeClass(SELECTED);
    } else {
      this.adapter.addClass(SELECTED);
    } // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.


    if (this.currentAnimationClass.length > 0) {
      clearTimeout(this.animEndLatchTimer);
      this.adapter.forceLayout();
      this.adapter.removeClass(this.currentAnimationClass);
    }

    this.currentAnimationClass = this.getTransitionAnimationClass(oldState, newState);
    this.currentCheckState = newState; // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.

    if (this.adapter.isAttachedToDOM() && this.currentAnimationClass.length > 0) {
      this.adapter.addClass(this.currentAnimationClass);
      this.enableAnimationEndHandler = true;
    }
  };

  MDCCheckboxFoundation.prototype.determineCheckState = function () {
    var TRANSITION_STATE_INDETERMINATE = _constants.strings.TRANSITION_STATE_INDETERMINATE,
        TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;

    if (this.adapter.isIndeterminate()) {
      return TRANSITION_STATE_INDETERMINATE;
    }

    return this.adapter.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  };

  MDCCheckboxFoundation.prototype.getTransitionAnimationClass = function (oldState, newState) {
    var TRANSITION_STATE_INIT = _constants.strings.TRANSITION_STATE_INIT,
        TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;
    var _a = MDCCheckboxFoundation.cssClasses,
        ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED,
        ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE,
        ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED,
        ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE,
        ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED,
        ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;

    switch (oldState) {
      case TRANSITION_STATE_INIT:
        if (newState === TRANSITION_STATE_UNCHECKED) {
          return '';
        }

        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;

      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;

      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;

      default:
        // TRANSITION_STATE_INDETERMINATE
        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  };

  MDCCheckboxFoundation.prototype.updateAriaChecked = function () {
    // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
    if (this.adapter.isIndeterminate()) {
      this.adapter.setNativeControlAttr(_constants.strings.ARIA_CHECKED_ATTR, _constants.strings.ARIA_CHECKED_INDETERMINATE_VALUE);
    } else {
      // The on/off state does not need to keep track of aria-checked, since
      // the screenreader uses the checked property on the checkbox element.
      this.adapter.removeNativeControlAttr(_constants.strings.ARIA_CHECKED_ATTR);
    }
  };

  return MDCCheckboxFoundation;
}(_foundation.MDCFoundation);

exports.MDCCheckboxFoundation = MDCCheckboxFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCCheckboxFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/checkbox/constants.js"}],"../node_modules/@material/checkbox/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCCheckbox = void 0;

var _tslib = require("tslib");

var _util = require("@material/animation/util");

var _component = require("@material/base/component");

var _events = require("@material/dom/events");

var _ponyfill = require("@material/dom/ponyfill");

var _component2 = require("@material/ripple/component");

var _foundation = require("@material/ripple/foundation");

var _constants = require("./constants");

var _foundation2 = require("./foundation");

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var CB_PROTO_PROPS = ['checked', 'indeterminate'];

var MDCCheckbox =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCCheckbox, _super);

  function MDCCheckbox() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.rippleSurface = _this.createRipple();
    return _this;
  }

  MDCCheckbox.attachTo = function (root) {
    return new MDCCheckbox(root);
  };

  Object.defineProperty(MDCCheckbox.prototype, "ripple", {
    get: function () {
      return this.rippleSurface;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "checked", {
    get: function () {
      return this.getNativeControl().checked;
    },
    set: function (checked) {
      this.getNativeControl().checked = checked;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "indeterminate", {
    get: function () {
      return this.getNativeControl().indeterminate;
    },
    set: function (indeterminate) {
      this.getNativeControl().indeterminate = indeterminate;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "disabled", {
    get: function () {
      return this.getNativeControl().disabled;
    },
    set: function (disabled) {
      this.foundation.setDisabled(disabled);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "value", {
    get: function () {
      return this.getNativeControl().value;
    },
    set: function (value) {
      this.getNativeControl().value = value;
    },
    enumerable: false,
    configurable: true
  });

  MDCCheckbox.prototype.initialize = function () {
    var DATA_INDETERMINATE_ATTR = _constants.strings.DATA_INDETERMINATE_ATTR;
    this.getNativeControl().indeterminate = this.getNativeControl().getAttribute(DATA_INDETERMINATE_ATTR) === 'true';
    this.getNativeControl().removeAttribute(DATA_INDETERMINATE_ATTR);
  };

  MDCCheckbox.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleChange = function () {
      _this.foundation.handleChange();
    };

    this.handleAnimationEnd = function () {
      _this.foundation.handleAnimationEnd();
    };

    this.getNativeControl().addEventListener('change', this.handleChange);
    this.listen((0, _util.getCorrectEventName)(window, 'animationend'), this.handleAnimationEnd);
    this.installPropertyChangeHooks();
  };

  MDCCheckbox.prototype.destroy = function () {
    this.rippleSurface.destroy();
    this.getNativeControl().removeEventListener('change', this.handleChange);
    this.unlisten((0, _util.getCorrectEventName)(window, 'animationend'), this.handleAnimationEnd);
    this.uninstallPropertyChangeHooks();

    _super.prototype.destroy.call(this);
  };

  MDCCheckbox.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClass: function (className) {
        return _this.root.classList.add(className);
      },
      forceLayout: function () {
        return _this.root.offsetWidth;
      },
      hasNativeControl: function () {
        return !!_this.getNativeControl();
      },
      isAttachedToDOM: function () {
        return Boolean(_this.root.parentNode);
      },
      isChecked: function () {
        return _this.checked;
      },
      isIndeterminate: function () {
        return _this.indeterminate;
      },
      removeClass: function (className) {
        _this.root.classList.remove(className);
      },
      removeNativeControlAttr: function (attr) {
        _this.getNativeControl().removeAttribute(attr);
      },
      setNativeControlAttr: function (attr, value) {
        _this.getNativeControl().setAttribute(attr, value);
      },
      setNativeControlDisabled: function (disabled) {
        _this.getNativeControl().disabled = disabled;
      }
    };
    return new _foundation2.MDCCheckboxFoundation(adapter);
  };

  MDCCheckbox.prototype.createRipple = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = (0, _tslib.__assign)((0, _tslib.__assign)({}, _component2.MDCRipple.createAdapter(this)), {
      deregisterInteractionHandler: function (evtType, handler) {
        _this.getNativeControl().removeEventListener(evtType, handler, (0, _events.applyPassive)());
      },
      isSurfaceActive: function () {
        return (0, _ponyfill.matches)(_this.getNativeControl(), ':active');
      },
      isUnbounded: function () {
        return true;
      },
      registerInteractionHandler: function (evtType, handler) {
        _this.getNativeControl().addEventListener(evtType, handler, (0, _events.applyPassive)());
      }
    });
    return new _component2.MDCRipple(this.root, new _foundation.MDCRippleFoundation(adapter));
  };

  MDCCheckbox.prototype.installPropertyChangeHooks = function () {
    var e_1, _a;

    var _this = this;

    var nativeCb = this.getNativeControl();
    var cbProto = Object.getPrototypeOf(nativeCb);

    var _loop_1 = function (controlState) {
      var desc = Object.getOwnPropertyDescriptor(cbProto, controlState); // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739

      if (!validDescriptor(desc)) {
        return {
          value: void 0
        };
      } // Type cast is needed for compatibility with Closure Compiler.


      var nativeGetter = desc.get;
      var nativeCbDesc = {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        get: nativeGetter,
        set: function (state) {
          desc.set.call(nativeCb, state);

          _this.foundation.handleChange();
        }
      };
      Object.defineProperty(nativeCb, controlState, nativeCbDesc);
    };

    try {
      for (var CB_PROTO_PROPS_1 = (0, _tslib.__values)(CB_PROTO_PROPS), CB_PROTO_PROPS_1_1 = CB_PROTO_PROPS_1.next(); !CB_PROTO_PROPS_1_1.done; CB_PROTO_PROPS_1_1 = CB_PROTO_PROPS_1.next()) {
        var controlState = CB_PROTO_PROPS_1_1.value;

        var state_1 = _loop_1(controlState);

        if (typeof state_1 === "object") return state_1.value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (CB_PROTO_PROPS_1_1 && !CB_PROTO_PROPS_1_1.done && (_a = CB_PROTO_PROPS_1.return)) _a.call(CB_PROTO_PROPS_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  MDCCheckbox.prototype.uninstallPropertyChangeHooks = function () {
    var e_2, _a;

    var nativeCb = this.getNativeControl();
    var cbProto = Object.getPrototypeOf(nativeCb);

    try {
      for (var CB_PROTO_PROPS_2 = (0, _tslib.__values)(CB_PROTO_PROPS), CB_PROTO_PROPS_2_1 = CB_PROTO_PROPS_2.next(); !CB_PROTO_PROPS_2_1.done; CB_PROTO_PROPS_2_1 = CB_PROTO_PROPS_2.next()) {
        var controlState = CB_PROTO_PROPS_2_1.value;
        var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);

        if (!validDescriptor(desc)) {
          return;
        }

        Object.defineProperty(nativeCb, controlState, desc);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (CB_PROTO_PROPS_2_1 && !CB_PROTO_PROPS_2_1.done && (_a = CB_PROTO_PROPS_2.return)) _a.call(CB_PROTO_PROPS_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  MDCCheckbox.prototype.getNativeControl = function () {
    var NATIVE_CONTROL_SELECTOR = _constants.strings.NATIVE_CONTROL_SELECTOR;
    var el = this.root.querySelector(NATIVE_CONTROL_SELECTOR);

    if (!el) {
      throw new Error("Checkbox component requires a " + NATIVE_CONTROL_SELECTOR + " element");
    }

    return el;
  };

  return MDCCheckbox;
}(_component.MDCComponent);

exports.MDCCheckbox = MDCCheckbox;

function validDescriptor(inputPropDesc) {
  return !!inputPropDesc && typeof inputPropDesc.set === 'function';
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/animation/util":"../node_modules/@material/animation/util.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/events":"../node_modules/@material/dom/events.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","@material/ripple/component":"../node_modules/@material/ripple/component.js","@material/ripple/foundation":"../node_modules/@material/ripple/foundation.js","./constants":"../node_modules/@material/checkbox/constants.js","./foundation":"../node_modules/@material/checkbox/foundation.js"}],"../node_modules/@material/linear-progress/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationDimensionPercentages = exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  CLOSED_ANIMATION_OFF_CLASS: 'mdc-linear-progress--closed-animation-off',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed',
  ANIMATION_READY_CLASS: 'mdc-linear-progress--animation-ready'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUENOW: 'aria-valuenow',
  BUFFER_BAR_SELECTOR: '.mdc-linear-progress__buffer-bar',
  FLEX_BASIS: 'flex-basis',
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar'
}; // these are percentages pulled from keyframes.scss

exports.strings = strings;
var animationDimensionPercentages = {
  PRIMARY_HALF: .8367142,
  PRIMARY_FULL: 2.00611057,
  SECONDARY_QUARTER: .37651913,
  SECONDARY_HALF: .84386165,
  SECONDARY_FULL: 1.60277782
};
exports.animationDimensionPercentages = animationDimensionPercentages;
},{}],"../node_modules/@material/linear-progress/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCLinearProgressFoundation = void 0;

var _tslib = require("tslib");

var _util = require("@material/animation/util");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLinearProgressFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCLinearProgressFoundation, _super);

  function MDCLinearProgressFoundation(adapter) {
    var _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCLinearProgressFoundation.defaultAdapter), adapter)) || this;

    _this.observer = null;
    return _this;
  }

  Object.defineProperty(MDCLinearProgressFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgressFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgressFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        attachResizeObserver: function () {
          return null;
        },
        forceLayout: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        hasClass: function () {
          return false;
        },
        setBufferBarStyle: function () {
          return null;
        },
        setPrimaryBarStyle: function () {
          return null;
        },
        setStyle: function () {
          return undefined;
        },
        removeAttribute: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setAttribute: function () {
          return undefined;
        }
      };
    },
    enumerable: false,
    configurable: true
  });

  MDCLinearProgressFoundation.prototype.init = function () {
    var _this = this;

    this.determinate = !this.adapter.hasClass(_constants.cssClasses.INDETERMINATE_CLASS);
    this.adapter.addClass(_constants.cssClasses.ANIMATION_READY_CLASS);
    this.progress = 0;
    this.buffer = 1;
    this.observer = this.adapter.attachResizeObserver(function (entries) {
      var e_1, _a;

      if (_this.determinate) {
        return;
      }

      try {
        for (var entries_1 = (0, _tslib.__values)(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
          var entry = entries_1_1.value;

          if (entry.contentRect) {
            _this.calculateAndSetDimensions(entry.contentRect.width);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    });

    if (!this.determinate && this.observer) {
      this.calculateAndSetDimensions(this.adapter.getWidth());
    }
  };

  MDCLinearProgressFoundation.prototype.setDeterminate = function (isDeterminate) {
    this.determinate = isDeterminate;

    if (this.determinate) {
      this.adapter.removeClass(_constants.cssClasses.INDETERMINATE_CLASS);
      this.adapter.setAttribute(_constants.strings.ARIA_VALUENOW, this.progress.toString());
      this.adapter.setAttribute(_constants.strings.ARIA_VALUEMAX, '1');
      this.adapter.setAttribute(_constants.strings.ARIA_VALUEMIN, '0');
      this.setPrimaryBarProgress(this.progress);
      this.setBufferBarProgress(this.buffer);
      return;
    }

    if (this.observer) {
      this.calculateAndSetDimensions(this.adapter.getWidth());
    }

    this.adapter.addClass(_constants.cssClasses.INDETERMINATE_CLASS);
    this.adapter.removeAttribute(_constants.strings.ARIA_VALUENOW);
    this.adapter.removeAttribute(_constants.strings.ARIA_VALUEMAX);
    this.adapter.removeAttribute(_constants.strings.ARIA_VALUEMIN);
    this.setPrimaryBarProgress(1);
    this.setBufferBarProgress(1);
  };

  MDCLinearProgressFoundation.prototype.isDeterminate = function () {
    return this.determinate;
  };

  MDCLinearProgressFoundation.prototype.setProgress = function (value) {
    this.progress = value;

    if (this.determinate) {
      this.setPrimaryBarProgress(value);
      this.adapter.setAttribute(_constants.strings.ARIA_VALUENOW, value.toString());
    }
  };

  MDCLinearProgressFoundation.prototype.getProgress = function () {
    return this.progress;
  };

  MDCLinearProgressFoundation.prototype.setBuffer = function (value) {
    this.buffer = value;

    if (this.determinate) {
      this.setBufferBarProgress(value);
    }
  };

  MDCLinearProgressFoundation.prototype.getBuffer = function () {
    return this.buffer;
  };

  MDCLinearProgressFoundation.prototype.open = function () {
    this.adapter.removeClass(_constants.cssClasses.CLOSED_CLASS);
    this.adapter.removeClass(_constants.cssClasses.CLOSED_ANIMATION_OFF_CLASS);
    this.adapter.removeAttribute(_constants.strings.ARIA_HIDDEN);
  };

  MDCLinearProgressFoundation.prototype.close = function () {
    this.adapter.addClass(_constants.cssClasses.CLOSED_CLASS);
    this.adapter.setAttribute(_constants.strings.ARIA_HIDDEN, 'true');
  };

  MDCLinearProgressFoundation.prototype.isClosed = function () {
    return this.adapter.hasClass(_constants.cssClasses.CLOSED_CLASS);
  };
  /**
   * Handles the transitionend event emitted after `close()` is called and the
   * opacity fades out. This is so that animations are removed only after the
   * progress indicator is completely hidden.
   */


  MDCLinearProgressFoundation.prototype.handleTransitionEnd = function () {
    if (this.adapter.hasClass(_constants.cssClasses.CLOSED_CLASS)) {
      this.adapter.addClass(_constants.cssClasses.CLOSED_ANIMATION_OFF_CLASS);
    }
  };

  MDCLinearProgressFoundation.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    if (this.observer) {
      this.observer.disconnect();
    }
  };

  MDCLinearProgressFoundation.prototype.restartAnimation = function () {
    this.adapter.removeClass(_constants.cssClasses.ANIMATION_READY_CLASS);
    this.adapter.forceLayout();
    this.adapter.addClass(_constants.cssClasses.ANIMATION_READY_CLASS);
  };

  MDCLinearProgressFoundation.prototype.setPrimaryBarProgress = function (progressValue) {
    var value = "scaleX(" + progressValue + ")"; // Accessing `window` without a `typeof` check will throw on Node
    // environments.

    var transformProp = typeof window !== 'undefined' ? (0, _util.getCorrectPropertyName)(window, 'transform') : 'transform';
    this.adapter.setPrimaryBarStyle(transformProp, value);
  };

  MDCLinearProgressFoundation.prototype.setBufferBarProgress = function (progressValue) {
    var value = progressValue * 100 + "%";
    this.adapter.setBufferBarStyle(_constants.strings.FLEX_BASIS, value);
  };

  MDCLinearProgressFoundation.prototype.calculateAndSetDimensions = function (width) {
    var primaryHalf = width * _constants.animationDimensionPercentages.PRIMARY_HALF;
    var primaryFull = width * _constants.animationDimensionPercentages.PRIMARY_FULL;
    var secondaryQuarter = width * _constants.animationDimensionPercentages.SECONDARY_QUARTER;
    var secondaryHalf = width * _constants.animationDimensionPercentages.SECONDARY_HALF;
    var secondaryFull = width * _constants.animationDimensionPercentages.SECONDARY_FULL;
    this.adapter.setStyle('--mdc-linear-progress-primary-half', primaryHalf + "px");
    this.adapter.setStyle('--mdc-linear-progress-primary-half-neg', -primaryHalf + "px");
    this.adapter.setStyle('--mdc-linear-progress-primary-full', primaryFull + "px");
    this.adapter.setStyle('--mdc-linear-progress-primary-full-neg', -primaryFull + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-quarter', secondaryQuarter + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-quarter-neg', -secondaryQuarter + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-half', secondaryHalf + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-half-neg', -secondaryHalf + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-full', secondaryFull + "px");
    this.adapter.setStyle('--mdc-linear-progress-secondary-full-neg', -secondaryFull + "px"); // need to restart animation for custom props to apply to keyframes

    this.restartAnimation();
  };

  return MDCLinearProgressFoundation;
}(_foundation.MDCFoundation);

exports.MDCLinearProgressFoundation = MDCLinearProgressFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCLinearProgressFoundation;
exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/animation/util":"../node_modules/@material/animation/util.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/linear-progress/constants.js"}],"../node_modules/@material/linear-progress/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCLinearProgress = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLinearProgress =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCLinearProgress, _super);

  function MDCLinearProgress() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCLinearProgress.attachTo = function (root) {
    return new MDCLinearProgress(root);
  };

  Object.defineProperty(MDCLinearProgress.prototype, "determinate", {
    set: function (value) {
      this.foundation.setDeterminate(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgress.prototype, "progress", {
    set: function (value) {
      this.foundation.setProgress(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgress.prototype, "buffer", {
    set: function (value) {
      this.foundation.setBuffer(value);
    },
    enumerable: false,
    configurable: true
  });

  MDCLinearProgress.prototype.open = function () {
    this.foundation.open();
  };

  MDCLinearProgress.prototype.close = function () {
    this.foundation.close();
  };

  MDCLinearProgress.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.root.addEventListener('transitionend', function () {
      _this.foundation.handleTransitionEnd();
    });
  };

  MDCLinearProgress.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take
    // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
    // methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClass: function (className) {
        _this.root.classList.add(className);
      },
      forceLayout: function () {
        _this.root.getBoundingClientRect();
      },
      setBufferBarStyle: function (styleProperty, value) {
        var bufferBar = _this.root.querySelector(_foundation.MDCLinearProgressFoundation.strings.BUFFER_BAR_SELECTOR);

        if (bufferBar) {
          bufferBar.style.setProperty(styleProperty, value);
        }
      },
      setPrimaryBarStyle: function (styleProperty, value) {
        var primaryBar = _this.root.querySelector(_foundation.MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);

        if (primaryBar) {
          primaryBar.style.setProperty(styleProperty, value);
        }
      },
      hasClass: function (className) {
        return _this.root.classList.contains(className);
      },
      removeAttribute: function (attributeName) {
        _this.root.removeAttribute(attributeName);
      },
      removeClass: function (className) {
        _this.root.classList.remove(className);
      },
      setAttribute: function (attributeName, value) {
        _this.root.setAttribute(attributeName, value);
      },
      setStyle: function (name, value) {
        _this.root.style.setProperty(name, value);
      },
      attachResizeObserver: function (callback) {
        var RO = window.ResizeObserver;

        if (RO) {
          var ro = new RO(callback);
          ro.observe(_this.root);
          return ro;
        }

        return null;
      },
      getWidth: function () {
        return _this.root.offsetWidth;
      }
    };
    return new _foundation.MDCLinearProgressFoundation(adapter);
  };

  return MDCLinearProgress;
}(_component.MDCComponent);

exports.MDCLinearProgress = MDCLinearProgress;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/linear-progress/foundation.js"}],"../node_modules/@material/data-table/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.SortValue = exports.strings = exports.messages = exports.selectors = exports.dataAttributes = exports.attributes = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * CSS class names used in component.
 */
var cssClasses = {
  CELL: 'mdc-data-table__cell',
  CELL_NUMERIC: 'mdc-data-table__cell--numeric',
  CONTENT: 'mdc-data-table__content',
  HEADER_CELL: 'mdc-data-table__header-cell',
  HEADER_CELL_LABEL: 'mdc-data-table__header-cell-label',
  HEADER_CELL_SORTED: 'mdc-data-table__header-cell--sorted',
  HEADER_CELL_SORTED_DESCENDING: 'mdc-data-table__header-cell--sorted-descending',
  HEADER_CELL_WITH_SORT: 'mdc-data-table__header-cell--with-sort',
  HEADER_CELL_WRAPPER: 'mdc-data-table__header-cell-wrapper',
  HEADER_ROW: 'mdc-data-table__header-row',
  HEADER_ROW_CHECKBOX: 'mdc-data-table__header-row-checkbox',
  IN_PROGRESS: 'mdc-data-table--in-progress',
  LINEAR_PROGRESS: 'mdc-data-table__linear-progress',
  PAGINATION_ROWS_PER_PAGE_LABEL: 'mdc-data-table__pagination-rows-per-page-label',
  PAGINATION_ROWS_PER_PAGE_SELECT: 'mdc-data-table__pagination-rows-per-page-select',
  PROGRESS_INDICATOR: 'mdc-data-table__progress-indicator',
  ROOT: 'mdc-data-table',
  ROW: 'mdc-data-table__row',
  ROW_CHECKBOX: 'mdc-data-table__row-checkbox',
  ROW_SELECTED: 'mdc-data-table__row--selected',
  SORT_ICON_BUTTON: 'mdc-data-table__sort-icon-button',
  SORT_STATUS_LABEL: 'mdc-data-table__sort-status-label',
  TABLE_CONTAINER: 'mdc-data-table__table-container'
};
/**
 * DOM attributes used in component.
 */

exports.cssClasses = cssClasses;
var attributes = {
  ARIA_SELECTED: 'aria-selected',
  ARIA_SORT: 'aria-sort'
};
/**
 * List of data attributes used in component.
 */

exports.attributes = attributes;
var dataAttributes = {
  COLUMN_ID: 'data-column-id',
  ROW_ID: 'data-row-id'
};
/**
 * CSS selectors used in component.
 */

exports.dataAttributes = dataAttributes;
var selectors = {
  CONTENT: "." + cssClasses.CONTENT,
  HEADER_CELL: "." + cssClasses.HEADER_CELL,
  HEADER_CELL_WITH_SORT: "." + cssClasses.HEADER_CELL_WITH_SORT,
  HEADER_ROW: "." + cssClasses.HEADER_ROW,
  HEADER_ROW_CHECKBOX: "." + cssClasses.HEADER_ROW_CHECKBOX,
  PROGRESS_INDICATOR: "." + cssClasses.PROGRESS_INDICATOR,
  ROW: "." + cssClasses.ROW,
  ROW_CHECKBOX: "." + cssClasses.ROW_CHECKBOX,
  ROW_SELECTED: "." + cssClasses.ROW_SELECTED,
  SORT_ICON_BUTTON: "." + cssClasses.SORT_ICON_BUTTON,
  SORT_STATUS_LABEL: "." + cssClasses.SORT_STATUS_LABEL
};
/**
 * Messages used in component.
 */

exports.selectors = selectors;
var messages = {
  SORTED_IN_DESCENDING: 'Sorted in descending order',
  SORTED_IN_ASCENDING: 'Sorted in ascending order'
};
/**
 * Attributes and selectors used in component.
 * @deprecated Use `attributes`, `dataAttributes` and `selectors` instead.
 */

exports.messages = messages;
var strings = {
  ARIA_SELECTED: attributes.ARIA_SELECTED,
  ARIA_SORT: attributes.ARIA_SORT,
  DATA_ROW_ID_ATTR: dataAttributes.ROW_ID,
  HEADER_ROW_CHECKBOX_SELECTOR: selectors.HEADER_ROW_CHECKBOX,
  ROW_CHECKBOX_SELECTOR: selectors.ROW_CHECKBOX,
  ROW_SELECTED_SELECTOR: selectors.ROW_SELECTED,
  ROW_SELECTOR: selectors.ROW
};
/**
 * Sort values defined by ARIA.
 * See https://www.w3.org/WAI/PF/aria/states_and_properties#aria-sort
 */

exports.strings = strings;
var SortValue;
exports.SortValue = SortValue;

(function (SortValue) {
  // Items are sorted in ascending order by this column.
  SortValue["ASCENDING"] = "ascending"; // Items are sorted in descending order by this column.

  SortValue["DESCENDING"] = "descending"; // There is no defined sort applied to the column.

  SortValue["NONE"] = "none"; // A sort algorithm other than ascending or descending has been applied.

  SortValue["OTHER"] = "other";
})(SortValue || (exports.SortValue = SortValue = {}));
/**
 * Event names used in component.
 */


var events = {
  ROW_CLICK: 'MDCDataTable:rowClick',
  ROW_SELECTION_CHANGED: 'MDCDataTable:rowSelectionChanged',
  SELECTED_ALL: 'MDCDataTable:selectedAll',
  SORTED: 'MDCDataTable:sorted',
  UNSELECTED_ALL: 'MDCDataTable:unselectedAll'
};
exports.events = events;
},{}],"../node_modules/@material/data-table/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCDataTableFoundation = void 0;

var _tslib = require("tslib");

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * The Foundation of data table component containing pure business logic, any
 * logic requiring DOM manipulation are delegated to adapter methods.
 */
var MDCDataTableFoundation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDataTableFoundation, _super);

  function MDCDataTableFoundation(adapter) {
    return _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, MDCDataTableFoundation.defaultAdapter), adapter)) || this;
  }

  Object.defineProperty(MDCDataTableFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        addClassAtRowIndex: function () {
          return undefined;
        },
        getAttributeByHeaderCellIndex: function () {
          return '';
        },
        getHeaderCellCount: function () {
          return 0;
        },
        getHeaderCellElements: function () {
          return [];
        },
        getRowCount: function () {
          return 0;
        },
        getRowElements: function () {
          return [];
        },
        getRowIdAtIndex: function () {
          return '';
        },
        getRowIndexByChildElement: function () {
          return 0;
        },
        getSelectedRowCount: function () {
          return 0;
        },
        getTableContainerHeight: function () {
          return 0;
        },
        getTableHeaderHeight: function () {
          return 0;
        },
        isCheckboxAtRowIndexChecked: function () {
          return false;
        },
        isHeaderRowCheckboxChecked: function () {
          return false;
        },
        isRowsSelectable: function () {
          return false;
        },
        notifyRowSelectionChanged: function () {
          return undefined;
        },
        notifySelectedAll: function () {
          return undefined;
        },
        notifySortAction: function () {
          return undefined;
        },
        notifyUnselectedAll: function () {
          return undefined;
        },
        notifyRowClick: function () {
          return undefined;
        },
        registerHeaderRowCheckbox: function () {
          return undefined;
        },
        registerRowCheckboxes: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        removeClassAtRowIndex: function () {
          return undefined;
        },
        removeClassNameByHeaderCellIndex: function () {
          return undefined;
        },
        setAttributeAtRowIndex: function () {
          return undefined;
        },
        setAttributeByHeaderCellIndex: function () {
          return undefined;
        },
        setClassNameByHeaderCellIndex: function () {
          return undefined;
        },
        setHeaderRowCheckboxChecked: function () {
          return undefined;
        },
        setHeaderRowCheckboxIndeterminate: function () {
          return undefined;
        },
        setProgressIndicatorStyles: function () {
          return undefined;
        },
        setRowCheckboxCheckedAtIndex: function () {
          return undefined;
        },
        setSortStatusLabelByHeaderCellIndex: function () {
          return undefined;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows
   * are added or removed from table. Use this if registering checkbox is
   * synchronous.
   */

  MDCDataTableFoundation.prototype.layout = function () {
    if (this.adapter.isRowsSelectable()) {
      this.adapter.registerHeaderRowCheckbox();
      this.adapter.registerRowCheckboxes();
      this.setHeaderRowCheckboxState();
    }
  };
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows
   * are added or removed from table. Use this if registering checkbox is
   * asynchronous.
   */


  MDCDataTableFoundation.prototype.layoutAsync = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.adapter.isRowsSelectable()) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , this.adapter.registerHeaderRowCheckbox()];

          case 1:
            _a.sent();

            return [4
            /*yield*/
            , this.adapter.registerRowCheckboxes()];

          case 2:
            _a.sent();

            this.setHeaderRowCheckboxState();
            _a.label = 3;

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * @return Returns array of row elements.
   */


  MDCDataTableFoundation.prototype.getRows = function () {
    return this.adapter.getRowElements();
  };
  /**
   * @return Array of header cell elements.
   */


  MDCDataTableFoundation.prototype.getHeaderCells = function () {
    return this.adapter.getHeaderCellElements();
  };
  /**
   * Sets selected row ids. Overwrites previously selected rows.
   * @param rowIds Array of row ids that needs to be selected.
   */


  MDCDataTableFoundation.prototype.setSelectedRowIds = function (rowIds) {
    for (var rowIndex = 0; rowIndex < this.adapter.getRowCount(); rowIndex++) {
      var rowId = this.adapter.getRowIdAtIndex(rowIndex);
      var isSelected = false;

      if (rowId && rowIds.indexOf(rowId) >= 0) {
        isSelected = true;
      }

      this.adapter.setRowCheckboxCheckedAtIndex(rowIndex, isSelected);
      this.selectRowAtIndex(rowIndex, isSelected);
    }

    this.setHeaderRowCheckboxState();
  };
  /**
   * @return Returns array of all row ids.
   */


  MDCDataTableFoundation.prototype.getRowIds = function () {
    var rowIds = [];

    for (var rowIndex = 0; rowIndex < this.adapter.getRowCount(); rowIndex++) {
      rowIds.push(this.adapter.getRowIdAtIndex(rowIndex));
    }

    return rowIds;
  };
  /**
   * @return Returns array of selected row ids.
   */


  MDCDataTableFoundation.prototype.getSelectedRowIds = function () {
    var selectedRowIds = [];

    for (var rowIndex = 0; rowIndex < this.adapter.getRowCount(); rowIndex++) {
      if (this.adapter.isCheckboxAtRowIndexChecked(rowIndex)) {
        selectedRowIds.push(this.adapter.getRowIdAtIndex(rowIndex));
      }
    }

    return selectedRowIds;
  };
  /**
   * Handles header row checkbox change event.
   */


  MDCDataTableFoundation.prototype.handleHeaderRowCheckboxChange = function () {
    var isHeaderChecked = this.adapter.isHeaderRowCheckboxChecked();

    for (var rowIndex = 0; rowIndex < this.adapter.getRowCount(); rowIndex++) {
      this.adapter.setRowCheckboxCheckedAtIndex(rowIndex, isHeaderChecked);
      this.selectRowAtIndex(rowIndex, isHeaderChecked);
    }

    if (isHeaderChecked) {
      this.adapter.notifySelectedAll();
    } else {
      this.adapter.notifyUnselectedAll();
    }
  };
  /**
   * Handles change event originated from row checkboxes.
   */


  MDCDataTableFoundation.prototype.handleRowCheckboxChange = function (event) {
    var rowIndex = this.adapter.getRowIndexByChildElement(event.target);

    if (rowIndex === -1) {
      return;
    }

    var selected = this.adapter.isCheckboxAtRowIndexChecked(rowIndex);
    this.selectRowAtIndex(rowIndex, selected);
    this.setHeaderRowCheckboxState();
    var rowId = this.adapter.getRowIdAtIndex(rowIndex);
    this.adapter.notifyRowSelectionChanged({
      rowId: rowId,
      rowIndex: rowIndex,
      selected: selected
    });
  };
  /**
   * Handles sort action on sortable header cell.
   */


  MDCDataTableFoundation.prototype.handleSortAction = function (eventData) {
    var columnId = eventData.columnId,
        columnIndex = eventData.columnIndex,
        headerCell = eventData.headerCell; // Reset sort attributes / classes on other header cells.

    for (var index = 0; index < this.adapter.getHeaderCellCount(); index++) {
      if (index === columnIndex) {
        continue;
      }

      this.adapter.removeClassNameByHeaderCellIndex(index, _constants.cssClasses.HEADER_CELL_SORTED);
      this.adapter.removeClassNameByHeaderCellIndex(index, _constants.cssClasses.HEADER_CELL_SORTED_DESCENDING);
      this.adapter.setAttributeByHeaderCellIndex(index, _constants.strings.ARIA_SORT, _constants.SortValue.NONE);
      this.adapter.setSortStatusLabelByHeaderCellIndex(index, _constants.SortValue.NONE);
    } // Set appropriate sort attributes / classes on target header cell.


    this.adapter.setClassNameByHeaderCellIndex(columnIndex, _constants.cssClasses.HEADER_CELL_SORTED);
    var currentSortValue = this.adapter.getAttributeByHeaderCellIndex(columnIndex, _constants.strings.ARIA_SORT);
    var sortValue = _constants.SortValue.NONE; // Set to descending if sorted on ascending order.

    if (currentSortValue === _constants.SortValue.ASCENDING) {
      this.adapter.setClassNameByHeaderCellIndex(columnIndex, _constants.cssClasses.HEADER_CELL_SORTED_DESCENDING);
      this.adapter.setAttributeByHeaderCellIndex(columnIndex, _constants.strings.ARIA_SORT, _constants.SortValue.DESCENDING);
      sortValue = _constants.SortValue.DESCENDING; // Set to ascending if sorted on descending order.
    } else if (currentSortValue === _constants.SortValue.DESCENDING) {
      this.adapter.removeClassNameByHeaderCellIndex(columnIndex, _constants.cssClasses.HEADER_CELL_SORTED_DESCENDING);
      this.adapter.setAttributeByHeaderCellIndex(columnIndex, _constants.strings.ARIA_SORT, _constants.SortValue.ASCENDING);
      sortValue = _constants.SortValue.ASCENDING;
    } else {
      // Set to ascending by default when not sorted.
      this.adapter.setAttributeByHeaderCellIndex(columnIndex, _constants.strings.ARIA_SORT, _constants.SortValue.ASCENDING);
      sortValue = _constants.SortValue.ASCENDING;
    }

    this.adapter.setSortStatusLabelByHeaderCellIndex(columnIndex, sortValue);
    this.adapter.notifySortAction({
      columnId: columnId,
      columnIndex: columnIndex,
      headerCell: headerCell,
      sortValue: sortValue
    });
  };
  /**
   * Handles data table row click event.
   */


  MDCDataTableFoundation.prototype.handleRowClick = function (_a) {
    var rowId = _a.rowId,
        row = _a.row;
    this.adapter.notifyRowClick({
      rowId: rowId,
      row: row
    });
  };
  /**
   * Shows progress indicator blocking only the table body content when in
   * loading state.
   */


  MDCDataTableFoundation.prototype.showProgress = function () {
    var tableHeaderHeight = this.adapter.getTableHeaderHeight(); // Calculate the height of table content (Not scroll content) excluding
    // header row height.

    var height = this.adapter.getTableContainerHeight() - tableHeaderHeight;
    var top = tableHeaderHeight;
    this.adapter.setProgressIndicatorStyles({
      height: height + "px",
      top: top + "px"
    });
    this.adapter.addClass(_constants.cssClasses.IN_PROGRESS);
  };
  /**
   * Hides progress indicator when data table is finished loading.
   */


  MDCDataTableFoundation.prototype.hideProgress = function () {
    this.adapter.removeClass(_constants.cssClasses.IN_PROGRESS);
  };
  /**
   * Updates header row checkbox state based on number of rows selected.
   */


  MDCDataTableFoundation.prototype.setHeaderRowCheckboxState = function () {
    if (this.adapter.getSelectedRowCount() === 0) {
      this.adapter.setHeaderRowCheckboxChecked(false);
      this.adapter.setHeaderRowCheckboxIndeterminate(false);
    } else if (this.adapter.getSelectedRowCount() === this.adapter.getRowCount()) {
      this.adapter.setHeaderRowCheckboxChecked(true);
      this.adapter.setHeaderRowCheckboxIndeterminate(false);
    } else {
      this.adapter.setHeaderRowCheckboxIndeterminate(true);
      this.adapter.setHeaderRowCheckboxChecked(false);
    }
  };
  /**
   * Sets the attributes of row element based on selection state.
   */


  MDCDataTableFoundation.prototype.selectRowAtIndex = function (rowIndex, selected) {
    if (selected) {
      this.adapter.addClassAtRowIndex(rowIndex, _constants.cssClasses.ROW_SELECTED);
      this.adapter.setAttributeAtRowIndex(rowIndex, _constants.strings.ARIA_SELECTED, 'true');
    } else {
      this.adapter.removeClassAtRowIndex(rowIndex, _constants.cssClasses.ROW_SELECTED);
      this.adapter.setAttributeAtRowIndex(rowIndex, _constants.strings.ARIA_SELECTED, 'false');
    }
  };

  return MDCDataTableFoundation;
}(_foundation.MDCFoundation);

exports.MDCDataTableFoundation = MDCDataTableFoundation;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/data-table/constants.js"}],"../node_modules/@material/data-table/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCDataTable = void 0;

var _tslib = require("tslib");

var _component = require("@material/base/component");

var _component2 = require("@material/checkbox/component");

var _ponyfill = require("@material/dom/ponyfill");

var _component3 = require("@material/linear-progress/component");

var _constants = require("./constants");

var _foundation = require("./foundation");

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Implementation of `MDCDataTableFoundation`
 */
var MDCDataTable =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MDCDataTable, _super);

  function MDCDataTable() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCDataTable.attachTo = function (root) {
    return new MDCDataTable(root);
  };

  MDCDataTable.prototype.initialize = function (checkboxFactory) {
    if (checkboxFactory === void 0) {
      checkboxFactory = function (el) {
        return new _component2.MDCCheckbox(el);
      };
    }

    this.checkboxFactory = checkboxFactory;
  };

  MDCDataTable.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.headerRow = this.root.querySelector("." + _constants.cssClasses.HEADER_ROW);

    this.handleHeaderRowCheckboxChange = function () {
      _this.foundation.handleHeaderRowCheckboxChange();
    };

    this.headerRow.addEventListener('change', this.handleHeaderRowCheckboxChange);

    this.headerRowClickListener = function (event) {
      _this.handleHeaderRowClick(event);
    };

    this.headerRow.addEventListener('click', this.headerRowClickListener);
    this.content = this.root.querySelector("." + _constants.cssClasses.CONTENT);

    this.handleContentClick = function (event) {
      var dataRowEl = (0, _ponyfill.closest)(event.target, _constants.selectors.ROW);
      if (!dataRowEl) return;

      _this.foundation.handleRowClick({
        rowId: _this.getRowIdByRowElement(dataRowEl),
        row: dataRowEl
      });
    };

    this.content.addEventListener('click', this.handleContentClick);

    this.handleRowCheckboxChange = function (event) {
      _this.foundation.handleRowCheckboxChange(event);
    };

    this.content.addEventListener('change', this.handleRowCheckboxChange);
    this.layout();
  };
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows
   * are added or removed from table.
   */


  MDCDataTable.prototype.layout = function () {
    this.foundation.layout();
  };
  /**
   * @return Returns array of header row cell elements.
   */


  MDCDataTable.prototype.getHeaderCells = function () {
    return [].slice.call(this.root.querySelectorAll(_constants.selectors.HEADER_CELL));
  };
  /**
   * @return Returns array of row elements.
   */


  MDCDataTable.prototype.getRows = function () {
    return this.foundation.getRows();
  };
  /**
   * @return Returns array of selected row ids.
   */


  MDCDataTable.prototype.getSelectedRowIds = function () {
    return this.foundation.getSelectedRowIds();
  };
  /**
   * Sets selected row ids. Overwrites previously selected rows.
   * @param rowIds Array of row ids that needs to be selected.
   */


  MDCDataTable.prototype.setSelectedRowIds = function (rowIds) {
    this.foundation.setSelectedRowIds(rowIds);
  };
  /**
   * Shows progress indicator when data table is in loading state.
   */


  MDCDataTable.prototype.showProgress = function () {
    this.getLinearProgress().open();
    this.foundation.showProgress();
  };
  /**
   * Hides progress indicator after data table is finished loading.
   */


  MDCDataTable.prototype.hideProgress = function () {
    this.foundation.hideProgress();
    this.getLinearProgress().close();
  };

  MDCDataTable.prototype.destroy = function () {
    var e_1, _a;

    if (this.handleHeaderRowCheckboxChange) {
      this.headerRow.removeEventListener('change', this.handleHeaderRowCheckboxChange);
    }

    if (this.headerRowClickListener) {
      this.headerRow.removeEventListener('click', this.headerRowClickListener);
    }

    if (this.handleRowCheckboxChange) {
      this.content.removeEventListener('change', this.handleRowCheckboxChange);
    }

    if (this.headerRowCheckbox) {
      this.headerRowCheckbox.destroy();
    }

    if (this.rowCheckboxList) {
      try {
        for (var _b = (0, _tslib.__values)(this.rowCheckboxList), _c = _b.next(); !_c.done; _c = _b.next()) {
          var checkbox = _c.value;
          checkbox.destroy();
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }

    if (this.handleContentClick) {
      this.content.removeEventListener('click', this.handleContentClick);
    }
  };

  MDCDataTable.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take
    // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
    // methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        _this.root.classList.add(className);
      },
      removeClass: function (className) {
        _this.root.classList.remove(className);
      },
      getHeaderCellElements: function () {
        return _this.getHeaderCells();
      },
      getHeaderCellCount: function () {
        return _this.getHeaderCells().length;
      },
      getAttributeByHeaderCellIndex: function (index, attribute) {
        return _this.getHeaderCells()[index].getAttribute(attribute);
      },
      setAttributeByHeaderCellIndex: function (index, attribute, value) {
        _this.getHeaderCells()[index].setAttribute(attribute, value);
      },
      setClassNameByHeaderCellIndex: function (index, className) {
        _this.getHeaderCells()[index].classList.add(className);
      },
      removeClassNameByHeaderCellIndex: function (index, className) {
        _this.getHeaderCells()[index].classList.remove(className);
      },
      notifySortAction: function (data) {
        _this.emit(_constants.events.SORTED, data,
        /** shouldBubble */
        true);
      },
      getTableContainerHeight: function () {
        var tableContainer = _this.root.querySelector("." + _constants.cssClasses.TABLE_CONTAINER);

        if (!tableContainer) {
          throw new Error('MDCDataTable: Table container element not found.');
        }

        return tableContainer.getBoundingClientRect().height;
      },
      getTableHeaderHeight: function () {
        var tableHeader = _this.root.querySelector(_constants.selectors.HEADER_ROW);

        if (!tableHeader) {
          throw new Error('MDCDataTable: Table header element not found.');
        }

        return tableHeader.getBoundingClientRect().height;
      },
      setProgressIndicatorStyles: function (styles) {
        var progressIndicator = _this.root.querySelector(_constants.selectors.PROGRESS_INDICATOR);

        if (!progressIndicator) {
          throw new Error('MDCDataTable: Progress indicator element not found.');
        }

        progressIndicator.style.setProperty('height', styles.height);
        progressIndicator.style.setProperty('top', styles.top);
      },
      addClassAtRowIndex: function (rowIndex, className) {
        _this.getRows()[rowIndex].classList.add(className);
      },
      getRowCount: function () {
        return _this.getRows().length;
      },
      getRowElements: function () {
        return [].slice.call(_this.root.querySelectorAll(_constants.selectors.ROW));
      },
      getRowIdAtIndex: function (rowIndex) {
        return _this.getRows()[rowIndex].getAttribute(_constants.dataAttributes.ROW_ID);
      },
      getRowIndexByChildElement: function (el) {
        return _this.getRows().indexOf((0, _ponyfill.closest)(el, _constants.selectors.ROW));
      },
      getSelectedRowCount: function () {
        return _this.root.querySelectorAll(_constants.selectors.ROW_SELECTED).length;
      },
      isCheckboxAtRowIndexChecked: function (rowIndex) {
        return _this.rowCheckboxList[rowIndex].checked;
      },
      isHeaderRowCheckboxChecked: function () {
        return _this.headerRowCheckbox.checked;
      },
      isRowsSelectable: function () {
        return !!_this.root.querySelector(_constants.selectors.ROW_CHECKBOX) || !!_this.root.querySelector(_constants.selectors.HEADER_ROW_CHECKBOX);
      },
      notifyRowSelectionChanged: function (data) {
        _this.emit(_constants.events.ROW_SELECTION_CHANGED, {
          row: _this.getRowByIndex(data.rowIndex),
          rowId: _this.getRowIdByIndex(data.rowIndex),
          rowIndex: data.rowIndex,
          selected: data.selected
        },
        /** shouldBubble */
        true);
      },
      notifySelectedAll: function () {
        _this.emit(_constants.events.SELECTED_ALL, {},
        /** shouldBubble */
        true);
      },
      notifyUnselectedAll: function () {
        _this.emit(_constants.events.UNSELECTED_ALL, {},
        /** shouldBubble */
        true);
      },
      notifyRowClick: function (data) {
        _this.emit(_constants.events.ROW_CLICK, data,
        /** shouldBubble */
        true);
      },
      registerHeaderRowCheckbox: function () {
        if (_this.headerRowCheckbox) {
          _this.headerRowCheckbox.destroy();
        }

        var checkboxEl = _this.root.querySelector(_constants.selectors.HEADER_ROW_CHECKBOX);

        _this.headerRowCheckbox = _this.checkboxFactory(checkboxEl);
      },
      registerRowCheckboxes: function () {
        if (_this.rowCheckboxList) {
          _this.rowCheckboxList.forEach(function (checkbox) {
            checkbox.destroy();
          });
        }

        _this.rowCheckboxList = [];

        _this.getRows().forEach(function (rowEl) {
          var checkbox = _this.checkboxFactory(rowEl.querySelector(_constants.selectors.ROW_CHECKBOX));

          _this.rowCheckboxList.push(checkbox);
        });
      },
      removeClassAtRowIndex: function (rowIndex, className) {
        _this.getRows()[rowIndex].classList.remove(className);
      },
      setAttributeAtRowIndex: function (rowIndex, attr, value) {
        _this.getRows()[rowIndex].setAttribute(attr, value);
      },
      setHeaderRowCheckboxChecked: function (checked) {
        _this.headerRowCheckbox.checked = checked;
      },
      setHeaderRowCheckboxIndeterminate: function (indeterminate) {
        _this.headerRowCheckbox.indeterminate = indeterminate;
      },
      setRowCheckboxCheckedAtIndex: function (rowIndex, checked) {
        _this.rowCheckboxList[rowIndex].checked = checked;
      },
      setSortStatusLabelByHeaderCellIndex: function (columnIndex, sortValue) {
        var headerCell = _this.getHeaderCells()[columnIndex];

        var sortStatusLabel = headerCell.querySelector(_constants.selectors.SORT_STATUS_LABEL);
        if (!sortStatusLabel) return;
        sortStatusLabel.textContent = _this.getSortStatusMessageBySortValue(sortValue);
      }
    };
    return new _foundation.MDCDataTableFoundation(adapter);
  };

  MDCDataTable.prototype.getRowByIndex = function (index) {
    return this.getRows()[index];
  };

  MDCDataTable.prototype.getRowIdByIndex = function (index) {
    return this.getRowByIndex(index).getAttribute(_constants.dataAttributes.ROW_ID);
  };

  MDCDataTable.prototype.handleHeaderRowClick = function (event) {
    var headerCell = (0, _ponyfill.closest)(event.target, _constants.selectors.HEADER_CELL_WITH_SORT);

    if (!headerCell) {
      return;
    }

    var columnId = headerCell.getAttribute(_constants.dataAttributes.COLUMN_ID);
    var columnIndex = this.getHeaderCells().indexOf(headerCell);

    if (columnIndex === -1) {
      return;
    }

    this.foundation.handleSortAction({
      columnId: columnId,
      columnIndex: columnIndex,
      headerCell: headerCell
    });
  };

  MDCDataTable.prototype.getSortStatusMessageBySortValue = function (sortValue) {
    switch (sortValue) {
      case _constants.SortValue.ASCENDING:
        return _constants.messages.SORTED_IN_ASCENDING;

      case _constants.SortValue.DESCENDING:
        return _constants.messages.SORTED_IN_DESCENDING;

      default:
        return '';
    }
  };

  MDCDataTable.prototype.getLinearProgressElement = function () {
    var el = this.root.querySelector("." + _constants.cssClasses.LINEAR_PROGRESS);

    if (!el) {
      throw new Error('MDCDataTable: linear progress element is not found.');
    }

    return el;
  };

  MDCDataTable.prototype.getLinearProgress = function () {
    if (!this.linearProgress) {
      var el = this.getLinearProgressElement();
      this.linearProgress = new _component3.MDCLinearProgress(el);
    }

    return this.linearProgress;
  };

  MDCDataTable.prototype.getRowIdByRowElement = function (rowElement) {
    return rowElement.getAttribute(_constants.dataAttributes.ROW_ID);
  };

  return MDCDataTable;
}(_component.MDCComponent);

exports.MDCDataTable = MDCDataTable;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/checkbox/component":"../node_modules/@material/checkbox/component.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","@material/linear-progress/component":"../node_modules/@material/linear-progress/component.js","./constants":"../node_modules/@material/data-table/constants.js","./foundation":"../node_modules/@material/data-table/foundation.js"}],"../node_modules/@material/data-table/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;
},{}],"../node_modules/@material/data-table/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adapter = require("./adapter");

Object.keys(_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _adapter[key];
    }
  });
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foundation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
},{"./adapter":"../node_modules/@material/data-table/adapter.js","./component":"../node_modules/@material/data-table/component.js","./foundation":"../node_modules/@material/data-table/foundation.js","./constants":"../node_modules/@material/data-table/constants.js","./types":"../node_modules/@material/data-table/types.js"}],"page.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Include custom styles.

require("./styles.scss");

var auto_init_1 = __importDefault(require("@material/auto-init"));

var drawer_1 = require("@material/drawer");

var list_1 = require("@material/list");

var top_app_bar_1 = require("@material/top-app-bar");

var ripple_1 = require("@material/ripple");

var data_table_1 = require("@material/data-table");

document.addEventListener('DOMContentLoaded', function () {
  // List
  var listElements = document.querySelectorAll('.mdc-deprecated-list');

  for (var i = 0; i < listElements.length; i += 1) {
    var list = list_1.MDCList.attachTo(listElements[i]);
    list.listen('MDCList:action', function (event) {
      if (event.type === 'MDCList:action') {
        var target = event.target;

        if (target.innerText === 'Other articles') {
          window.location.href = '/blog/toc.html';
        }
      }
    });
  } // Navigation Drawer


  var drawerElement = document.querySelector('.mdc-drawer');
  var drawer = null;

  if (drawerElement) {
    drawer = drawer_1.MDCDrawer.attachTo(drawerElement);
  } // Top App Bar & Drawer


  var topBar = document.querySelector('.mdc-top-app-bar');
  var main = document.querySelector('.main-content');

  if (topBar && main) {
    var appBar = top_app_bar_1.MDCTopAppBar.attachTo(topBar);
    appBar.listen('MDCTopAppBar:nav', function () {
      if (drawer) {
        drawer.open = !drawer.open;
      }
    });
  } // Tables


  var tableElements = document.querySelectorAll('.mdc-data-table');

  for (var i = 0; i < tableElements.length; i += 1) {
    var element = tableElements[i];
    data_table_1.MDCDataTable.attachTo(element);
  } // Ripple


  var elements = document.querySelectorAll('.mdc-button, .mdc-icon-button, .mdc-card__primary-action');

  for (var i = 0; i < elements.length; i += 1) {
    ripple_1.MDCRipple.attachTo(elements[i]);
  } // Auto-init other parts of the page


  (0, auto_init_1.default)(document);
});
},{"./styles.scss":"styles.scss","@material/auto-init":"../node_modules/@material/auto-init/index.js","@material/drawer":"../node_modules/@material/drawer/index.js","@material/list":"../node_modules/@material/list/index.js","@material/top-app-bar":"../node_modules/@material/top-app-bar/index.js","@material/ripple":"../node_modules/@material/ripple/index.js","@material/data-table":"../node_modules/@material/data-table/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57208" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","page.ts"], null)
//# sourceMappingURL=/page.js.map