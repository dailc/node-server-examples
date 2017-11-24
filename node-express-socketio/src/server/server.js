import http from 'http';
import socketio from 'socket.io';
import ioserverMixmin from './ioserver';
import {
    log,
} from '../util/debug';

/**
 * 开启服务
 */
const SERVER_PORT = 8100;

export default function serverMixmin(app) {
    const server = http.Server(app);
    const io = socketio(server);
    
    // 启动不了请优先检查端口占用
    server.listen(SERVER_PORT, () => {
        const host = server.address().address;
        const port = server.address().port;

        log(`应用实例，访问地址为 http://${host}:${port}`);
    });
    
    // socket无须考虑跨域
    ioserverMixmin(io);
}