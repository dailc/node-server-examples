const path = require('path');

/**
 * 定义一些get请求的API
 */
function resolvePath(p) {
    return path.resolve(__dirname, '../../', p);
}

const ROOT_PATH = resolvePath('./');

module.exports.getMixmin = function getMixmin(app) {
    app.get('/', (req, res) => {
        res.sendFile(`${ROOT_PATH}/pages/index.html`);
    });
};