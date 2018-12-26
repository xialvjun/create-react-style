"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
                var css = _a.css, style = _a.style, inlineCss = _a["inline-css"], className = _a.className, props = tslib_1.__rest(_a, ["css", "style", "inline-css", "className"]);
                return (React.createElement(Style.Consumer, { css: css || style || inlineCss || "" }, function (cn) { return React.createElement(Tag, tslib_1.__assign({}, props, { ref: ref, className: className ? className + " " + cn : cn })); }));
            });
            target[p] = ISC;
            return ISC;
        }
    });
}
exports.createInlineStyle = createInlineStyle;
