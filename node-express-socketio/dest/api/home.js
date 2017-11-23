'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = homeMixmin;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('../util/debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 定义一些get请求的API
 */
function resolvePath(p) {
    return _path2.default.resolve(__dirname, '../../', p);
}

const ROOT_PATH = resolvePath('./');

/**
 * 定义一些post api
 */

function homeMixmin(app) {
    app.get('/', (req, res) => {
        (0, _debug.log)('home');
        res.sendFile(`${ROOT_PATH}/pages/index.html`);
    });

    app.get('/test', (req, res) => {
        res.end((0, _stringify2.default)({
            hello: 'world!'
        }));
    });
}
//# sourceMappingURL=home.js.map
