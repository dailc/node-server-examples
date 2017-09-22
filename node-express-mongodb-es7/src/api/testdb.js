import bodyParser from 'body-parser';
import {
    log,
} from '../util/debug';
import {
    insert,
    getByConditions,
} from '../db/dbtest';

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({
    extended: false,
});

export default function testdbMixmin(app) {
    app.post('/savedata', urlencodedParser, (req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;
        
        log(`save:userName:${userName},password${password}`);
        if (!userName || !password) {
            res.end(JSON.stringify({
                error: '参数格式错误',
            }));
            
            return;
        }
        (async () => {
            const data = await insert(userName, password);
            
            log(data);
            
            res.end(JSON.stringify(data));
        })();
    });
    
    app.get('/getdata', (req, res) => {
        const userName = req.query.userName;
        
        if (!userName) {
            res.end(JSON.stringify({
                error: '参数格式错误',
            }));
            
            return;
        }
        (async () => {
            const data = await getByConditions(userName);
            
            log(data);
            
            res.end(JSON.stringify(data));
        })();
    });
}