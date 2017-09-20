const path = require('path');
const log = require('../util/debug').log;
const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * 定义一些基础API
 */
function resolvePath(p) {
    return path.resolve(__dirname, '../../', p);
}

const ROOT_PATH = resolvePath('./');

module.exports.homeMixmin = function homeMixmin(app) {
    app.get('/', (req, res) => {
        res.sendFile(`${ROOT_PATH}/pages/index.html`);
    });
    
    app.post('/test', urlencodedParser, (req, res) => {
        log(req.body);
        res.end(JSON.stringify({
            hello: 'world!',
        }));
    });
};