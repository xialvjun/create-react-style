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
// minify is just a babel macro to minify the css template string. You can use or not use it.
// import `minify`, `mini`, `macro` or `whatever` from "../macro" as long as it is import default.
var ff7 = [
    { name: "tifa", attack: 965, hp: 2985 },
    { name: "cloud", attack: 893, hp: 3763 },
    { name: "alice", attack: 676, hp: 3125 }
];
var app = (React.createElement("div", null,
    React.createElement(index_1.Style.Provider, null, ff7.map(function (p) { return (React.createElement(index_1.Style.Consumer, { key: p.name, css: macro_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          display: flex;\n          align-items: center;\n          & > h4 {\n            margin: 0 10px;\n            flex: auto;\n          }\n          "], ["\n          display: flex;\n          align-items: center;\n          & > h4 {\n            margin: 0 10px;\n            flex: auto;\n          }\n          "]))) }, function (cn) { return (React.createElement("div", { className: cn },
        React.createElement("h2", null, p.name),
        React.createElement("h4", null, p.hp),
        React.createElement("p", null, p.attack))); })); }))));
var app_will_render_to = (React.createElement("div", null,
    React.createElement("style", { dangerouslySetInnerHTML: {
            __html: macro_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        .yuqw6123ba {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-align-items: center;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n        }\n        .yuqw6123ba > h4 {\n          margin: 0 10px;\n          -webkit-flex: auto;\n          -ms-flex: auto;\n          flex: auto;\n        }"], ["\n        .yuqw6123ba {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-align-items: center;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n        }\n        .yuqw6123ba > h4 {\n          margin: 0 10px;\n          -webkit-flex: auto;\n          -ms-flex: auto;\n          flex: auto;\n        }"])))
        } }),
    ff7.map(function (p) { return (React.createElement("div", { key: p.name, className: "yuqw6123ba" },
        React.createElement("h2", null, p.name),
        React.createElement("h4", null, p.hp),
        React.createElement("p", null, p.attack))); })));
// global style:
// global style method 1: it has no stylis features and deduplicate feature
var global_style_1 = (React.createElement("style", { dangerouslySetInnerHTML: {
        __html: macro_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      .abc {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n      }\n      .abc .def {\n        background: #999;\n      }\n      body {\n        height: 100vh;\n      }"], ["\n      .abc {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n      }\n      .abc .def {\n        background: #999;\n      }\n      body {\n        height: 100vh;\n      }"])))
    } }));
// global style method 2:
var global_style_2 = (React.createElement(index_1.Style.Consumer, { css: macro_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    :global(.abc) {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n      // this method has stylis feature\n      .def {\n        background: #999;\n      }\n    }\n    :global(body) {\n      height: 100vh;\n    }"], ["\n    :global(.abc) {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n      // this method has stylis feature\n      .def {\n        background: #999;\n      }\n    }\n    :global(body) {\n      height: 100vh;\n    }"]))) }, function (_) { return null; }));
// Server Side Rendering
var SSR_STYLIS_CACHE = {};
var in_server = (React.createElement(index_1.Style.Provider, { init_stylis_cache: SSR_STYLIS_CACHE }, "XXX"));
var SSR_STYLIS_CACHE_JSON = JSON.stringify(SSR_STYLIS_CACHE);
var html = "window.SSR_STYLIS_CACHE_JSON = '" + SSR_STYLIS_CACHE_JSON + "';";
var in_client = (React.createElement(index_1.Style.Provider, { init_stylis_cache: JSON.parse(SSR_STYLIS_CACHE_JSON) }, "XXX"));
// Other Platform
// You can offer custom render_style Component. In that Component, you can do side effect to change your platform StyleSheet
var other_platform = (React.createElement(index_1.Style.Provider, { render_style: function (__html) { return React.createElement("style", { dangerouslySetInnerHTML: { __html: __html } }); } }, "XXX"));
// it's not global, so you can split into two style Provider, even though I havn't see the usage.
var AnotherStyle = index_1.createStyle();
var AProvider = AnotherStyle.Provider, AConsumer = AnotherStyle.Consumer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
