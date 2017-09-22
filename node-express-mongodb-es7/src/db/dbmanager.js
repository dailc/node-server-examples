import mongoose from 'mongoose';

//  模型
const Schema = mongoose.Schema;

export function createDb() {
    // 连接数据库，没有的话会自动创建
    return mongoose.createConnection('mongodb://localhost/test');
}

export function closeDb(db) {
    db.close();
}

export function createUserModule(db) {
    //  定义了一个新的模型，但是此模式还未和users集合有关联
    const userScheMa = new Schema({
        name: String,
        password: String,
    });

    userScheMa.index({
        // 1和-1分别表示升序索引和降序索引
        name: 1,
    });

    userScheMa.path('name').index({
        // 设置唯一
        unique: true,
    });
    
    // 与users集合关联，如果使用，会自动创建一个集合
    return db.model('users', userScheMa);
}