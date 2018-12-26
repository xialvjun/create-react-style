"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var createStyle_1 = require("./createStyle");
var createInlineStyle_1 = require("./createInlineStyle");
tslib_1.__exportStar(require("./createStyle"), exports);
tslib_1.__exportStar(require("./createInlineStyle"), exports);
exports.Style = createInlineStyle_1.createInlineStyle(createStyle_1.createStyle());
