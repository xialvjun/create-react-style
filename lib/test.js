"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var index_1 = require("./index");
// babel-plugin-macros
var macro_1 = require("../macro");
// minify is just a babel macro to minify the css template string. You can use or not use it.
// import `minify`, `mini`, `macro` or `whatever` from "../macro" as long as it is import default.
var ff7 = [{ name: "tifa", attack: 965, hp: 2985 }, { name: "cloud", attack: 893, hp: 3763 }, { name: "alice", attack: 676, hp: 3125 }];
var app = (React.createElement("div", null,
    React.createElement(index_1.Style.Provider, null, ff7.map(function (p) { return (React.createElement(index_1.Style.Consumer, { key: p.name, css: macro_1.default(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n          display: flex;\n          align-items: center;\n          & > h4 {\n            margin: 0 10px;\n            flex: auto;\n          }\n          "], ["\n          display: flex;\n          align-items: center;\n          & > h4 {\n            margin: 0 10px;\n            flex: auto;\n          }\n          "]))) }, function (cn) { return (React.createElement("div", { className: cn },
        React.createElement("h2", null, p.name),
        React.createElement("h4", null, p.hp),
        React.createElement("p", null, p.attack))); })); }))));
var app_will_render_to = (React.createElement("div", null,
    React.createElement("style", { dangerouslySetInnerHTML: {
            __html: macro_1.default(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        .yuqw6123ba {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-align-items: center;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n        }\n        .yuqw6123ba > h4 {\n          margin: 0 10px;\n          -webkit-flex: auto;\n          -ms-flex: auto;\n          flex: auto;\n        }"], ["\n        .yuqw6123ba {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-align-items: center;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n        }\n        .yuqw6123ba > h4 {\n          margin: 0 10px;\n          -webkit-flex: auto;\n          -ms-flex: auto;\n          flex: auto;\n        }"])))
        } }),
    ff7.map(function (p) { return (React.createElement("div", { key: p.name, className: "yuqw6123ba" },
        React.createElement("h2", null, p.name),
        React.createElement("h4", null, p.hp),
        React.createElement("p", null, p.attack))); })));
// global style:
// global style method 1: it has no stylis features and deduplicate feature
var global_style_1 = (React.createElement("style", { dangerouslySetInnerHTML: {
        __html: macro_1.default(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      .abc {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n      }\n      .abc .def {\n        background: #999;\n      }\n      body {\n        height: 100vh;\n      }"], ["\n      .abc {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n      }\n      .abc .def {\n        background: #999;\n      }\n      body {\n        height: 100vh;\n      }"])))
    } }));
// global style method 2:
var global_style_2 = (React.createElement(index_1.Style.Consumer, { css: macro_1.default(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    :global(.abc) {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n      // this method has stylis feature\n      .def {\n        background: #999;\n      }\n    }\n    :global(body) {\n      height: 100vh;\n    }"], ["\n    :global(.abc) {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n      // this method has stylis feature\n      .def {\n        background: #999;\n      }\n    }\n    :global(body) {\n      height: 100vh;\n    }"]))) }, function (_) { return null; }));
// Server Side Rendering
var SSR_STYLIS_CACHE = {};
var in_server = React.createElement(index_1.Style.Provider, { init_stylis_cache: SSR_STYLIS_CACHE }, "XXX");
var SSR_STYLIS_CACHE_JSON = JSON.stringify(SSR_STYLIS_CACHE);
var html = "window.SSR_STYLIS_CACHE_JSON = '" + SSR_STYLIS_CACHE_JSON + "';";
var in_client = React.createElement(index_1.Style.Provider, { init_stylis_cache: JSON.parse(SSR_STYLIS_CACHE_JSON) }, "XXX");
// Other Platform
// You can offer custom style_component Component. In that Component, you can do side effect to change your platform StyleSheet
var style_component = function (_a) {
    var html = _a.html;
    return React.createElement("style", { dangerouslySetInnerHTML: { __html: html } });
};
var other_platform = React.createElement(index_1.Style.Provider, { style_component: style_component }, "XXX");
// it's not global, so you can split into two style Provider, even though I havn't see the usage.
var AnotherStyle = index_1.createStyle();
var AProvider = AnotherStyle.Provider, AConsumer = AnotherStyle.Consumer;
// inline style
var ISC = index_1.createInlineStyle(index_1.createStyle());
// both the 3 prop names are ok: css, style, inline-css. And the priority is as this.
var inline_style = (React.createElement(ISC.div, { "inline-css": "display:grid" },
    React.createElement(ISC.div, { "inline-css": "grid-column:1/2;grid-row:1/3" },
        React.createElement(ISC.div, { "inline-css": "display:grid" },
            React.createElement(ISC.div, { "inline-css": "grid-column:1/2;grid-row:1/3" }, "1"),
            React.createElement(ISC.div, { "inline-css": "grid-column:2/3;grid-row:1/2" }, "2"),
            React.createElement(ISC.span, { "inline-css": "grid-column:2/3;grid-row:2/3" }, "3"),
            React.createElement(ISC.p, { "inline-css": "grid-column:1/3;grid-row:2/3" }, "4"))),
    React.createElement(ISC.div, { "inline-css": "grid-column:2/3;grid-row:1/2" }, "5"),
    React.createElement(ISC.div, { "inline-css": "grid-column:2/3;grid-row:2/3" }, "6"),
    React.createElement(ISC.div, { "inline-css": "grid-column:1/3;grid-row:2/3" }, "7")));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
// 1. 所有的 style 统一放在 Provider 中渲染，render() 中有 <Lazy>{_ => render_style_cache()}</Lazy>
// 2. 并不是一个 style 不被使用了就立即把它删掉，而是可以仍然留着
// 3. Provider 有参数，是一个函数，来清理 style。。。函数接受两个参数，(style_cache, prune) 用户可以传一个 debounced 函数，
//    在内部判断 style_cache 是否太多，于是运行 prune。。。prune 会导致 Provider forceUpdate 一下，于是所有 Consumer 刷新，把 style_cache 内的时间更新。。。如果不是新时间的，就删除掉
// 4. 这种机制看似会导致新出现一个 style 的时候，会整个 Provider 都 update，导致整个 app update。。。但可以只是 1 中的 Lazy 去 update
//    其实本来 children 的计算不在 Provider.render 内，所以 Provider update 不会导致整个 app update。。。但是 Provider.value={{...this}} 这会导致所有的 Consumer 都刷新
// 5. 提供一个 ContextConsumer 直接接受 Provider。人们可以使用这个 ContextConsumer 去渲染 <script dangerouslySetInnerHTML={{__html:`${provider.stylis_cache}`}}/>...从而做 SSR，一次渲染，不需要做 stream 操作
