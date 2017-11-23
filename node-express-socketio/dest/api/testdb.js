'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = testdbMixmin;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _debug = require('../util/debug');

var _dbtest = require('../db/dbtest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = _bodyParser2.default.urlencoded({
    extended: false
});

function testdbMixmin(app) {
    app.post('/savedata', urlencodedParser, (req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;

        (0, _debug.log)(`save:userName:${userName},password${password}`);
        if (!userName || !password) {
            res.end((0, _stringify2.default)({
                error: '参数格式错误'
            }));

            return;
        }
        (0, _asyncToGenerator3.default)(function* () {
            const data = yield (0, _dbtest.insert)(userName, password);

            (0, _debug.log)(data);

            res.end((0, _stringify2.default)(data));
        })();
    });

    app.get('/getdata', (req, res) => {
        const userName = req.query.userName;

        if (!userName) {
            res.end((0, _stringify2.default)({
                error: '参数格式错误'
            }));

            return;
        }
        (0, _asyncToGenerator3.default)(function* () {
            const data = yield (0, _dbtest.getByConditions)(userName);

            (0, _debug.log)(data);

            res.end((0, _stringify2.default)(data));
        })();
    });
}
//# sourceMappingURL=testdb.js.map
