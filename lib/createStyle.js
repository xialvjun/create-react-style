"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stylis = require("stylis");
var React = require("react");
var react_1 = require("react");
function createStyle() {
    var Context = React.createContext(null);
    var StyleProvider = /** @class */ (function (_super) {
        __extends(StyleProvider, _super);
        function StyleProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.stylis_cache = _this.props.init_stylis_cache || {};
            _this.stylis = function (css) {
                if (!_this.stylis_cache[css]) {
                    var class_name = "s_" +
                        Math.random()
                            .toString(32)
                            .slice(2);
                    _this.stylis_cache[css] = {
                        class_name: class_name,
                        style_html: stylis("." + class_name, css)
                    };
                }
                return _this.stylis_cache[css];
            };
            _this.rendered_by = {};
            _this.set = function (key, value) {
                _this.rendered_by[key] = value;
            };
            _this.get = function (key) {
                return _this.rendered_by[key];
            };
            _this.del = function (key) {
                delete _this.rendered_by[key];
                _this.forceUpdate();
            };
            return _this;
        }
        StyleProvider.prototype.render = function () {
            var new_this = __assign({}, this);
            return (React.createElement(Context.Provider, { value: new_this }, this.props.children));
        };
        return StyleProvider;
    }(react_1.Component));
    var STYLE_INSTANCE_ID = 1;
    var Style = /** @class */ (function (_super) {
        __extends(Style, _super);
        function Style() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.instance_id = STYLE_INSTANCE_ID++;
            return _this;
        }
        Style.prototype.componentWillReceiveProps = function (nextProps) {
            var _a = this.props, css = _a.css, provider = _a.provider;
            if (css !== nextProps.css) {
                var instance_id = provider.get(css);
                if (instance_id === this.instance_id) {
                    provider.del(css);
                }
            }
        };
        Style.prototype.componentWillUnmount = function () {
            var _a = this.props, css = _a.css, provider = _a.provider;
            var instance_id = provider.get(css);
            if (instance_id === this.instance_id) {
                provider.del(css);
            }
        };
        Style.prototype.render = function () {
            var _a = this.props, css = _a.css, children = _a.children, provider = _a.provider;
            var _b = provider.stylis(css), class_name = _b.class_name, style_html = _b.style_html;
            var instance_id = provider.get(css);
            if (!instance_id) {
                provider.set(css, this.instance_id);
                instance_id = this.instance_id;
            }
            return (React.createElement(react_1.Fragment, null,
                instance_id === this.instance_id && (React.createElement("style", { dangerouslySetInnerHTML: { __html: style_html } })),
                children(class_name)));
        };
        return Style;
    }(react_1.Component));
    var StyleConsumer = function (props) { return (React.createElement(Context.Consumer, null, function (provider) { return React.createElement(Style, __assign({}, __assign({}, props, { provider: provider }))); })); };
    return {
        Provider: StyleProvider,
        Consumer: StyleConsumer
    };
}
exports.createStyle = createStyle;
