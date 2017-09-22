"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.warn = warn;
exports.log = log;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warn(msg) {
    // 模板字符串
    console.error(`[error]: ${(0, _stringify2.default)(msg)}`);
}

function log(msg) {
    console.log(`[log]: ${(0, _stringify2.default)(msg)}`);
}
//# sourceMappingURL=debug.js.map
