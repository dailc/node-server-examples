'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = serverMixmin;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _ioserver = require('./ioserver');

var _ioserver2 = _interopRequireDefault(_ioserver);

var _debug = require('../util/debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 开启服务
 */
const SERVER_PORT = 8100;

function serverMixmin(app) {
    const server = _http2.default.Server(app);
    const io = (0, _socket2.default)(server);

    // 启动不了请优先检查端口占用
    server.listen(SERVER_PORT, () => {
        const host = server.address().address;
        const port = server.address().port;

        (0, _debug.log)(`应用实例，访问地址为 http://${host}:${port}`);
    });

    (0, _ioserver2.default)(io);
}
//# sourceMappingURL=server.js.map
