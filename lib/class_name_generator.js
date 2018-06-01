"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("@emotion/hash");
exports.hash_class_name_generator = hash_1.default;
exports.random_class_name_generator = function (css) {
    return Math.random()
        .toString(32)
        .slice(2);
};
