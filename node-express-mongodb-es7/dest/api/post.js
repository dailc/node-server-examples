'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = postMixmin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../util/debug').log;
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * 定义一些post api
 */

function postMixmin(app) {
    app.post('/test', urlencodedParser, function (req, res) {
        log(req.body);
        res.end((0, _stringify2.default)({
            hello: 'world!'
        }));
    });
}
//# sourceMappingURL=post.js.map
