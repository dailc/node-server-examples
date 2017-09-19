const log = require('../util/debug').log;

/**
 * 跨域的配置单独抽取
 */
module.exports.corsMixmin = function corsMixmin(app) {
    // 设置跨域访问
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        res.header('X-Powered-By', ' 3.2.1');
        if (req.method === 'OPTIONS') {
            log('OPTIONS请求');
            // 让options请求快速返回
            // options只在预检时才有
            res.sendStatus(200);
        } else {
            // 默认为json
            if (req.method === 'GET') {
                res.header('Content-Type', 'text/html');
            } else {
                res.header('Content-Type', 'application/json;charset=utf-8');
            }
            log(`请求:${req.method}`);
            next();
        }
    });
};