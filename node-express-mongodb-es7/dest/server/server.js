'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = serverMixmin;

var _debug = require('../util/debug');

/**
 * 开启服务
 */
const SERVER_PORT = 86;

function serverMixmin(app) {
    const server = app.listen(SERVER_PORT, () => {
        const host = server.address().address;
        const port = server.address().port;

        (0, _debug.log)(`应用实例，访问地址为 http://${host}:${port}`);
    });
}
//# sourceMappingURL=server.js.map
