"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var stylis = require("stylis");
var React = require("react");
var react_1 = require("react");
var Lazy = /** @class */ (function (_super) {
    __extends(Lazy, _super);
    function Lazy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lazy.prototype.render = function () {
        return this.props.children();
    };
    return Lazy;
}(react_1.Component));
function DefaultWebStyleComponent(_a) {
    var html = _a.html;
    return React.createElement("style", { dangerouslySetInnerHTML: { __html: html } });
}
function random_class_name(obj) {
    var class_name = "s_" +
        Math.random()
            .toString(32)
            .slice(2);
    if (obj.hasOwnProperty(class_name)) {
        return random_class_name(obj);
    }
    return class_name;
}
function createStyle() {
    var Context = react_1.createContext(null);
    var Provider = /** @class */ (function (_super) {
        __extends(Provider, _super);
        function Provider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.style_component = _this.props.style_component || DefaultWebStyleComponent;
            _this.now = Date.now();
            _this.stylis_cache = __assign({}, _this.props.init_stylis_cache);
            _this.stylis = function (css) {
                if (!_this.stylis_cache[css]) {
                    _this.lazy_ref.current.forceUpdate();
                    var class_name = random_class_name(_this.stylis_cache);
                    _this.stylis_cache[css] = {
                        class_name: class_name,
                        style_html: stylis("." + class_name, css)
                    };
                    _this.prune_controller(_this.stylis_cache, _this.prune);
                }
                _this.stylis_cache[css].now = _this.now;
                return _this.stylis_cache[css];
            };
            _this.prune_controller = _this.props.prune_controller || (function (_) { return _; });
            _this.will_prune = false;
            _this.prune = function () {
                if (!_this.will_prune) {
                    _this.will_prune = true;
                    _this.now = Date.now();
                    _this.forceUpdate(function () {
                        _this.will_prune = false;
                        var to_remove_css = Object.keys(_this.stylis_cache).filter(function (css) { return _this.stylis_cache[css].now !== _this.now; });
                        if (to_remove_css.length > 0) {
                            to_remove_css.forEach(function (css) { return delete _this.stylis_cache[css]; });
                            _this.lazy_ref.current.forceUpdate();
                        }
                    });
                }
            };
            _this.lazy_ref = react_1.createRef();
            _this.render_styles = function () {
                var StyleComponent = _this.style_component;
                return (React.createElement(react_1.Fragment, null, Object.keys(_this.stylis_cache).map(function (css) { return (React.createElement(StyleComponent, { key: _this.stylis_cache[css].class_name, html: _this.stylis_cache[css].style_html })); })));
            };
            return _this;
        }
        Provider.prototype.render = function () {
            return (React.createElement(Context.Provider, { value: __assign({}, this) },
                this.props.children,
                React.createElement(Lazy, { ref: this.lazy_ref }, this.render_styles)));
        };
        return Provider;
    }(react_1.Component));
    function Consumer(_a) {
        var css = _a.css, children = _a.children;
        return React.createElement(Context.Consumer, null, function (provider) { return children(provider.stylis(css).class_name); });
    }
    return { Provider: Provider, Consumer: Consumer, ContextConsumer: Context.Consumer };
}
exports.createStyle = createStyle;
