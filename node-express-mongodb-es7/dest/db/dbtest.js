'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.insert = insert;
exports.getByConditions = getByConditions;

var _dbmanager = require('./dbmanager');

var _debug = require('../util/debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = (0, _dbmanager.createDb)();
const User = (0, _dbmanager.createUserModule)(db);

function insert(userName, password) {
    return new _promise2.default(resolve => {
        const userObj = new User({ name: userName, password });

        userObj.save((err, res) => {
            if (err) {
                (0, _debug.warn)(`Inset Error:${err}`);
                // 如果reject了，会抛出错误，因此暂时先resolve
                resolve({
                    error: err
                });
            } else {
                (0, _debug.warn)(`Inset Success:${res}`);
                resolve({
                    res
                });
            }
        });
    });
}

function getByConditions(userName) {
    return new _promise2.default(resolve => {
        const wherestr = { name: userName };

        User.find(wherestr, (err, res) => {
            if (err) {
                (0, _debug.warn)(`Get Error:${err}`);
                // 如果reject了，会抛出错误，因此暂时先resolve
                resolve({
                    error: err
                });
            } else {
                (0, _debug.warn)(`Get Res:${res}`);
                resolve({
                    res
                });
            }
        });
    });
}
//# sourceMappingURL=dbtest.js.map
