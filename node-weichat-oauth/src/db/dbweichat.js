const dbManager = require('./dbmanager');
const log = require('../util/debug').log;
const warn = require('../util/debug').warn;

const db = dbManager.createDb();

const WeichatUser = dbManager.createWeichatUserModule(db);


module.exports.insert = function insert(openid, callback) {
    const userObj = new WeichatUser({
        openid,
        time: (new Date()).toLocaleString(),
    });

    userObj.save((err, res) => {
        if (err) {
            console.log(`Inset Error:${err}`);
            callback(err);
        } else {
            console.log(`Inset Success:${res}`);
            callback(null, res);
        }
    });
};

module.exports.getByConditions = function getByConditions(openidParam = '', callback) {
    const wherestr = {
        openid: openidParam,
    };
    
    WeichatUser.find(wherestr, (err, res) => {
        if (err) {
            warn(`Get Error:${err}`);
            callback(err);
        } else if (!res || !res.length) {
            warn('not exists');
            callback({
                error: 'notExists',
            });
        } else {
            log(`Get Res:${res}`);
            callback(null, res);
        }
    });
};