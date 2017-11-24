import path from 'path';
import {
    log,
} from '../util/debug';

/**
 * 定义一些get请求的API
 */
function resolvePath(p) {
    return path.resolve(__dirname, '../../', p);
}

const ROOT_PATH = resolvePath('./');

/**
 * 定义一些post api
 */

export default function homeMixmin(app) {
    app.get('/', (req, res) => {
        log('home');
        res.sendFile(`${ROOT_PATH}/pages/index.html`);
    });
    
    app.get('/test', (req, res) => {
        res.end(JSON.stringify({
            hello: 'world!',
        }));
    });
}