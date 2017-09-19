const dbtest = require('../db/dbtest');
const log = require('../util/debug').log;
const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * 定义一些post api
 */

module.exports.postMixmin = function postMixmin(app) {
    app.post('/test', urlencodedParser, (req, res) => {
        log(req.body);
        res.end(JSON.stringify({
            hello: 'world!',
        }));
    });
    
    app.post('/savedata', urlencodedParser, (req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;
        
        if (!userName || !password) {
            res.end(JSON.stringify({
                error: '参数格式错误',
            }));
        } else {
            dbtest.insert(userName, password, (result) => {
                res.end(JSON.stringify(result));
            });
        }
    });
    
    app.post('/getdata', urlencodedParser, (req, res) => {
        const userName = req.body.userName;
        
        if (!userName) {
            res.end(JSON.stringify({
                error: '参数格式错误',
            }));
        } else {
            dbtest.getByConditions(userName, (result) => {
                res.end(JSON.stringify(result));
            });
        }
    });
};