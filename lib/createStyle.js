"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var stylis = require("stylis");
var React = require("react");
var react_1 = require("react");
var Lazy = /** @class */ (function (_super) {
    tslib_1.__extends(Lazy, _super);
    function Lazy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lazy.prototype.render = function () {
        return this.props.children();
    };
    return Lazy;
}(react_1.Component));
exports.Lazy = Lazy;
function DefaultWebStyleComponent(_a) {
    var html = _a.html;
    return React.createElement("style", { dangerouslySetInnerHTML: { __html: html } });
}
exports.DefaultWebStyleComponent = DefaultWebStyleComponent;
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
exports.random_class_name = random_class_name;
var Style = /** @class */ (function (_super) {
    tslib_1.__extends(Style, _super);
    function Style() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { class_name: undefined };
        return _this;
    }
    Style.getDerivedStateFromProps = function (props) {
        return { class_name: props.provider.stylis(props.css).class_name };
    };
    Style.prototype.render = function () {
        return this.props.children(this.state.class_name);
    };
    return Style;
}(react_1.Component));
function createStyle() {
    var Context = react_1.createContext(null);
    var Provider = /** @class */ (function (_super) {
        tslib_1.__extends(Provider, _super);
        function Provider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.style_component = _this.props.style_component || DefaultWebStyleComponent;
            _this.now = Date.now();
            _this.stylis_cache = tslib_1.__assign({}, _this.props.init_stylis_cache);
            _this.stylis = function (css) {
                if (!_this.stylis_cache[css]) {
                    if (!_this.will_lazy_ref_update) {
                        _this.will_lazy_ref_update = true;
                        if (_this.lazy_ref.current) {
                            _this.lazy_ref.current.forceUpdate(function () { return (_this.will_lazy_ref_update = false); });
                        }
                    }
                    var class_name = random_class_name(_this.stylis_cache);
                    _this.stylis_cache[css] = { class_name: class_name, style_html: stylis("." + class_name, css) };
                    if (_this.should_prune(_this.stylis_cache)) {
                        _this.prune();
                    }
                }
                _this.stylis_cache[css].now = _this.now;
                return _this.stylis_cache[css];
            };
            _this.should_prune = _this.props.should_prune || (function (_) { return false; });
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
            _this.will_lazy_ref_update = false;
            _this.render_styles = function () {
                var StyleComponent = _this.style_component;
                return (React.createElement(react_1.Fragment, null, Object.keys(_this.stylis_cache).map(function (css) { return (React.createElement(StyleComponent, { key: _this.stylis_cache[css].class_name, html: _this.stylis_cache[css].style_html })); })));
            };
            return _this;
        }
        Provider.prototype.componentDidMount = function () {
            this.will_lazy_ref_update = false;
        };
        Provider.prototype.render = function () {
            return (React.createElement(Context.Provider, { value: tslib_1.__assign({}, this) },
                this.props.children,
                React.createElement(Lazy, { ref: this.lazy_ref }, this.render_styles)));
        };
        return Provider;
    }(react_1.Component));
    function Consumer(_a) {
        var css = _a.css, children = _a.children;
        return (React.createElement(Context.Consumer, null, function (provider) { return (React.createElement(Style, { css: css, provider: provider }, children)); }));
    }
    return { Provider: Provider, Consumer: Consumer, ContextConsumer: Context.Consumer };
}
exports.createStyle = createStyle;
