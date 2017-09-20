const mongoose = require('mongoose');
//  模型
const Schema = mongoose.Schema;
const DB_NAME = require('../config/config').DB_NAME;

module.exports.createDb = function createDb() {
    // 连接数据库，没有的话会自动创建
    return mongoose.createConnection(`mongodb://localhost/${DB_NAME}`);
};

module.exports.closeDb = function closeDb(db) {
    db.close();
};

module.exports.createWeichatUserModule = function createWeichatModule(db) {
    //  定义了一个新的模型，但是此模式还未和相应集合有关联
    const weichatUserScheMa = new Schema({
        openid: String,
        time: String,
    });

    weichatUserScheMa.index({
        // 1和-1分别表示升序索引和降序索引
        openid: 1,
    });

    weichatUserScheMa.path('openid').index({
        // 设置唯一
        unique: true,
    });
    
    // 与相应集合关联，如果使用，会自动创建一个集合
    return db.model('users', weichatUserScheMa);
};