import {
    log,
} from '../util/debug';

/**
 * 开启服务
 */
const SERVER_PORT = 86;

export default function serverMixmin(app) {
    const server = app.listen(SERVER_PORT, () => {
        const host = server.address().address;
        const port = server.address().port;

        log(`应用实例，访问地址为 http://${host}:${port}`);
    });
}