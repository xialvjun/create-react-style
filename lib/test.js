"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("./index");
var class_name_generator_1 = require("./class_name_generator");
var stable_class_name_for_ssr = (React.createElement(index_1.Style.Provider, { class_name_generator: class_name_generator_1.hash_class_name_generator }));
var random_class_name = (React.createElement(index_1.Style.Provider, { class_name_generator: class_name_generator_1.random_class_name_generator }));
var app = (React.createElement(index_1.Style.Provider, null,
    React.createElement("div", null,
        React.createElement(index_1.Style.Consumer, { css: "\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        " }, function (className) { return (React.createElement("div", { className: className },
            React.createElement("div", { className: "abc" }, "abcabc"))); }),
        React.createElement(index_1.Style.Consumer, { css: "\n          display: flex;\n          background: yellow;\n          .abc {\n            color: blue;\n          }\n        " }, function (className) { return (React.createElement("div", { className: className },
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
