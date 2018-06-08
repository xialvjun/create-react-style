"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("./index");
// babel-plugin-macros
var macro_1 = require("../macro");
var SSR_STYLIS_CACHE = {};
var for_ssr = React.createElement(index_1.Style.Provider, { init_stylis_cache: SSR_STYLIS_CACHE });
"(window as any).__SSR_STYLIS_CACHE = JSON.stringify(SSR_STYLIS_CACHE);";
// in client
React.createElement(index_1.Style.Provider, { init_stylis_cache: JSON.parse(window.__SSR_STYLIS_CACHE) });
var app = (React.createElement(index_1.Style.Provider, null,
    React.createElement("div", null,
        React.createElement("p", null, "global style 1: (it has no stylis prefix)"),
        React.createElement("style", { dangerouslySetInnerHTML: {
                __html: macro_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          .abc {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n          }\n          body {\n            height: 100vh;\n          }"], ["\n          .abc {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n          }\n          body {\n            height: 100vh;\n          }"])))
            } })),
    React.createElement("div", null,
        React.createElement("p", null, "global style 2:"),
        React.createElement(index_1.Style.Consumer, { css: macro_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        :global(.abc) {\n          margin: 0;\n          padding: 0;\n          box-sizing: border-box;\n        }\n        :global(body) {\n          height: 100vh;\n        }\n      "], ["\n        :global(.abc) {\n          margin: 0;\n          padding: 0;\n          box-sizing: border-box;\n        }\n        :global(body) {\n          height: 100vh;\n        }\n      "]))) }, function (_) { return null; })),
    React.createElement("div", null,
        React.createElement(index_1.Style.Consumer, { css: macro_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        "], ["\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        "]))) }, function (className) { return (React.createElement("div", { className: className },
            React.createElement("div", { className: "abc" }, "abcabc"))); }),
        React.createElement(index_1.Style.Consumer, { css: macro_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        "], ["\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        "]))) }, function (className) { return (React.createElement("div", { className: className },
            React.createElement("div", { className: "abc" }, "abcabc"))); }))));
app ===
    (React.createElement("div", null,
        React.createElement("style", { dangerouslySetInnerHTML: {
                __html: "\n    .yuqw6123ba {\n      display: flex;\n      background: yellow;\n    }\n    .yuqw6123ba .abc {\n      color: blue;\n    }"
            } }),
        React.createElement("div", { className: "yuqw6123ba" },
            React.createElement("div", { className: "abc" }, "abcabc")),
        React.createElement("div", { className: "yuqw6123ba" },
            React.createElement("div", { className: "abc" }, "abcabc"))));
var AnotherStyle = index_1.createStyle();
var AProvider = AnotherStyle.Provider, AConsumer = AnotherStyle.Consumer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
