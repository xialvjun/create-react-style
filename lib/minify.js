"use strict";
// minify function for use of macro.js
// @emotion/babel-utils
// https://github.com/emotion-js/next/blob/ddab7a7920c71e0fc0093ac21d91f796301cf8cd/packages/babel-utils/src/minify-utils.js
// @flow
// babel-plugin-styled-components
// https://github.com/styled-components/babel-plugin-styled-components/blob/8d44acc36f067d60d4e09f9c22ff89695bc332d2/src/minify/index.js
Object.defineProperty(exports, "__esModule", { value: true });
var multilineCommentRegex = /\/\*[^!](.|[\r\n])*?\*\//g;
var lineCommentStart = /\/\//g;
var symbolRegex = /(\s*[;:{},]\s*)/g;
// Counts occurences of substr inside str
var countOccurences = function (str, substr) { return str.split(substr).length - 1; };
// Joins substrings until predicate returns true
var reduceSubstr = function (substrs, join, predicate) {
    var length = substrs.length;
    var res = substrs[0];
    if (length === 1) {
        return res;
    }
    for (var i = 1; i < length; i++) {
        if (predicate(res)) {
            break;
        }
        res += join + substrs[i];
    }
    return res;
};
// Joins at comment starts when it's inside a string or parantheses
// effectively removing line comments
exports.stripLineComment = function (line) {
    return reduceSubstr(line.split(lineCommentStart), "//", function (str) {
        return !str.endsWith(":") && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
            countOccurences(str, "'") % 2 === 0 &&
            countOccurences(str, '"') % 2 === 0 &&
            countOccurences(str, "(") === countOccurences(str, ")");
    });
};
exports.compressSymbols = function (code) {
    return code.split(symbolRegex).reduce(function (str, fragment, index) {
        // Even-indices are non-symbol fragments
        if (index % 2 === 0) {
            return str + fragment;
        }
        // Only manipulate symbols outside of strings
        if (countOccurences(str, "'") % 2 === 0 && countOccurences(str, '"') % 2 === 0) {
            return str + fragment.trim();
        }
        return str + fragment;
    }, "");
};
// Detects lines that are exclusively line comments
var isLineComment = function (line) { return line.trim().startsWith("//"); };
var linebreakRegex = /[\r\n]\s*/g;
exports.minify = function (code) {
    var newCode = code
        .replace(multilineCommentRegex, "\n") // Remove multiline comments
        .split(linebreakRegex) // Split at newlines
        .filter(function (line) { return line.length > 0 && !isLineComment(line); }) // Removes lines containing only line comments
        .map(exports.stripLineComment) // Remove line comments inside text
        .join(" "); // Rejoin all lines
    return exports.compressSymbols(newCode);
};
