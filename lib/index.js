"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var createStyle_1 = require("./createStyle");
var createInlineStyle_1 = require("./createInlineStyle");
__export(require("./createStyle"));
__export(require("./createInlineStyle"));
exports.Style = createInlineStyle_1.createInlineStyle(createStyle_1.createStyle());
