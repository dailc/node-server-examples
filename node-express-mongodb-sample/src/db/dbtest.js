const dbManager = require('./dbmanager');

const db = dbManager.createDb();

const User = dbManager.createUserModule(db);


module.exports.insert = function insert(userName, password, callback) {
    const userObj = new User({ name: userName, password });

    userObj.save((err, res) => {
        if (err) {
            console.log(`Inset Error:${err}`);
            callback({
                error: err,
            });
        } else {
            console.log(`Inset Success:${res}`);
            callback({
                res,
            });
        }
    });
};

module.exports.getByConditions = function getByConditions(userName, callback) {
    const wherestr = { name: userName };
    
    User.find(wherestr, (err, res) => {
        if (err) {
            console.log(`Get Error:${err}`);
            callback({
                error: err,
            });
        } else {
            console.log(`Get Res:${res}`);
            callback({
                res,
            });
        }
    });
};