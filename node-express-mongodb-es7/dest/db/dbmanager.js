'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDb = createDb;
exports.closeDb = closeDb;
exports.createUserModule = createUserModule;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  模型
const Schema = _mongoose2.default.Schema;

function createDb() {
    // 连接数据库，没有的话会自动创建
    return _mongoose2.default.createConnection('mongodb://localhost/test');
}

function closeDb(db) {
    db.close();
}

function createUserModule(db) {
    //  定义了一个新的模型，但是此模式还未和users集合有关联
    const userScheMa = new Schema({
        name: String,
        password: String
    });

    userScheMa.index({
        // 1和-1分别表示升序索引和降序索引
        name: 1
    });

    userScheMa.path('name').index({
        // 设置唯一
        unique: true
    });

    // 与users集合关联，如果使用，会自动创建一个集合
    return db.model('users', userScheMa);
}
//# sourceMappingURL=dbmanager.js.map
