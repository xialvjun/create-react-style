"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function createInlineStyle(Style) {
    return new Proxy(Style, {
        get: function (target, p, receiver) {
            var Tag = p.toString();
            var ISC = target[p];
            if (ISC) {
                return ISC;
            }
            ISC = React.forwardRef(function (_a, ref) {
                var css = _a.css, style = _a.style, inlineCss = _a["inline-css"], className = _a.className, props = __rest(_a, ["css", "style", "inline-css", "className"]);
                return (React.createElement(Style.Consumer, { css: css || style || inlineCss || "" }, function (cn) { return React.createElement(Tag, __assign({}, props, { ref: ref, className: className ? className + " " + cn : cn })); }));
            });
            target[p] = ISC;
            return ISC;
        }
    });
}
exports.createInlineStyle = createInlineStyle;
