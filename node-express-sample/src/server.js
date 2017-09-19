const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

function resolvePath(p) {
    return path.resolve(__dirname, '../', p);
}

const ROOT_PATH = resolvePath('./');

app.use(express.static('public'));
// 设置跨域访问
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        console.log('OPTIONS请求');
        // 让options请求快速返回
        // options只在预检时才有
        res.sendStatus(200);
    } else {
        console.log(`请求:${req.method}`);
        next();
    }
});

app.get('/', (req, res) => {
    res.sendFile(`${ROOT_PATH}/pages/index.html`);
});

app.post('/test', urlencodedParser, (req, res) => {
    // 输出 JSON 格式
    console.log(req.body);
   
    res.end(JSON.stringify({
        hello: 'world!',
    }));
});

const server = app.listen(86, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`应用实例，访问地址为 http://${host}:${port}`);
});