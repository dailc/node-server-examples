'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = getMixmin;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dbtest = require('../db/dbtest');

var _dbtest2 = _interopRequireDefault(_dbtest);

var _debug = require('../util/debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 定义一些get请求的API
 */
function resolvePath(p) {
    return _path2.default.resolve(__dirname, '../../', p);
}

var ROOT_PATH = resolvePath('./');

function getMixmin(app) {
    app.get('/', function (req, res) {
        res.sendFile(ROOT_PATH + '/pages/index.html');
    });

    /**
     * 
     */
    app.post('/savedata', urlencodedParser, function (req, res) {
        var userName = req.body.userName;
        var password = req.body.password;

        if (!userName || !password) {
            res.end((0, _stringify2.default)({
                error: '参数格式错误'
            }));
        } else {
            _dbtest2.default.insert(userName, password, function (result) {
                res.end((0, _stringify2.default)(result));
            });
        }
    });

    app.post('/getdata', urlencodedParser, function (req, res) {
        var userName = req.body.userName;

        if (!userName) {
            res.end((0, _stringify2.default)({
                error: '参数格式错误'
            }));
        } else {
            _dbtest2.default.getByConditions(userName, function (result) {
                res.end((0, _stringify2.default)(result));
            });
        }
    });
}
//# sourceMappingURL=get.js.map
